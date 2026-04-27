import { useState, useEffect } from 'react';
import { hasSupabaseConfig } from '@/integrations/supabase/client';

const OFFLINE_KEY = 'padh_force_offline';

export const useOfflineMode = () => {
  const [isOffline, setIsOffline] = useState(() => {
    // If no config, we are always offline
    if (!hasSupabaseConfig()) return true;
    
    // Otherwise check user preference
    const saved = localStorage.getItem(OFFLINE_KEY);
    return saved === 'true';
  });

  const toggleOffline = () => {
    // Cannot disable offline if there's no config
    if (!hasSupabaseConfig()) return;
    
    const newVal = !isOffline;
    setIsOffline(newVal);
    localStorage.setItem(OFFLINE_KEY, String(newVal));
  };

  // Sync with config changes (rare but possible in dev)
  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setIsOffline(true);
    }
  }, []);

  return {
    isOffline,
    toggleOffline,
    canConnect: hasSupabaseConfig()
  };
};
