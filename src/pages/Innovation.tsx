import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

const Innovation = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* First Card */}
          <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent">
                Scalability With Uncompromising Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-xl text-gray-300">
                Massa is the first and only layer 1 blockchain that tackles the trilemma of scalability, decentralization, and security without compromise. Achieving over 10,000 transactions per second with thousands of nodes, our parallel block architecture and unique Autonomous Smart Contracts (ASCs) are setting new standards in DeFi and web3.
              </p>
            </CardContent>
          </Card>

          {/* Second Card */}
          <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
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
    </div>
  );
};

export default Innovation;