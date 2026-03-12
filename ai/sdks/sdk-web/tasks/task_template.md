# TASK: [Feature Name]

<!-- Template: install to [root/ai/tasks/]. One file per feature. -->
<!-- Source: AI App Development Handbook 6.1 -->

## GOAL
[One sentence describing what this feature does for the user.]

## DATABASE
Tables involved:
- [table_name] — [brief description]

Fields required (if new):
- field_name type [nullable/required]

## UI
Components required:
- [ComponentName] — [what it does]

Pages affected:
- /app/[page]/page.tsx

## VALIDATION (Zod)
- Schema file: /lib/schemas/[entity].schema.ts
- Fields to validate: [field list with types and constraints]

## BACKEND
Query functions required in /lib/[feature].ts:
- [functionName(params)] → return type

## BEHAVIOR
Step-by-step user workflow:
1. User does X
2. System does Y
3. Result Z is shown

## API ACTIONS
Functions to implement:
- actionName(params) → return type

## DONE WHEN
- [ ] User can [primary action]
- [ ] Data persists to database
- [ ] Only the user's own data is visible
- [ ] Error states handled

## NOTES
Any edge cases, permissions, or special constraints.
