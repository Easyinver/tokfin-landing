import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFeatureClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="/" onClick={handleHomeClick} className="flex items-center">
              <img 
                src="/lovable-uploads/fe70204b-c5b2-4874-aee2-b7006ce7437b.png" 
                alt="Tokfin Logo" 
                className="h-12"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/innovation" className="text-white hover:text-sui-teal transition-colors">
              Innovation
            </Link>
            <a 
              href="#features" 
              onClick={handleFeatureClick}
              className="text-white hover:text-sui-teal transition-colors"
            >
              Features
            </a>
            <Link to="/developers" className="text-white hover:text-sui-teal transition-colors">
              Developers
            </Link>
            <a href="#stats" className="text-white hover:text-sui-teal transition-colors">
              Stats
            </a>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors">
              Launch App
            </Button>
          </div>

          {/* Mobile Menu Button */}
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