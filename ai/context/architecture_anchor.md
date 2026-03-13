# ARCHITECTURE ANCHOR

Stack: Next.js + Supabase + Vercel

Auth: Supabase Auth (auth.uid() identifies users)

Client communicates with DB using:
- /lib/supabase.ts — browser client (use client components)
- /lib/supabase-server.ts — server client (server components, actions, routes)

Pages: / (landing), /console (editor), /downloads, /saved, /library, /library/new, /library/[id], /profile, /login, /signup, /privacy

API: /api/downloads/* for template and SDK downloads

Nav: ConsoleNav — mobile hamburger (<600px), desktop horizontal. Library link included.
