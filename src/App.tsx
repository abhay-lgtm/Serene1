import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MusicPage from "./pages/MusicPage";
import GamesPage from "./pages/GamesPage";
import DiaryPage from "./pages/DiaryPage";
import MoodPage from "./pages/MoodPage";
import NewsPage from "./pages/NewsPage";
import MentalHealthSearch from "./components/MentalHealthSearch";
import MeditationComponent from "./pages/MeditationComponent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/music" element={<MeditationComponent />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/support" element={<MentalHealthSearch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
