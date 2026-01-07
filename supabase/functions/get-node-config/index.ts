import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Node configuration - update these IPs when you move servers
const nodeConfig = {
  // Primary WebSocket endpoint for the explorer
  wsEndpoint: "ws://137.184.95.138:9944",
  
  // Node list for the network map
  nodes: [
    {
      name: "Genesis",
      role: "Validator",
      ip: "64.227.101.109",
      location: "San Francisco",
      lat: 37.7749,
      lon: -122.4194,
      status: "online"
    },
    {
      name: "Treasury",
      role: "Full Node",
      ip: "152.42.217.133",
      location: "Singapore",
      lat: 1.3521,
      lon: 103.8198,
      status: "online"
    },
    {
      name: "Foundation",
      role: "Full Node",
      ip: "144.126.197.239",
      location: "London",
      lat: 51.5074,
      lon: -0.1278,
      status: "online"
    }
  ],
  
  // Last updated timestamp
  updatedAt: new Date().toISOString()
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Returning node configuration");
    
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
