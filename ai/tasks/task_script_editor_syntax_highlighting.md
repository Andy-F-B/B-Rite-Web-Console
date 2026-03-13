# TASK: Script Editor — Syntax Highlighting & Formatting

## GOAL
Add syntax highlighting and auto-formatting to the ScriptEditor: italicize quoted strings, color commands/functions/variables/paths/comments. A "green text" toggle disables all formatting (raw view). Default: green text OFF (formatted view).

## DATABASE
Tables involved:
- scripts — existing; no schema change

## UI
Components required:
- **ScriptEditor** (enhanced) — replace or overlay textarea with syntax-highlighted view
- **GreenTextToggle** — checkbox/toggle: "Green text" (raw mode). When ON: no colors/italics. When OFF (default): apply syntax highlighting
- Syntax colors when green text OFF:
  - `" "` and `' '` content → italic, white
  - Text left of `:` (e.g. read, run) → bold, blue
  - Functions `<name>` → purple
  - System functions `*sf*` → red
  - Variables `(name)` → light pink
  - Paths `[path]` → yellow
  - Comments `//text` → grey
  - SDK prefix `!sdk|###|` → green

Pages affected:
- /app/console/page.tsx (via ScriptEditor)

## VALIDATION (Zod)
- (none — content remains plain text; highlighting is display-only)

## BACKEND
- (none — client-side only)

## BEHAVIOR
1. User opens /console — sees ScriptEditor with syntax highlighting (green text OFF by default)
2. User types script — quoted strings, commands, functions, variables, paths, comments are colored/italicized per rules
3. User toggles "Green text" ON — all formatting disabled; raw green-on-black text
4. User toggles "Green text" OFF — formatting reapplies

## API ACTIONS
- (none)

## DONE WHEN
- [x] Green text toggle (default OFF)
- [x] When green OFF: `" "` and `' '` content italic
- [x] When green OFF: text left of `:` bold, blue
- [x] When green OFF: `< >` functions purple
- [x] When green OFF: `*sf*` system functions red
- [x] When green OFF: `( )` variables light pink
- [x] When green OFF: `[ ]` paths yellow
- [x] When green OFF: `//` comments grey
- [x] When green OFF: `!sdk|###|` SDK prefix green
- [x] When green ON: no formatting (raw green text)

## NOTES
- Implementation: consider CodeMirror 6, Monaco, or custom overlay. Plain textarea cannot show per-token styling; need a code-editor component or layered rendering.
- brite-parser or a new tokenizer needed to identify tokens for highlighting.
- Green text = "raw/terminal" mode; formatted = "IDE" mode.
