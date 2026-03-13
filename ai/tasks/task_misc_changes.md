# TASK: Misc Changes

<!-- Created by taskPhase — Saved edit/delete, downloads platform text, auto-prompt read casing -->

## GOAL
Add edit and delete for saved scripts, fix auto-prompt casing, and clarify download platform support across templates and SDKs.

## DATABASE
Tables involved:
- scripts — existing; no schema change. Edit = update existing row; Delete = delete row.

Fields required (if new):
- None

## UI
Components required:
- Saved page — add Edit button (opens in editor, saves to same slot) and Delete button per script card
- Console page — when saving, support update mode (if editing existing script, update instead of insert)
- Downloads page — add platform text: "Windows, macOS, Linux" to each download item

Pages affected:
- /app/saved/page.tsx
- /app/console/page.tsx
- /app/downloads/page.tsx

## VALIDATION (Zod)
- No new schemas. Existing script content validation via brite-parser if needed.

## BACKEND
Query functions required in lib/:
- updateScript(id, user_id, content) or use supabase.from('scripts').update().eq()
- deleteScript(id, user_id) or use supabase.from('scripts').delete().eq()

## BEHAVIOR
1. **Edit:** User clicks Edit on saved script → navigates to /console?load={id}&edit=1. Editor loads content. On Save, update existing row (same id) instead of insert.
2. **Delete:** User clicks Delete → confirm → delete row. Refresh list.
3. **Downloads:** Each download card shows "Windows, macOS, Linux" (or similar) in description.
4. **Auto prompts:** Change "Read" to "read" in lib/auto-prompts.ts for all entries (e.g. "Read [root/ai/brain.md]" → "read [root/ai/brain.md]") to avoid syntax error in b-rite.

## API ACTIONS
- None (client-side Supabase calls)

## DONE WHEN
- [ ] Edit button on saved page opens script in editor; Save updates same slot (no duplicate)
- [ ] Delete button removes script with confirmation
- [ ] Downloads page specifies Windows, macOS, Linux for template and SDK downloads
- [ ] Auto prompts use lowercase "read" (fixes syntax error in script editor)

## NOTES
- Edit flow: pass edit=1 and load=id in URL; console page checks edit mode and calls update on save instead of insert.
- Delete: use RLS; user can only delete own scripts. Confirm before delete.
- Platform text: add to DOWNLOADS array descriptions or as subtitle per item.
