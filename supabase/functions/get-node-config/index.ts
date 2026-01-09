import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Find primary node for WebSocket endpoint
    const primaryNode = nodes?.find(n => n.is_primary) || nodes?.[0];
    const wsEndpoint = primaryNode 
      ? `ws://${primaryNode.ip}:${primaryNode.ws_port || 9944}` 
      : null;

    // Generate pseudonyms for public display (security: hide real names/IPs)
    const generatePseudocode = (id: string) => {
      const hash = id.slice(0, 8).toUpperCase();
      return `NODE-${hash}`;
    };

    const nodeConfig = {
      wsEndpoint,
      nodes: nodes?.map((n, index) => ({
        name: `Node-${String(index + 1).padStart(2, '0')}`,
        pseudocode: generatePseudocode(n.id),
        role: n.role,
        region: n.location.split(',')[0] || 'Unknown', // Only show region, not full location
        lat: n.lat,
        lon: n.lon,
        status: n.status
      })) || [],
      updatedAt: new Date().toISOString()
    };

    console.log("Returning node configuration from database:", nodeConfig);

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
