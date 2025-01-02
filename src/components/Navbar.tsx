import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent">
              Sui
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-sui-teal transition-colors">
              Features
            </a>
            <a href="#stats" className="text-white hover:text-sui-teal transition-colors">
              Statistics
            </a>
            <a href="#developers" className="text-white hover:text-sui-teal transition-colors">
              Developers
            </a>
            <Button className="bg-sui-blue hover:bg-sui-purple transition-colors">
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};