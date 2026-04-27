import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
