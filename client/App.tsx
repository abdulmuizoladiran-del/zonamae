import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Placeholder from "./pages/Placeholder";
import VipMembership from "./pages/VipMembership";
import MeetGreet from "./pages/MeetGreet";
import TrackCard from "./pages/TrackCard";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MemberDashboard from "./pages/MemberDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vip-membership" element={<VipMembership />} />
          <Route path="/meet-greet" element={<MeetGreet />} />
          <Route path="/track-card" element={<TrackCard />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
          <Route
            path="/terms"
            element={<Placeholder title="Terms & Conditions" />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
