import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Hero = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const animationFrameRef = useRef<number>();
  const velocityRef = useRef({ x: 2, y: 2 });
  const { toast } = useToast();

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const newX = prev.x + velocityRef.current.x;
        const newY = prev.y + velocityRef.current.y;

        // Bounce off edges
        if (newX >= 100 || newX <= 0) {
          velocityRef.current.x *= -1;
        }
        if (newY >= 100 || newY <= 0) {
          velocityRef.current.y *= -1;
        }

        return {
          x: Math.max(0, Math.min(100, newX)),
          y: Math.max(0, Math.min(100, newY))
        };
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add to waitlist table
      const { error: dbError } = await supabase
        .from("waitlist_subscriptions")
        .insert([{ email }]);

      if (dbError) throw dbError;

      // Send welcome email
      const { error: emailError } = await supabase.functions.invoke("send-welcome-email", {
        body: { email },
      });

      if (emailError) throw emailError;

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. Check your email for confirmation.",
      });
      setEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      id="hero-section" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/lovable-uploads/4eaad9f8-987c-462b-9e3f-da00a061a16c.png"
          alt="QR Code Background"
          className="w-32 h-32 opacity-20 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x - 50}%, ${position.y - 50}%) rotate(${position.x / 5}deg)`
          }}
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent">
            The Next Generation Blockchain
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience unprecedented speed, security, and scalability with Sui's innovative Layer 1 blockchain platform.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow bg-white/5 border-sui-teal/30 text-white placeholder:text-gray-400"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-sui-blue hover:bg-sui-purple transition-colors"
            >
              {isLoading ? "Joining..." : "Join Waitlist"}
            </Button>
          </div>
        </form>
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
