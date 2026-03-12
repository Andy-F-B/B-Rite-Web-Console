# help-log
**purpose:** log of all help sessions. used by AI to identify patterns and by user to spot recurring issues or opportunities for new rules and functions.
**written automatically** by help.br after every session.
**human readable** — review periodically to spot improvements.

---

## how to use this log

scan entries marked **[NEW PATTERN]** — these may need a new error file, a new function, or a spec note added to b-rite.md.

scan entries marked **resolved: no** — these are open issues.

if the same issue appears 3+ times — consider adding a dedicated error handler or a note to the relevant .br file.

---

## log entries

<!-- entries written below by help.br — do not edit manually unless needed -->

---

### 2025-03-12 — Editor page client-side exception

**date:** 2025-03-12
**context note from user:** It built, but when I click the Editor button, Application error: a client-side exception has occurred. Has the page been created?
**questions asked:** none (pre-satisfied)
**diagnosis:** createClient() calls getSupabaseConfig() which throws if NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. On Vercel, if env vars not set, the page crashes with generic client-side error.
**solution provided:** 1) Add env vars to Vercel → Settings → Environment Variables; redeploy. 2) Added try/catch in console page to show friendly config error instead of crashing.
**resolved:** unclear
**pattern flag:** —
**notes:** Graceful fallback added to /console page.

---

### 2025-03-12 — Vercel build error

**date:** 2025-03-12
**context note from user:** error building in vercel
**questions asked:** none (pre-satisfied by context)
**questions skipped:** A1 (deploy goal), A3 (build failed)
**diagnosis:** Most likely missing env vars in Vercel. lib/env.ts throws if NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing/placeholder.
**solution provided:** Add both vars to Vercel → Settings → Environment Variables; enable for Production, Preview, Development; redeploy.
**corrected script:** —
**resolved:** unclear (awaiting user confirmation)
**pattern flag:** —
**notes:** Common Next.js + Supabase deployment pattern.

---

### 2025-03-12 — Configuration Error persists after Vercel env setup

**date:** 2025-03-12
**context note from user:** Error from opening console on site again; Configuration Error — Missing NEXT_PUBLIC_SUPABASE_URL. User has added vars to Vercel for all envs and redeployed; error persists.
**questions asked:** none (pre-satisfied)
**questions skipped:** A1 (open console), A3 (config error), A4 (console page, env), A5 (recent changes)
**diagnosis:** NEXT_PUBLIC_* vars are inlined at build time. A normal redeploy may reuse cached build artifacts. If vars were added after the first deploy, or if cache wasn't cleared, the client bundle can still have undefined values.
**solution provided:** 1) Visit /api/debug-config on the live site — if hasUrl/hasKey are false, vars aren't reaching the server; fix Vercel env names/scope. 2) If hasUrl/hasKey are true but console still fails, the client bundle was built without vars — Vercel → Deployments → ⋮ on latest deploy → Redeploy → enable "Clear build cache". 3) Confirm which URL you're testing (Production vs Preview) and that vars exist for that environment.
**resolved:** unclear
**pattern flag:** —
**notes:** Recurring env issue. debug-config API added for this scenario.

---

### [entry template]

**date:** yyyy-mm-dd
**context note from user:** [what the user said upfront, if anything]
**questions asked:** [list questions that were asked]
**questions skipped:** [list questions pre-answered by context note]
**diagnosis:** [what the issue was]
**solution provided:** [what was recommended]
**corrected script:** [corrected script if applicable]
**resolved:** yes / no / unclear
**pattern flag:** [NEW PATTERN] or — 
**notes:** [anything worth flagging for language improvement]

---
