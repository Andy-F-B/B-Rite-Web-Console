# Auth System Feature Pack

Reusable auth module. Sign up, sign in, profile management via Supabase Auth.

## Plug-In Instructions

### 1. Components (already in project if using quickStart)

- `SignInForm`, `SignUpForm`, `ProfileForm`, `SignOutButton`
- Location: `components/`

### 2. Pages

- `/login` — SignInForm
- `/signup` — SignUpForm  
- `/profile` — ProfileForm (protected)

### 3. Lib

- `lib/supabase.ts` — browser client
- `lib/supabase-server.ts` — server client
- `lib/schemas/profile.schema.ts` — Zod validation

### 4. Database

- `profiles` table with RLS (SELECT/UPDATE own row)
- Migration: `db/migrations/001_initial_schema.sql`

### 5. Env

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Dependencies

- @supabase/ssr
- Next.js App Router
