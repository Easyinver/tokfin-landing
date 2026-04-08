import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function rpcCall(ip: string, port: number, method: string, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`http://${ip}:${port}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params: [] }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const data = await response.json();
    return data?.result ?? null;
  } catch (error) {
    clearTimeout(timeoutId);
    console.log(`RPC ${method} to ${ip}:${port} failed:`, error.message);
    return null;
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

    const { data: nodes, error } = await supabase
      .from('tokfin_network_config')
      .select('*')
      .order('is_primary', { ascending: false });

    if (error) throw error;

    const generatePseudocode = (id: string) => `NODE-${id.slice(0, 8).toUpperCase()}`;

    // For each node: check health, get local peer ID, and get connected peers
    const nodeInfo = await Promise.all(
      (nodes || []).map(async (n) => {
        const [health, localPeerId, peers] = await Promise.all([
          rpcCall(n.ip, n.ws_port || 9944, 'system_health'),
          rpcCall(n.ip, n.ws_port || 9944, 'system_localPeerId'),
          rpcCall(n.ip, n.ws_port || 9944, 'system_peers'),
        ]);
        return {
          id: n.id,
          isConnected: !!health,
          localPeerId: localPeerId as string | null,
          connectedPeerIds: Array.isArray(peers) ? peers.map((p: any) => p.peerId as string) : [],
        };
      })
    );

    const infoMap = new Map(nodeInfo.map(i => [i.id, i]));

    // Build verified connections: a link exists if node A sees node B's peerId in its peers list
    const connections: { from: number; to: number }[] = [];
    const nodeList = nodes || [];
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const infoA = infoMap.get(nodeList[i].id);
        const infoB = infoMap.get(nodeList[j].id);
        if (!infoA || !infoB) continue;
        // Connection verified if either node sees the other as a peer
        const aSeesB = infoB.localPeerId && infoA.connectedPeerIds.includes(infoB.localPeerId);
        const bSeesA = infoA.localPeerId && infoB.connectedPeerIds.includes(infoA.localPeerId);
        if (aSeesB || bSeesA) {
          connections.push({ from: i, to: j });
        }
      }
    }

    const primaryNode = nodeList.find(n => n.is_primary && infoMap.get(n.id)?.isConnected)
      || nodeList.find(n => infoMap.get(n.id)?.isConnected)
      || nodeList[0];

    const wsEndpoint = primaryNode
      ? `ws://${primaryNode.ip}:${primaryNode.ws_port || 9944}`
      : null;

    const nodeConfig = {
      wsEndpoint,
      nodes: nodeList.map((n, index) => ({
        name: `Node-${String(index + 1).padStart(2, '0')}`,
        pseudocode: generatePseudocode(n.id),
        role: n.role,
        region: n.location.split(',')[0] || 'Unknown',
        lat: n.lat,
        lon: n.lon,
        status: infoMap.get(n.id)?.isConnected ? "connected" : "disconnected",
        peerCount: infoMap.get(n.id)?.connectedPeerIds.length ?? 0,
      })),
      connections,
      updatedAt: new Date().toISOString()
    };

    console.log("Node config with verified connections:", JSON.stringify(nodeConfig));

    return new Response(JSON.stringify(nodeConfig), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
