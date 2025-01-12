import { Wallet, Coins, Image, Users, Gamepad2, Wrench } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Wallets",
    description: "Different wallets that will allow you to interact with Massa Blockchain, as you are used to!",
  },
  {
    icon: Coins,
    title: "DeFi",
    description: "dApps, DEX, and others using Massa Smart Contracts for transactions, trading, staking...",
  },
  {
    icon: Image,
    title: "NFTs",
    description: "Projects using NFTs as one of their main feature and usecase, as well as art projects.",
  },
  {
    icon: Users,
    title: "Social",
    description: "Web3 Social Networks allow innovative ways to interact with others & to connect to the World.",
  },
  {
    icon: Gamepad2,
    title: "Games",
    description: "GameFi and Web3 gaming bring the blockchain at the core of the experience.",
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "All necessary tools to build with Massa, explore, interact with the blockchain.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Ecosystem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
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
  );
};