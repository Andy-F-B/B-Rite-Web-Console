# TASK: Console Editor — Script Mode, SDK Context, Search, Auto-Format

## GOAL
Enhance the B-Rite Console script editor with: (1) script mode choice (b-rite native, SDKs, plugins), (2) SDK selector (web-sdk initially), (3) Ctrl+Alt+D search bar for functions/variables with examples and descriptions, (4) context-aware syntax (native vs SDK), (5) auto-format for `};` (next block) and `:` (block end), (6) keybinds displayed at top.

## KEYBINDS (display at top of editor)
| Keybind | Action |
|---------|--------|
| Ctrl+Alt+D | Open search bar — search functions/variables, insert on click |
| (existing) | `:` after `br ` or `} ` → auto-insert `{ ` |

## DATABASE
Tables involved:
- scripts — user_id, title, content (existing; no schema change)

Optional: scripts.mode or scripts.sdk_id if we persist user's last mode/SDK choice. Defer unless needed.

## UI
Components required:
- **ScriptModeSelector** — radio or tabs: "b-rite native" | "SDKs" | "Plugins" (Plugins disabled/empty for now)
- **SDKDropdown** — visible when SDKs selected; options: web-sdk (initially). Populated from sdk-registry.br or static list.
- **Web-SDK sub-dropdown** — when web-sdk selected: "Edit function library" | "Create new function". Edit: list existing .br files from [root/ai/sdks/sdk-web/functions/]; open in editor or side panel. Create: guided flow per nFunction.br process — create .br at sdk-web/functions/{name}.br, add entry to sdk-web functions.br. Reference structure: path, action, args, notes; .br file: comment header, called via, args, body, return.
- **FunctionSearchBar** — modal/popover triggered by Ctrl+Alt+D; search input; list of matches with name, short description, example; click inserts at cursor and closes.
- **KeybindsBar** — compact line at top of editor: "Ctrl+Alt+D: Search functions | …"
- **ScriptEditor** (enhanced) — mode-aware validation, auto-format rules below

Pages affected:
- /app/console/page.tsx

## VALIDATION (Zod)
- (none for content — use brite-parser validateBrite; mode-aware: native-only vs native+SDK)

## BACKEND
- lib/function-search.ts — build-time or API: returns search index from:
  - b-rite native: [root/ai/b-rite/functions/functions.br], [root/ai/b-rite/lang/lang.md], [root/ai/b-rite/variables.br]
  - sdk-web: [root/ai/sdks/sdk-web/functions.br], sdk variables; merge with native when SDK mode
- Each entry: { name, type: 'function'|'variable', description, example, source: 'native'|'sdk' }

## BEHAVIOR

### Script mode
1. User selects "b-rite native" — editor validates native only; search shows native functions/variables.
2. User selects "SDKs" — SDK dropdown appears; user picks "web-sdk".
3. Web-sdk mode — editor follows sdk-web rules, syntax, functions; search shows native + sdk-web; items tagged (native) or (sdk) with note of difference if required.
4. "Plugins" — separate mode; pin for now. Disabled/empty; show "Coming soon" or grey out.

### Web-SDK function library sub-dropdown
1. When web-sdk is selected, show sub-dropdown: "Edit" | "Create new".
2. **Edit** — list .br files from [root/ai/sdks/sdk-web/functions/] (from functions.br index). User selects file; open in editor or read-only preview. Structure per existing: `// name.br — description`, `// called via: *dev* !sdk|003| br : { run; <name> } :`, `// args:`, body, `return; pt`.
3. **Create new** — guided flow referencing nFunction.br: (a) ask function name (camelCase), (b) ask description, (c) create stub .br at sdk-web/functions/{name}.br, (d) add entry to sdk-web functions.br with path, action: run, args, notes. Stub format matches existing .br files.

### Search (Ctrl+Alt+D)
1. User presses Ctrl+Alt+D while editing — small search bar appears (floating or inline).
2. User types — filters functions/variables by name; shows short description + example.
3. User clicks item — that function/variable (syntax only) inserted at cursor; search closes.
4. b-rite native mode: only native functions, *sf*, variables from lang.md.
5. sdk-web mode: native + sdk-web functions; items show (native) or (sdk) badge; tooltip/note on sdk items: "SDK-specific — requires !sdk|003|".

### Auto-format (within `br :` … `:` script only)
1. **`};` (touching)** — e.g. `{ run; <task>; "x" };` — means another block follows. Auto-format: newline, indent (2 spaces), insert `{ ` and space. Cursor positioned inside new block.
2. **`} ;` (space between)** — user typed `}` then `;` with space. Do NOT auto-switch yet (could be typo for `:`). Wait: if user next types `{`, auto-move `;` to touch `}` (become `};`), then apply rule 1. If user types any other character after `;`, show syntax error: "Code block must be ended with `:`".
3. **`:` ending block** — e.g. `{ return; pt } :` — block complete. Auto-format: newline, newline (two lines down), no indent (column 0). User ready for next `br :` or `} :` block.

### Keybinds display
- Compact bar at top of editor: "Ctrl+Alt+D: Search | : after br/} → { "

## API ACTIONS
- Build-time: static JSON for function search index (no runtime API).

## DONE WHEN
- [ ] Script mode selector: b-rite native, SDKs, Plugins (Plugins empty)
- [ ] SDK dropdown when SDKs selected; web-sdk option
- [ ] Web-sdk sub-dropdown: "Edit" | "Create new" function library files
- [ ] Web-sdk editor uses sdk-web rules, syntax, functions
- [ ] Ctrl+Alt+D opens search bar; search filters by name
- [ ] Search results: name, description, example; click inserts at cursor
- [ ] b-rite native: only native functions/variables in search
- [ ] sdk-web: native + sdk; (native)/(sdk) tags; note on SDK items
- [ ] `};` and `} ;` auto-format rules (see BEHAVIOR)
- [ ] `:` block end auto-format: two newlines, no indent
- [ ] Keybinds shown at top of editor

## NOTES
- Function/variable index: build-time static JSON from functions.br, lang.md, sdk-web functions.br.
- Plugins: separate mode — pin for now; not adding yet.
- SDK registry: [root/ai/sdks/sdk-web/] — sdk-web only initially.
- Difference note: native = core b-rite; sdk = requires !sdk|003| prefix, runs in SDK context.
- Function library structure: see [root/ai/b-rite/functions/functions.br], [root/ai/sdks/sdk-web/functions.br]. Each entry: name, path, action, args, notes. .br files: comment header, called via, args, body, return.
- Create process: nFunction.br for native; SDK: create .br in [root/ai/sdks/sdk-web/functions/], add entry to sdk-web functions.br.
