-- Add folders and archive support for scripts

create table folders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  created_at timestamptz default now()
);
alter table folders enable row level security;
create policy "Users select own folders" on folders for select using (user_id = auth.uid());
create policy "Users insert own folders" on folders for insert with check (user_id = auth.uid());
create policy "Users update own folders" on folders for update using (user_id = auth.uid());
create policy "Users delete own folders" on folders for delete using (user_id = auth.uid());
create index folders_user_id_idx on folders(user_id);

alter table scripts add column folder_id uuid references folders(id) on delete set null;
alter table scripts add column archived_at timestamptz;
