import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { PCHObjectiveId, isValidObjective } from "@/types/objectives";
import { toast } from "sonner";

export interface SyncLog {
  timestamp: Date;
  action: string;
  source: "local" | "database" | "merged";
  objectives: PCHObjectiveId[];
}

export interface Profile {
  id: string;
  user_id: string;
  objectives: PCHObjectiveId[];
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = "pch_user_objectives";
const APPLY_MODE_KEY = "pch_apply_mode";
const HISTORY_KEY = "pch_sync_history";

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [source, setSource] = useState<"local" | "database" | "syncing">("local");
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [applyMode, setApplyMode] = useState<"auto" | "manual">(() => {
    return (localStorage.getItem(APPLY_MODE_KEY) as "auto" | "manual") || "auto";
  });
  const [history, setHistory] = useState<SyncLog[]>([]);
  
  const updateQueue = useRef<Promise<any>>(Promise.resolve());

  const addLog = useCallback((log: Omit<SyncLog, "timestamp">) => {
    const newLog = { ...log, timestamp: new Date() };
    setHistory(prev => [newLog, ...prev].slice(0, 50));
    // Persist history optionally
    try {
      const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      localStorage.setItem(HISTORY_KEY, JSON.stringify([newLog, ...existing].slice(0, 50)));
    } catch (e) {}
  }, []);

  const fetchProfile = async (isManual = false) => {
    if (!user) {
      setLoading(false);
      setSource("local");
      return;
    }

    if (isManual) setSource("syncing");

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      const localRaw = localStorage.getItem(STORAGE_KEY);
      let validatedLocal: PCHObjectiveId[] = [];
      try {
        if (localRaw) {
          const parsed = JSON.parse(localRaw);
          if (Array.isArray(parsed)) validatedLocal = parsed.filter(isValidObjective);
        }
      } catch (e) {}

      if (data) {
        const dbProfile = data as Profile;
        const hasDbObjectives = dbProfile.objectives?.length > 0;
        const hasLocalObjectives = validatedLocal.length > 0;

        let finalObjectives = dbProfile.objectives;
        let finalSource: "database" | "merged" = "database";

        if (isManual && hasLocalObjectives) {
          // Force merge or local win logic can be here. 
          // For now, let's say DB usually wins but we can merge them
          const merged = Array.from(new Set([...dbProfile.objectives, ...validatedLocal]));
          finalObjectives = merged;
          finalSource = "merged";
          
          await supabase
            .from("profiles")
            .update({ objectives: merged })
            .eq("user_id", user.id);
        }

        setProfile({ ...dbProfile, objectives: finalObjectives });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalObjectives));
        setSource("database");
        setLastSync(new Date());
        
        addLog({
          action: isManual ? "Sincronização forçada" : "Perfil carregado",
          source: finalSource as any,
          objectives: finalObjectives
        });
      } else {
        // Initial setup
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({ user_id: user.id, objectives: validatedLocal })
          .select()
          .single();

        if (insertError) throw insertError;
        setProfile(newProfile as Profile);
        setSource("database");
        setLastSync(new Date());
        addLog({ action: "Perfil criado", source: "local", objectives: validatedLocal });
      }

      if (isManual) toast.success("Sincronização concluída");
    } catch (err) {
      console.error("fetchProfile error", err);
      if (isManual) toast.error("Erro na sincronização");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // Load history from storage
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved).map((h: any) => ({ ...h, timestamp: new Date(h.timestamp) })));
    } catch (e) {}
  }, [user]);

  const toggleApplyMode = (mode: "auto" | "manual") => {
    setApplyMode(mode);
    localStorage.setItem(APPLY_MODE_KEY, mode);
    toast.success(`Modo de aplicação: ${mode === "auto" ? "Automático" : "Manual"}`);
  };

  const updateObjectives = async (nextObjectives: PCHObjectiveId[]) => {
    const validated = nextObjectives.filter(isValidObjective);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
    
    if (!user) {
      setProfile(prev => ({
        ...prev,
        id: 'guest',
        user_id: 'guest',
        objectives: validated,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }) as Profile);
      addLog({ action: "Atualização local (visitante)", source: "local", objectives: validated });
      return;
    }

    // Protection against race conditions using a queue
    updateQueue.current = updateQueue.current.then(async () => {
      try {
        setIsUpdating(true);
        setSource("syncing");
        
        const { error } = await supabase
          .from("profiles")
          .upsert({ user_id: user.id, objectives: validated }, { onConflict: "user_id" });

        if (error) throw error;
        
        setProfile(prev => prev ? { ...prev, objectives: validated } : null);
        setSource("database");
        setLastSync(new Date());
        addLog({ action: "Preferências salvas", source: "database", objectives: validated });
      } catch (err) {
        console.error("updateObjectives error", err);
        toast.error("Erro ao salvar no banco");
        setSource("database");
      } finally {
        setIsUpdating(false);
      }
    });
    
    return updateQueue.current;
  };

  const toggleObjective = async (objective: PCHObjectiveId) => {
    const current = profile?.objectives || [];
    const next = current.includes(objective) 
      ? current.filter(o => o !== objective)
      : [...current, objective];

    if (applyMode === "auto") {
      await updateObjectives(next);
      toast.success("Jornada recalibrada");
    } else {
      // In manual mode, we just update local state/storage and wait for user to apply
      setProfile(prev => prev ? { ...prev, objectives: next } : null);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      toast.info("Mudança pendente", { description: "Clique em 'Aplicar' para salvar." });
    }
  };

  const applyChanges = async () => {
    if (!profile) return;
    await updateObjectives(profile.objectives);
    toast.success("Alterações aplicadas com sucesso");
  };

  return { 
    profile, 
    loading, 
    isUpdating,
    toggleObjective,
    applyChanges,
    forceSync: () => fetchProfile(true), 
    source, 
    lastSync,
    applyMode,
    toggleApplyMode,
    history,
    clearHistory: () => { setHistory([]); localStorage.removeItem(HISTORY_KEY); }
  };
};
