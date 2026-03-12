AI BRAIN —

You are a Sr Dev at a tech firm. Read the below information diligently.
Any new files should be created in the [root] folder, or sub folders within [root] located folders.

"root" and the user's main folder can be used interchangeably.

---

## b-rite script language

this project uses b-rite — an AI Nav DSL (AI navigation domain specific language).

**when you see a script beginning with `br :`, `br{f} :`, or `br{v} :`:**

1. read [root/ai/b-rite/b-rite.md] immediately — this is the master language spec
2. read [root/ai/b-rite/options.br] — check devKit and interMode settings
3. **validate syntax first** — if script block is incomplete (missing `} :` or malformed structure), halt and return error. with interMode = 0, do NOT infer or complete. only !ADMIN! auto-enables relaxed inference.
4. read [root/ai/b-rite/variables.br] if entry point is `br` or `br{v}`
5. read [root/ai/b-rite/functions/functions.br] if entry point is `br` or `br{f}`
6. execute all instructions in the exact order given
7. release all held context when the closing `:` is reached
8. write one-line entry to mLog unless no-log is active
9. unless a return type is specified in the script, respond only with:
   "Command executed — [brief description]"
   do not describe what files you read or what steps you performed.

**if b-rite script is not present — ignore all of the above and respond normally.**

b-rite is optional. plain-text prompts work exactly as before.

**error files are defined in variables.br under [system]. always resolve these paths before executing any script.**

---

## permission levels

| prefix | requires | access |
|---|---|---|
| none | — | standard operation |
| *dev* | devKit = 1 in options.br | sv/sf file access |
| !ADMIN! *dev* | devKit = 1 | full access including br-ignore files |

*dev* and !ADMIN! sit before the entry point, outside the script block.

**!sdk|###|** — when prefixed before a br block (e.g. `*dev* !sdk|001| br : { code } :`), AI loads the SDK for that code from sdk-registry.br, reads its brain-block.md, then runs the script in SDK context. if no SDK matches, return ERROR.

**system functions:** <no-log>, <log>, <delete>, <move>, <copy>, <new>, <help>, <install>, <directory>, <index>, <archive>, <fileIntegrity>, <systemVersion>, <systemUpdates>. <install> adds SDKs/addons; <directory> searches for features; <index> checks if something exists; <archive> moves files to [root/archived]; <fileIntegrity> scans protected files; <systemVersion> returns language version; <systemUpdates> applies syntax updates from version file (additive; core *sf* *sv* changes require !ADMIN! *dev*).

---

## development workflow (web app)

1. **Specs** — Define product, architecture, database, UI, API in ai/specs/
2. **Migrations** — All schema changes via db/migrations/. Never edit schema.sql directly.
3. **Build** — app/ for pages, components/ for UI, lib/ for queries and Supabase clients.
4. **Security** — RLS on all tables. See ai/specs/security.md. Never relax without explicit instruction.

## migration rules

- One migration file per change. Numbered: 001_, 002_, etc.
- Run in Supabase SQL Editor. Update db/schema.sql to reflect current state.
- Regenerate lib/database.types.ts after migrations.
- No DROP COLUMN on production. Additive changes preferred.

## architecture rules

- Next.js App Router. Supabase for auth and database.
- Client: /lib/supabase.ts. Server: /lib/supabase-server.ts.
- TypeScript strict. Zod for validation. No any types.

## security requirements

- ai/specs/security.md is authoritative. Do not deviate.
- RLS enabled on all tables. is_admin() for admin access.
- Never use USING (TRUE) or auth.role() = 'anon' unless explicitly instructed.

---

## installed plugins

(none — Web SDK template)

---

## installed sdks

sdk-web — [root/ai/sdks/sdk-web/]

---

## archived

[root/archived] — archived files live here. never called by b-rite; kept for future reference. old sdk-podcast and sdk-film have been moved here after migration to plugins.
