import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useOfflineMode } from "./useOfflineMode";
import { reportSyncStatus } from "./useSyncStatus";
import { JORNADA_DATA } from "@/lib/jornada-data";

export interface RespostaExercicio {
  exerciseId: string;
  response: string;
  date: string;
}

export interface JornadaProgress {
  currentPhaseId: string;
  completedExercises: string[];
  completedSessions: string[];
  responses: RespostaExercicio[];
  favorites?: string[];
  last_updated?: string;
  pendingSync?: {
    sessions: string[];
    responses: string[];
  };
}

const STORAGE_KEY = "padh_jornada_progress";

const INITIAL_JORNADA: JornadaProgress = {
  currentPhaseId: "fase-1",
  completedExercises: [],
  completedSessions: [],
  responses: [],
  favorites: [],
  pendingSync: {
    sessions: [],
    responses: [],
  },
};

// Helper to find phase_id from session_id (lookup in static data)
const findPhaseForSession = (sessionId: string): string | undefined => {
  for (const fase of JORNADA_DATA) {
    if (fase.sessoes.some((s) => s.id === sessionId)) return fase.id;
  }
  return undefined;
};
const findPhaseForExercise = (exerciseId: string): { phaseId?: string; sessionId?: string } => {
  for (const fase of JORNADA_DATA) {
    for (const sessao of fase.sessoes) {
      if (sessao.blocos.some((b) => b.id === exerciseId)) {
        return { phaseId: fase.id, sessionId: sessao.id };
      }
    }
  }
  return {};
};

