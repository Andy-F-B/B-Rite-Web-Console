# TASK: Script Editor

## GOAL
Users can write b-rite scripts with auto-formatting, auto-fill, syntax validation, and save to their account.

## DATABASE
Tables involved:
- scripts — user_id, title, content, created_at, updated_at

## UI
Components required:
- ScriptEditor — textarea with Format, Auto-fill, Save; syntax validation; error list
- AutoTypeSelector — dropdown (Default, Task, Help)

Pages affected:
- /app/console/page.tsx

## VALIDATION (Zod)
- b-rite syntax: lib/brite-parser.ts validateBrite(content) — code-based, not LLM

## BACKEND
Query functions in lib/:
- Insert script via Supabase client (user_id, title, content)
- Load script by id for ?load= query param

## BEHAVIOR
1. User visits /console, sees editor with auto-type dropdown
2. User selects template or types; Format/Auto-fill available
3. Syntax errors shown in red
4. User clicks Save; if authenticated, script inserted; else redirect to login

## API ACTIONS
- (Client-side Supabase insert; no API route)

## DONE WHEN
- [ ] User can write and format scripts
- [ ] Syntax validation shows errors
- [ ] User can save to scripts table
- [ ] Only user's own scripts visible
- [ ] Error states handled

## NOTES
Auto-type options: Default template, Task creation, Help. brite-parser.ts for validation.
