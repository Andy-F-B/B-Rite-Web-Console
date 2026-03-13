# TASK: Syntax Check Expansion — B-Rite Script Editor

<!-- Source: UI/dev-output/syntax-check-plan.txt. Generated: 2026-03-13 -->

## GOAL
Expand brite-parser.ts validateBrite() with additional syntax checks from b-rite.md. Add severity (error vs warning), extend getStringRanges and formatBrite, and render warnings in amber in the ScriptEditor.

---

## WHAT IS CURRENTLY CHECKED (unchanged)

brite-parser.ts > validateBrite():
1. Script opens with `br :` — regex /^\s*(br\s*:\s*)/
   Error: "Expected br : at start"

2. Script closes with `} :` — regex /\}\s*:\s*$/
   Errors: "Script block incomplete. Expected } :" or "Expected } : to close script"

3. Balanced braces { } — depth counter, skips inside strings
   Errors: "Unexpected }" or "Unclosed {"

4. Command casing — commands must be lowercase
   Commands checked: read, run, return, ask, prompt, catch, write, edit, delete, fetch, do
   Error: "Command must be lowercase: {cmd}"

ScriptEditor.tsx > handleKeyDown() — interactive (not in error list):
5. Auto-inserts `{ ` after `br :`
6. `};` at cursor → auto-inserts new `{ ` block on next line
7. `} ;` (with space) → pending semicolon state

---

## REQUIRED INFRASTRUCTURE CHANGES

### 1. BriteError interface (lib/brite-parser.ts)
```ts
export interface BriteError {
  message: string
  start: number
  end: number
  severity?: 'error' | 'warning'   // default 'error' if omitted
}
```

### 2. ScriptEditor (components/ScriptEditor.tsx)
- Render errors: red border (existing)
- Render warnings: amber (#f59e0b)

### 3. getStringRanges (lib/brite-parser.ts)
Extend to return `{ start, end, quoteChar }` so the empty " " check (A) can distinguish single vs double quotes without re-scanning.

### 4. formatBrite (lib/brite-parser.ts)
Extend to auto-fix:
- Command casing (already done)
- `->` spacing (strip spaces around ->)

---

## PRIORITY 1: High value, straightforward

### A. Empty literal string " "
- **Rule:** b-rite.md §10 — `" "` with no text is a syntax error. `' '` with no text is valid.
- **How:** Extend getStringRanges to return { start, end, quoteChar }. In validateBrite, if a double-quoted string has zero non-whitespace chars between quotes → error.
- **Error:** "Empty literal string \" \" is a syntax error. Use ' ' for empty interpretive string."

### B. Missing `;` between code blocks
- **Rule:** b-rite.md §3 — `;` is required between blocks. `{ }{ }` without `;` is invalid.
- **How:** regex for `}\s*{` outside strings.
- **Error:** "Missing ; between code blocks. Use }; to separate."

### C. Trailing `;` after final block
- **Rule:** b-rite.md §3 — `;` never follows the final block.
- **How:** regex for `};\s*:` at end of script (outside strings).
- **Error:** "Trailing ; after final block. Remove the semicolon before the closing :."

### D. `run` with a non-.br file
- **Rule:** b-rite.md §8 — `run` on a non-.br file routes to error.br.
- **How:** Only check when `run` is followed by a path `[...]`. `run; <fn>` (function) needs no check. Look for `run` followed by a path `[...]` where the path does NOT end in `.br`.
- **Warning:** "run requires a .br file. Use `do` for .md or .txt files."

### E. `do` with a .br file
- **Rule:** b-rite.md §8 — `do` on a `.br` file routes to error.br.
- **How:** look for `do` followed by a path `[...]` where path ends in `.br`.
- **Warning:** "do requires a .md or .txt file. Use `run` for .br scripts."

---

## PRIORITY 2: Medium, catches common mistakes

### F. `->` with spaces around it
- **Rule:** b-rite.md §4 — "use exactly -> with no spaces between the two sides"
- **How:** regex for ` -> ` (space on either side) outside strings.
- **Warning:** "Points-to operator -> must have no spaces. Use identifier->path, not identifier -> path."

### H. Invalid entry point variant
- **Rule:** b-rite.md §2 — valid entry points: br, br{f}, br{v}, br{sf}, br{sv}.
- **How:** regex on `br\{[^}]*\}` — if the content inside {} is not one of f, v, sf, sv → error.
- **Error:** "Invalid entry point. Valid options: br, br{f}, br{v}, br{sf}, br{sv}."

---

## PRIORITY 3: Spec completeness, naming conventions

Note: catch rule removed — catch can follow with strict and be separated; no ask/prompt requirement.

### I. `*dev*` or `!ADMIN!` inside a code block
- **Rule:** b-rite.md §18, §19 — *dev* and !ADMIN! must appear BEFORE the entry point, never inside { }.
- **How:** scan for *dev* or !ADMIN! that appears after the first { and before the closing }.
- **Error:** "*dev* / !ADMIN! must appear before the entry point, outside the script block."

### J. Anchor value format
- **Rule:** b-rite.md §7 — anchor values are exactly (A1)–(Z9): one letter A-Z + one digit 1-9.
- **How:** detect `(` followed by exactly 2 chars where char[0] is A-Z and char[1] is 1-9 — that's valid. If a `( )` value is exactly 2 chars but doesn't match this pattern → warning.
- **Warning:** "Anchor values must be format (A1)–(Z9): one uppercase letter + one digit 1-9."

### K. Underscore in function or variable names (should be camelCase)
- **Rule:** b-rite.md §5 — two-word identifiers use camelCase. Underscore is not used.
- **How:** regex for `<[a-z]+_[a-z]` or `([a-z]+_[a-z]` outside strings.
- **Warning:** "Use camelCase for multi-word names: <taskMaker>, not <task_maker>."

### L. Modifier token casing: vt, ft, fi should be vT, fT, fI
- **Rule:** b-rite.md §6 — token modifiers are camelCase: vT, fT, fI.
- **How:** regex for word boundaries \bvt\b, \bft\b, \bfi\b outside strings.
- **Warning:** "Token modifier must be camelCase: vT, fT, fI — not vt, ft, fi."

---

## EXAMPLE VALID SCRIPTS (for reference)

Minimal valid:
```
br : { return; pt; "hello world." } :
```

Multi-block:
```
br : { read; [root/ai/brain.md] };
     { return; pt; "done." } :
```

With run + .br file:
```
br : { run; <taskMaker> } :
br{f} : { run; [root/ai/tasks/my-task.br] } :
```

With do + .md file:
```
br : { do; [root/ai/tasks/my-task.md] } :
```

With function:
```
br : { run; <specPhase>; "B1" } :
```

With points-to (no spaces around ->):
```
br : { write; (archive)->[root/archived/my-file.br] } :
```

Empty interpretive string (valid):
```
br : { prompt; ' ' } :
```

Empty literal string (INVALID):
```
br : { return; pt; " " } :   // error
```

---

## DONE WHEN

- [ ] BriteError has severity field
- [ ] ScriptEditor renders warnings in amber (#f59e0b)
- [ ] getStringRanges returns { start, end, quoteChar }
- [ ] formatBrite auto-fixes -> spacing
- [ ] A, B, C implemented (errors)
- [ ] D, E, F implemented (warnings)
- [ ] H, I implemented (errors)
- [ ] J, K, L implemented (warnings)

---

## NOTES

- All checks live in lib/brite-parser.ts > validateBrite()
- All checks must skip content inside strings (use getStringRanges)
- ScriptEditor and console/page need minimal changes for error/warning styling
