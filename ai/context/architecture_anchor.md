# ARCHITECTURE ANCHOR

Stack: Next.js + Supabase + Vercel

Auth: Supabase Auth (auth.uid() identifies users)

Client communicates with DB using:
- /lib/supabase.ts — browser client (use client components)
- /lib/supabase-server.ts — server client (server components, actions, routes)
