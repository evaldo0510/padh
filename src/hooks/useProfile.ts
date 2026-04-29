import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { PCHObjectiveId, isValidObjective } from "@/types/objectives";
import { toast } from "sonner";

export interface Profile {
  id: string;
  user_id: string;
  objective: PCHObjectiveId | null;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = "pch_user_objective";

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      const localObj = localStorage.getItem(STORAGE_KEY);
      const validatedLocal = isValidObjective(localObj) ? localObj : null;

      if (data) {
        const dbProfile = data as Profile;
        
        setProfile(dbProfile);
        
        // SYNC LOGIC:
        if (dbProfile.objective && validatedLocal && dbProfile.objective !== validatedLocal) {
          // Conflict: Inform user that DB will be used, but they can change it
          toast.info("Objetivos diferentes encontrados", {
            description: `Mantendo "${dbProfile.objective}" da sua conta. Você pode alterar nas configurações.`,
          });
          localStorage.setItem(STORAGE_KEY, dbProfile.objective);
        } else if (dbProfile.objective) {
          localStorage.setItem(STORAGE_KEY, dbProfile.objective);
        } else if (validatedLocal) {
          await supabase
            .from("profiles")
            .update({ objective: validatedLocal })
            .eq("user_id", user.id);
          setProfile({ ...dbProfile, objective: validatedLocal });
        } else {
          setProfile(dbProfile);
        }
      } else {
        // Create profile if it doesn't exist (initial sync)
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({ 
            user_id: user.id,
            objective: validatedLocal
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setProfile(newProfile as Profile);
      }
    } catch (err) {
      console.error("Error fetching/creating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateObjective = async (objective: PCHObjectiveId) => {
    if (!isValidObjective(objective)) {
      console.error("Invalid objective:", objective);
      return;
    }

    // Always update local for instant UI feel
    localStorage.setItem(STORAGE_KEY, objective);

    if (!user) {
      setProfile(prev => prev ? { ...prev, objective } : null);
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ user_id: user.id, objective }, { onConflict: "user_id" });

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, objective } : null);
      toast.success("Objetivo atualizado", {
        description: "Sua jornada foi personalizada para o seu novo foco."
      });
    } catch (err) {
      console.error("Error updating objective:", err);
      toast.error("Erro ao salvar objetivo");
    }
  };

  return { profile, loading, updateObjective, refreshProfile: fetchProfile };
};
