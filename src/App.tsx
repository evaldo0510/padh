import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import FerramentasIndex from "./pages/ferramentas/FerramentasIndex";
import PoemaFunil from "./pages/ferramentas/PoemaFunil";
import VersoGatilho from "./pages/ferramentas/VersoGatilho";
import Poemadiagnostico from "./pages/ferramentas/Poemadiagnostico";
import CadernoVozInterna from "./pages/ferramentas/CadernoVozInterna";
import EncenacaoPoetica from "./pages/ferramentas/EncenacaoPoetica";
import ReescritaPoetica from "./pages/ferramentas/ReescritaPoetica";
import RitualSilencio from "./pages/ferramentas/RitualSilencio";
import PoesiaHipnotica from "./pages/ferramentas/PoesiaHipnotica";

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
        <Route path="/sobre" element={<PageTransition><Sobre /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
        <Route path="/ferramentas" element={<PageTransition><FerramentasIndex /></PageTransition>} />
        <Route path="/ferramentas/poema-funil" element={<PageTransition><PoemaFunil /></PageTransition>} />
        <Route path="/ferramentas/verso-gatilho" element={<PageTransition><VersoGatilho /></PageTransition>} />
        <Route path="/ferramentas/poemadiagnostico" element={<PageTransition><Poemadiagnostico /></PageTransition>} />
        <Route path="/ferramentas/caderno-voz-interna" element={<PageTransition><CadernoVozInterna /></PageTransition>} />
        <Route path="/ferramentas/encenacao-poetica" element={<PageTransition><EncenacaoPoetica /></PageTransition>} />
        <Route path="/ferramentas/reescrita-poetica" element={<PageTransition><ReescritaPoetica /></PageTransition>} />
        <Route path="/ferramentas/ritual-silencio" element={<PageTransition><RitualSilencio /></PageTransition>} />
        <Route path="/ferramentas/poesia-hipnotica" element={<PageTransition><PoesiaHipnotica /></PageTransition>} />
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
