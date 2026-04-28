import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useParams, useNavigate } from "react-router-dom";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { useJornada } from "@/hooks/useJornada";
import { Button } from "@/components/ui/button";
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
      <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
        {/* Progress Bar (Netflix style top) */}
        <div className="absolute top-0 left-0 right-0 h-1 z-50 bg-white/5">
           <motion.div 
            className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
           />
        </div>

        {/* Top Controls */}
        <header className="p-6 flex justify-between items-center z-40">
           <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/dashboard")}
                className="rounded-full hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="hidden md:block">
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    {fase.titulo} — Episódio {sessao.id.split('-')[0].replace('s', '')}
                 </p>
                 <h2 className="text-lg font-bold">{sessao.titulo}</h2>
              </div>
           </div>

           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/dashboard")}
            className="rounded-full hover:bg-white/10 transition-colors"
           >
              <X className="w-6 h-6" />
           </Button>
        </header>

        {/* Main Content (Episode Screen) */}
        <main className="flex-1 container mx-auto px-6 max-w-4xl flex flex-col justify-center pb-20">
           <AnimatePresence mode="wait">
              <motion.div
                key={currentEx.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                 <div className="space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                       <Sparkles className="w-3 h-3" /> Exercício {currentExIdx + 1} de {totalEx}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-black leading-tight tracking-tighter">
                       {currentEx.titulo}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 font-medium italic max-w-2xl leading-relaxed">
                       "{currentEx.instrucao}"
                    </p>
                 </div>

                 <div className="relative group">
                    <Textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder={currentEx.placeholder || "Escreva sua resposta poética aqui..."}
                      className="min-h-[250px] md:min-h-[300px] bg-white/5 border-white/10 focus-visible:ring-primary/40 focus-visible:border-primary/40 text-xl leading-relaxed rounded-2xl resize-none p-8 shadow-2xl transition-all group-focus-within:bg-white/[0.08]"
                    />
                    <div className="absolute bottom-4 right-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                       Modo Foco Ativado
                    </div>
                 </div>
              </motion.div>
           </AnimatePresence>
        </main>

        {/* Bottom Controls (Player Bar) */}
        <footer className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 z-40 bg-gradient-to-t from-black to-transparent">
           <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentExIdx === 0}
                className="text-white/40 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" /> Anterior
              </Button>
              <div className="flex gap-1">
                 {Array.from({ length: totalEx }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 w-8 rounded-full transition-all duration-300 ${i === currentExIdx ? 'bg-primary' : i < currentExIdx ? 'bg-white/40' : 'bg-white/10'}`} 
                    />
                 ))}
              </div>
           </div>

           <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setResponse("Pular exercício...")}
                className="text-white/20 hover:text-white/60 transition-colors text-xs uppercase font-bold tracking-widest"
              >
                 <FastForward className="w-4 h-4 mr-2" /> Pular
              </Button>
              <Button
                onClick={handleNext}
                disabled={!response.trim()}
                className="h-14 px-10 rounded-full text-lg font-bold shadow-2xl group"
              >
                {isLast ? "Concluir e Finalizar" : "Concluir e Próximo"}
                {isLast ? (
                  <CheckCircle2 className="w-6 h-6 ml-3" />
                ) : (
                  <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
           </div>
        </footer>

        {/* Ambient Effects */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </PageLayout>
  );
};

export default SessaoView;
