# Migration Phase

Generate migration SQL per handbook 5.

**First-run:** If [root/ai/specs/database.md] missing, read [root/ai/sdks/sdk-web/specs/database.md].

**Read:** database.md, security.md, migration_checklist.md.

**Output:** Numbered ###_description.sql to [root/db/migrations/]. Include RLS policies, indexes on FKs, UUID PK with gen_random_uuid(). Update schema.sql.

**Apply migration_checklist.md** before finalizing.

**If arg1 is "plan":** Output migration plan to [root/UI/dev-output/]. Else generate migration for that table/feature.
