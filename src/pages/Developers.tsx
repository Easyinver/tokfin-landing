import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Code2, GitBranch, Terminal } from "lucide-react";

export default function Developers() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent">
              Build the Future of Finance
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Join our community of developers and create innovative financial applications on our secure and scalable platform.
            </p>
            <Button className="bg-sui-blue hover:bg-sui-purple text-white">
              Start Building <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-black/50 border-gray-800 hover:border-sui-teal transition-colors">
              <Code2 className="h-12 w-12 mb-4 text-sui-teal" />
              <h3 className="text-xl font-semibold mb-3">Powerful APIs</h3>
              <p className="text-gray-400">
                Access our comprehensive suite of APIs designed for building sophisticated financial applications.
              </p>
            </Card>

            <Card className="p-6 bg-black/50 border-gray-800 hover:border-sui-purple transition-colors">
              <Terminal className="h-12 w-12 mb-4 text-sui-purple" />
              <h3 className="text-xl font-semibold mb-3">Developer Tools</h3>
              <p className="text-gray-400">
                Utilize our SDK, documentation, and testing environments to accelerate your development process.
              </p>
            </Card>

            <Card className="p-6 bg-black/50 border-gray-800 hover:border-sui-blue transition-colors">
              <GitBranch className="h-12 w-12 mb-4 text-sui-blue" />
              <h3 className="text-xl font-semibold mb-3">Open Source</h3>
              <p className="text-gray-400">
                Contribute to our open-source projects and help shape the future of decentralized finance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comprehensive Documentation
            </h2>
            <p className="text-gray-300 mb-8">
              Everything you need to know about building with our platform, from quick starts to detailed API references.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-black/50 border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Quick Start Guide</h3>
                <p className="text-gray-400 mb-4">
                  Get up and running with our platform in minutes with our step-by-step guide.
                </p>
                <Button variant="outline" className="w-full">
                  View Guide
                </Button>
              </Card>
              <Card className="p-6 bg-black/50 border-gray-800">
                <h3 className="text-xl font-semibold mb-3">API Reference</h3>
                <p className="text-gray-400 mb-4">
                  Detailed documentation of our API endpoints, request/response formats, and examples.
                </p>
                <Button variant="outline" className="w-full">
                  Explore APIs
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Developer Community
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Connect with other developers, share your projects, and get help from our team.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Button className="bg-sui-purple hover:bg-sui-blue">
              Join Discord
            </Button>
            <Button className="bg-sui-teal hover:bg-sui-purple">
              GitHub Repository
            </Button>
            <Button className="bg-sui-blue hover:bg-sui-teal">
              Developer Forum
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}