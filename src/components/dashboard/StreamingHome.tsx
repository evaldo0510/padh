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
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Featured Banner */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10" />
        
        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-3">
                <Sparkles className="w-3 h-3 mr-2" />
                Original P.A.D.H.
              </Badge>
              {nextSession && (
                <span className="text-white/40 text-sm font-medium tracking-wider uppercase">
                  Fase: {nextSession.faseTitulo}
                </span>
              )}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-tight">
              A Jornada de <br />
              <span className="text-primary italic">Transformação</span>
            </h1>
            
            <p className="text-xl text-white/60 leading-relaxed max-w-xl">
              Mergulhe em uma experiência contínua de despertar e expansão. 
              Sua evolução não é um destino, é o caminho que você trilha agora.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {nextSession ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
                  className="h-16 px-10 text-xl font-bold gap-3 rounded-full hover:scale-105 transition-transform"
                >
                  <Play className="w-6 h-6 fill-current" /> Continuar
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => navigate(`/jornada`)}
                  className="h-16 px-10 text-xl font-bold gap-3 rounded-full"
                >
                  <Play className="w-6 h-6 fill-current" /> Recomeçar
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="h-16 px-10 text-xl font-bold gap-3 rounded-full bg-white/5 border-white/10 hover:bg-white/10"
              >
                <Link to="/biblioteca-exercicios">
                  <BookOpen className="w-6 h-6" /> Biblioteca
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
            {JORNADA_DATA.map((fase) => (
              <motion.div 
                key={fase.id}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-72 md:w-80 h-48 relative rounded-xl border border-white/10 overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/jornada`)}
              >
                <div className={`absolute inset-0 opacity-20 bg-${fase.cor}-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Temporada {fase.numero}</span>
                  <h3 className="text-xl font-bold">{fase.titulo}</h3>
                </div>
              </motion.div>
            ))}
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
