import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useParams, useNavigate } from "react-router-dom";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { useJornada } from "@/hooks/useJornada";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  FastForward,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const SessaoView = () => {
  const { phaseId, sessionId } = useParams();
  const navigate = useNavigate();
  const { jornada, saveResponse, completeSession, getResponse } = useJornada();
  
  const fase = JORNADA_DATA.find((f) => f.id === phaseId);
  const sessao = fase?.sessoes.find((s) => s.id === sessionId);
  
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (sessao) {
      const saved = getResponse(sessao.exercicios[currentExIdx].id);
      setResponse(saved || "");
    }
  }, [currentExIdx, sessao]);

  if (!sessao || !fase) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="text-center space-y-4">
          <p className="text-muted-foreground">Sessão não encontrada</p>
          <Button onClick={() => navigate("/dashboard")}>Voltar ao Início</Button>
       </div>
    </div>
  );

  const currentEx = sessao.exercicios[currentExIdx];
  const totalEx = sessao.exercicios.length;
  const progressPercent = ((currentExIdx + 1) / totalEx) * 100;
  const isLast = currentExIdx === totalEx - 1;

  const handleNext = () => {
    saveResponse(currentEx.id, response);
    if (isLast) {
      completeSession(sessao.id);
      navigate("/dashboard");
    } else {
      setCurrentExIdx(currentExIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentExIdx > 0) {
      setCurrentExIdx(currentExIdx - 1);
    }
  };

  return (
    <PageLayout
      seo={{
        title: `${sessao.titulo} — P.A.D.H. Streaming`,
        description: sessao.descricao,
        path: `/jornada/${phaseId}/${sessionId}`,
      }}
      hideHeader
      hideFooter
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        {/* Cinematic Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-50 bg-white/5">
           <motion.div 
            className="h-full bg-primary shadow-glow shadow-primary/40"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "circOut" }}
           />
        </div>

        {/* Minimal Player Navigation */}
        <header className="px-8 py-6 flex justify-between items-center z-40">
           <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/dashboard")}
                className="rounded-2xl hover:bg-white/5 transition-all text-white/40 hover:text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="h-8 w-px bg-white/10 hidden md:block" />
              <div className="hidden md:block">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 mb-0.5">
                    {fase.titulo} · EPISÓDIO {currentExIdx + 1}
                 </p>
                 <h2 className="text-xl font-bold tracking-tight text-white leading-none">{sessao.titulo}</h2>
              </div>
           </div>

           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl hover:bg-destructive/10 text-white/30 hover:text-destructive transition-all"
           >
              <X className="w-6 h-6" />
           </Button>
        </header>

        {/* Focused Therapeutic Space */}
        <main className="flex-1 streaming-container flex flex-col justify-center items-center pb-24 relative z-20">
           <AnimatePresence mode="wait">
              <motion.div
                key={currentEx.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-3xl space-y-12"
              >
                 <div className="space-y-8 text-center">
                    <Badge variant="spiritual" className="bg-primary/10 text-primary border-primary/20 px-5 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] animate-fade-in">
                       <Sparkles className="w-3.5 h-3.5 mr-2" /> Atividade {currentExIdx + 1} de {totalEx}
                    </Badge>
                    
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-white">
                         {currentEx.titulo}
                      </h1>
                      <p className="text-xl md:text-2xl text-white/50 font-light italic max-w-2xl mx-auto leading-relaxed">
                         "{currentEx.instrucao}"
                      </p>
                    </div>
                 </div>

                 <div className="relative group w-full">
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder={currentEx.placeholder || "Mergulhe na palavra..."}
                      className="focus-input shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] group-focus-within:shadow-primary/5 group-focus-within:border-primary/20 group-hover:border-white/10"
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 pointer-events-none">
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">
                          <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                          Ambiente de Foco Ativo
                       </div>
                    </div>
                 </div>
              </motion.div>
           </AnimatePresence>
        </main>

        {/* Player Controller Bar */}
        <footer className="px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8 z-40 bg-background/80 backdrop-blur-xl border-t border-white/5">
           <div className="flex items-center gap-8">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentExIdx === 0}
                className="text-white/40 hover:text-white transition-all rounded-xl font-bold uppercase tracking-widest text-[10px]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
              <div className="flex gap-1.5">
                 {Array.from({ length: totalEx }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      className={`h-1 w-10 rounded-full transition-all duration-500 ${i === currentExIdx ? 'bg-primary shadow-glow shadow-primary/20' : i < currentExIdx ? 'bg-primary/40' : 'bg-white/10'}`} 
                      layoutId={`indicator-${i}`}
                    />
                 ))}
              </div>
           </div>

           <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={() => setResponse("Pular exercício...")}
                className="text-white/20 hover:text-white/60 transition-all text-[10px] uppercase font-black tracking-[0.2em]"
              >
                 <FastForward className="w-3.5 h-3.5 mr-2" /> Pular
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!response.trim()}
                className="btn-primary h-14 min-w-[240px] text-lg shadow-primary/20"
              >
                {isLast ? "Concluir e Salvar" : "Concluir e Avançar"}
                {isLast ? (
                  <CheckCircle2 className="w-6 h-6 ml-3 text-white" />
                ) : (
                  <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
           </div>
        </footer>

        {/* Dynamic Bloom background */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </PageLayout>
  );
};

export default SessaoView;
