import React, { useState, useEffect } from "react";
import { useJornada } from "@/hooks/useJornada";
import { StreamingSkeleton } from "./StreamingSkeleton";
import GlobalProgressBar from "./GlobalProgressBar";
import JourneyHero from "@/components/jornada/JourneyHero";
import JourneyPhases from "@/components/jornada/JourneyPhases";
import { JORNADA_DATA } from "@/lib/jornada-data";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles, Brain } from "lucide-react";
import TheoreticalSections from "./TheoreticalSections";

const StreamingHome = () => {
  const { jornada, isSyncing, nextSession } = useJornada();
  const [focusMode, setFocusMode] = useState(() => {
    const saved = localStorage.getItem("pch_focus_mode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("pch_focus_mode", JSON.stringify(focusMode));
  }, [focusMode]);

  if (isSyncing) return <StreamingSkeleton />;

  const completedSessionsCount = jornada.completedSessions?.length || 0;
  const totalSessionsCount = JORNADA_DATA.reduce((acc, f) => acc + f.sessoes.length, 0);
  const totalProgress = Math.round((completedSessionsCount / totalSessionsCount) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-32 overflow-x-hidden">
      {/* 1. SEÇÃO PRÓXIMO (Hero) */}
      <JourneyHero nextSession={nextSession} totalProgress={totalProgress} />

      <div className="streaming-container -mt-24 md:-mt-32 relative z-30 space-y-20 md:space-y-32">
        {/* Focus Mode Toggle */}
        <div className="flex justify-end pt-4">
          <div className="flex items-center space-x-3 bg-white/[0.03] backdrop-blur-md border border-white/5 py-3 px-5 rounded-full shadow-2xl">
            <div className="flex flex-col items-end">
               <Label htmlFor="focus-mode" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 cursor-pointer">Modo Foco</Label>
               <span className="text-[8px] text-primary/60 font-bold uppercase tracking-widest">{focusMode ? 'Apenas Prática' : 'Visão Completa'}</span>
            </div>
            <Switch 
              id="focus-mode" 
              checked={focusMode} 
              onCheckedChange={setFocusMode}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {/* 2. SEÇÃO PROGRESSO */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col gap-1.5 mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white px-1">Seu Progresso</h2>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30 px-1">Visão geral da sua trilha de evolução</p>
          </div>
          <div className="glass-card p-6 md:p-10">
            <GlobalProgressBar />
          </div>
        </section>

        {/* 3. SEÇÃO FASES (Jornada) */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col gap-1.5 mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white px-1">Fases da Jornada</h2>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30 px-1">Explore as etapas estruturadas</p>
          </div>
          <JourneyPhases completedSessions={jornada.completedSessions} />
        </section>

        {/* 4. SEÇÕES TEÓRICAS (Opcionais) */}
        {!focusMode && (
          <section className="animate-fade-in pb-20">
             <TheoreticalSections />
          </section>
        )}
      </div>
    </div>
  );
};

export default StreamingHome;