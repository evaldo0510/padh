// Compat shim — Lovable Cloud is always configured once enabled.
// Kept so legacy components compile without churn.
export const supabaseConfig = {
  isConfigured: true,
  url: import.meta.env.VITE_SUPABASE_URL ?? "",
  anonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
};

export const hasSupabaseConfig = () => true;
