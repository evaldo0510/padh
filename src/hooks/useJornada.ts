import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
}

const STORAGE_KEY = 'padh_jornada_progress';

const INITIAL_JORNADA: JornadaProgress = {
  currentPhaseId: 'fase-1',
  completedExercises: [],
  completedSessions: [],
  responses: [],
};

export const useJornada = () => {
  const [jornada, setJornada] = useState<JornadaProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_JORNADA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jornada));
  }, [jornada]);

  const saveResponse = (exerciseId: string, response: string) => {
    setJornada(prev => {
      // Remove previous response for this exercise if exists
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
      description: "Seu progresso foi registrado na jornada."
    });
  };

  const completeSession = (sessionId: string) => {
    if (!jornada.completedSessions.includes(sessionId)) {
      setJornada(prev => ({
        ...prev,
        completedSessions: [...prev.completedSessions, sessionId],
      }));
      toast.success("Sessão Concluída!", {
        description: "Você deu mais um passo importante."
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
  };
};
