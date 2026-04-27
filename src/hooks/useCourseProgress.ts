import { useState, useEffect } from 'react';

export interface ProgressData {
  completedModules: string[];
  completedActivities: Record<string, string[]>; // moduleId -> activityIds[]
  lastAccessedModule?: string;
  diagnosisResult?: string;
  scores?: Record<string, number>;
  notifications: Array<{ id: string; title: string; message: string; date: string; read: boolean }>;
}

const STORAGE_KEY = 'padh_course_progress';

export const useCourseProgress = () => {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { completedModules: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeModule = (moduleId: string) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      }));
    }
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
  };

  const resetProgress = () => {
    const fresh = { completedModules: [] };
    setProgress(fresh);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    // For now, let's say a module is unlocked if the previous one is completed
    // but the user might want a more relaxed unlocking.
    // Let's stick to strict: must complete previous.
    const prevModuleId = `modulo-${index}`; // indices are 1-based in IDs usually
    return progress.completedModules.includes(prevModuleId);
  };

  return {
    progress,
    completeModule,
    setLastAccessed,
    setDiagnosis,
    resetProgress,
    isModuleUnlocked,
  };
};
