# Security & Checklist Audit — B-Rite Console
**Date:** 2025-03-13 | **Scope:** Full

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
- ScriptEditor, brite-parser, Format, Auto-fill, Save
- Auto Prompt dropdown, auto-insert `{ ` after `br :`/`} :`
- Syntax errors with line numbers, insertAtCursor, save gate (redirect to login)
- **New:** Script mode (native/SDKs), SDK dropdown, FunctionSearchBar (Ctrl+Alt+D)
- **New:** Syntax highlighting (tokenizer, Green text toggle)
- **New:** Auto-format `};` `} ;` `:` behaviors

### Downloads — PASS
- API routes, page, download cards, Install Plugins section

### Saved — PARTIAL
- Table, RLS exist; /saved page exists — full CRUD to verify

### Plugins — PARTIAL
- Table, RLS exist; install via b-rite <install> (documented on downloads)

## Summary
Security model unchanged. All tables have RLS. No policy gaps. Checklist reflects script editor enhancements (syntax highlighting, function search, green text toggle).
