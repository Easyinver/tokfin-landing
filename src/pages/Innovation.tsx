import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

const Innovation = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 space-y-20">
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

        {/* New Node Setup Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] overflow-hidden">
              <img
                src="/lovable-uploads/aa957b6e-1ad4-442d-b9db-90d79da713dd.png"
                alt="Node Setup Illustration"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-radial opacity-50"></div>
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent">
                Easily setup a node
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-sui-teal transition-colors">
                  <span className="text-xl font-semibold text-white">Regular Computer</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-sui-teal transition-colors">
                  <span className="text-xl font-semibold text-white">Small Token Stake</span>
                </div>
              </div>
              <p className="text-xl text-gray-300">
                Join our network with minimal requirements. All you need is a regular computer and a small token stake to start participating in the network's consensus and earning rewards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovation;