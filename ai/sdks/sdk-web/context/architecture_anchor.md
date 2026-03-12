# ARCHITECTURE ANCHOR

<!-- Template: install to [root/ai/context/architecture_anchor.md] -->
<!-- Source: AI App Development Handbook 4.2 -->
<!-- Stack, auth, and client-DB data flow in under 15 lines. -->

Stack: Next.js + Supabase + Vercel

Auth: Supabase Auth (auth.uid() identifies users)

Client communicates with DB using:
- /lib/supabase.ts — browser client (use client components)
- /lib/supabase-server.ts — server client (server components, actions, routes)
