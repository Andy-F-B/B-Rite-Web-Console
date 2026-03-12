# DATABASE SPEC

<!-- Filled from B1: web-app-summary.txt; reflects current schema.sql -->

## Tables

profiles
  id uuid primary key references auth.users(id)
  email text
  name text
  role text (admin, user, moderator)
  avatar text
  created_at timestamptz

scripts
  id uuid primary key
  user_id uuid references auth.users(id)
  title text
  content text
  created_at, updated_at timestamptz

saved_items
  id uuid primary key
  user_id uuid references auth.users(id)
  type text (script, sdk, plugin, output)
  name text
  content text
  metadata jsonb
  created_at timestamptz

plugins
  id uuid primary key
  name text
  description text
  install_path text
  created_at timestamptz
