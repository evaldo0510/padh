import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Sparkles, Loader2, BookOpen } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PrefetchLink from "@/components/layout/PrefetchLink";

interface JourneyHeroProps {
  nextSession: any;
  totalProgress: number;
  isUpdating?: boolean;
  compact?: boolean;
  onShowTheory?: () => void;
}

const JourneyHero: React.FC<JourneyHeroProps> = ({ 
  nextSession, 
  totalProgress, 
  isUpdating,
  compact = false,
  onShowTheory
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
              Original PCH
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
               {nextSession ? (totalProgress > 0 ? 'Bem-vindo de' : 'Comece sua') : 'Jornada'} <br /> 
               <span className="text-primary italic">{nextSession ? (totalProgress > 0 ? 'Volta' : 'História') : 'Concluída'}</span>
            </h1>
            
            <p className="text-lg text-white/50 max-w-xl leading-relaxed font-light italic">
               {nextSession 
                ? (totalProgress > 0 
                    ? `Que bom te ver novamente. Vamos continuar de onde paramos: "${nextSession.titulo}".` 
                    : `Sua jornada de transformação começa agora com: "${nextSession.titulo}". Respire e sinta cada palavra.`)
                : "Você completou todas as fases atuais. Revise seus insights ou explore novas ferramentas."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {nextSession ? (
              <Button 
                size="lg" 
                asChild
                className="btn-primary h-16 px-10 text-xl rounded-full relative overflow-hidden group shadow-[0_0_50px_rgba(234,179,8,0.3)] hover:shadow-[0_0_80px_rgba(234,179,8,0.5)] transition-all duration-500"
                disabled={isNavigating}
                aria-label={`${nextSession.isRecommended ? 'Iniciar' : 'Continuar'}: ${nextSession.titulo}. Episódio da temporada ${nextSession.faseTitulo || nextSession.phaseId}.`}
              >
                <PrefetchLink 
                  to={`/jornada/${nextSession.phaseId || nextSession.faseId}/${nextSession.sessionId || nextSession.sessaoId}`}
                  onClick={handleNavigate}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-amber-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center">
                    {isNavigating ? (
                      <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    ) : (
                      <Play className="w-6 h-6 fill-current mr-3 group-hover:scale-125 transition-transform duration-500" /> 
                    )}
                    <span className="font-black uppercase tracking-wider">
                      {nextSession.isRecommended ? `Iniciar: ${nextSession.titulo}` : `Continuar: ${nextSession.titulo}`}
                    </span>
                  </div>
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
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 rounded-full border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
              asChild
            >
              <Link to="/fundamentacao">
                <BookOpen className="w-5 h-5 mr-2" /> 
                Fundamentação Teórica
              </Link>
            </Button>
          </div>

          <div className="pt-8 space-y-3 max-w-xs">
            <div className="flex justify-between items-end">
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/80">Conclusão</span>
               <span className="text-xl font-black text-white" aria-hidden="true">{totalProgress}%</span>
            </div>
            <div 
              className="progress-bar-thin bg-white/5 h-1.5"
              role="progressbar"
              aria-valuenow={totalProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso total da jornada: ${totalProgress}% concluído`}
            >
               <div className="progress-fill h-full shadow-glow transition-all duration-1000" style={{ width: `${totalProgress}%` }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyHero;