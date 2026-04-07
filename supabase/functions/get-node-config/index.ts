import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Health check: try HTTP RPC endpoint (Substrate exposes HTTP on same port as WS)
async function checkNodeHealth(ip: string, port: number, timeoutMs = 5000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    // Substrate nodes expose an HTTP RPC endpoint on the same port
    const response = await fetch(`http://${ip}:${port}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'system_health',
        params: []
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();
    console.log(`Node ${ip}:${port} health:`, data);
    return !!data?.result;
  } catch (error) {
    console.log(`Node ${ip}:${port} health check failed:`, error.message);
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch nodes from database
    const { data: nodes, error } = await supabase
      .from('tokfin_network_config')
      .select('*')
      .order('is_primary', { ascending: false });

    if (error) {
      console.error("Error fetching nodes:", error);
      throw error;
    }

    // Generate pseudonyms for public display (security: hide real names/IPs)
    const generatePseudocode = (id: string) => {
      const hash = id.slice(0, 8).toUpperCase();
      return `NODE-${hash}`;
    };

    // Check health of all nodes in parallel
    const healthChecks = await Promise.all(
      (nodes || []).map(async (n) => {
        const isConnected = await checkNodeHealth(n.ip, n.ws_port || 9944);
        return { id: n.id, isConnected };
      })
    );

    const healthMap = new Map(healthChecks.map(h => [h.id, h.isConnected]));

    // Find primary node that is actually connected
    const primaryNode = nodes?.find(n => n.is_primary && healthMap.get(n.id)) 
      || nodes?.find(n => healthMap.get(n.id))
      || nodes?.[0];
    
    const wsEndpoint = primaryNode 
      ? `ws://${primaryNode.ip}:${primaryNode.ws_port || 9944}` 
      : null;

    const nodeConfig = {
      wsEndpoint,
      nodes: nodes?.map((n, index) => ({
        name: `Node-${String(index + 1).padStart(2, '0')}`,
        pseudocode: generatePseudocode(n.id),
        role: n.role,
        region: n.location.split(',')[0] || 'Unknown',
        lat: n.lat,
        lon: n.lon,
        status: healthMap.get(n.id) ? "connected" : "disconnected"
      })) || [],
      updatedAt: new Date().toISOString()
    };

    console.log("Returning node configuration with health checks:", nodeConfig);

    return new Response(JSON.stringify(nodeConfig), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error returning node config:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
