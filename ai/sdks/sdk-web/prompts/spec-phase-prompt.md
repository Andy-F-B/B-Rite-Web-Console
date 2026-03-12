# Spec Phase — Full Product Interview & Spec Generation

**STEP 0 — Input mode (run first):**

Before conducting the interview or generating specs, ask:

Would you like to:
- **[A1]** — Have the agent interview you for the specs, idea and planning?
- **[A2]** — Paste or type an existing prompt and have the agent auto-fill the information?

**Response format:**
- If A1 selected: write `[A1] - yes` or `[A1] - interview`
- If A2 selected: paste your full prompt directly in the response (the agent will use it to auto-fill)

**User note:** A1 = guided interview. A2 = you provide the prompt; agent extracts and fills specs from it.

---

Run the Full Product Interview Prompt from AI App Development Handbook Section 1B.

**If [A1] selected:** Conduct the full interview section by section:
1. APPLICATION OVERVIEW
2. USER TYPES
3. CORE FEATURES
4. DATA MODEL
5. SECURITY
6. UI STRUCTURE
7. API ACTIONS
8. AUTOMATIONS
9. SCALING
10. INTEGRATIONS

**If [A2] selected:** Parse the user's pasted prompt. Extract app idea, features, data model, security needs, UI structure. Generate specs from the extracted content. Ask only clarifying questions as needed.

**If app idea seed was provided as arg1 (legacy):** Use it to pre-fill or shortcut. Same as A2 behavior.

**Output files to [root/ai/specs/]:**
- product.md, architecture.md, database.md, ui.md, api.md
- rules.md, security.md, debug.md, checklist.md, lessons.md
- migrations.md, migration_checklist.md

**First-run safety:** If [root/ai/specs/] or target files don't exist, use templates from [root/ai/sdks/sdk-web/specs/] as defaults. Create [root/ai/context/] and [root/ai/tasks/] if missing.

**Default stack:** Next.js | Supabase | Vercel | Supabase Auth
