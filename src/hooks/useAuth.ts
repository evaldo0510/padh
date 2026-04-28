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

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      apply(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      apply(session);
      setLoading(false);
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

export const recordPurchase = async (params: {
  userId: string;
  productId: string;
  plan: "mensal" | "anual" | "vitalicio";
  amountCents: number;
  currency?: string;
}): Promise<Purchase | null> => {
  const expires_at =
    params.plan === "mensal"
      ? new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString()
      : params.plan === "anual"
        ? new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString()
        : null;

  const { data, error } = await supabase
    .from("purchases")
    .upsert(
      {
        user_id: params.userId,
        product_id: params.productId,
        plan: params.plan,
        amount_cents: params.amountCents,
        currency: params.currency ?? "BRL",
        status: "active",
        expires_at,
      },
      { onConflict: "user_id,product_id" },
    )
    .select()
    .maybeSingle();

  if (error) {
    console.error("recordPurchase error", error);
    return null;
  }
  return data as Purchase | null;
};
