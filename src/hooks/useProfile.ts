import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  user_id: string;
  objective: string | null;
  created_at: string;
  updated_at: string;
}

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

      if (data) {
        setProfile(data as Profile);
        // Sync local objective to DB if DB is empty
        const localObj = localStorage.getItem("pch_user_objective");
        if (!data.objective && localObj) {
          await supabase
            .from("profiles")
            .update({ objective: localObj })
            .eq("user_id", user.id);
        }
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({ 
            user_id: user.id,
            objective: localStorage.getItem("pch_user_objective") 
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

  const updateObjective = async (objective: string) => {
    if (!user) {
      // Fallback to localStorage for guest users
      localStorage.setItem("pch_user_objective", objective);
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ user_id: user.id, objective }, { onConflict: "user_id" });

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, objective } : null);
      localStorage.setItem("pch_user_objective", objective);
    } catch (err) {
      console.error("Error updating objective:", err);
    }
  };

  return { profile, loading, updateObjective, refreshProfile: fetchProfile };
};
