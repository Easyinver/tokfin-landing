import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/fe70204b-c5b2-4874-aee2-b7006ce7437b.png" 
                alt="Tokfin Logo" 
                className="h-12"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/innovation" className="text-white hover:text-sui-teal transition-colors">
              Innovation
            </Link>
            <a href="#features" className="text-white hover:text-sui-teal transition-colors">
              Features
            </a>
            <a href="#stats" className="text-white hover:text-sui-teal transition-colors">
              Statistics
            </a>
            <Link to="/developers" className="text-white hover:text-sui-teal transition-colors">
              Developers
            </Link>
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