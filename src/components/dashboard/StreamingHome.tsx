import React from "react";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronRight, Sparkles, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { StreamingSkeleton } from "./StreamingSkeleton";
import GlobalProgressBar from "./GlobalProgressBar";

const StreamingHome = () => {
  const navigate = useNavigate();
  const { jornada, isSyncing, nextSession } = useJornada();

  if (isSyncing) return <StreamingSkeleton />;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
      {/* 1. SEÇÃO PRÓXIMO (Hero) */}
      <section className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
        
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="w-full h-full flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
             <div className="text-[20vw] font-black tracking-tighter">P.A.D.H.</div>
          </div>
        </div>

        <div className="relative z-20 streaming-container pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/20 text-primary border-primary/30 py-1.5 px-4 rounded-full text-[9px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Próximo Passo
              </Badge>
              {nextSession && (
                <div className="flex items-center gap-2 text-white/30 text-[9px] font-bold tracking-widest uppercase">
                  <ChevronRight className="w-3.5 h-3.5 text-primary/50" />
                  {nextSession.faseTitulo}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                {nextSession ? "Continuar" : "Jornada"} <br />
                <span className="text-primary italic">{nextSession ? "Evolução" : "Concluída"}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-lg font-light italic">
                {nextSession 
                  ? `Sua próxima vivência: "${nextSession.titulo}". Mantenha o fluxo e continue expandindo sua consciência.`
                  : "Você completou todas as fases atuais. Revise seus insights ou explore novas ferramentas na sua área."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button 
                onClick={() => {
                  if (nextSession) {
                    navigate(`/jornada/${nextSession.phaseId}/${nextSession.sessionId}`);
                  } else {
                    navigate('/jornada');
                  }
                }}
                className="btn-primary h-14 min-w-[260px] text-lg rounded-full"
              >
                <Play className="w-5 h-5 fill-current mr-2" /> {nextSession ? "Iniciar Agora" : "Ver Jornada"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="streaming-container -mt-32 relative z-30 space-y-16 md:space-y-24 pb-32">
        {/* 2. SEÇÃO PROGRESSO */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-white px-2">Seu Progresso</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 px-2">Visão geral da sua trilha de transformação</p>
          </div>
          <GlobalProgressBar />
        </section>

        {/* 3. SEÇÃO FASES (Jornada) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight text-white">Fases da Jornada</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Explore as etapas estruturadas</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80" onClick={() => navigate('/jornada')}>
              Ver todas <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JORNADA_DATA.map((fase, idx) => {
              const prevFase = JORNADA_DATA[idx - 1];
              const isUnlocked = idx === 0 || prevFase.sessoes.every(s => jornada.completedSessions.includes(s.id));
              const completedCount = fase.sessoes.filter(s => jornada.completedSessions.includes(s.id)).length;
              const percent = Math.round((completedCount / fase.sessoes.length) * 100);
              
              return (
                <motion.div
                  key={fase.id}
                  whileHover={isUnlocked ? { y: -5 } : {}}
                  className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-card/40 border border-white/5 transition-all duration-500 ${!isUnlocked && 'opacity-40 grayscale blur-[1px]'}`}
                  onClick={() => isUnlocked && navigate(`/jornada`)}
                >
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                    <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Temporada {fase.numero}</span>
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{fase.titulo}</h3>
                    <div className="mt-3 progress-bar-thin bg-white/5 h-1">
                      <div className="progress-fill h-full shadow-glow" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <Lock className="w-6 h-6 text-white/20" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StreamingHome;