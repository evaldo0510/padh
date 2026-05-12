import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Sparkles, Loader2, BookOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PrefetchLink from "@/components/layout/PrefetchLink";

interface JourneyHeroProps {
  nextSession: any;
  totalProgress: number;
  isUpdating?: boolean;
  compact?: boolean;
}

const JourneyHero: React.FC<JourneyHeroProps> = ({ 
  nextSession, 
  totalProgress, 
  isUpdating,
  compact = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavigating, setIsNavigating] = React.useState(false);

  React.useEffect(() => {
    setIsNavigating(false);
  }, [location.pathname]);

  const handleNavigate = () => {
    setIsNavigating(true);
  };

  return (
    <div className={`relative ${compact ? 'h-[45vh] md:h-[55vh]' : 'h-[55vh] md:h-[65vh]'} flex items-center overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
      
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="w-full h-full flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
           <div className="text-[20vw] font-black tracking-tighter">P.A.D.H.</div>
        </div>
      </div>

      <div className="relative z-20 streaming-container pt-12">
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 py-1.5 px-4 rounded-full text-[9px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Original
            </Badge>
            {nextSession && (
              <div className="flex items-center gap-2 text-white/30 text-[9px] font-bold tracking-widest uppercase">
                <ChevronRight className="w-3.5 h-3.5 text-primary/50" />
                {nextSession.faseTitulo || nextSession.phaseId}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h1 className={`${compact ? 'text-4xl md:text-7xl' : 'text-5xl md:text-8xl'} font-black tracking-tighter leading-[0.9] text-white`}>
               {nextSession ? (nextSession.isRecommended ? 'Sugestão' : 'Continuar') : 'Jornada'} <br /> 
               <span className="text-primary italic">{nextSession ? 'Evolução' : 'Concluída'}</span>
            </h1>
            
            <p className="text-lg text-white/50 max-w-xl leading-relaxed font-light italic">
              {nextSession 
                ? `Sua próxima vivência: "${nextSession.titulo}". Mantenha o fluxo e continue expandindo sua consciência.`
                : "Você completou todas as fases atuais. Revise seus insights ou explore novas ferramentas."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {nextSession ? (
              <Button 
                size="lg" 
                asChild
                className="btn-primary h-14 px-8 text-lg rounded-full relative overflow-hidden group"
                disabled={isNavigating}
              >
                <PrefetchLink 
                  to={`/jornada/${nextSession.phaseId || nextSession.faseId}/${nextSession.sessionId || nextSession.sessaoId}`}
                  onClick={handleNavigate}
                >
                  {isNavigating ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Play className="w-5 h-5 fill-current mr-2 group-hover:scale-110 transition-transform" /> 
                  )}
                  {nextSession.isRecommended ? `Iniciar: ${nextSession.titulo}` : `Continuar: ${nextSession.titulo}`}
                </PrefetchLink>
              </Button>
            ) : (
              <Button 
                size="lg" 
                asChild
                className="btn-primary h-14 px-8 text-lg rounded-full"
              >
                <PrefetchLink to="/jornada">
                  <BookOpen className="w-5 h-5 mr-2" /> 
                  Ver Minha Jornada
                </PrefetchLink>
              </Button>
            )}
          </div>

          <div className="pt-8 space-y-3 max-w-xs">
            <div className="flex justify-between items-end">
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/80">Conclusão</span>
               <span className="text-xl font-black text-white">{totalProgress}%</span>
            </div>
            <div className="progress-bar-thin bg-white/5 h-1.5">
               <div className="progress-fill h-full shadow-glow" style={{ width: `${totalProgress}%` }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyHero;