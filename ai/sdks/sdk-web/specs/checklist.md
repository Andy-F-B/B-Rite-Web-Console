# FEATURE COMPLETION CHECKLIST

<!-- Template: install to [root/ai/specs/checklist.md] -->
<!-- Source: AI App Development Handbook 4.3 -->

Before marking any feature complete, verify:

## Database
- [ ] Table exists in schema.sql
- [ ] RLS is enabled
- [ ] All four policies exist (SELECT, INSERT, UPDATE, DELETE)
- [ ] Foreign key indexes exist

## Backend
- [ ] Query functions exist in /lib/
- [ ] TypeScript types defined for all parameters and returns
- [ ] Error handling implemented
- [ ] Zod schema exists in /lib/schemas/[entity].schema.ts
- [ ] All form inputs and API payloads validated before insert/update

## UI
- [ ] Component exists in /components/
- [ ] Loading state implemented
- [ ] Empty state implemented
- [ ] Error state implemented

## Integration
- [ ] Page connects to backend queries
- [ ] Authentication is enforced (user can only see own data)
- [ ] Form validation present

## Testing
- [ ] No console.log statements left in code
- [ ] No TODO comments left unaddressed
