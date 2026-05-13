import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { JORNADA_DATA, FaseJornada } from "@/lib/jornada-data";
import { Badge } from "@/components/ui/badge";
import { Play, Lock, CheckCircle2, Star, Sparkles, Flame, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PCHObjectiveId } from "@/types/objectives";

interface JourneyPhasesProps {
  completedSessions: string[];
  userObjectives?: PCHObjectiveId[];
  showEpisodes?: boolean;
}

const SeasonBackground = ({ color }: { color: string }) => {
  const colorMap: Record<string, string> = {
    amber: "from-amber-500/20 via-amber-500/5 to-transparent",
    indigo: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    emerald: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    rose: "from-rose-500/20 via-rose-500/5 to-transparent",
    purple: "from-purple-500/20 via-purple-500/5 to-transparent",
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 bg-gradient-to-b ${colorMap[color] || 'from-primary/20 via-primary/5 to-transparent'} opacity-40`} />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-${color}-500/10 rounded-full blur-[120px]`} 
      />
    </div>
  );
};

const SeasonIcon = ({ color }: { color: string }) => {
  const icons: Record<string, any> = {
    amber: Sun,
    indigo: Moon,
    emerald: Star,
    rose: Flame,
    purple: Sparkles,
  };
  const Icon = icons[color] || Sparkles;
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div 
      style={{ rotate, y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.05 }}
      transition={{ duration: 2 }}
      className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 z-0"
    >
      <Icon className="w-64 h-64 md:w-[600px] md:h-[600px]" />
    </motion.div>
  );
};

const JourneyPhases: React.FC<JourneyPhasesProps> = ({ 
  completedSessions, 
  userObjectives = [],
  showEpisodes = true
}) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-48 md:space-y-72 relative">
      {/* Cinematic noise and mesh gradient overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0 opacity-20" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0 opacity-30" />

      {/* Vertical Connection Line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent hidden md:block z-10" />

      {JORNADA_DATA.map((fase, idx) => {
        const prevFase = JORNADA_DATA[idx - 1];
        const isUnlocked = idx === 0 || prevFase.sessoes.every(s => completedSessions.includes(s.id));
        const episodesCompleted = fase.sessoes.filter(s => completedSessions.includes(s.id)).length;
        
        return (
          <section key={fase.id} className="relative group min-h-[60vh] flex flex-col justify-center">
            {/* Immersive background per season */}
            <SeasonBackground color={fase.cor} />
            
            {/* Floating Season Number Background */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] select-none pointer-events-none z-0 hidden lg:block">
              0{fase.numero}
            </div>
            
            <div className={`container-fluid px-6 md:px-12 transition-all duration-1000 relative z-10 ${!isUnlocked && 'opacity-40 grayscale blur-[1px]'}`}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 relative">
                <SeasonIcon color={fase.cor} />
                
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 relative z-10"
                >
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-[2px] bg-primary rounded-full" />
                      <span className="text-xs font-black uppercase tracking-[0.5em] text-primary">
                        Temporada {fase.numero}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {isUnlocked ? (
                        <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1">
                          Disponível
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-white/10 text-white/30 px-3 py-1">
                          Bloqueado
                        </Badge>
                      )}
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {episodesCompleted} / {fase.sessoes.length} EPISÓDIOS
                      </span>
                    </div>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
                    {fase.titulo}
                  </h2>
                  <p className="text-white/40 max-w-2xl font-light text-lg md:text-xl leading-relaxed italic">
                    {fase.descricao}
                  </p>

                  {fase.resultados && (
                    <div className="flex flex-wrap gap-3 pt-4">
                      {fase.resultados.map((res, ridx) => (
                        <motion.div 
                          key={ridx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + ridx * 0.1 }}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                        >
                          <Sparkles className="w-3 h-3 text-primary" />
                          {res}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {!isUnlocked && (
                  <div className="flex items-center gap-3 text-white/40 font-bold text-[10px] uppercase tracking-[0.3em] bg-white/[0.03] px-6 py-3 rounded-full border border-white/5 backdrop-blur-sm">
                    <Lock className="w-4 h-4" /> Temporada Bloqueada
                  </div>
                )}
              </div>

              {showEpisodes && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-12"
                >
                  {fase.sessoes.map((sessao, sIdx) => {
                    const isCompleted = completedSessions.includes(sessao.id);
                    const isRecommended = userObjectives.length > 0 && 
                                         sessao.objetivos?.some(o => userObjectives.includes(o as PCHObjectiveId)) && 
                                         completedSessions.length === 0;
                    
                    const prevSessionsInFase = fase.sessoes.slice(0, sIdx);
                    const allPrevSessionsDone = prevSessionsInFase.every(s => completedSessions.includes(s.id));
                    const sessionUnlocked = (isUnlocked && allPrevSessionsDone) || isRecommended;
                    
                    return (
                      <motion.div 
                        key={sessao.id}
                        variants={itemVariants}
                        whileHover={sessionUnlocked ? { y: -16, scale: 1.05 } : {}}
                        className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ${!sessionUnlocked && 'cursor-not-allowed grayscale'}`}
                        onClick={() => sessionUnlocked && navigate(`/jornada/${fase.id}/${sessao.id}`)}
                      >
                        {/* Interactive Spotlight Effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                        {/* Card Content Overlay */}
                        <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                          <div className="flex items-center justify-between mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] bg-primary/10 px-3 py-1 rounded-full">
                              EP {sIdx + 1}
                            </span>
                            {isCompleted && (
                              <div className="bg-emerald-500/20 p-1.5 rounded-full backdrop-blur-md">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              </div>
                            )}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-3 group-hover:text-primary transition-colors duration-500">
                            {sessao.titulo}
                          </h3>
                          <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-700 ease-in-out">
                            <p className="text-xs text-white/40 line-clamp-3 font-light leading-relaxed mb-4">
                              {sessao.descricao}
                            </p>
                          </div>
                        </div>

                        {/* Animated Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-500 ${sessionUnlocked ? 'opacity-80 group-hover:opacity-60' : 'opacity-90'}`} />
                        
                        {/* Subtle color glow on hover */}
                        <div className={`absolute inset-0 bg-${fase.cor}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

                        {!sessionUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/40 backdrop-blur-[2px]">
                            <div className="flex flex-col items-center gap-3">
                              <Lock className="w-10 h-10 text-white/20" />
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">Bloqueado</span>
                            </div>
                          </div>
                        )}

                        {sessionUnlocked && (
                          <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.4)] group-hover:scale-110 transition-transform">
                              <Play className="w-7 h-7 text-white fill-current ml-1" />
                            </div>
                          </div>
                        )}

                        {isRecommended && (
                          <div className="absolute top-4 left-4 z-40">
                             <Badge className="bg-primary text-black font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg animate-bounce">
                               Recomendado
                             </Badge>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  {fase.sessoes.every(s => completedSessions.includes(s.id)) && JORNADA_DATA[idx + 1] && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="col-span-full mt-12 p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Próximo Nível</span>
                        <h4 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                          {JORNADA_DATA[idx + 1].titulo}
                        </h4>
                        <p className="text-white/40 italic">{JORNADA_DATA[idx + 1].descricao}</p>
                      </div>
                      <Button 
                        size="lg" 
                        onClick={() => {
                          const nextFase = JORNADA_DATA[idx + 1];
                          navigate(`/jornada/${nextFase.id}/${nextFase.sessoes[0].id}`);
                        }}
                        className="rounded-full bg-primary text-black font-black uppercase tracking-widest px-10 h-16 group"
                      >
                        Desbloquear Temporada {JORNADA_DATA[idx + 1].numero}
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default JourneyPhases;
