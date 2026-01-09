import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Health check: try to connect to node's WebSocket port
async function checkNodeHealth(ip: string, port: number, timeoutMs = 3000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    // Try TCP connection to the WebSocket port
    const conn = await Deno.connect({
      hostname: ip,
      port: port,
      transport: "tcp",
    });
    
    clearTimeout(timeoutId);
    conn.close();
    return true;
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
