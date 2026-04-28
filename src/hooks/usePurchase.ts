import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, fetchActivePurchase, type Purchase } from "./useAuth";

export const usePurchase = (productId: string) => {
  const { user, loading: authLoading } = useAuth();
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setPurchase(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const p = await fetchActivePurchase(user.id, productId);
    setPurchase(p);
    setLoading(false);
  }, [user, productId]);

  useEffect(() => {
    if (authLoading) return;
    refresh();
  }, [authLoading, refresh]);

  // Realtime updates so the UI reflects a new purchase right after checkout
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`purchases-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "purchases",
          filter: `user_id=eq.${user.id}`,
        },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refresh]);

  return {
    purchase,
    hasAccess: !!purchase,
    loading: authLoading || loading,
    refresh,
  };
};
