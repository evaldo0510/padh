import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase, hasSupabaseConfig } from '@/integrations/supabase/client';
import { useOfflineMode } from './useOfflineMode';

export interface ProgressData {
  completedModules: string[];
  completedActivities: Record<string, string[]>; // moduleId -> activityIds[]
  lastAccessedModule?: string;
  diagnosisResult?: string;
  scores?: Record<string, number>;
  notifications: Array<{ id: string; title: string; message: string; date: string; read: boolean }>;
}

const STORAGE_KEY = 'padh_course_progress';

const INITIAL_PROGRESS: ProgressData = {
  completedModules: [],
  completedActivities: {},
  notifications: [],
};

export const useCourseProgress = () => {
  const { isOffline } = useOfflineMode();
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_PROGRESS, ...parsed };
      } catch (e) {
        return INITIAL_PROGRESS;
      }
    }
    return INITIAL_PROGRESS;
  });

  // Initial Sync from DB
  useEffect(() => {
    const fetchProgress = async () => {
      if (isOffline || !hasSupabaseConfig()) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('course_progress')
        .select('progress_data')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setProgress(data.progress_data);
      }
    };

    fetchProgress();
  }, []);

  // Save to LocalStorage and DB
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    
    const syncToDB = async () => {
      if (!hasSupabaseConfig()) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('course_progress')
        .upsert({ 
          user_id: user.id, 
          progress_data: progress,
          updated_at: new Date().toISOString()
        });
    };

    syncToDB();
  }, [progress]);

  const addNotification = (title: string, message: string) => {
    const newNotif = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      date: new Date().toISOString(),
      read: false,
    };
    setProgress(prev => ({
      ...prev,
      notifications: [newNotif, ...prev.notifications].slice(0, 20),
    }));
    toast.success(title, { description: message });
  };

  const completeModule = (moduleId: string) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      }));
      addNotification("Módulo Concluído!", `Parabéns! Você completou o módulo técnico. Próximo passo desbloqueado.`);
    }
  };

  const completeActivity = (moduleId: string, activityId: string) => {
    setProgress(prev => {
      const activities = prev.completedActivities[moduleId] || [];
      if (activities.includes(activityId)) return prev;
      
      return {
        ...prev,
        completedActivities: {
          ...prev.completedActivities,
          [moduleId]: [...activities, activityId],
        },
      };
    });
    addNotification("Etapa Concluída", "Sua evolução técnica foi registrada.");
  };

  const setLastAccessed = (moduleId: string) => {
    setProgress(prev => ({
      ...prev,
      lastAccessedModule: moduleId,
    }));
  };

  const setDiagnosis = (result: string, scores?: Record<string, number>) => {
    setProgress(prev => ({
      ...prev,
      diagnosisResult: result,
      scores,
    }));
    addNotification("Diagnóstico Realizado", `Sua trilha técnica "${result}" foi configurada.`);
  };

  const markNotificationRead = (id: string) => {
    setProgress(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    }));
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevModuleId = `modulo-${index}`; 
    return progress.completedModules.includes(prevModuleId);
  };

  const getModuleProgress = (moduleId: string, totalActivities: number) => {
    const completed = progress.completedActivities[moduleId]?.length || 0;
    return totalActivities > 0 ? Math.round((completed / totalActivities) * 100) : 0;
  };

  return {
    progress,
    completeModule,
    completeActivity,
    setLastAccessed,
    setDiagnosis,
    resetProgress,
    isModuleUnlocked,
    getModuleProgress,
    markNotificationRead,
  };
};
