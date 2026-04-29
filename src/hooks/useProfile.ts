import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { PCHObjectiveId, isValidObjective } from "@/types/objectives";
import { toast } from "sonner";

export interface Profile {
  id: string;
  user_id: string;
  objectives: PCHObjectiveId[];
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = "pch_user_objectives"; // Use plural now

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [source, setSource] = useState<"local" | "database" | "syncing">("local");
  const [lastSync, setLastSync] = useState<Date | null>(null);

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

      // Migrate old storage key if necessary or just use the new plural one
      const localRaw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("pch_user_objective");
      let validatedLocal: PCHObjectiveId[] = [];
      
      try {
        if (localRaw) {
          // If it starts with [ it's probably the new array format
          if (localRaw.startsWith('[')) {
            const parsed = JSON.parse(localRaw);
            if (Array.isArray(parsed)) {
              validatedLocal = parsed.filter(isValidObjective);
            }
          } else if (isValidObjective(localRaw)) {
            // Backward compatibility for single string
            validatedLocal = [localRaw];
          }
        }
      } catch (e) {
        console.error("Error parsing local objectives", e);
      }

      if (data) {
        const dbProfile = data as Profile;
        setProfile(dbProfile);
        setLastSync(new Date());
        
        // SYNC LOGIC:
        const hasDbObjectives = dbProfile.objectives && dbProfile.objectives.length > 0;
        const hasLocalObjectives = validatedLocal.length > 0;

        if (hasDbObjectives) {
          // Database wins
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbProfile.objectives));
          setSource("database");
        } 
        else if (hasLocalObjectives) {
          // Local wins because DB is empty
          await supabase
            .from("profiles")
            .update({ objectives: validatedLocal })
            .eq("user_id", user.id);
          setProfile({ ...dbProfile, objectives: validatedLocal });
          setSource("database");
        } else {
          setSource("database");
        }
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({ 
            user_id: user.id,
            objectives: validatedLocal
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setProfile(newProfile as Profile);
        setSource("database");
        setLastSync(new Date());
      }

      if (isManual) {
        toast.success("Dados sincronizados com sucesso.");
      }
    } catch (err) {
      console.error("Error fetching/creating profile:", err);
      if (isManual) toast.error("Falha ao sincronizar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const toggleObjective = async (objective: PCHObjectiveId) => {
    const currentObjectives = profile?.objectives || [];
    const isSelected = currentObjectives.includes(objective);
    
    let nextObjectives: PCHObjectiveId[];
    if (isSelected) {
      nextObjectives = currentObjectives.filter(o => o !== objective);
    } else {
      nextObjectives = [...currentObjectives, objective];
    }

    // Validation
    const validated = nextObjectives.filter(isValidObjective);

    // Update local immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
    
    if (!user) {
      // Just update state if guest
      setProfile(prev => ({
        ...prev,
        id: 'guest',
        user_id: 'guest',
        objectives: validated,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      return;
    }

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
      
      toast.success(isSelected ? "Objetivo removido" : "Objetivo adicionado", {
        description: "Sua jornada está sendo recalibrada."
      });
    } catch (err) {
      console.error("Error updating objectives:", err);
      toast.error("Erro ao salvar preferências");
      setSource("database");
    } finally {
      setIsUpdating(false);
    }
  };

  return { 
    profile, 
    loading, 
    isUpdating,
    updateObjectives: toggleObjective, // Rename or keep for compatibility if needed
    toggleObjective,
    forceSync: () => fetchProfile(true), 
    source, 
    lastSync 
  };
};
