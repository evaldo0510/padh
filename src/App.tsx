import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LivroCurso from "./pages/LivroCurso";
import Formacao from "./pages/Formacao";
import MapaCerebral from "./pages/MapaCerebral";
import AulaExclusiva from "./pages/AulaExclusiva";
import Contato from "./pages/Contato";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/livro-curso" element={<LivroCurso />} />
          <Route path="/formacao" element={<Formacao />} />
          <Route path="/mapa-cerebral" element={<MapaCerebral />} />
          <Route path="/aula-exclusiva" element={<AulaExclusiva />} />
          <Route path="/contato" element={<Contato />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
