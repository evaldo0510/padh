import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase, hasSupabaseConfig } from '@/integrations/supabase/client';
import { useOfflineMode } from './useOfflineMode';
import { reportSyncStatus } from './useSyncStatus';

export interface RespostaExercicio {
  exerciseId: string;
  response: string;
  date: string;
}

export interface JornadaProgress {
  currentPhaseId: string;
  completedExercises: string[]; // exerciseId[]
  completedSessions: string[]; // sessionId[]
  responses: RespostaExercicio[];
  last_updated?: string;
}

const STORAGE_KEY = 'padh_jornada_progress';

const INITIAL_JORNADA: JornadaProgress = {
  currentPhaseId: 'fase-1',
  completedExercises: [],
  completedSessions: [],
  responses: [],
};

export const useJornada = () => {
  const { isOffline } = useOfflineMode();
  const [jornada, setJornada] = useState<JornadaProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_JORNADA;
  });

  const [isSyncing, setIsSyncing] = useState(false);

  // Initial Sync from DB
  useEffect(() => {
    const fetchProgress = async () => {
      if (isOffline || !hasSupabaseConfig()) return;
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setIsSyncing(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('progress_data')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setJornada(data.progress_data);
      }
      setIsSyncing(false);
    };

    fetchProgress();
  }, []);

  // Save to LocalStorage and DB
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jornada));
    
    // Notify about data change for sync indicator
    window.dispatchEvent(new Event('padh_data_change'));
    
    const syncToDB = async () => {
      if (isOffline || !hasSupabaseConfig()) {
        reportSyncStatus('blocked');
        return;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        reportSyncStatus('blocked');
        return;
      }

      reportSyncStatus('pending');
      const { error } = await supabase
        .from('user_progress')
        .upsert({ 
          user_id: user.id, 
          progress_data: jornada,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error("Sync error:", error);
        reportSyncStatus('error');
      } else {
        reportSyncStatus('ok');
      }
    };

    syncToDB();
  }, [jornada, isOffline]);

  const saveResponse = (exerciseId: string, response: string) => {
    setJornada(prev => {
      const otherResponses = prev.responses.filter(r => r.exerciseId !== exerciseId);
      const newResponse = {
        exerciseId,
        response,
        date: new Date().toISOString(),
      };

      return {
        ...prev,
        responses: [...otherResponses, newResponse],
        completedExercises: prev.completedExercises.includes(exerciseId) 
          ? prev.completedExercises 
          : [...prev.completedExercises, exerciseId],
      };
    });
    
    toast.success("Resposta salva", {
      description: "Seu progresso foi sincronizado."
    });
  };

  const completeSession = (sessionId: string) => {
    if (!jornada.completedSessions.includes(sessionId)) {
      setJornada(prev => ({
        ...prev,
        completedSessions: [...prev.completedSessions, sessionId],
      }));
      toast.success("Sessão Concluída!", {
        description: "Mais um passo na sua jornada."
      });
    }
  };

  const setPhase = (phaseId: string) => {
    setJornada(prev => ({
      ...prev,
      currentPhaseId: phaseId,
    }));
  };

  const getResponse = (exerciseId: string) => {
    return jornada.responses.find(r => r.exerciseId === exerciseId)?.response || '';
  };

  return {
    jornada,
    saveResponse,
    completeSession,
    setPhase,
    getResponse,
    isSyncing,
    hasConfig: hasSupabaseConfig()
  };
};
