import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Max 3 requests
const RATE_WINDOW = 60 * 60 * 1000; // Per hour (in ms)

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

// Basic spam detection
function isSpammy(data: any): { isSpam: boolean; reason?: string } {
  // Honeypot field - if filled, it's a bot
  if (data.website || data.url || data.honeypot) {
    return { isSpam: true, reason: "honeypot" };
  }
  
  // Check for suspicious patterns in text fields
  const suspiciousPatterns = [
    /\[url=/i,
    /\[link=/i,
    /<a\s+href/i,
    /viagra|cialis|casino|lottery|bitcoin.*investment|crypto.*profit/i,
    /click here|buy now|limited time/i,
  ];
  
  const textToCheck = `${data.name} ${data.message || ''} ${data.email}`;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(textToCheck)) {
      return { isSpam: true, reason: "suspicious_content" };
    }
  }
  
  // Check email domain for common spam domains
  const spamDomains = ['tempmail', 'throwaway', 'fakeinbox', 'guerrillamail', 'mailinator'];
  const emailDomain = data.email?.split('@')[1]?.toLowerCase() || '';
  if (spamDomains.some(d => emailDomain.includes(d))) {
    return { isSpam: true, reason: "disposable_email" };
  }
  
  // Basic validation
  if (!data.name || data.name.length < 2 || data.name.length > 100) {
    return { isSpam: true, reason: "invalid_name" };
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { isSpam: true, reason: "invalid_email" };
  }
  
  return { isSpam: false };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    console.log(`Investment request from IP: ${clientIP}`);
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      console.log(`Rate limited: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const data = await req.json();
    console.log("Received investment request data:", { 
      name: data.name, 
      email: data.email?.substring(0, 5) + "***",
      hasMessage: !!data.message 
    });
    
    // Spam check
    const spamCheck = isSpammy(data);
    if (spamCheck.isSpam) {
      console.log(`Spam detected from ${clientIP}: ${spamCheck.reason}`);
      // Return success to not reveal detection (honeypot technique)
      return new Response(
        JSON.stringify({ success: true, message: "Request received" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Create Supabase client with service role (bypasses RLS)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Insert the investment request
    const { data: insertedData, error } = await supabase
      .from("agk_investment_requests")
      .insert({
        name: data.name.trim().substring(0, 100),
        email: data.email.trim().toLowerCase().substring(0, 255),
        phone: data.phone?.trim().substring(0, 20) || null,
        message: data.message?.trim().substring(0, 1000) || null,
        investment_amount: data.investment_amount || null,
        investor_type: data.investor_type?.substring(0, 50) || null,
        project_id: data.project_id || null,
        project_name: data.project_name?.substring(0, 100) || null,
        status: "pending"
      })
      .select()
      .single();
    
    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to submit request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Investment request saved successfully: ${insertedData.id}`);
    
    return new Response(
      JSON.stringify({ success: true, message: "Investment request submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error: any) {
    console.error("Error in submit-investment-request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
