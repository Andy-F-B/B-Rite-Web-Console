# TASK: Downloads

## GOAL
Users can download B-Rite script template, Web SDK, and view plugin install instructions.

## DATABASE
Tables involved:
- plugins — catalog (admin-managed); read-only for users

## UI
Components required:
- Download cards for template, SDK
- Install Plugins section with b-rite install command

Pages affected:
- /app/downloads/page.tsx

## VALIDATION
- None (static downloads)

## BACKEND
API routes:
- /api/downloads/template — returns .br template file
- /api/downloads/sdk — returns SDK readme/content

## BEHAVIOR
1. User visits /downloads
2. User clicks Download → for template or SDK; file/download triggered
3. User reads plugin install instructions

## API ACTIONS
- GET /api/downloads/template → .br file
- GET /api/downloads/sdk → SDK content

## DONE WHEN
- [ ] Template download works
- [ ] SDK download works
- [ ] Plugin install instructions visible

## NOTES
No auth required for downloads. Plugins: place in [root/ai/plugins/], run <install>.
