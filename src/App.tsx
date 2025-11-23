import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Innovation from "./pages/Innovation";
import Developers from "./pages/Developers";
import NetworkExplorer from "./pages/NetworkExplorer";
import BlockDetail from "./pages/BlockDetail";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/explorer" element={<NetworkExplorer />} />
          <Route path="/explorer/block/:blockNumber" element={<BlockDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;