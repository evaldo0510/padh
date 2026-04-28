import { useEffect, useState } from "react";
import { supabase, supabaseConfig } from "@/integrations/supabase/client";

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

    const readSimulated = (): AuthUser | null => {
      try {
        const raw = localStorage.getItem("padh_simulated_user");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    };

    if (supabaseConfig.isConfigured) {
      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
        if (!mounted) return;
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? undefined,
            name: session.user.email?.split("@")[0],
          });
        } else {
          setUser(readSimulated());
        }
      });

      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? undefined,
            name: session.user.email?.split("@")[0],
          });
        } else {
          setUser(readSimulated());
        }
        setLoading(false);
      });

      return () => {
        mounted = false;
        sub.subscription.unsubscribe();
      };
    } else {
      setUser(readSimulated());
      setLoading(false);

      const onStorage = (e: StorageEvent) => {
        if (e.key === "padh_simulated_user") setUser(readSimulated());
      };
      window.addEventListener("storage", onStorage);
      return () => {
        mounted = false;
        window.removeEventListener("storage", onStorage);
      };
    }
  }, []);

  const signOut = async () => {
    if (supabaseConfig.isConfigured) await supabase.auth.signOut();
    localStorage.removeItem("padh_simulated_user");
    setUser(null);
  };

  return { user, loading, isAuthenticated: !!user, signOut };
};

// --- Purchases (preparado para integração de pagamento futura) ---
const PURCHASES_KEY = "padh_purchases";

export const hasPurchase = (productId: string): boolean => {
  try {
    const raw = localStorage.getItem(PURCHASES_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(productId);
  } catch {
    return false;
  }
};

export const grantPurchase = (productId: string) => {
  try {
    const raw = localStorage.getItem(PURCHASES_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(productId)) {
      list.push(productId);
      localStorage.setItem(PURCHASES_KEY, JSON.stringify(list));
    }
  } catch {
    /* noop */
  }
};
