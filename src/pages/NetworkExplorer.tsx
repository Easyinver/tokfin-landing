import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { NetworkMap } from "@/components/NetworkMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface BlockInfo {
  number: number;
  hash: string;
  timestamp: number;
  extrinsics: number;
}

interface ChainData {
  connected: boolean;
  currentBlock: number;
  lastBlockHash: string;
  peerCount: number;
  isSyncing: boolean;
  chainName: string;
  nodeName: string;
  blocks: BlockInfo[];
}

const POLL_INTERVAL = 10000;

const NetworkExplorer = () => {
  const navigate = useNavigate();
  const [chainData, setChainData] = useState<ChainData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChainData = useCallback(async () => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('substrate-proxy');
      
      if (fnError) {
        setError("Error connecting to network");
        return;
      }

      setChainData(data as ChainData);
      setError(null);
    } catch (e) {
      setError("Error fetching chain data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChainData();
    const interval = setInterval(fetchChainData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchChainData]);

  const isConnected = chainData?.connected ?? false;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">Network Explorer</h1>
          <Button variant="outline" size="sm" onClick={fetchChainData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <Tabs defaultValue="blocks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="blocks">Recent Blocks</TabsTrigger>
            <TabsTrigger value="map">Network Map</TabsTrigger>
          </TabsList>

          <TabsContent value="blocks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Connection Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant={isConnected ? "default" : "destructive"}>
                    {isConnected ? "Connected" : "Disconnected"}
                  </Badge>
                  {chainData?.chainName && (
                    <p className="text-xs text-muted-foreground mt-2">{chainData.chainName}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Current Block</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">#{chainData?.currentBlock ?? 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Last Block Hash</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-mono truncate">{chainData?.lastBlockHash || "—"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Connected Nodes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{chainData?.peerCount ?? 0}</p>
                  {chainData?.isSyncing && (
                    <Badge variant="secondary" className="mt-2">Syncing</Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Blocks</CardTitle>
                <CardDescription>Last 10 blocks on the network</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && !chainData ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-muted-foreground">{error}</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Block Number</TableHead>
                        <TableHead>Hash</TableHead>
                        <TableHead>Extrinsics</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(chainData?.blocks ?? []).map((block) => (
                        <TableRow 
                          key={block.hash}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => navigate(`/explorer/block/${block.number}`)}
                        >
                          <TableCell className="font-medium">#{block.number}</TableCell>
                          <TableCell className="font-mono text-xs truncate max-w-xs">
                            {block.hash}
                          </TableCell>
                          <TableCell>{block.extrinsics}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <NetworkMap />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NetworkExplorer;
