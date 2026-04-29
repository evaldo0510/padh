import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useJornada } from '@/hooks/useJornada';
import { JORNADA_DATA } from '@/lib/jornada-data';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Lock,
  CheckCircle2,
  Library,
  Compass,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JornadaHome = () => {
  const navigate = useNavigate();
  const { jornada } = useJornada();

  const completedSessionsCount = jornada.completedSessions.length;
  const totalSessionsCount = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
  const totalProgress = Math.round((completedSessionsCount / totalSessionsCount) * 100);
  const userObjective = localStorage.getItem("pch_user_objective");

  const findNextSession = () => {
    // If progress is 0, try to find a session that matches user objective
    if (completedSessionsCount === 0 && userObjective) {
      for (const fase of JORNADA_DATA) {
        for (const sessao of fase.sessoes) {
          if (sessao.objetivos?.includes(userObjective)) {
            return {
              faseId: fase.id,
              sessaoId: sessao.id,
              titulo: sessao.titulo,
              faseTitulo: fase.titulo,
              isRecommended: true,
            };
          }
        }
      }
    }

    // Default sequential logic
    for (const fase of JORNADA_DATA) {
      for (const sessao of fase.sessoes) {
        if (!jornada.completedSessions.includes(sessao.id)) {
          return {
            faseId: fase.id,
            sessaoId: sessao.id,
            titulo: sessao.titulo,
            faseTitulo: fase.titulo,
          };
        }
      }
    }
    return null;
  };

  const nextSession = findNextSession();

  return (
    <PageLayout
      seo={{
        title: 'Jornada de Transformação — P.A.D.H.',
        description: 'Sua trilha estruturada de desenvolvimento pessoal e exercícios terapêuticos.',
        path: '/jornada',
      }}
      hideHeader
    >
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        {/* Immersive Header */}
        <div className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent z-10" />
           
           <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-primary/10 animate-pulse" />
           </div>

           <div className="relative z-20 container mx-auto px-6 md:px-12 mt-20">
              <div className="max-w-3xl space-y-6">
                 <Badge variant="spiritual" className="spiritual-chip-amber px-3 py-1 gap-2">
                    <Sparkles className="w-3 h-3" /> Série Original
                 </Badge>
                 <h1 className="text-5xl md:text-8xl font-heading font-black tracking-tighter leading-none">
                    A Jornada de <br /> <span className="text-primary italic">Transformação</span>
                 </h1>
                 <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
                    Uma trilha estruturada em 4 fases para o despertar da consciência, o encontro com a sombra e a expansão da sua verdade interior.
                 </p>
                 
                 <div className="flex items-center gap-4 pt-4">
                    {nextSession && (
                      <Button 
                        size="lg" 
                        onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
                        className="h-14 px-10 text-lg font-bold gap-3 rounded-full"
                      >
                         <Play className="w-6 h-6 fill-current" /> 
                         {(nextSession as any).isRecommended ? `Sugerido: ${nextSession.titulo}` : `Continuar: ${nextSession.titulo}`}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="h-14 px-10 text-lg font-bold gap-3 rounded-full bg-white/5 backdrop-blur-md border-white/20"
                    >
                       <Info className="w-6 h-6" /> Detalhes da Série
                    </Button>
                 </div>

                 <div className="pt-8 space-y-3 max-w-xs">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary/80">
                       <span>Seu Progresso</span>
                       <span>{totalProgress}% concluído</span>
                    </div>
                    <Progress value={totalProgress} className="h-1.5" />
                 </div>
              </div>
           </div>
        </div>

        {/* Seasons (Fases) List */}
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-24">
           {JORNADA_DATA.map((fase, idx) => {
             const prevFase = JORNADA_DATA[idx - 1];
             const isUnlocked = idx === 0 || 
                                prevFase.sessoes.every(s => jornada.completedSessions.includes(s.id)) ||
                                (nextSession && nextSession.faseId === fase.id && (nextSession as any).isRecommended);
             
             return (
               <section key={fase.id} className={`space-y-8 ${!isUnlocked && 'opacity-40 grayscale'}`}>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
                     <div>
                        <h2 className="text-3xl font-heading font-black tracking-tight">Fase {fase.numero}: {fase.titulo}</h2>
                        <p className="text-white/60 mt-2 max-w-2xl">{fase.descricao}</p>
                     </div>
                     {!isUnlocked && (
                       <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                          <Lock className="w-4 h-4" /> Temporada Bloqueada
                       </div>
                     )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {fase.sessoes.map((sessao, sIdx) => {
                       const isCompleted = jornada.completedSessions.includes(sessao.id);
                       const isRecommended = !!(sessao.objetivos?.includes(userObjective || "")) && completedSessionsCount === 0;
                       const sessionUnlocked = isUnlocked || isRecommended;
                       
                       return (
                         <motion.div 
                          key={sessao.id}
                          whileHover={sessionUnlocked ? { y: -8 } : {}}
                          className={`group relative aspect-video bg-white/5 rounded-2xl border border-white/10 overflow-hidden cursor-pointer ${!sessionUnlocked && 'cursor-not-allowed'} ${isRecommended ? 'ring-2 ring-primary border-primary' : ''}`}
                          onClick={() => sessionUnlocked && navigate(`/jornada/${fase.id}/${sessao.id}`)}
                         >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            
                            <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2">
                               <div className="flex items-center justify-between">
                                  <div className="flex gap-2">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Episódio {sIdx + 1}</span>
                                    {isRecommended && <Badge className="bg-primary text-primary-foreground text-[8px] h-4">Sugerido</Badge>}
                                  </div>
                                  {isCompleted && <CheckCircle2 className="w-5 h-5 text-primary" />}
                               </div>
                               <h3 className="text-xl font-bold">{sessao.titulo}</h3>
                               <p className="text-sm text-white/40 line-clamp-1">{sessao.descricao}</p>
                               
                               <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" className="rounded-full gap-2">
                                     <Play className="w-3 h-3 fill-current" /> Assistir
                                  </Button>
                               </div>
                            </div>

                            {/* Hover Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                               <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
                                  <Play className="w-8 h-8 fill-current ml-1" />
                               </div>
                            </div>
                         </motion.div>
                       );
                     })}
                  </div>
               </section>
             );
           })}
        </div>

        {/* Footer Navigation */}
        <footer className="container mx-auto px-6 md:px-12 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
              <Button asChild variant="outline" className="rounded-full gap-2 border-white/10 text-white/60 hover:text-white">
                <Link to="/dashboard"><ChevronRight className="w-4 h-4 rotate-180" /> Voltar ao Início</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full gap-2 border-white/10 text-white/60 hover:text-white">
                <Link to="/biblioteca-exercicios"><Library className="w-4 h-4" /> Ver Biblioteca</Link>
              </Button>
           </div>
           <p className="text-white/20 text-xs font-bold uppercase tracking-[0.4em]">Original P.A.D.H. Content</p>
        </footer>
      </div>
    </PageLayout>
  );
};

export default JornadaHome;
