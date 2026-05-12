import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useJornada } from '@/hooks/useJornada';
import { JORNADA_DATA } from '@/lib/jornada-data';
import { useProfile } from '@/hooks/useProfile';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Lock,
  CheckCircle2,
  Library,
  ChevronRight,
  Sparkles,
  Info,
  TrendingUp,
  Clock,
  Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PCHObjectiveId } from '@/types/objectives';

const STORAGE_KEY = "pch_user_objectives";

const JornadaHome = () => {
  const navigate = useNavigate();
  const { jornada } = useJornada();
  const { profile, loading: profileLoading, isUpdating } = useProfile();

  const completedSessionsCount = jornada.completedSessions.length;
  const totalSessionsCount = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
  const totalProgress = Math.round((completedSessionsCount / totalSessionsCount) * 100);
  
  const dbObjectives = profile?.objectives || [];
  const localRaw = localStorage.getItem(STORAGE_KEY);
  let localObjectives: PCHObjectiveId[] = [];
  try {
    if (localRaw) localObjectives = JSON.parse(localRaw);
  } catch (e) {}

  const userObjectives = dbObjectives.length > 0 ? dbObjectives : localObjectives;

  const findNextSession = () => {
    // If progress is 0, try to find a session that matches ANY user objective
    if (completedSessionsCount === 0 && userObjectives.length > 0) {
      for (const fase of JORNADA_DATA) {
        for (const sessao of fase.sessoes) {
          if (sessao.objetivos?.some(obj => userObjectives.includes(obj as PCHObjectiveId))) {
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

  if (profileLoading && completedSessionsCount === 0) {
    return (
      <PageLayout seo={{ title: "Carregando Jornada...", description: "", path: "/jornada" }} hideHeader>
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(265_45%_18%/0.6),transparent_60%)]" />
          <div className="relative z-10 flex flex-col items-center gap-6">
             <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
             </div>
             <p className="text-muted-foreground animate-pulse uppercase tracking-[0.3em] text-[10px] font-bold">Sincronizando sua trilha</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      seo={{
        title: 'Jornada de Transformação — PCH',
        description: 'Sua trilha estruturada de desenvolvimento pessoal e exercícios terapêuticos.',
        path: '/jornada',
      }}
      currentPage="Jornada"
      showBackButton={false}
      hideHeader
    >
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        {/* Immersive Cinematic Header */}
        <div className="relative h-[55vh] md:h-[65vh] flex items-center overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent z-10" />
           
           <div className="relative z-20 streaming-container mt-12">
              <AnimatePresence>
                {isUpdating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/5"
                  >
                     <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary animate-pulse">Sintonizando</span>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="max-w-3xl space-y-6 animate-fade-in">
                 <div className="flex items-center gap-3">
                   <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 gap-1.5 rounded-full font-bold uppercase tracking-widest text-[9px]">
                      <Sparkles className="w-3 h-3" /> Original
                   </Badge>
                   <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Jornada de Transformação</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                    Sua trilha de <br /> <span className="text-primary italic">evolução</span>
                 </h1>
                 
                 <p className="text-lg text-white/50 max-w-xl leading-relaxed font-light">
                    Uma experiência estruturada para o despertar da consciência e expansão da sua verdade interior.
                 </p>
                 
                 <div className="flex flex-wrap items-center gap-4 pt-4">
                    {nextSession && (
                      <Button 
                        size="lg" 
                        onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
                        className="btn-primary h-14 px-8 text-lg rounded-full"
                      >
                         <Play className="w-5 h-5 fill-current mr-2" /> 
                         Continuar {nextSession.titulo}
                      </Button>
                    )}
                 </div>

                 <div className="pt-8 space-y-3 max-w-xs">
                    <div className="flex justify-between items-end">
                       <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/80">Conclusão</span>
                       <span className="text-xl font-black text-white">{totalProgress}%</span>
                    </div>
                    <div className="progress-bar-thin">
                       <div className="progress-fill" style={{ width: `${totalProgress}%` }} />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Seasons (Fases) List */}
        <div className="streaming-container py-16 space-y-24">
           {JORNADA_DATA.map((fase, idx) => {
             const prevFase = JORNADA_DATA[idx - 1];
             const isUnlocked = idx === 0 || 
                                prevFase.sessoes.every(s => jornada.completedSessions.includes(s.id)) ||
                                (nextSession && nextSession.faseId === fase.id && (nextSession as any).isRecommended);
             
             return (
               <section key={fase.id} className={`space-y-8 transition-all duration-700 ${!isUnlocked && 'opacity-40 grayscale blur-[1px]'}`}>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Temporada {fase.numero}</span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">{fase.titulo}</h2>
                        <p className="text-white/40 max-w-xl font-light text-base">{fase.descricao}</p>
                     </div>
                     {!isUnlocked && (
                       <div className="flex items-center gap-2 text-white/40 font-bold text-[9px] uppercase tracking-widest bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
                          <Lock className="w-3 h-3" /> Bloqueado
                       </div>
                     )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {fase.sessoes.map((sessao, sIdx) => {
                       const isCompleted = jornada.completedSessions.includes(sessao.id);
                       const isRecommended = !!(userObjectives.length > 0 && sessao.objetivos?.some(o => userObjectives.includes(o as PCHObjectiveId))) && completedSessionsCount === 0;
                       
                       const prevSessionsInFase = fase.sessoes.slice(0, sIdx);
                       const allPrevSessionsDone = prevSessionsInFase.every(s => jornada.completedSessions.includes(s.id));
                       const sessionUnlocked = (isUnlocked && allPrevSessionsDone) || isRecommended;
                       
                       return (
                         <motion.div 
                          key={sessao.id}
                          whileHover={sessionUnlocked ? { y: -5 } : {}}
                          className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-card/40 border border-white/5 shadow-2xl transition-all duration-500 ${!sessionUnlocked && 'cursor-not-allowed'} ${isRecommended ? 'ring-2 ring-primary ring-offset-4 ring-offset-[#050505]' : ''}`}
                          onClick={() => sessionUnlocked && navigate(`/jornada/${fase.id}/${sessao.id}`)}
                         >
                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                               <div className="flex items-center justify-between mb-1">
                                  <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Episódio {sIdx + 1}</span>
                                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                               </div>
                               <h3 className="text-xl font-bold tracking-tight leading-tight mb-1 group-hover:text-primary transition-colors">{sessao.titulo}</h3>
                               <p className="text-[10px] text-white/30 line-clamp-1 font-light italic">{sessao.descricao}</p>
                            </div>

                            {/* Hover Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 ${sessionUnlocked ? 'opacity-80 group-hover:opacity-100' : 'opacity-90'}`} />
                            
                            {!sessionUnlocked && (
                              <div className="absolute inset-0 flex items-center justify-center z-30">
                                 <Lock className="w-8 h-8 text-white/10" />
                              </div>
                            )}

                            {sessionUnlocked && (
                              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                                    <Play className="w-5 h-5 text-white fill-current ml-1" />
                                 </div>
                              </div>
                            )}
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
