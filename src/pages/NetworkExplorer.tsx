import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Navbar } from "@/components/Navbar";
import { NetworkMap } from "@/components/NetworkMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlockInfo {
  number: number;
  hash: string;
  timestamp: number;
  extrinsics: number;
}

const NetworkExplorer = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [lastBlockHash, setLastBlockHash] = useState<string>("");
  const [peerCount, setPeerCount] = useState<number>(0);
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<BlockInfo | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let wsProvider: WsProvider | undefined;

    const connectToNode = async () => {
      try {
        wsProvider = new WsProvider("ws://localhost:9944");
        
        // Listen for connection events
        wsProvider.on('connected', () => {
          setIsConnected(true);
        });
        
        wsProvider.on('disconnected', () => {
          setIsConnected(false);
        });
        
        wsProvider.on('error', () => {
          setIsConnected(false);
        });

        const apiInstance = await ApiPromise.create({ provider: wsProvider });
        
        setApi(apiInstance);
        setIsConnected(apiInstance.isConnected);

        // Subscribe to new blocks
        unsubscribe = await apiInstance.rpc.chain.subscribeNewHeads(async (header) => {
          const blockNumber = header.number.toNumber();
          const blockHash = header.hash.toHex();
          
          setCurrentBlock(blockNumber);
          setLastBlockHash(blockHash);

          // Get block details
          const signedBlock = await apiInstance.rpc.chain.getBlock(blockHash);
          const extrinsicsCount = signedBlock.block.extrinsics.length;
          
          const newBlock: BlockInfo = {
            number: blockNumber,
            hash: blockHash,
            timestamp: Date.now(),
            extrinsics: extrinsicsCount,
          };

          setBlocks((prev) => [newBlock, ...prev].slice(0, 10));
        });

        // Get peer count
        const health = await apiInstance.rpc.system.health();
        setPeerCount(health.peers.toNumber());
      } catch (error) {
        console.error("Error connecting to node:", error);
        setIsConnected(false);
      }
    };

    connectToNode();

    return () => {
      unsubscribe?.();
      wsProvider?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Network Explorer</h1>
        
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Current Block</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">#{currentBlock}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Last Block Hash</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-mono truncate">{lastBlockHash || "—"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Connected Peers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{peerCount}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Blocks</CardTitle>
            <CardDescription>Last 10 blocks on the network</CardDescription>
          </CardHeader>
          <CardContent>
            {blocks.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Block Number</TableHead>
                    <TableHead>Hash</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Extrinsics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blocks.map((block) => (
                    <TableRow 
                      key={block.hash}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/explorer/block/${block.number}`)}
                    >
                      <TableCell className="font-medium">#{block.number}</TableCell>
                      <TableCell className="font-mono text-xs truncate max-w-xs">
                        {block.hash}
                      </TableCell>
                      <TableCell>
                        {new Date(block.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>{block.extrinsics}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

            {selectedBlock && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Block Details</CardTitle>
              <CardDescription>Block #{selectedBlock.number}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Hash</p>
                <p className="font-mono text-sm break-all">{selectedBlock.hash}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Timestamp</p>
                <p>{new Date(selectedBlock.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Extrinsics Count</p>
                <p>{selectedBlock.extrinsics}</p>
              </div>
            </CardContent>
          </Card>
            )}
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
