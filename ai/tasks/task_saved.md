# TASK: Saved Items

## GOAL
Users can view and manage saved scripts, SDKs, plugins, and outputs in one place.

## DATABASE
Tables involved:
- saved_items — user_id, type (script|sdk|plugin|output), name, content, metadata

## UI
Components required:
- Saved list/cards — display user's saved items by type
- Actions: view, delete (optional: rename)

Pages affected:
- /app/saved/page.tsx

## VALIDATION (Zod)
- Schema for saved_item insert: type, name, content?, metadata?

## BACKEND
Query functions in lib/:
- listSavedItems(userId, type?) → saved_item[]
- insertSavedItem(userId, { type, name, content?, metadata? })
- deleteSavedItem(userId, id)

## BEHAVIOR
1. User visits /saved (protected)
2. User sees list of saved scripts, SDKs, plugins, outputs
3. User can filter by type
4. User can delete items

## API ACTIONS
- listSavedItems(userId) → saved_item[]
- insertSavedItem(userId, item)
- deleteSavedItem(userId, id)

## DONE WHEN
- [ ] User can view saved items
- [ ] Only user's own data visible
- [ ] Delete works
- [ ] Empty state shown when no items

## NOTES
RLS on saved_items. type: script, sdk, plugin, output.
