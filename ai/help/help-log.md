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
