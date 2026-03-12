# ARCHITECTURE

<!-- Template: install to [root/ai/specs/architecture.md] -->
<!-- Source: AI App Development Handbook 2.4 -->

Frontend: Next.js (React, TypeScript)
Backend: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
Hosting: Vercel
Database: PostgreSQL via Supabase

Data Flow: Client → Supabase JS Client → PostgreSQL

Auth: Supabase Auth (email/password + magic link)

Environment Variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
