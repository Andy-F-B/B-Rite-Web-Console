# TASK: B-Rite Console (App Shell + Landing)

## GOAL
Users land on a branded B-Rite Console home page with nav to Editor, Downloads, Saved, Privacy, and auth. Black console aesthetic, JetBrains Mono, green accent.

## DATABASE
Tables involved:
- profiles — for auth state (Sign in/up links)
- (no new tables — shell only)

Fields required (if new):
- (none)

## UI
Components required:
- BRLogo — Simple BR logo (green on black)
- ConsoleNav — Top nav (B-Rite Console, Editor, Downloads, Saved, Privacy, Sign in/up)

Pages affected:
- /app/page.tsx — landing
- /app/layout.tsx — root layout with ConsoleNav

## VALIDATION (Zod)
- (none — shell is static)

## BACKEND
Query functions required:
- (none — layout and nav are client-side routing)

## BEHAVIOR
1. User visits / — sees B-Rite Console heading, tagline, Open Editor + Downloads buttons
2. Nav shows BR logo, B-Rite Console, Editor, Downloads, Saved, Privacy, Sign in, Sign up
3. User clicks nav links → routes to respective pages
4. Design: black (#0a0a0a), green accent (#22c55e), JetBrains Mono

## API ACTIONS
- (none)

## DONE WHEN
- [ ] Landing page shows B-Rite Console branding
- [ ] ConsoleNav appears on all pages
- [ ] Nav links route correctly
- [ ] Design matches brite-console-preview.html (black, green, monospace)

## NOTES
Design tokens: --bg #0a0a0a, --surface #141414, --border #262626, --text #e5e5e5, --muted #737373, --accent #22c55e. Layout wraps children; nav in layout.tsx.
