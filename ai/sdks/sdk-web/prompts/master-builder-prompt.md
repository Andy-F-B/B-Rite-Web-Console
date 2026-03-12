# Master Builder — Feature Implementation

Follow handbook Master Builder Prompt (Section 8.1).

**Steps:**
1. Understand the feature (read task file)
2. Database planning — migration if needed
3. Validation schema — Zod in /lib/schemas/
4. Security — RLS per /ai/specs/security.md
5. Backend — queries in /lib
6. UI — components in /components
7. Page integration — pages in /app
8. Verify using /ai/specs/checklist.md

**Read before implementing:** /ai/brain.md, /ai/context/product_anchor.md, architecture_anchor.md, database_anchor.md, security_anchor.md

**Output:** [root/app/], [root/components/], [root/lib/]

**Rules:** Never modify unrelated files. Never change existing migrations. Prefer modifying existing components over creating duplicates.
