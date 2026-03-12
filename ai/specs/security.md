# SUPABASE SECURITY MODEL

<!-- From sdk-web template; matches current schema -->

Authentication: Supabase Auth. Users identified by auth.uid()

All user-owned data: user_id uuid references auth.users(id)

## Rules
1. RLS enabled on ALL tables.
2. Users access only rows where user_id = auth.uid()
3. Admin users: is_admin() for full access.
4. Never allow anonymous public read unless explicitly required.
5. Insert: verify ownership.
6. Updates: only modify user-owned rows.

## Critical
Never create policies: USING (TRUE) or auth.role() = 'anon' unless explicitly instructed.

## Admin
Use is_admin() SECURITY DEFINER helper. handle_new_user trigger for profile creation.
