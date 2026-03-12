# DEBUG PROCEDURE

<!-- Template: install to [root/ai/specs/debug.md] -->
<!-- Source: AI App Development Handbook 2.6 -->

When an error occurs, follow this sequence:

1. IDENTIFY — Is the error in the UI, the Supabase query, or the database?
   - UI errors: check component props and state
   - Query errors: check Supabase response and error object
   - DB errors: check RLS policies and column constraints

2. ISOLATE — Reproduce the error in the smallest possible scope.

3. CHECK — Before fixing:
   - Does the table exist in /db/schema.sql?
   - Is RLS enabled? Does the policy allow this operation?
   - Is user_id being passed correctly?
   - Is the Supabase client correct for this context (browser vs server)?

4. FIX — Modify only the file causing the error. Do not refactor unrelated code.

5. VERIFY — After fixing:
   - Does the fix break any existing functionality?
   - Does it violate any rule in /ai/security.md?
   - Run /ai/checklist.md for the affected feature.
