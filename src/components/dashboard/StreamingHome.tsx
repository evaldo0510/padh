import React from "react";
import { useJornada } from "@/hooks/useJornada";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronRight, Clock, Star, Sparkles, BookOpen } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const StreamingHome = () => {
  const navigate = useNavigate();
  const { jornada } = useJornada();

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
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Featured Hero Banner - Modern, Full Width */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
        
        {/* Ambient Bloom Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-20 streaming-container pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-8"
          >
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 py-1.5 px-4 rounded-full text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Original PCH
              </Badge>
              {nextSession && (
                <div className="flex items-center gap-2 text-white/50 text-xs font-bold tracking-[0.2em] uppercase">
                  <ChevronRight className="w-4 h-4 text-primary" />
                  Temporada {nextSession.faseTitulo}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-white">
                Continue sua <br />
                <span className="text-primary animate-pulse">jornada</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/70 leading-relaxed max-w-xl font-light">
                Você começou algo importante. Siga o fluxo da sua transformação interior.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {nextSession ? (
                <Button 
                  onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
                  className="btn-primary h-16 min-w-[240px] text-lg"
                >
                  <Play className="w-6 h-6 fill-current" /> Continuar Assistindo
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate(`/jornada`)}
                  className="btn-primary h-16 min-w-[240px] text-lg"
                >
                  <Play className="w-6 h-6 fill-current" /> Recomeçar Série
                </Button>
              )}
              
              <Button 
                variant="outline" 
                asChild
                className="btn-secondary h-16 min-w-[200px] text-lg"
              >
                <Link to="/biblioteca-exercicios">
                  <BookOpen className="w-6 h-6" /> Explorar Extras
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-32 relative z-30 space-y-16">
        {/* Continuar Assistindo Section */}
        {nextSession && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Continuar de onde parei
            </h2>
            <div className="group relative w-full md:w-[400px] aspect-video bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
                 onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Próximo Episódio</span>
                <h3 className="text-xl font-bold">{nextSession.titulo}</h3>
                <p className="text-sm text-white/40 line-clamp-1">{nextSession.descricao}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Jornadas (Fases) Carousel */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">As 4 Fases da Jornada</h2>
            <Link to="/jornada" className="text-primary text-sm font-bold flex items-center hover:underline">
              Ver Todas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {JORNADA_DATA.map((fase) => {
              const colorMap: Record<string, string> = {
                amber: "bg-amber-500",
                indigo: "bg-indigo-500",
                emerald: "bg-emerald-500",
                rose: "bg-rose-500",
              };
              const bgColorClass = colorMap[fase.cor] || "bg-primary";
              
              return (
                <motion.div 
                  key={fase.id}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 w-72 md:w-80 h-48 relative rounded-xl border border-white/10 overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/jornada`)}
                >
                  <div className={`absolute inset-0 opacity-20 ${bgColorClass}`} />

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Temporada {fase.numero}</span>
                  <h3 className="text-xl font-bold">{fase.titulo}</h3>
                </div>
                </motion.div>
              );
            })}

          </div>
        </section>

        {/* Sessões Carousel */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Sessões Recomendadas</h2>
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {sessions.map((sessao) => (
              <motion.div 
                key={sessao.id}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-64 aspect-video bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/jornada/${sessao.faseId}/${sessao.id}`)}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-lg font-bold line-clamp-1">{sessao.titulo}</h3>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{sessao.faseTitulo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Exercises Carousel */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Exercícios Rápidos</h2>
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-48 h-64 bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col justify-between hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/biblioteca-exercicios`)}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Desafio {i}</h3>
                  <p className="text-xs text-white/40 line-clamp-3">
                    Um mergulho rápido na sua consciência através da poesia aplicada.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-primary font-bold uppercase">
                  <Clock className="w-3 h-3" /> 5 min
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StreamingHome;
