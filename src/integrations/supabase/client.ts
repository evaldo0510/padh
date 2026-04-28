import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  isConfigured: !!supabaseUrl && !!supabaseAnonKey,
};

export const hasSupabaseConfig = () => supabaseConfig.isConfigured;

// Only create real client when config exists; otherwise export a no-op stub
// that mirrors the methods used in the app to avoid runtime errors.
export const supabase: SupabaseClient = hasSupabaseConfig()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({
          data: null,
          error: new Error("Supabase not configured"),
        }),
        signUp: async () => ({
          data: null,
          error: new Error("Supabase not configured"),
        }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({ single: async () => ({ data: null, error: null }) }),
        }),
        upsert: async () => ({ data: null, error: null }),
        insert: async () => ({ data: null, error: null }),
        update: () => ({ eq: async () => ({ data: null, error: null }) }),
        delete: () => ({ eq: async () => ({ data: null, error: null }) }),
      }),
    } as unknown as SupabaseClient);

/**
 * SQL MIGRATION para o Supabase:
 *
 * create table user_progress (
 *   user_id uuid references auth.users not null primary key,
 *   progress_data jsonb not null default '{}'::jsonb,
 *   updated_at timestamp with time zone default timezone('utc'::text, now())
 * );
 *
 * create table course_progress (
 *   user_id uuid references auth.users not null primary key,
 *   progress_data jsonb not null default '{}'::jsonb,
 *   updated_at timestamp with time zone default timezone('utc'::text, now())
 * );
 */
