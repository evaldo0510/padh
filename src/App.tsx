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
import PWAPrompt from "./components/layout/PWAPrompt";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LivroCurso = lazy(() => import("./pages/LivroCurso"));
const Formacao = lazy(() => import("./pages/Formacao"));
const MapaCerebral = lazy(() => import("./pages/MapaCerebral"));
const AulaExclusiva = lazy(() => import("./pages/AulaExclusiva"));
const Contato = lazy(() => import("./pages/Contato"));
const Sobre = lazy(() => import("./pages/Sobre"));
const CursoPCH = lazy(() => import("./pages/CursoPCH"));
const FerramentasIndex = lazy(() => import("./pages/ferramentas/FerramentasIndex"));
const PoemaFunil = lazy(() => import("./pages/ferramentas/PoemaFunil"));
const VersoGatilho = lazy(() => import("./pages/ferramentas/VersoGatilho"));
const Poemadiagnostico = lazy(() => import("./pages/ferramentas/Poemadiagnostico"));
const CadernoVozInterna = lazy(() => import("./pages/ferramentas/CadernoVozInterna"));
const EncenacaoPoetica = lazy(() => import("./pages/ferramentas/EncenacaoPoetica"));
const ReescritaPoetica = lazy(() => import("./pages/ferramentas/ReescritaPoetica"));
const RitualSilencio = lazy(() => import("./pages/ferramentas/RitualSilencio"));
const PoesiaHipnotica = lazy(() => import("./pages/ferramentas/PoesiaHipnotica"));
const VendaPoemaFunil = lazy(() => import("./pages/venda/VendaPoemaFunil"));
const VendaVersoGatilho = lazy(() => import("./pages/venda/VendaVersoGatilho"));
const VendaPoemadiagnostico = lazy(() => import("./pages/venda/VendaPoemadiagnostico"));
const VendaCadernoVozInterna = lazy(() => import("./pages/venda/VendaCadernoVozInterna"));
const VendaEncenacaoPoetica = lazy(() => import("./pages/venda/VendaEncenacaoPoetica"));
const VendaReescritaPoetica = lazy(() => import("./pages/venda/VendaReescritaPoetica"));
const VendaRitualSilencio = lazy(() => import("./pages/venda/VendaRitualSilencio"));
const VendaPoesiaHipnotica = lazy(() => import("./pages/venda/VendaPoesiaHipnotica"));
const CienciaPoesia = lazy(() => import("./pages/CienciaPoesia"));
const ComboPADH = lazy(() => import("./pages/ComboPADH"));
const Admin = lazy(() => import("./pages/Admin"));
const Prontuario = lazy(() => import("./pages/Prontuario"));
const RecursosClinicos = lazy(() => import("./pages/RecursosClinicos"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Diagnostico = lazy(() => import("./pages/Diagnostico"));
const JornadaHome = lazy(() => import("./pages/JornadaHome"));
const DiagnosticoJornada = lazy(() => import("./pages/DiagnosticoJornada"));
const BibliotecaExercicios = lazy(() => import("./pages/BibliotecaExercicios"));
const SessaoView = lazy(() => import("./pages/SessaoView"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DiagnosticsPage = lazy(() => import("./pages/DiagnosticsPage"));

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
          <Route path="/curso-padh" element={<PageTransition><CursoPCH /></PageTransition>} />
          <Route path="/ferramentas" element={<PageTransition><FerramentasIndex /></PageTransition>} />
          <Route path="/ferramentas/poema-funil" element={<PageTransition><PoemaFunil /></PageTransition>} />
          <Route path="/ferramentas/verso-gatilho" element={<PageTransition><VersoGatilho /></PageTransition>} />
          <Route path="/ferramentas/poemadiagnostico" element={<PageTransition><Poemadiagnostico /></PageTransition>} />
          <Route path="/ferramentas/caderno-voz-interna" element={<PageTransition><CadernoVozInterna /></PageTransition>} />
          <Route path="/ferramentas/encenacao-poetica" element={<PageTransition><EncenacaoPoetica /></PageTransition>} />
          <Route path="/ferramentas/reescrita-poetica" element={<PageTransition><ReescritaPoetica /></PageTransition>} />
          <Route path="/ferramentas/ritual-silencio" element={<PageTransition><RitualSilencio /></PageTransition>} />
          <Route path="/ferramentas/poesia-hipnotica" element={<PageTransition><PoesiaHipnotica /></PageTransition>} />
          <Route path="/venda/poema-funil" element={<PageTransition><VendaPoemaFunil /></PageTransition>} />
          <Route path="/venda/verso-gatilho" element={<PageTransition><VendaVersoGatilho /></PageTransition>} />
          <Route path="/venda/poemadiagnostico" element={<PageTransition><VendaPoemadiagnostico /></PageTransition>} />
          <Route path="/venda/caderno-voz-interna" element={<PageTransition><VendaCadernoVozInterna /></PageTransition>} />
          <Route path="/venda/encenacao-poetica" element={<PageTransition><VendaEncenacaoPoetica /></PageTransition>} />
          <Route path="/venda/reescrita-poetica" element={<PageTransition><VendaReescritaPoetica /></PageTransition>} />
          <Route path="/venda/ritual-silencio" element={<PageTransition><VendaRitualSilencio /></PageTransition>} />
          <Route path="/venda/poesia-hipnotica" element={<PageTransition><VendaPoesiaHipnotica /></PageTransition>} />
          <Route path="/ciencia-da-poesia" element={<PageTransition><CienciaPoesia /></PageTransition>} />
          <Route path="/combo-padh" element={<PageTransition><ComboPADH /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
          <Route path="/prontuario-pch" element={<PageTransition><Prontuario /></PageTransition>} />
          <Route path="/recursos-clinicos" element={<PageTransition><RecursosClinicos /></PageTransition>} />
          <Route path="/jornada" element={<PageTransition><JornadaHome /></PageTransition>} />
          <Route path="/jornada/:phaseId/:sessionId" element={<PageTransition><SessaoView /></PageTransition>} />
          <Route path="/diagnostico-jornada" element={<PageTransition><DiagnosticoJornada /></PageTransition>} />
          <Route path="/biblioteca-exercicios" element={<PageTransition><BibliotecaExercicios /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/diagnostico" element={<PageTransition><Diagnostico /></PageTransition>} />
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
        <PWAPrompt />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
