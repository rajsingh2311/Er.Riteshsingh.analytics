import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import SectionPage from "./pages/SectionPage";
import PGDMPage from "./pages/PGDMPage";
import BTechPage from "./pages/BTechPage";
import TwelfthPage from "./pages/TwelfthPage";
import TenthPage from "./pages/TenthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pgdm" element={<PGDMPage />} />
            <Route path="/btech" element={<BTechPage />} />
            <Route path="/twelfth" element={<TwelfthPage />} />
            <Route path="/tenth" element={<TenthPage />} />
            <Route path="/section/:sectionId" element={<SectionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
