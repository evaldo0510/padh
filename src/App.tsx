import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import PageTransition from "./components/layout/PageTransition";
import { PageSkeleton } from "./components/ui/page-skeleton";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LivroCurso = lazy(() => import("./pages/LivroCurso"));
const Formacao = lazy(() => import("./pages/Formacao"));
const MapaCerebral = lazy(() => import("./pages/MapaCerebral"));
const AulaExclusiva = lazy(() => import("./pages/AulaExclusiva"));
const Contato = lazy(() => import("./pages/Contato"));
const Sobre = lazy(() => import("./pages/Sobre"));
const FerramentasIndex = lazy(() => import("./pages/ferramentas/FerramentasIndex"));
const PoemaFunil = lazy(() => import("./pages/ferramentas/PoemaFunil"));
const VersoGatilho = lazy(() => import("./pages/ferramentas/VersoGatilho"));
const Poemadiagnostico = lazy(() => import("./pages/ferramentas/Poemadiagnostico"));
const CadernoVozInterna = lazy(() => import("./pages/ferramentas/CadernoVozInterna"));
const EncenacaoPoetica = lazy(() => import("./pages/ferramentas/EncenacaoPoetica"));
const ReescritaPoetica = lazy(() => import("./pages/ferramentas/ReescritaPoetica"));
const RitualSilencio = lazy(() => import("./pages/ferramentas/RitualSilencio"));
const PoesiaHipnotica = lazy(() => import("./pages/ferramentas/PoesiaHipnotica"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={<PageSkeleton />}>
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
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
