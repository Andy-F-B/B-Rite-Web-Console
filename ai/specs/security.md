# SUPABASE SECURITY MODEL

<!-- Template: install to [root/ai/specs/security.md] -->
<!-- Source: AI App Development Handbook 3.1 -->

Authentication is handled using Supabase Auth. Users are identified by: auth.uid()

All user-owned data must include: user_id uuid references auth.users(id)

-------------------------------------------------
GENERAL SECURITY RULES
-------------------------------------------------
1. Row Level Security must be enabled on ALL tables.
2. Users may only access rows where: user_id = auth.uid()
3. Admin users may access all rows via is_admin() helper.
4. Never allow anonymous public read access unless explicitly required.
5. Insert operations must verify ownership.
6. Updates must only modify rows owned by the user.

-------------------------------------------------
CRITICAL RULE
-------------------------------------------------
Never create policies that allow: TRUE or auth.role() = 'anon' unless explicitly instructed.

-------------------------------------------------
ADMIN POLICY
-------------------------------------------------
Use is_admin() SECURITY DEFINER helper to avoid infinite recursion when applying admin policies to tables that reference profiles. Add this function once in initial schema migration.

-------------------------------------------------
PROFILES TABLE
-------------------------------------------------
profiles uses id = auth.uid() (id references auth.users). No user_id column needed for profiles.
