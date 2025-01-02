import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent animate-float">
          The Next Generation Blockchain
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience unprecedented speed, security, and scalability with Sui's innovative Layer 1 blockchain platform.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-sui-blue hover:bg-sui-purple transition-colors text-lg px-8 py-6">
            Start Building
          </Button>
          <Button variant="outline" className="border-sui-teal text-sui-teal hover:bg-sui-teal/10 transition-colors text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};