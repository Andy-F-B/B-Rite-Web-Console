# Web SDK Project

Next.js + Supabase + Vercel. AI-assisted development via b-rite and sdk-web.

## Project Layout

```
├── app/              # Next.js pages (App Router)
├── components/       # React UI components
├── lib/              # Supabase clients, queries, schemas
├── db/               # Schema and migrations
│   ├── schema.sql    # Current schema (always up to date)
│   ├── migrations/  # Numbered migration files
│   └── seed/        # Seed data for local dev
├── feature-packs/    # Reusable modules (auth, etc.)
├── UI/               # HTML previews, dev-output
└── ai/               # AI specs, b-rite engine, SDKs
```

## How ai/ Relates to app/, lib/, db/

| Folder | Role | Used By |
|--------|------|---------|
| **ai/specs/** | Product, architecture, database, security, UI, API specs | AI reads to generate code |
| **ai/context/** | Short anchors (product, architecture, database, security) | AI context for builds |
| **ai/tasks/** | Feature task files | AI reads to implement features |
| **ai/b-rite/** | b-rite language engine | Scripts that drive AI workflow |
| **ai/sdks/** | sdk-web (phases, prompts) | AI-driven web app pipeline |

**app/, lib/, db/** — These are the actual application. They compile and run without ai/. The ai/ folder is for specs, planning, and automation. If you delete ai/, the Next.js app still builds and runs; you lose only the AI workflow and planning docs.

## First Run

Before the app can run, you need a Supabase project and env vars:

1. **Create a Supabase project** at [supabase.com](https://supabase.com) → New Project
2. **Run migrations** — In Supabase → SQL Editor, run in order:
   - `db/migrations/001_initial_schema.sql`
   - `db/migrations/002_app_tables.sql`
   - `db/migrations/003_folders_archive.sql`
3. **Get API keys** — Project Settings → API → copy **Project URL** and **anon public** key
4. **Set env vars** — Copy `.env.example` to `.env.local` and replace placeholders with your URL and key
5. **Install and run:**
   ```bash
   npm install
   npm run dev
   ```
6. Open http://localhost:3000

## Run Locally (after first run)

```bash
npm run dev
```

## Deploy

1. Push to Git
2. Connect to Vercel, import repo
3. Create Supabase project, run migrations
4. Add env vars to Vercel
5. Redeploy

See `*dev* !sdk|003| br : { run; <deployGuide> } :` for guided setup.

## Feature Packs

See [feature-packs/INDEX.md](feature-packs/INDEX.md) for installed packs and plug-in instructions.

## Seed Data

See [db/seed/README.md](db/seed/README.md) for instructions.
