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
      hideHeader
    >
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        {/* Immersive Cinematic Header */}
        <div className="relative h-[65vh] md:h-[75vh] flex items-center overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
           
           {/* Dynamic Atmosphere */}
           <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,hsl(var(--primary)/0.15)_0%,transparent_70%)] animate-pulse" />
           </div>

           <div className="relative z-20 streaming-container mt-20">
              {/* Transition Overlay for Recommended Section */}
              <AnimatePresence>
                {isUpdating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-background/60 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/10"
                  >
                     <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                          <Loader2 className="w-12 h-12 text-primary animate-spin" />
                          <Sparkles className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary animate-pulse">Sintonizando Frequência</span>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="max-w-4xl space-y-8 animate-fade-in">
                 <div className="flex items-center gap-4">
                   <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1.5 gap-2 rounded-full font-bold uppercase tracking-widest text-[10px]">
                      <Sparkles className="w-3 h-3" /> Série Especial
                   </Badge>
                   <div className="h-px w-12 bg-white/10" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">PCH Originals</span>
                 </div>
                 
                 <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.8] text-white">
                    Jornada de <br /> <span className="text-primary italic">Transformação</span>
                 </h1>
                 
                 <p className="text-xl text-white/60 max-w-2xl leading-relaxed font-light">
                    Uma trilha estruturada em 4 fases para o despertar da consciência, o encontro com a sombra e a expansão da sua verdade interior.
                 </p>
                 
                 <div className="flex items-center gap-5 pt-4">
                    {nextSession && (
                      <Button 
                        size="lg" 
                        onClick={() => navigate(`/jornada/${nextSession.faseId}/${nextSession.sessaoId}`)}
                        className="btn-primary h-16 px-10 text-xl gap-4"
                      >
                         <Play className="w-7 h-7 fill-current" /> 
                         {(nextSession as any).isRecommended ? `Sugestão: ${nextSession.titulo}` : `Continuar: ${nextSession.titulo}`}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="btn-secondary h-16 px-10 text-xl gap-4"
                    >
                       <Info className="w-7 h-7" /> Sobre a Metodologia
                    </Button>
                 </div>

                 <div className="pt-10 space-y-4 max-w-sm">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">Sua Evolução</span>
                       <span className="text-2xl font-black text-white">{totalProgress}%</span>
                    </div>
                    <div className="progress-bar-thin">
                       <div className="progress-fill" style={{ width: `${totalProgress}%` }} />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Seasons (Fases) List */}
        <div className="streaming-container py-24 space-y-32">
           {JORNADA_DATA.map((fase, idx) => {
             const prevFase = JORNADA_DATA[idx - 1];
             const isUnlocked = idx === 0 || 
                                prevFase.sessoes.every(s => jornada.completedSessions.includes(s.id)) ||
                                (nextSession && nextSession.faseId === fase.id && (nextSession as any).isRecommended);
             
             return (
               <section key={fase.id} className={`space-y-12 transition-all duration-700 ${!isUnlocked && 'opacity-30 grayscale blur-[2px]'}`}>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Temporada {fase.numero}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{fase.titulo}</h2>
                        <p className="text-white/40 max-w-2xl font-light text-lg">{fase.descricao}</p>
                     </div>
                     {!isUnlocked && (
                       <div className="flex items-center gap-2 text-white/50 font-bold text-[10px] uppercase tracking-widest bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-sm">
                          <Lock className="w-3.5 h-3.5" /> Episódios Bloqueados
                       </div>
                     )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {fase.sessoes.map((sessao, sIdx) => {
                       const isCompleted = jornada.completedSessions.includes(sessao.id);
                       const isRecommended = !!(userObjectives.length > 0 && sessao.objetivos?.some(o => userObjectives.includes(o as PCHObjectiveId))) && completedSessionsCount === 0;
                       const sessionUnlocked = isUnlocked || isRecommended;
                       
                       return (
                         <motion.div 
                          key={sessao.id}
                          whileHover={sessionUnlocked ? { scale: 1.03, y: -8 } : {}}
                          className={`group relative aspect-video glass-card overflow-hidden cursor-pointer shadow-xl ${!sessionUnlocked && 'cursor-not-allowed opacity-50'} ${isRecommended ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : ''}`}
                          onClick={() => sessionUnlocked && navigate(`/jornada/${fase.id}/${sessao.id}`)}
                         >
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10" />
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end gap-2 z-20">
                               <div className="flex items-center justify-between">
                                  <div className="flex gap-3 items-center">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Episódio {sIdx + 1}</span>
                                    {isRecommended && <Badge className="bg-primary text-white text-[8px] h-4 font-black tracking-widest px-2">RECOMENDADO</Badge>}
                                  </div>
                                  {isCompleted && (
                                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                       <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                  )}
                               </div>
                               <h3 className="text-2xl font-bold tracking-tight leading-none mb-1">{sessao.titulo}</h3>
                               <p className="text-xs text-white/40 line-clamp-1 font-light italic">{sessao.descricao}</p>
                               
                               <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                  <Button size="sm" className="rounded-full gap-2 px-6 h-9 font-bold text-[10px] uppercase tracking-widest bg-white text-black hover:bg-primary hover:text-white transition-colors">
                                     <Play className="w-3.5 h-3.5 fill-current" /> Assistir
                                  </Button>
                               </div>
                            </div>

                            {/* Hover Status Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-background/20 backdrop-blur-[2px] z-30">
                               <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 shadow-2xl">
                                  <Play className="w-10 h-10 text-white fill-current ml-1.5" />
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
