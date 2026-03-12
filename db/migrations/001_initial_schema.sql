-- Initial schema — profiles + RLS + triggers (handbook 3.5)
-- Run in Supabase SQL Editor.

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
