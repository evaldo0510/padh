import React, { useMemo } from "react";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { useJornada } from "@/hooks/useJornada";
import { Flame, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Barra de progresso GLOBAL da jornada + streak diário.
 * Reúne todas as sessões concluídas vs total e calcula sequência de
 * dias consecutivos com pelo menos 1 resposta registrada.
 */
const GlobalProgressBar: React.FC = () => {
  const { jornada } = useJornada();

  const { totalSessions, completed, percent, streak } = useMemo(() => {
    const total = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
    const done = jornada.completedSessions.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    // Streak: dias únicos com resposta, contados a partir de hoje retrocedendo
    const days = new Set(
      (jornada.responses || [])
        .map((r) => (r.date ? r.date.slice(0, 10) : null))
        .filter(Boolean) as string[],
    );
    let s = 0;
    const d = new Date();
    while (true) {
      const key = d.toISOString().slice(0, 10);
      if (days.has(key)) {
        s++;
        d.setDate(d.getDate() - 1);
      } else {
        // Se hoje não tem mas ontem tem, ainda conta a partir de ontem
        if (s === 0) {
          d.setDate(d.getDate() - 1);
          const yKey = d.toISOString().slice(0, 10);
          if (days.has(yKey)) {
            s++;
            d.setDate(d.getDate() - 1);
            continue;
          }
        }
        break;
      }
    }

    return { totalSessions: total, completed: done, percent: pct, streak: s };
  }, [jornada.completedSessions, jornada.responses]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="glass-card p-6 md:p-8 flex flex-col gap-8 border-white/5"
    >
      <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-10">
        {/* Progresso global */}
        <div className="flex-1 space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Sua jornada
              </p>
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {completed}{" "}
                <span className="text-white/40 text-lg font-light">
                  / {totalSessions} episódios
                </span>
              </p>
            </div>
            <span className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
              {percent}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-primary shadow-glow shadow-primary/40 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="md:w-px md:bg-white/10" />
        <div className="flex items-center gap-4 md:px-2">
          <div className="w-14 h-14 rounded-2xl bg-accent-warm/10 border border-accent-warm/20 flex items-center justify-center">
            <Flame
              className={`w-7 h-7 ${streak > 0 ? "text-accent-warm" : "text-white/20"}`}
            />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Sequência
            </p>
            <p className="text-2xl font-bold text-white">
              {streak}{" "}
              <span className="text-sm font-light text-white/50">
                {streak === 1 ? "dia" : "dias"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Fases da Jornada */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Fases da Jornada</p>
        <PhaseProgress />
      </div>
    </motion.div>
  );
};

const PhaseProgress: React.FC = () => {
  const { jornada } = useJornada();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
      {JORNADA_DATA.map((fase) => {
        const completedInFase = fase.sessoes.filter(s => jornada.completedSessions.includes(s.id)).length;
        const totalInFase = fase.sessoes.length;
        const isCompleted = completedInFase === totalInFase && totalInFase > 0;
        const isCurrent = !isCompleted && fase.sessoes.some(s => !jornada.completedSessions.includes(s.id));

        return (
          <div key={fase.id} className={`p-4 rounded-2xl border transition-all ${isCompleted ? 'bg-primary/10 border-primary/20' : 'bg-white/5 border-white/5'} ${isCurrent ? 'ring-1 ring-primary/50' : ''}`}>
            <p className={`text-[9px] font-black uppercase tracking-widest ${isCompleted ? 'text-primary' : 'text-white/30'}`}>
              Fase {fase.numero}
            </p>
            <h4 className="text-sm font-bold text-white truncate">{fase.titulo}</h4>
            <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${isCompleted ? 'bg-primary' : 'bg-white/20'}`} 
                style={{ width: `${(completedInFase / totalInFase) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GlobalProgressBar;
