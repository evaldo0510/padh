import React from "react";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronRight, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NetflixCarousel from "@/components/ui/NetflixCarousel";
import StreamingCard from "@/components/ui/StreamingCard";
import { StreamingSkeleton } from "./StreamingSkeleton";
import GlobalProgressBar from "./GlobalProgressBar";
import DailyHabitSection from "./DailyHabitSection";
import ProgressPanel from "./ProgressPanel";

const StreamingHome = () => {
  const navigate = useNavigate();
  const { jornada, isSyncing } = useJornada();

  if (isSyncing) return <StreamingSkeleton />;

  const findNextSession = () => {
    for (const fase of JORNADA_DATA) {
      for (const sessao of fase.sessoes) {
        if (!jornada.completedSessions.includes(sessao.id)) {
          return {
            faseId: fase.id,
            sessaoId: sessao.id,
            titulo: sessao.titulo,
            faseTitulo: fase.titulo,
            descricao: sessao.descricao,
          };
        }
      }
    }
    return null;
  };

  const nextSession = findNextSession();

  const getAllSessions = () => {
    const all = [];
    for (const fase of JORNADA_DATA) {
      for (const sessao of fase.sessoes) {
        all.push({ ...sessao, faseId: fase.id, faseTitulo: fase.titulo });
      }
    }
    return all;
  };

  const sessions = getAllSessions();

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
      {/* Featured Hero Banner - Cinematic Level */}
      <section className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden flex items-center">
        {/* Atmosphere with Deep Texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
        
        {/* Dynamic Abstract Vibe */}
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
                Original P.A.D.H.
              </Badge>
              {nextSession && (
                <div className="flex items-center gap-2 text-white/30 text-[9px] font-bold tracking-widest uppercase">
                  <ChevronRight className="w-3.5 h-3.5 text-primary/50" />
                  Fase {nextSession.faseTitulo}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                Próximo <br />
                <span className="text-primary italic">Episódio</span>
              </h1>
              <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-lg font-light italic">
                {nextSession ? `Você está na fase ${nextSession.faseTitulo}. Continue sua evolução com "${nextSession.titulo}".` : "Sua jornada está completa. Continue explorando novas ferramentas."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button 
                onClick={() => {
                  if (nextSession) {
                    navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`);
                  }
                }}
                className="btn-primary h-14 min-w-[260px] text-lg rounded-full"
              >
                <Play className="w-5 h-5 fill-current mr-2" /> {nextSession ? "Continuar Jornada" : "Ver Biblioteca"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="streaming-container -mt-32 relative z-30 space-y-16 md:space-y-24 pb-32">
        {/* Journey Continuity - Highlight current phase progress */}
        <GlobalProgressBar />

        {/* Clinical Evolution Charts */}
        <ProgressPanel />
        {/* Continuar Assistindo Section */}
        {nextSession && (
          <section className="space-y-6 animate-slide-up">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3 text-white">
              <div className="w-1 h-6 bg-primary rounded-full" />
              Continuar Assistindo
            </h2>
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative w-full md:w-[480px] aspect-video rounded-3xl glass-card overflow-hidden cursor-pointer border-white/5"
              onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-white text-[8px] uppercase font-bold tracking-widest px-2 py-0.5">Disponível</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1 tracking-tight">{nextSession.titulo}</h3>
                <p className="text-sm text-white/40 line-clamp-1 font-light italic">
                  "{nextSession.descricao}"
                </p>
                
                <div className="mt-4 progress-bar-thin bg-white/5 h-1">
                   <div className="progress-fill w-[45%] h-full" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 z-30">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-glow">
                  <Play className="w-6 h-6 fill-current ml-1 text-white" />
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Main Journey Seasons - Focused and Clean */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight text-white">Sua Jornada</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Fases de transformação estruturada</p>
            </div>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80" onClick={() => navigate('/jornada')}>
              Ver todas <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JORNADA_DATA.slice(0, 4).map((fase, idx) => {
              const isUnlocked = idx === 0 || JORNADA_DATA[idx-1].sessoes.every(s => jornada.completedSessions.includes(s.id));
              const completed = fase.sessoes.filter(s => jornada.completedSessions.includes(s.id)).length;
              const percent = Math.round((completed / fase.sessoes.length) * 100);
              
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
                      <div className="progress-fill h-full" style={{ width: `${percent}%` }} />
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

        {/* Daily Consciousness Section - Re-organized as a dedicated module */}
        <section id="daily-challenge" className="pt-8">
          <DailyHabitSection />
        </section>

        {/* Quick Exercises Grid - Explore Style */}
        <section className="space-y-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-white">Práticas Rápidas</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Impacto profundo em poucos minutos</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 flex flex-col justify-between h-72 cursor-pointer group border-white/5"
                onClick={() => navigate(`/biblioteca-exercicios`)}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">Insight #{i}</h3>
                  <p className="text-[10px] text-white/30 line-clamp-2 leading-relaxed uppercase tracking-[0.1em] italic font-light">
                    Transformação imediata através da intenção poética.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-primary/60 font-bold uppercase tracking-widest">
                  <Clock className="w-3 h-3" /> 5 Min
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StreamingHome;
