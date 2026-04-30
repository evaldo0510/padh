import React, { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useParams, useNavigate } from "react-router-dom";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { useJornada } from "@/hooks/useJornada";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  FastForward,
  Loader2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SessaoView = () => {
  const { phaseId, sessionId } = useParams();
  const navigate = useNavigate();
  const { saveResponse, completeSession, getResponse, jornada } = useJornada();
  
  const fase = JORNADA_DATA.find((f) => f.id === phaseId);
  const sessao = fase?.sessoes.find((s) => s.id === sessionId);
  
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [response, setResponse] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingType, setLoadingType] = useState<"next" | "prev" | "skip" | "finish">("next");
  
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sessao) {
      const currentBlock = sessao.blocos[currentExIdx];
      if (currentBlock.tipo === "exercise") {
        const saved = getResponse(currentBlock.id);
        setResponse(saved || "");
      }
    }
    
    // Clear any existing transition if we change episode
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      setIsTransitioning(false);
    }
  }, [currentExIdx, sessao, getResponse]);

  // Lock logic
  const isLocked = () => {
    if (!sessao || !fase) return true;
    // Find all sessions before this one
    const allSessions: any[] = [];
    JORNADA_DATA.forEach(f => f.sessoes.forEach(s => allSessions.push(s)));
    const currentIndex = allSessions.findIndex(s => s.id === sessionId);
    if (currentIndex > 0) {
      return !jornada.completedSessions.includes(allSessions[currentIndex - 1].id);
    }
    return false;
  };

  if (!sessao || !fase) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="text-center space-y-4 animate-fade-in">
          <p className="text-muted-foreground font-light text-lg">Episódio não disponível no momento.</p>
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="rounded-full px-8">Voltar ao Início</Button>
       </div>
    </div>
  );

  if (isLocked()) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="text-center space-y-6 animate-fade-in px-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Episódio Bloqueado</h2>
            <p className="text-muted-foreground font-light max-w-xs mx-auto">Você precisa concluir os episódios anteriores para liberar esta vivência.</p>
          </div>
          <Button variant="default" onClick={() => navigate("/dashboard")} className="btn-primary px-8">Voltar ao Dashboard</Button>
       </div>
    </div>
  );

  const currentBlock = sessao.blocos[currentExIdx];
  const totalSteps = sessao.blocos.length;
  const progressPercent = ((currentExIdx + 1) / totalSteps) * 100;
  const isLast = currentExIdx === totalSteps - 1;

  const startTransition = async (type: "next" | "prev" | "skip" | "finish", action: () => void) => {
    // Cancel any previous transition
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    setLoadingType(type);
    setIsTransitioning(true);
    
    transitionTimeoutRef.current = setTimeout(() => {
      action();
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 800);
  };

  // Encontra a próxima sessão (em qualquer fase) para encadear automaticamente
  const findNextSession = () => {
    const all: { phaseId: string; sessionId: string }[] = [];
    JORNADA_DATA.forEach((f) =>
      f.sessoes.forEach((s) => all.push({ phaseId: f.id, sessionId: s.id })),
    );
    const idx = all.findIndex((s) => s.sessionId === sessionId);
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  };

  const goToNextSessionOrDashboard = () => {
    const next = findNextSession();
    if (next) {
      navigate(`/jornada/${next.phaseId}/${next.sessionId}`);
    } else {
      navigate("/dashboard");
    }
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    if (currentBlock.tipo === "exercise") {
      saveResponse(currentBlock.id, response);
    }
    
    startTransition(isLast ? "finish" : "next", () => {
      if (isLast) {
        completeSession(sessao.id);
        goToNextSessionOrDashboard();
      } else {
        setCurrentExIdx(prev => prev + 1);
      }
    });
  };

  const handlePrev = () => {
    if (currentExIdx > 0 && !isTransitioning) {
      startTransition("prev", () => {
        setCurrentExIdx(prev => prev - 1);
      });
    }
  };

  const handleSkip = () => {
    if (!isTransitioning) {
      setResponse("Insight processado em silêncio...");
      startTransition("skip", () => {
        if (isLast) {
          completeSession(sessao.id);
          goToNextSessionOrDashboard();
        } else {
          setCurrentExIdx(prev => prev + 1);
        }
      });
    }
  };

  const getLoadingMessage = () => {
    switch (loadingType) {
      case "next": return "Preparando próximo passo...";
      case "prev": return "Retornando...";
      case "skip": return "Avançando vivência...";
      case "finish":
        return findNextSession()
          ? "Próximo episódio em instantes..."
          : "Concluindo sua jornada...";
      default: return "Processando Insight...";
    }
  };

  return (
    <PageLayout
      seo={{
        title: `${sessao.titulo} — PCH Player`,
        description: sessao.descricao,
        path: `/jornada/${phaseId}/${sessionId}`,
      }}
      hideHeader
      hideFooter
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        {/* Cinematic Loader Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
            >
               <div className="relative">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
               </div>
               <p className="text-sm font-black uppercase tracking-[0.4em] text-primary animate-pulse">
                {getLoadingMessage()}
               </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-50 bg-white/5">
           <motion.div 
            className="h-full bg-primary shadow-glow shadow-primary/40"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
           />
        </div>

        {/* Minimal Header */}
        <header className="px-8 py-8 flex justify-between items-center z-40">
           <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/dashboard")}
                className="rounded-2xl h-12 w-12 hover:bg-white/5 transition-all text-white/30 hover:text-white"
                aria-label="Voltar para o Dashboard"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div className="hidden md:block">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-1">
                    {fase.titulo} · ATIVIDADE {currentExIdx + 1}
                 </p>
                 <h2 className="text-2xl font-bold tracking-tighter text-white leading-none">{sessao.titulo}</h2>
              </div>
           </div>

           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl h-12 w-12 hover:bg-destructive/10 text-white/20 hover:text-destructive transition-all"
            aria-label="Fechar player"
           >
              <X className="w-6 h-6" />
           </Button>
        </header>

        {/* Central Workspace */}
        <main className="flex-1 streaming-container flex flex-col justify-center items-center pb-32 relative z-20">
            <AnimatePresence mode="wait">
              {!isTransitioning && (
                <motion.div
                  key={currentBlock.id}
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -15 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-3xl space-y-12"
                >
                   <div className="space-y-8 text-center">
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/5">
                         <Sparkles className="w-3.5 h-3.5 mr-2" /> Passo {currentExIdx + 1} de {totalSteps}
                      </Badge>
                      
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white">
                           {currentBlock.titulo}
                        </h1>
                        <p className="text-xl md:text-3xl text-white/50 font-light italic max-w-2xl mx-auto leading-relaxed">
                           "{currentBlock.conteudo}"
                        </p>
                        {currentBlock.instrucao && (
                          <p className="text-lg text-primary/70 font-medium">
                             {currentBlock.instrucao}
                          </p>
                        )}
                      </div>
                   </div>

                   {currentBlock.tipo === "exercise" && (
                     <div className="relative group w-full">
                        <textarea
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder={currentBlock.placeholder || "Suas palavras aqui..."}
                          className="focus-input shadow-2xl group-focus-within:border-primary/30 group-focus-within:bg-card/60 transition-all duration-700"
                          autoFocus
                        />
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 pointer-events-none">
                           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-primary/30">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-glow" />
                              Estado de Escrita Ativo
                           </div>
                        </div>
                     </div>
                   )}
                </motion.div>
              )}
            </AnimatePresence>
        </main>

        {/* Bottom Navigation Player Style */}
        <footer className="px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-10 z-40 bg-background/90 backdrop-blur-2xl border-t border-white/5">
            <div className="flex items-center gap-10">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentExIdx === 0 || isTransitioning}
                className="text-white/40 hover:text-white transition-all rounded-xl font-bold uppercase tracking-[0.2em] text-[10px]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
              </Button>
              <div className="flex gap-2">
                 {Array.from({ length: totalSteps }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-12 rounded-full transition-all duration-700 ${i === currentExIdx ? 'bg-primary shadow-glow shadow-primary/40' : i < currentExIdx ? 'bg-primary/30' : 'bg-white/5'}`} 
                    />
                 ))}
              </div>
           </div>

           <div className="flex items-center gap-8">
              <Button
                variant="ghost"
                onClick={handleSkip}
                disabled={isTransitioning}
                className="text-white/20 hover:text-white/60 transition-all text-[10px] uppercase font-black tracking-[0.3em]"
              >
                 <FastForward className="w-4 h-4 mr-2" /> Pular
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!response.trim() || isTransitioning}
                className="btn-primary h-16 min-w-[280px] text-xl shadow-2xl group shadow-primary/20"
              >
                {isLast ? "Concluir Vivência" : "Próximo Passo"}
                {isLast ? (
                  <CheckCircle2 className="w-7 h-7 ml-4 text-white" />
                ) : (
                  <ChevronRight className="w-7 h-7 ml-4 group-hover:translate-x-2 transition-transform duration-500" />
                )}
              </Button>
           </div>
        </footer>

        {/* Atmosphere */}
        <div className="absolute -bottom-20 -right-20 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03)_0%,transparent_100%)] pointer-events-none" />
      </div>
    </PageLayout>
  );
};

export default SessaoView;
