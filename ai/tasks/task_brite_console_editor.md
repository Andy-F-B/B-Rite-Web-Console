# TASK: B-Rite Console Editor

## GOAL
B-Rite Console landing page linking to Editor; Editor with B-Rite syntax validation (red underline + description), auto-insert `{` + space after `:`, Auto Prompt dropdown from [root/ai/type scripts], insert-on-focus/Enter, and save only when signed in.

## DATABASE
Tables involved:
- scripts — user_id, title, content (existing; no changes)

Fields required (if new):
- (none)

## UI
Components required:
- B-Rite Console landing — links to Editor, related buttons
- ScriptEditor (enhanced) — textarea with:
  - Syntax error underline (red) + short description
  - Auto-format: after `:` typed, insert `{` and space
  - Auto Prompt dropdown — above editor, click to open; lists all options from [root/ai/type scripts] (brite-auto, brite-webSDK, brite-dev-auto, brite-ADMIN-auto, brite-webSDK-dev, brite-webSDK-ADMIN-auto)
  - On focus or Enter: insert selected Auto Prompt text at cursor (for syntax/copy-paste; no AI)
- Save button — disabled or redirects to login when not signed in

Pages affected:
- /app/page.tsx — B-Rite Console landing
- /app/console/page.tsx — Editor

## VALIDATION (Zod)
- (none for editor content — use brite-parser validateBrite)

## BACKEND
Query functions required in lib/:
- (existing) Supabase scripts insert — requires auth; redirect to /login if not signed in
- Optional: API route to read [root/ai/type scripts] and return Auto Prompt options (name + text) for dropdown

## BEHAVIOR
1. User visits / — sees B-Rite Console, links to Editor
2. User visits /console — sees editor with Auto Prompt dropdown above
3. User selects Auto Prompt option — text available for insert
4. User focuses editor or presses Enter — selected Auto Prompt text inserted at cursor
5. User types `:` — system auto-inserts `{` and space
6. Syntax errors — underlined in red with short description
7. User clicks Save — if not signed in, redirect to /login; if signed in, save to scripts table

## API ACTIONS
- (Optional) GET /api/auto-prompts — returns list of { name, text } from [root/ai/type scripts]
- Supabase scripts insert (client-side, auth-gated)

## DONE WHEN
- [ ] B-Rite Console landing links to Editor
- [ ] Syntax errors underlined in red with description
- [ ] Auto-insert `{` + space after `:`
- [ ] Auto Prompt dropdown lists all [root/ai/type scripts] options
- [ ] Focus/Enter inserts selected Auto Prompt text at cursor
- [ ] Save requires sign-in; redirects to login otherwise
- [ ] Error states handled

## NOTES
- Auto Prompt options: brite-auto, brite-webSDK, brite-dev-auto, brite-ADMIN-auto, brite-webSDK-dev, brite-webSDK-ADMIN-auto. Each .ahk has Send text — extract for dropdown. May need build-time or API to read .ahk files; or ship static config.
- brite-parser.ts: validateBrite returns BriteError[] with message, start, end. Use for underline + description.
- No migrationPhase needed — scripts table exists.
