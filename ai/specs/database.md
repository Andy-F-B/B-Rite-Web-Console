# DATABASE SPEC

Table: profiles
  id uuid primary key references auth.users(id) on delete cascade
  email text
  name text
  role text default 'user' check (role in ('admin', 'user', 'moderator'))
  avatar text
  created_at timestamptz default now()

Table: scripts
  id uuid primary key default gen_random_uuid()
  user_id uuid references auth.users(id) on delete cascade
  title text not null
  content text not null
  created_at timestamptz default now()
  updated_at timestamptz default now()

Table: saved_items
  id uuid primary key default gen_random_uuid()
  user_id uuid references auth.users(id) on delete cascade
  type text not null check (type in ('script', 'sdk', 'plugin', 'output'))
  name text not null
  content text
  metadata jsonb default '{}'
  created_at timestamptz default now()

Table: plugins (catalog — admin-managed)
  id uuid primary key default gen_random_uuid()
  name text not null
  description text
  install_path text
  created_at timestamptz default now()

All user-owned tables include: user_id uuid references auth.users(id)
