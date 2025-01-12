import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

const Innovation = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Card className="max-w-4xl mx-auto bg-black/50 backdrop-blur-sm border-gray-800">
          <CardHeader>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent">
              Groundbreaking Innovation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-xl text-gray-300">
              Massa's technological advances enable an unprecedented combination of scale and decentralization.
            </p>
            
            <ul className="space-y-6">
              <li className="flex gap-3">
                <span className="text-sui-teal">•</span>
                <p>
                  Our parallel block architecture allows blocks to be produced in parallel threads, achieving{" "}
                  <span className="text-sui-teal">unprecedented scalability</span>.
                </p>
              </li>
              
              <li className="flex gap-3">
                <span className="text-sui-teal">•</span>
                <p>
                  Transaction sharding eliminates duplicate transactions and risks like double spending across these parallel blocks.
                </p>
              </li>
              
              <li className="flex gap-3">
                <span className="text-sui-teal">•</span>
                <p>
                  Massa's unique Autonomous Smart Contracts (ASCs) remove the need for external centralized bots, revolutionizing DeFi and enabling truly autonomous operations.
                </p>
              </li>
              
              <li className="flex gap-3">
                <span className="text-sui-teal">•</span>
                <p>
                  Our pioneering on-chain web hosting provides dApp frontends with the same level of decentralization as smart contracts, enhancing security. Browse dApps directly, with no need for centralized intermediaries!
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Innovation;