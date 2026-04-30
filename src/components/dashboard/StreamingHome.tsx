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
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
        {/* Atmosphere with Deep Texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
        
        {/* Dynamic Abstract Vibe */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-accent-warm/10 rounded-full blur-[120px]" />
          <div className="w-full h-full flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
             <div className="text-[30vw] font-black tracking-tighter italic">PADH</div>
          </div>
        </div>

        <div className="relative z-20 streaming-container pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-10"
          >
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 py-2 px-5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-lg shadow-primary/10">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Original PADH
              </Badge>
              {nextSession && (
                <div className="flex items-center gap-3 text-white/50 text-[10px] font-black tracking-[0.3em] uppercase">
                  <ChevronRight className="w-4 h-4 text-primary" />
                  Temporada {nextSession.faseTitulo}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-white">
                Seu dia de <br />
                <span className="text-primary italic animate-pulse">Consciência</span>
              </h1>
              <p className="text-xl md:text-3xl text-white/70 leading-relaxed max-w-xl font-light italic opacity-80">
                Uma pequena prática para ancorar sua presença <br />
                e transformar seu estado emocional hoje.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Button 
                onClick={() => {
                  const element = document.getElementById('daily-challenge');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary h-16 min-w-[320px] text-xl gap-4 shadow-2xl shadow-primary/20"
              >
                <Play className="w-7 h-7 fill-current" /> Começar Prática do Dia
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="streaming-container -mt-48 relative z-30 space-y-20 md:space-y-32 pb-32">
        {/* Daily Consciousness Section */}
        <div id="daily-challenge">
          <DailyHabitSection />
        </div>

        {/* Global Journey Progress */}
        <GlobalProgressBar />
        {/* Continuar Assistindo Section */}
        {nextSession && (
          <section className="space-y-8 animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-4 text-white">
              <div className="w-1.5 h-8 bg-primary rounded-full shadow-glow" />
              Continuar Assistindo
            </h2>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative w-full md:w-[540px] aspect-video glass-card overflow-hidden cursor-pointer shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border-white/5"
              onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-primary text-white text-[9px] uppercase font-black tracking-widest py-0.5 h-5 px-3">Recente</Badge>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">EPISÓDIO DISPONÍVEL</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 tracking-tighter">{nextSession.titulo}</h3>
                <p className="text-base text-white/50 line-clamp-2 font-light leading-relaxed max-w-sm italic">
                  "{nextSession.descricao}"
                </p>
                
                <div className="mt-6 progress-bar-thin bg-white/5 h-1">
                   <div className="progress-fill w-[45%] h-full shadow-glow" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-background/40 z-30 backdrop-blur-md">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 border-2 border-white/10">
                  <Play className="w-10 h-10 fill-current ml-1.5 text-white" />
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Categories (Fases) Carousel */}
        <NetflixCarousel 
          title="Temporadas Originais" 
          subtitle="Explore as 4 fases estruturadas da sua transformação interior."
        >
          {JORNADA_DATA.map((fase) => {
            const colorMap: Record<string, string> = {
              amber: "bg-accent-warm",
              indigo: "bg-indigo-500",
              emerald: "bg-emerald-500",
              rose: "bg-rose-500",
            };
            const bgColorClass = colorMap[fase.cor] || "bg-primary";
            
            return (
              <StreamingCard 
                key={fase.id}
                title={fase.titulo}
                subtitle={`Temporada ${fase.numero}`}
                image="" // Placeholder will trigger
                onClick={() => navigate(`/jornada`)}
                className="w-[320px] md:w-[420px] h-64"
              />
            );
          })}
        </NetflixCarousel>

        {/* Sessões Carousel */}
        <NetflixCarousel 
          title="Experiências Rápidas" 
          subtitle="Sessões baseadas no seu perfil e progresso atual."
        >
          {sessions.map((sessao, index) => {
            const isCompleted = jornada.completedSessions.includes(sessao.id);
            const isLocked = index > 0 && !jornada.completedSessions.includes(sessions[index - 1].id);
            
            return (
              <StreamingCard 
                key={sessao.id}
                title={sessao.titulo}
                subtitle={sessao.faseTitulo}
                isCompleted={isCompleted}
                isLocked={isLocked}
                onClick={() => navigate(`/jornada/${sessao.faseId}/${sessao.id}`)}
                type="episode"
              />
            );
          })}
        </NetflixCarousel>

        {/* Quick Exercises Grid - Explore Style */}
        <section className="space-y-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold tracking-tighter text-white">Práticas Rápidas</h2>
            <p className="text-white/40 font-light text-lg tracking-wide uppercase text-[10px] font-black tracking-[0.4em]">Impacto profundo em 5 minutos.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-10 flex flex-col justify-between h-80 cursor-pointer group hover:border-primary/40 shadow-glow shadow-primary/0 hover:shadow-primary/5 transition-all duration-500"
                onClick={() => navigate(`/biblioteca-exercicios`)}
              >
                <div className="w-14 h-14 rounded-[2rem] bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:rotate-12 transition-all duration-700 shadow-inner">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-2xl tracking-tighter leading-tight group-hover:text-primary transition-colors">Insight #{i}</h3>
                  <p className="text-[11px] text-white/30 line-clamp-3 leading-relaxed uppercase tracking-[0.2em] font-medium italic">
                    Recalibração imediata através da intenção poética.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-primary font-black uppercase tracking-[0.3em]">
                  <Clock className="w-4 h-4" /> 5 Minutos
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
