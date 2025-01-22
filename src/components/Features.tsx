import { Zap, Shield, Cpu, Rocket, Wallet, LineChart, Palette, Users, Gamepad2, Wrench } from "lucide-react";

const whyChooseFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process thousands of transactions per second with minimal latency.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Built with security-first principles and advanced cryptography.",
  },
  {
    icon: Cpu,
    title: "Smart Contracts",
    description: "Write safe smart contracts with Move programming language.",
  },
  {
    icon: Rocket,
    title: "Scalable",
    description: "Horizontal scaling for unlimited growth potential.",
  },
];

const keyInsights = [
  {
    number: "01",
    title: "Multithreaded Block Graph",
    description: "First, we solved the blockchain scaling problem with a multithreaded block graph which scales up performances massively.",
  },
  {
    number: "02",
    title: "Tech Innovations",
    description: "Second, we introduced tech innovations to support decentralization: autonomous smart contracts with built-in update mechanisms, and on-chain web page storage to bypass traditional centralized web servers.",
  },
  {
    number: "03",
    title: "Massa Distribution",
    description: "Third, we designed the Massa coin distribution to give full control to the community and keep the database safe.",
  },
];

const ecosystemFeatures = [
  {
    icon: Wallet,
    title: "Wallets",
    description: "Secure digital wallets for managing your assets",
  },
  {
    icon: LineChart,
    title: "DeFi",
    description: "Decentralized finance protocols and services",
  },
  {
    icon: Palette,
    title: "NFTs",
    description: "Create, trade, and collect digital assets",
  },
  {
    icon: Users,
    title: "Social",
    description: "Connect and engage with the community",
  },
  {
    icon: Gamepad2,
    title: "Games",
    description: "Play-to-earn games and entertainment",
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "Developer tools and infrastructure",
  },
];

export const Features = () => {
  return (
    <>
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-sui-blue to-sui-purple bg-clip-text text-transparent">
            Why Choose Tokfin?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-sui-teal transition-colors group"
              >
                <feature.icon className="w-12 h-12 mb-4 text-sui-teal group-hover:text-sui-blue transition-colors" />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-sui-blue to-sui-purple bg-clip-text text-transparent">
            Ecosystem Vision
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              We envision a decentralized, secure, and scalable network, governed and operated by its own community. 
              A network that dynamically responds to growing demand, scaling its resources horizontally and vertically. 
              Tokfin will constantly evolve with the needs of the ecosystem, incorporating new use cases and technologies 
              without disruption for users.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-sui-blue to-sui-purple bg-clip-text text-transparent">
            Key Innovations
          </h2>
          <div className="space-y-8">
            {keyInsights.map((insight) => (
              <div
                key={insight.number}
                className="flex flex-col md:flex-row items-start gap-6 p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-sui-teal transition-colors"
              >
                <span className="text-4xl md:text-6xl font-bold text-sui-teal">
                  {insight.number}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                    {insight.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-sui-blue to-sui-purple bg-clip-text text-transparent">
            Ecosystem Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystemFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-sui-teal transition-colors group"
              >
                <feature.icon className="w-12 h-12 mb-4 text-sui-teal group-hover:text-sui-blue transition-colors" />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};