import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Verifica se o usuário autenticado possui o papel de administrador.
 *
 * A checagem é feita lendo a tabela `user_roles` diretamente. RLS garante
 * que cada usuário só enxerga seus próprios papéis, então a query retorna
 * a linha se (e somente se) o usuário for admin.
 */
export function useIsAdmin() {
  // A conta precisa corresponder ao e-mail explicitamente configurado no ambiente
  // e também possuir a role admin no banco. Não confiar apenas em dados do navegador.
  const configuredAdminEmail = (import.meta.env.VITE_PADH_ADMIN_EMAIL ?? "").trim().toLowerCase();
  const { user, loading: authLoading } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["is-admin", user?.id],
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });

  return {
    isAdmin: !!data && !!configuredAdminEmail && user?.email?.trim().toLowerCase() === configuredAdminEmail,
    loading: authLoading || (!!user?.id && isLoading),
    error,
  };
}
