-- Persist completion state for Livro-Curso PCH without touching existing progress tables.
create table if not exists public.padh_livro_curso_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  chapter_id text not null,
  completed boolean not null default true,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id)
);

alter table public.padh_livro_curso_progress enable row level security;

drop policy if exists padh_livro_curso_progress_select_own on public.padh_livro_curso_progress;
create policy padh_livro_curso_progress_select_own
  on public.padh_livro_curso_progress
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists padh_livro_curso_progress_insert_own on public.padh_livro_curso_progress;
create policy padh_livro_curso_progress_insert_own
  on public.padh_livro_curso_progress
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists padh_livro_curso_progress_update_own on public.padh_livro_curso_progress;
create policy padh_livro_curso_progress_update_own
  on public.padh_livro_curso_progress
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists padh_livro_curso_progress_delete_own on public.padh_livro_curso_progress;
create policy padh_livro_curso_progress_delete_own
  on public.padh_livro_curso_progress
  for delete to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.padh_livro_curso_progress to authenticated;
