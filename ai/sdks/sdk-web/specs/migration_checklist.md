# MIGRATION CHECKLIST

<!-- Template: install to [root/ai/specs/migration_checklist.md] -->
<!-- Source: AI App Development Handbook 5.5 -->

Before finalizing any migration, verify:

- [ ] Table has a UUID primary key with default gen_random_uuid()
- [ ] RLS enabled on the table
- [ ] SELECT policy exists
- [ ] INSERT policy with WITH CHECK exists
- [ ] UPDATE policy exists
- [ ] DELETE policy exists
- [ ] Foreign key columns have indexes
- [ ] No destructive DROP or TRUNCATE operations
- [ ] schema.sql updated to reflect current state
- [ ] Run supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts
- [ ] Commit updated database.types.ts alongside the migration file
