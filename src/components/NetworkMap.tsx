import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Node {
  name: string;
  pseudocode: string;
  role: string;
  region: string;
  lat: number;
  lon: number;
  status: "online" | "offline" | "syncing";
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "hsl(var(--chart-2))";
    case "offline":
      return "hsl(var(--destructive))";
    case "syncing":
      return "hsl(var(--chart-3))";
    default:
      return "hsl(var(--muted))";
  }
};

const getStatusBadgeVariant = (status: string): "default" | "destructive" | "secondary" => {
  switch (status) {
    case "online":
      return "default";
    case "offline":
      return "destructive";
    case "syncing":
      return "secondary";
    default:
      return "secondary";
  }
};

export const NetworkMap = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-node-config');
        
        if (error) {
          console.error("Error fetching node config:", error);
          return;
        }

        if (data?.nodes) {
          setNodes(data.nodes);
        }
      } catch (error) {
        console.error("Error fetching nodes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNodes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Network Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[500px] bg-muted/20 rounded-b-lg overflow-hidden">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 147,
                }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "hsl(var(--muted))" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Connection Lines */}
                {nodes.map((fromNode, i) =>
                  nodes.slice(i + 1).map((toNode, j) => (
                    <Line
                      key={`${fromNode.name}-${toNode.name}`}
                      from={[fromNode.lon, fromNode.lat]}
                      to={[toNode.lon, toNode.lat]}
                      stroke="hsl(var(--primary))"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                      strokeLinecap="round"
                    />
                  ))
                )}

                {/* Node Markers */}
                {nodes.map((node) => (
                  <TooltipProvider key={node.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Marker
                          coordinates={[node.lon, node.lat]}
                          onMouseEnter={() => setHoveredNode(node.name)}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          <circle
                            r={hoveredNode === node.name ? 8 : 6}
                            fill={getStatusColor(node.status)}
                            stroke="hsl(var(--background))"
                            strokeWidth={2}
                            style={{
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          />
                          {hoveredNode === node.name && (
                            <circle
                              r={12}
                              fill={getStatusColor(node.status)}
                              fillOpacity={0.2}
                              stroke="none"
                            />
                          )}
                        </Marker>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-semibold">{node.name}</p>
                          <p className="text-xs font-mono text-primary">{node.pseudocode}</p>
                          <p className="text-sm text-muted-foreground">{node.role}</p>
                          <p className="text-sm text-muted-foreground">{node.region}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </ComposableMap>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Nodes</h3>
        {nodes.map((node) => (
          <Card key={node.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{node.name}</CardTitle>
                <Badge variant={getStatusBadgeVariant(node.status)}>
                  {node.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">ID:</span>{" "}
                <span className="font-mono text-xs text-primary">{node.pseudocode}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Role:</span>{" "}
                <span className="font-medium">{node.role}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Region:</span>{" "}
                <span>{node.region}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <span className="capitalize">{node.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
