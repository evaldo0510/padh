import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const apply = (session: any) => {
      if (!mounted) return;
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? undefined,
          name:
            session.user.user_metadata?.name ||
            session.user.user_metadata?.full_name ||
            session.user.email?.split("@")[0],
        });
      } else {
        setUser(null);
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(session);
      if (mounted) setLoading(false);
    });

    // Always release the loading state, even if session restoration fails.
    // The auth-state listener also handles sessions restored or changed later.
    void supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (!mounted) return;
        if (error) {
          console.error("Supabase getSession failed:", error.message);
          setUser(null);
        } else {
          apply(session);
        }
      })
      .catch((error: unknown) => {
        if (!mounted) return;
        console.error("Supabase getSession failed:", error);
        setUser(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, isAuthenticated: !!user, signOut };
};

// ===== Purchases (Supabase-backed) =====
export const PRODUCT_PRISAO_INTERIOR = "prisao-interior-jornada";
export const PRODUCT_FORMACAO_PCH = "formacao-pch";

export interface Purchase {
  id: string;
  product_id: string;
  plan: string;
  status: string;
  amount_cents: number;
  currency: string;
  expires_at: string | null;
  created_at: string;
}

export const fetchActivePurchase = async (
  userId: string,
  productId: string,
): Promise<Purchase | null> => {
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .eq("status", "active")
    .maybeSingle();
  if (error) {
    console.error("fetchActivePurchase error", error);
    return null;
  }
  return data as Purchase | null;
};
