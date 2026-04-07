import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function rpcCall(ip: string, port: number, method: string, params: unknown[] = [], timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  const response = await fetch(`http://${ip}:${port}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    signal: controller.signal,
  });
  
  clearTimeout(timeoutId);
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find primary connected node
    const { data: nodes } = await supabase
      .from('tokfin_network_config')
      .select('ip, ws_port, is_primary')
      .order('is_primary', { ascending: false });

    if (!nodes?.length) {
      throw new Error('No nodes configured');
    }

    // Try primary first, then others
    let nodeIp = '';
    let nodePort = 9944;
    let connected = false;

    for (const node of nodes) {
      try {
        await rpcCall(node.ip, node.ws_port || 9944, 'system_health', [], 3000);
        nodeIp = node.ip;
        nodePort = node.ws_port || 9944;
        connected = true;
        break;
      } catch {
        continue;
      }
    }

    if (!connected) {
      return new Response(JSON.stringify({ error: 'No nodes available', blocks: [], health: null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 503,
      });
    }

    // Fetch chain data in parallel
    const [header, health, chain, name] = await Promise.all([
      rpcCall(nodeIp, nodePort, 'chain_getHeader'),
      rpcCall(nodeIp, nodePort, 'system_health'),
      rpcCall(nodeIp, nodePort, 'system_chain'),
      rpcCall(nodeIp, nodePort, 'system_name'),
    ]);

    const currentBlockNum = parseInt(header.number, 16);

    // Fetch last 10 blocks
    const blocks = [];
    const blockCount = Math.min(10, currentBlockNum + 1);
    
    for (let i = 0; i < blockCount; i++) {
      const blockNum = currentBlockNum - i;
      const hexNum = '0x' + blockNum.toString(16);
      
      try {
        const blockHash = await rpcCall(nodeIp, nodePort, 'chain_getBlockHash', [blockNum]);
        const block = await rpcCall(nodeIp, nodePort, 'chain_getBlock', [blockHash]);
        
        blocks.push({
          number: blockNum,
          hash: blockHash,
          parentHash: block.block.header.parentHash,
          stateRoot: block.block.header.stateRoot,
          extrinsicsRoot: block.block.header.extrinsicsRoot,
          extrinsics: block.block.extrinsics.length,
          timestamp: Date.now() - (i * 6000), // approximate
        });
      } catch (e) {
        console.error(`Error fetching block ${blockNum}:`, e.message);
      }
    }

    const result = {
      connected: true,
      currentBlock: currentBlockNum,
      lastBlockHash: header.parentHash,
      peerCount: health.peers,
      isSyncing: health.isSyncing,
      chainName: chain,
      nodeName: name,
      blocks,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Substrate proxy error:", error);
    return new Response(JSON.stringify({ error: error.message, connected: false, blocks: [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