export const useJornada = () => {
  const { isOffline } = useOfflineMode();
  const [jornada, setJornada] = useState<JornadaProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_JORNADA;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Track current user
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Initial sync from DB when user logs in
  useEffect(() => {
    const fetchProgress = async () => {
      if (isOffline || !userId) return;
      setIsSyncing(true);
      try {
        const [progressRes, responsesRes] = await Promise.all([
          supabase
            .from("episode_progress")
            .select("session_id,phase_id,status")
            .eq("user_id", userId),
          supabase
            .from("exercise_responses")
            .select("exercise_id,response,updated_at")
            .eq("user_id", userId),
        ]);

        const completedSessions: string[] = (progressRes.data || [])
          .filter((p) => p.status === "completed")
          .map((p) => p.session_id);

        const responses: RespostaExercicio[] = (responsesRes.data || []).map((r) => ({
          exerciseId: r.exercise_id,
          response: r.response,
          date: r.updated_at,
        }));

        const completedExercises = responses
          .filter((r) => r.response && r.response.trim().length > 0)
          .map((r) => r.exerciseId);

        setJornada((prev) => {
          const merged: JornadaProgress = {
            ...prev,
            completedSessions: Array.from(
              new Set([...(prev.completedSessions || []), ...completedSessions]),
            ),
            completedExercises: Array.from(
              new Set([...(prev.completedExercises || []), ...completedExercises]),
            ),
            responses: [
              ...prev.responses.filter(
                (r) => !responses.some((rr) => rr.exerciseId === r.exerciseId),
              ),
              ...responses,
            ],
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        });
        reportSyncStatus("ok");
      } catch (e) {
        console.error("Sync fetch error", e);
        reportSyncStatus("error");
      } finally {
        setIsSyncing(false);
      }
    };
    fetchProgress();
  }, [userId, isOffline]);

  // Persist locally on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jornada));
    window.dispatchEvent(new Event("padh_data_change"));
  }, [jornada]);

  const saveResponse = useCallback(
    async (exerciseId: string, response: string) => {
      setJornada((prev) => {
        const otherResponses = prev.responses.filter(
          (r) => r.exerciseId !== exerciseId,
        );
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

      if (userId && !isOffline) {
        const { phaseId, sessionId } = findPhaseForExercise(exerciseId);
        reportSyncStatus("pending");
        const { error } = await supabase
          .from("exercise_responses")
          .upsert(
            {
              user_id: userId,
              exercise_id: exerciseId,
              response,
              phase_id: phaseId ?? null,
              session_id: sessionId ?? null,
            },
            { onConflict: "user_id,exercise_id" },
          );
        if (error) {
          console.error("saveResponse error", error);
          reportSyncStatus("error");
        } else {
          // Mark episode as in_progress (only if not already completed)
          if (phaseId && sessionId) {
            const { data: existing } = await supabase
              .from("episode_progress")
              .select("status")
              .eq("user_id", userId)
              .eq("session_id", sessionId)
              .maybeSingle();
            if (!existing || existing.status !== "completed") {
              await supabase.from("episode_progress").upsert(
                {
                  user_id: userId,
                  session_id: sessionId,
                  phase_id: phaseId,
                  status: "in_progress",
                },
                { onConflict: "user_id,session_id" },
              );
            }
          }
          reportSyncStatus("ok");
        }
      } else {
        reportSyncStatus("blocked");
      }

      toast.success("Resposta salva", {
        description: userId
          ? "Sincronizada com sua conta."
          : "Salva localmente. Faça login para sincronizar.",
      });
    },
    [userId, isOffline],
  );

  const completeSession = useCallback(
    async (sessionId: string) => {
      if (!jornada.completedSessions.includes(sessionId)) {
        setJornada((prev) => ({
          ...prev,
          completedSessions: [...prev.completedSessions, sessionId],
        }));
        toast.success("Sessão Concluída!", {
          description: "Mais um passo na sua jornada.",
        });
      }
      if (userId && !isOffline) {
        const phaseId = findPhaseForSession(sessionId);
        if (!phaseId) return;
        const { error } = await supabase
          .from("episode_progress")
          .upsert(
            {
              user_id: userId,
              session_id: sessionId,
              phase_id: phaseId,
              status: "completed",
              completed_at: new Date().toISOString(),
            },
            { onConflict: "user_id,session_id" },
          );
        if (error) console.error("completeSession error", error);
      }
    },
    [jornada.completedSessions, userId, isOffline],
  );

  const startSession = useCallback(
    async (sessionId: string) => {
      if (userId && !isOffline) {
        const phaseId = findPhaseForSession(sessionId);
        if (!phaseId) return;
        
        // Only mark as in_progress if not already completed
        const { data: existing } = await supabase
          .from("episode_progress")
          .select("status")
          .eq("user_id", userId)
          .eq("session_id", sessionId)
          .maybeSingle();

        if (!existing || existing.status !== "completed") {
          await supabase.from("episode_progress").upsert(
            {
              user_id: userId,
              session_id: sessionId,
              phase_id: phaseId,
              status: "in_progress",
            },
            { onConflict: "user_id,session_id" }
          );
        }
      }
    },
    [userId, isOffline]
  );

  const setPhase = (phaseId: string) => {
    setJornada((prev) => ({ ...prev, currentPhaseId: phaseId }));
  };

  const getResponse = (exerciseId: string) => {
    return (
      jornada.responses.find((r) => r.exerciseId === exerciseId)?.response || ""
    );
  };

  const toggleFavorite = (id: string) => {
    setJornada((prev) => {
      const currentFavs = prev.favorites || [];
      const isFav = currentFavs.includes(id);
      const newFavs = isFav
        ? currentFavs.filter((f) => f !== id)
        : [...currentFavs, id];
      return { ...prev, favorites: newFavs };
    });
  };

  const isFavorite = (id: string) => (jornada.favorites || []).includes(id);

  const nextSession = useMemo(() => {
    for (const fase of JORNADA_DATA) {
      for (const sessao of fase.sessoes) {
        if (!jornada.completedSessions.includes(sessao.id)) {
          return {
            phaseId: fase.id,
            sessionId: sessao.id,
            titulo: sessao.titulo,
            faseTitulo: fase.titulo,
            descricao: sessao.descricao,
            numero: sessao.id,
          };
        }
      }
    }
    return null;
  }, [jornada.completedSessions]);

  const isFinished = useMemo(() => {
    return JORNADA_DATA.every(fase => 
      fase.sessoes.every(sessao => jornada.completedSessions.includes(sessao.id))
    );
  }, [jornada.completedSessions]);

  return {
    jornada,
    saveResponse,
    completeSession,
    startSession,
    setPhase,
    getResponse,
    toggleFavorite,
    isFavorite,
    isSyncing,
    nextSession,
    isFinished,
    continuePath: nextSession 
      ? `/jornada/${nextSession.phaseId}/${nextSession.sessionId}` 
      : (isFinished ? '/dashboard' : '/jornada'),
    hasConfig: true,
  };
};