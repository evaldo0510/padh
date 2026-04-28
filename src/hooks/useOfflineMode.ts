import { useState, useEffect } from "react";
import { hasSupabaseConfig } from "@/integrations/supabase/config";

const OFFLINE_KEY = "padh_force_offline";
const OFFLINE_EVENT = "padh_offline_change";

export const useOfflineMode = () => {
  const [isOffline, setIsOffline] = useState(() => {
    // If no config, we are always offline
    if (!hasSupabaseConfig()) return true;

    // Otherwise check user preference
    const saved = localStorage.getItem(OFFLINE_KEY);
    return saved === "true";
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === OFFLINE_KEY) {
        setIsOffline(e.newValue === "true");
      }
    };

    const handleCustomEvent = () => {
      const saved = localStorage.getItem(OFFLINE_KEY);
      setIsOffline(saved === "true" || !hasSupabaseConfig());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(OFFLINE_EVENT, handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(OFFLINE_EVENT, handleCustomEvent);
    };
  }, []);

  const toggleOffline = () => {
    // Cannot disable offline if there's no config
    if (!hasSupabaseConfig()) return;

    const newVal = !isOffline;
    localStorage.setItem(OFFLINE_KEY, String(newVal));
    setIsOffline(newVal);

    // Notify other hook instances in the same tab
    window.dispatchEvent(new Event(OFFLINE_EVENT));
  };

  return {
    isOffline,
    toggleOffline,
    canConnect: hasSupabaseConfig(),
  };
};
