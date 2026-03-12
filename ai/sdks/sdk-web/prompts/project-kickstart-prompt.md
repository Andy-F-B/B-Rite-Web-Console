# Project Kickstart — Full Repository Initialize

You are a senior software architect. Initialize a new repository optimized for AI-assisted development.

**Stack:** Next.js (TypeScript), Supabase, PostgreSQL, Vercel

**STEP 1:** Generate the full folder structure:
- app/, components/, lib/, hooks/, styles/
- db/schema.sql, db/migrations/
- ai/brain.md, ai/specs/ (product.md, architecture.md, database.md, ui.md, api.md, rules.md, security.md, debug.md, checklist.md, lessons.md, migrations.md, migration_checklist.md)
- ai/context/ (all four anchors)
- ai/tasks/example_feature.md
- feature-packs/
- middleware.ts
- lib/supabase.ts, supabase-server.ts, env.ts, database.types.ts (placeholder)
- lib/schemas/

**STEP 2:** Generate starter content for each AI spec file. brain.md must include: development workflow, migration rules, architecture rules, security requirements.

**STEP 3:** Create security.md with RLS requirements, user ownership rules, admin permissions.

**STEP 4:** Generate starter database schema: profiles table with RLS, auto-create profile trigger, is_admin() helper.

**STEP 5:** Generate auth feature pack at feature-packs/auth-system/.

**STEP 6:** Generate ai/tasks/example_feature.md in correct format.

**STEP 7:** Generate ai/specs/checklist.md with feature completion checks.

**OUTPUT:** Return full content of every file, ready to paste. Use templates from [root/ai/sdks/sdk-web/specs/].
