-- Current full schema (always up to date)
-- Source: migrations applied in order

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  role text default 'user' check (role in ('admin', 'user', 'moderator')),
  avatar text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users read own profile" on profiles for select using (id = auth.uid());
create policy "Users update own profile" on profiles for update using (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
exception when others then
  raise warning 'handle_new_user: profile insert failed for user %: %', new.id, sqlerrm;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean as $$
  select role = 'admin' from public.profiles where id = auth.uid();
$$ language sql security definer stable;

-- scripts, saved_items, plugins tables
create table scripts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table scripts enable row level security;
create policy "Users select own scripts" on scripts for select using (user_id = auth.uid());
create policy "Users insert own scripts" on scripts for insert with check (user_id = auth.uid());
create policy "Users update own scripts" on scripts for update using (user_id = auth.uid());
create policy "Users delete own scripts" on scripts for delete using (user_id = auth.uid());
create index scripts_user_id_idx on scripts(user_id);

create table saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null check (type in ('script', 'sdk', 'plugin', 'output')),
  name text not null,
  content text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);
alter table saved_items enable row level security;
create policy "Users select own saved_items" on saved_items for select using (user_id = auth.uid());
create policy "Users insert own saved_items" on saved_items for insert with check (user_id = auth.uid());
create policy "Users update own saved_items" on saved_items for update using (user_id = auth.uid());
create policy "Users delete own saved_items" on saved_items for delete using (user_id = auth.uid());
create index saved_items_user_id_idx on saved_items(user_id);

create table plugins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  install_path text,
  created_at timestamptz default now()
);
alter table plugins enable row level security;
create policy "Authenticated read plugins" on plugins for select using (auth.role() = 'authenticated');
create policy "Admins insert plugins" on plugins for insert with check (public.is_admin());
create policy "Admins update plugins" on plugins for update using (public.is_admin());
create policy "Admins delete plugins" on plugins for delete using (public.is_admin());
