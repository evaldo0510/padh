import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useJornada } from '@/hooks/useJornada';
import { JORNADA_DATA } from '@/lib/jornada-data';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { ChevronRight, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import JourneyHero from '@/components/jornada/JourneyHero';
import JourneyPhases from '@/components/jornada/JourneyPhases';
import { PCHObjectiveId } from '@/types/objectives';

const STORAGE_KEY = "pch_user_objectives";

const JornadaHome = () => {
  const { jornada, nextSession } = useJornada();
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

  if (profileLoading && completedSessionsCount === 0) {
    return (
      <PageLayout seo={{ title: "Carregando Jornada...", description: "", path: "/jornada" }} hideHeader>
        <div className="min-h-screen bg-background flex items-center justify-center">
           <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
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
      hideHeader={false}
    >
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        <JourneyHero 
          nextSession={nextSession} 
          totalProgress={totalProgress} 
          isUpdating={isUpdating}
        />

        <div className="streaming-container py-16 space-y-24">
          <JourneyPhases 
            completedSessions={jornada.completedSessions} 
            userObjectives={userObjectives} 
          />
        </div>

        {/* Footer Navigation */}
        <footer className="streaming-container py-32 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex flex-wrap justify-center items-center gap-6">
              <Button asChild variant="ghost" className="rounded-full gap-2 text-white/40 hover:text-primary transition-colors">
                <Link to="/dashboard"><ChevronRight className="w-4 h-4 rotate-180" /> Dashboard</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full gap-2 text-white/40 hover:text-primary transition-colors">
                <Link to="/biblioteca-exercicios"><Library className="w-4 h-4" /> Biblioteca</Link>
              </Button>
           </div>
           <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.6em]">Original P.A.D.H. Content</p>
        </footer>
      </div>
    </PageLayout>
  );
};

export default JornadaHome;