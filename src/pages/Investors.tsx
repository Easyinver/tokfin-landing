import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { TrendingUp, Shield, Users, Zap, CheckCircle } from "lucide-react";

const Investors = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
    message: "",
    // Honeypot field - bots will fill this
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if filled, silently "succeed" but don't submit
    if (formData.website) {
      console.log("Bot detected via honeypot");
      setIsSubmitted(true);
      return;
    }

    // Basic validation
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid name.",
      });
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.rpc("add_waitlist_subscription", {
        p_email: formData.email.trim().toLowerCase(),
        p_name: formData.name.trim(),
        p_interests: formData.interests.trim() || "Investment opportunity",
        p_message: formData.message.trim(),
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Request Received!",
        description: "Thank you for your interest. Our team will contact you soon.",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit your request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Early Access",
      description: "Be among the first to participate in our token ecosystem"
    },
    {
      icon: Shield,
      title: "Secure Investment",
      description: "Built on Layer-0 technology with enterprise-grade security"
    },
    {
      icon: Users,
      title: "Growing Community",
      description: "Join a thriving ecosystem of developers and users"
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Benefit from our ultra-fast transaction processing"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-sui-blue/20 text-sui-teal border-sui-teal/30">
            Investment Opportunity
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sui-blue via-sui-purple to-sui-teal bg-clip-text text-transparent">
            Invest in the Future of Blockchain
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tokfin is building the next generation Layer-0 blockchain infrastructure. 
            Join us as an early investor and be part of the decentralized revolution.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card/50 border-sui-teal/20 hover:border-sui-teal/40 transition-colors">
              <CardHeader>
                <benefit.icon className="h-10 w-10 text-sui-teal mb-2" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 border-sui-teal/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Request Information</CardTitle>
              <CardDescription>
                Fill out the form below and our investment team will contact you with more details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    Your request has been received. Our team will contact you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="absolute -left-[9999px] opacity-0 h-0 w-0"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="bg-background/50 border-sui-teal/30 focus:border-sui-teal"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={255}
                        className="bg-background/50 border-sui-teal/30 focus:border-sui-teal"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interests" className="text-sm font-medium">
                      Investment Interest
                    </label>
                    <Input
                      id="interests"
                      name="interests"
                      type="text"
                      placeholder="e.g., Token purchase, Partnership, Seed funding"
                      value={formData.interests}
                      onChange={handleChange}
                      maxLength={200}
                      className="bg-background/50 border-sui-teal/30 focus:border-sui-teal"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Additional Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your investment goals or any questions you have..."
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={1000}
                      rows={4}
                      className="bg-background/50 border-sui-teal/30 focus:border-sui-teal resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-sui-blue hover:bg-sui-purple transition-colors text-lg py-6"
                  >
                    {isLoading ? "Submitting..." : "Submit Request"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to be contacted by our investment team.
                    Your information will be kept confidential.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Investors;
