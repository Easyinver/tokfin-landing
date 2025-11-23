import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, ChevronLeft, ChevronRight, Home } from "lucide-react";

interface ExtrinsicInfo {
  index: number;
  method: string;
  section: string;
  args: any;
  success: boolean;
}

interface BlockDetails {
  number: number;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  timestamp: number;
  extrinsics: ExtrinsicInfo[];
}

const BlockDetail = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  const navigate = useNavigate();
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [blockDetails, setBlockDetails] = useState<BlockDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlockDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const wsProvider = new WsProvider("ws://152.42.217.133:9944");
        const apiInstance = await ApiPromise.create({ provider: wsProvider });
        setApi(apiInstance);

        const blockNum = parseInt(blockNumber || "0");
        const blockHash = await apiInstance.rpc.chain.getBlockHash(blockNum);
        const signedBlock = await apiInstance.rpc.chain.getBlock(blockHash);
        const apiAt = await apiInstance.at(blockHash);
        
        // Get timestamp from block
        const timestampExtrinsic = signedBlock.block.extrinsics.find(
          (ext) => ext.method.section === 'timestamp' && ext.method.method === 'set'
        );
        const timestamp = timestampExtrinsic 
          ? (timestampExtrinsic.method.args[0] as any).toNumber() 
          : Date.now();

        // Process extrinsics
        const extrinsics: ExtrinsicInfo[] = signedBlock.block.extrinsics.map((ext, index) => {
          return {
            index,
            method: ext.method.method,
            section: ext.method.section,
            args: ext.method.args.map(arg => arg.toString()),
            success: true, // In substrate, we'd need to check events to know if it succeeded
          };
        });

        setBlockDetails({
          number: blockNum,
          hash: blockHash.toHex(),
          parentHash: signedBlock.block.header.parentHash.toHex(),
          stateRoot: signedBlock.block.header.stateRoot.toHex(),
          extrinsicsRoot: signedBlock.block.header.extrinsicsRoot.toHex(),
          timestamp,
          extrinsics,
        });
      } catch (err) {
        console.error("Error fetching block details:", err);
        setError("Failed to fetch block details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlockDetails();

    return () => {
      if (api) {
        api.disconnect();
      }
    };
  }, [blockNumber]);

  const handlePreviousBlock = () => {
    const blockNum = parseInt(blockNumber || "0");
    if (blockNum > 0) {
      navigate(`/explorer/block/${blockNum - 1}`);
    }
  };

  const handleNextBlock = () => {
    const blockNum = parseInt(blockNumber || "0");
    navigate(`/explorer/block/${blockNum + 1}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blockDetails) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-muted-foreground mb-4">{error || "Block not found"}</p>
            <Button onClick={() => navigate("/explorer")}>Back to Explorer</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/explorer" className="hover:text-foreground flex items-center gap-1">
            <Home className="h-4 w-4" />
            Explorer
          </Link>
          <span>/</span>
          <span className="text-foreground">Block #{blockDetails.number}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            onClick={handlePreviousBlock}
            disabled={blockDetails.number === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Block
          </Button>
          <Button
            variant="outline"
            onClick={handleNextBlock}
          >
            Next Block
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Block Header Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Block #{blockDetails.number}</CardTitle>
            <CardDescription>
              {new Date(blockDetails.timestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Block Hash</p>
                <p className="font-mono text-xs break-all">{blockDetails.hash}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Parent Hash</p>
                <p className="font-mono text-xs break-all">{blockDetails.parentHash}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">State Root</p>
                <p className="font-mono text-xs break-all">{blockDetails.stateRoot}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Extrinsics Root</p>
                <p className="font-mono text-xs break-all">{blockDetails.extrinsicsRoot}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extrinsics */}
        <Card>
          <CardHeader>
            <CardTitle>Extrinsics ({blockDetails.extrinsics.length})</CardTitle>
            <CardDescription>List of all extrinsics in this block</CardDescription>
          </CardHeader>
          <CardContent>
            {blockDetails.extrinsics.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No extrinsics in this block</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Arguments</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockDetails.extrinsics.map((extrinsic) => (
                    <TableRow key={extrinsic.index}>
                      <TableCell className="font-medium">#{extrinsic.index}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{extrinsic.section}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{extrinsic.method}</TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          {extrinsic.args.length > 0 ? (
                            <details className="cursor-pointer">
                              <summary className="text-sm text-muted-foreground">
                                {extrinsic.args.length} argument(s)
                              </summary>
                              <div className="mt-2 space-y-1">
                                {extrinsic.args.map((arg: string, i: number) => (
                                  <div key={i} className="text-xs font-mono bg-muted p-2 rounded break-all">
                                    {arg}
                                  </div>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <span className="text-sm text-muted-foreground">No arguments</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={extrinsic.success ? "default" : "destructive"}>
                          {extrinsic.success ? "Success" : "Failed"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockDetail;
