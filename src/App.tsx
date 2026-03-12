import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/layout/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LivroCurso from "./pages/LivroCurso";
import Formacao from "./pages/Formacao";
import MapaCerebral from "./pages/MapaCerebral";
import AulaExclusiva from "./pages/AulaExclusiva";
import Contato from "./pages/Contato";
import Sobre from "./pages/Sobre";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/livro-curso" element={<PageTransition><LivroCurso /></PageTransition>} />
        <Route path="/formacao" element={<PageTransition><Formacao /></PageTransition>} />
        <Route path="/mapa-cerebral" element={<PageTransition><MapaCerebral /></PageTransition>} />
        <Route path="/aula-exclusiva" element={<PageTransition><AulaExclusiva /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
