# Security & Checklist Audit — B-Rite Console
**Date:** 2025-03-12 | **Scope:** Full

## Security Audit — PASS

### RLS Status
| Table | RLS | SELECT | INSERT | UPDATE | DELETE |
|-------|-----|--------|--------|--------|--------|
| profiles | ✓ | own | trigger | own | — |
| scripts | ✓ | own | own | own | own |
| saved_items | ✓ | own | own | own | own |
| plugins | ✓ | authenticated | admin | admin | admin |

- No USING (TRUE) or anon public access
- is_admin() used for plugins admin policies
- handle_new_user trigger creates profile on signup

### Gaps
- profiles: No user DELETE policy (intentional — profile deletion typically via auth)
- No storage buckets in use

## Checklist Verification

### Auth — PASS
- Components, lib, RLS in place

### Script Editor — PASS
- ScriptEditor, brite-parser, Auto Prompt dropdown (from type scripts), auto-insert `{ ` after `br :`/`} :`, syntax errors with line numbers, insertAtCursor, save gate (redirect to login)

### Downloads — PASS
- API routes, page, download cards, Install Plugins section

### Saved — PARTIAL
- Table, RLS exist; /saved page exists — full CRUD to verify

### Plugins — PARTIAL
- Table, RLS exist; install via b-rite <install> (documented on downloads)

## B1 Context Applied
- Specs filled from web-app-summary.txt
- UI branding updated to "B-Rite Console" per brite-console-preview.html
- Colors/layout already matched (globals.css)

## Build Fixes (2025-03-12)
- lib/supabase-server.ts, middleware.ts: typed cookiesToSet (fix implicit any)
- app/console/page.tsx: useSearchParams wrapped in Suspense boundary
- Build: PASS

## Env Config Troubleshooting (2025-03-12)
- **Confirmed:** Error is real — `getEnv()` in lib/env.ts throws when `process.env.NEXT_PUBLIC_*` is missing; not static text.
- **Added:** `/api/debug-config` — returns `{ hasUrl, hasKey }` (no secrets). If server has vars but client fails: `NEXT_PUBLIC_` vars are inlined at build time → clear Vercel build cache and redeploy.
- **Updated:** Error message now mentions both .env.local (local) and Vercel (production). Console page includes advanced troubleshooting link.
