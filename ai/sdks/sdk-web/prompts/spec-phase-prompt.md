# Spec Phase — Full Product Interview & Spec Generation

Run the Full Product Interview Prompt from AI App Development Handbook Section 1B.

**If app idea seed was provided (arg1):** Use it to pre-fill or shortcut the interview. Generate specs from that seed, asking only clarifying questions as needed.

**If no seed:** Conduct the full interview section by section:
1. APPLICATION OVERVIEW
2. USER TYPES
3. CORE FEATURES
4. DATA MODEL
5. SECURITY
6. UI STRUCTURE
7. API ACTIONS
8. AUTOMATIONS
9. SCALING
10. INTEGRATIONS

**Output files to [root/ai/specs/]:**
- product.md, architecture.md, database.md, ui.md, api.md
- rules.md, security.md, debug.md, checklist.md, lessons.md
- migrations.md, migration_checklist.md

**First-run safety:** If [root/ai/specs/] or target files don't exist, use templates from [root/ai/sdks/sdk-web/specs/] as defaults. Create [root/ai/context/] and [root/ai/tasks/] if missing.

**Default stack:** Next.js | Supabase | Vercel | Supabase Auth
