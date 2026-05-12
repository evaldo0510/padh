import React from "react";
import { useJornada } from "@/hooks/useJornada";
import { StreamingSkeleton } from "./StreamingSkeleton";
import GlobalProgressBar from "./GlobalProgressBar";
import JourneyHero from "@/components/jornada/JourneyHero";
import JourneyPhases from "@/components/jornada/JourneyPhases";
import { JORNADA_DATA } from "@/lib/jornada-data";

const StreamingHome = () => {
  const { jornada, isSyncing, nextSession } = useJornada();

  if (isSyncing) return <StreamingSkeleton />;

  const completedSessionsCount = jornada.completedSessions?.length || 0;
  const totalSessionsCount = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
  const totalProgress = Math.round((completedSessionsCount / totalSessionsCount) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
      {/* 1. SEÇÃO PRÓXIMO (Hero) */}
      <JourneyHero nextSession={nextSession} totalProgress={totalProgress} />

      <div className="streaming-container -mt-32 relative z-30 space-y-16 md:space-y-24 pb-32">
        {/* 2. SEÇÃO PROGRESSO */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-white px-2">Seu Progresso</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 px-2">Visão geral da sua trilha de transformação</p>
          </div>
          <GlobalProgressBar />
        </section>

        {/* 3. SEÇÃO FASES (Jornada) */}
        <section className="space-y-8">
          <div className="flex flex-col gap-1 px-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">Fases da Jornada</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Explore as etapas estruturadas</p>
          </div>
          <JourneyPhases completedSessions={jornada.completedSessions} />
        </section>
      </div>
    </div>
  );
};

export default StreamingHome;