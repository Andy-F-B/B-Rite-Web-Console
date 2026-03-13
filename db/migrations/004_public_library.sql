-- Public Library: public posts and reactions
-- Note: Public read (using true) explicitly required for social library feature

create table public_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text not null,
  version text not null,
  github_url text,
  content text not null,
  content_type text not null check (content_type in ('snippet', 'folder')),
  allow_public_use boolean default true,
  tags text[] default '{}',
  folder_data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public_posts enable row level security;
create policy "Public read posts" on public_posts for select using (true);
create policy "Users insert own posts" on public_posts for insert with check (user_id = auth.uid());
create policy "Users update own posts" on public_posts for update using (user_id = auth.uid());
create policy "Users delete own posts" on public_posts for delete using (user_id = auth.uid());
create index public_posts_user_id_idx on public_posts(user_id);
create index public_posts_created_at_idx on public_posts(created_at desc);

create table post_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null check (type in ('thumbs_up')),
  created_at timestamptz default now(),
  unique(post_id, user_id, type)
);
alter table post_reactions enable row level security;
create policy "Public read reactions" on post_reactions for select using (true);
create policy "Users insert own reactions" on post_reactions for insert with check (user_id = auth.uid());
create policy "Users delete own reactions" on post_reactions for delete using (user_id = auth.uid());
create index post_reactions_post_id_idx on post_reactions(post_id);
