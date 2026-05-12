import React from "react";
import { motion } from "framer-motion";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Lock, CheckCircle2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PCHObjectiveId } from "@/types/objectives";

interface JourneyPhasesProps {
  completedSessions: string[];
  userObjectives?: PCHObjectiveId[];
  showEpisodes?: boolean;
}

const JourneyPhases: React.FC<JourneyPhasesProps> = ({ 
  completedSessions, 
  userObjectives = [],
  showEpisodes = true
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 md:space-y-24">
      {JORNADA_DATA.map((fase, idx) => {
        const prevFase = JORNADA_DATA[idx - 1];
        const isUnlocked = idx === 0 || prevFase.sessoes.every(s => completedSessions.includes(s.id));
        
        return (
          <section key={fase.id} className={`space-y-8 transition-all duration-700 ${!isUnlocked && 'opacity-40 grayscale blur-[1px]'}`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Temporada {fase.numero}</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">{fase.titulo}</h2>
                <p className="text-white/40 max-w-xl font-light text-base">{fase.descricao}</p>
              </div>
              {!isUnlocked && (
                <div className="flex items-center gap-2 text-white/40 font-bold text-[9px] uppercase tracking-widest bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
                  <Lock className="w-3 h-3" /> Bloqueado
                </div>
              )}
            </div>

            {showEpisodes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      whileHover={sessionUnlocked ? { y: -5 } : {}}
                      className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-card/40 border border-white/5 shadow-2xl transition-all duration-500 ${!sessionUnlocked && 'cursor-not-allowed'} ${isRecommended ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : ''}`}
                      onClick={() => sessionUnlocked && navigate(`/jornada/${fase.id}/${sessao.id}`)}
                    >
                      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Episódio {sIdx + 1}</span>
                          {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">{sessao.titulo}</h3>
                        <p className="text-[10px] text-white/30 line-clamp-1 font-light italic">{sessao.descricao}</p>
                      </div>

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
            )}
          </section>
        );
      })}
    </div>
  );
};

export default JourneyPhases;