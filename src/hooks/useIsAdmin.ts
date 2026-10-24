import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Confirma autorização administrativa no servidor.
 * A regra de e-mail confirmado fica no RPC/RLS, não apenas na interface.
 */
export function useIsAdmin() {
  const { user, loading: authLoading } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["is-admin", user?.id],
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("is_designated_admin");
      if (error) throw error;
      return data === true;
    },
  });

  return {
    isAdmin: data === true,
    loading: authLoading || (!!user?.id && isLoading),
    error,
  };
}
