# Audit Report — UI Updates

**Scope:** ui_updates (ConsoleNav auth, Downloads cleanup, Profile pic, Saved Copy/Folders/Archive)  
**Date:** 2025-03-12

---

## Security Audit

### RLS — Tables

| Table       | RLS | Select | Insert | Update | Delete |
|-------------|-----|--------|--------|--------|--------|
| profiles    | ✓   | ✓ (own) | trigger | ✓ (own) | —      |
| folders     | ✓   | ✓ (own) | ✓ (own) | ✓ (own) | ✓ (own) |
| scripts     | ✓   | ✓ (own) | ✓ (own) | ✓ (own) | ✓ (own) |
| saved_items | ✓   | ✓ (own) | ✓ (own) | ✓ (own) | ✓ (own) |
| plugins     | ✓   | auth   | admin  | admin  | admin  |

**PASS** — All tables have RLS. User-owned tables use `user_id = auth.uid()`.

### Policies

- **No `USING (TRUE)` or `auth.role() = 'anon'`** — PASS
- **plugins** — `auth.role() = 'authenticated'` for read; `is_admin()` for write — acceptable per spec

### Queries (ui_updates)

| Location      | Query                          | Ownership check      |
|---------------|--------------------------------|----------------------|
| ConsoleNav    | profiles select by id          | id = user.id         |
| Saved page    | scripts select/update/delete   | user_id = user.id    |
| Saved page    | folders select/insert          | user_id = user.id    |

**PASS** — All queries filter by `user_id` or `id` from authenticated user.

### Data Leaks

- Scripts, folders: user-scoped. No cross-user access.
- Profile: read own only.

**PASS**

### Avatar URL

- `profiles.avatar` rendered as `<img src={avatar}>`. User-controlled URL.
- **Recommendation:** Validate avatar URL is `http`/`https` in ProfileForm (Zod schema). Low risk if URL input type is used.

---

## Checklist Verification (ui_updates)

| Item                          | Status |
|-------------------------------|--------|
| Nav: Sign in/up when signed out | PASS |
| Nav: Sign out, Profile when signed in | PASS |
| Nav: Profile pic + name when avatar URL set | PASS |
| Downloads: Two items only (Template, Web SDK zip) | PASS |
| Saved: Copy button | PASS |
| Saved: Three-dots (Archive, Save to folder) | PASS |
| Saved: New folder at top | PASS |
| Saved: Archived toggle | PASS |
| Migration 003 applied | User must run in Supabase |

---

## Summary

**Security:** PASS — RLS correct, no anon access, user-scoped queries.  
**Checklist:** PASS — All ui_updates items implemented.  
**Action:** Run `db/migrations/003_folders_archive.sql` in Supabase if not yet applied.
