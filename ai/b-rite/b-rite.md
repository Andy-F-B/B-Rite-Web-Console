# b-rite script — master language spec
**version:** 0.2
**status:** active
**label:** AI Nav DSL — AI Navigation Domain Specific Language
**read this file before interpreting any b-rite script.**
**you are named "agent". the prompter is "user".**

---

## critical — error files

if any error occurs during execution, immediately read and run the appropriate error file.
paths are defined in `variables.br` under [system]. always resolve them first.

| scenario | file |
|---|---|
| file not found | error_nf.br |
| variable or function not found | error_vf.br |
| file empty, malformed, or general failure | error.br |

---

## 1. what b-rite is

b-rite is a lightweight AI navigation DSL. it does not execute code. it tells the AI where to look, what to read, and what to do — in as few characters as possible. it is fully optional. every action it covers can be performed with plain-text prompts.

when you see a b-rite script, read this file first, then the relevant function or variable file, then execute in the exact order instructions are given.

do not mention reading b-rite.md, brain.md, or any system files in your response unless asked. if no return is requested, simply return "command executed."

---

## 2. entry points

| entry | reads | use when |
|---|---|---|
| `br` | core spec + functions + variables | using all three in one script |
| `br{f}` | functions.br only | calling functions, no variables needed |
| `br{v}` | variables.br only | variable operations only |
| br{sf} | system functions only | calling *sf* functions directly |
| br{sv} | system variables only | calling *sv* functions directly |

if a token rests outside `:` in `{ }`, a variable or function can be inferred as being inside the braces.
example: `br{f} : { run; <planning> }; { return; null } :`

---

## 3. script structure

a b-rite script always opens and closes with `:`

```
br : { command; format; content } :
```

**validation (mandatory before execution):** the script must be structurally complete. if `} :` is missing, or the block is malformed, halt immediately. return: `syntax error — script block incomplete. expected } :`. do not infer, complete, or execute. with interMode = 1 (or !ADMIN!) the AI may relax this; with interMode = 0, enforce strictly.

- `br :` — opens the script
- `:` — closes the script; all held context released after this point
- `{ }` — code block containing one instruction set
- `;` — pause/break between transitioning code blocks; never follows the final block
- `//` — comment; AI ignores within `br :` bounds
- `&&` — AND operator; execute both
- ` - ` — break; separates text or string types within one call

**multiple blocks:**
```
br : { block one }; { block two }; { block three } :
```

**context and multi-turn:**
context is held from `br :` until the closing `:` of the script that initiated the flow. a script may complete over multiple user messages. a block may wait on user input before the next block runs.

---

## 4. wrapping rules — universal

these apply everywhere in b-rite without exception.

| wrapper | meaning | example |
|---|---|---|
| `[ ]` | file path — always | `[root/ai/tasks/]` |
| `( )` | variable name or anchor value | `(taskPrompt)` / `(A1)` |
| `< >` | function name — always | `<task>` |
| `" "` | string literal — taken exactly as written | `"hello world"` |
| `' '` | interpretive string — AI expands before use | `'describe the feature'` |
| ` - ` | break — separates string types in one call | `'ask the agent - "best option?"'` |
| `->` | points to — left points to right (path, file, or target). no spaces. | `(archive)->[root/ai/b-rite/functions/sf_archive.br]` |

**`< >` always means function. `( )` always means variable or anchor value. no exceptions.**
**`->`** denotes "points to": `identifier->path` or `code->path`. use exactly `->` with no spaces between the two sides.

**redundant v/f inside code block:** `v` or `f` may optionally appear before `( )` or `< >` (e.g. `run; f; <directory>` or `v; (myVar)`). they are redundant — `<>` and `()` alone are sufficient to identify type. when present, treat as no-op; never route to error. applies regardless of interMode.

---

## 5. casing rules

- all command names, function names, variable names: **lowercase**
- two-word identifiers: **camelCase** — `<taskMaker>`, `(myPath)`
- token modifiers: **camelCase** — `vT`, `fT`, `fI`
- uppercase only inside `" "` or `' '` or anchor codes like `(A1)`

---

## 6. token system

### standard tokens

| token | meaning | behaviour |
|---|---|---|
| `v` | variable | permanent — persists across sessions, written to variables.br |
| `vT` | variable temporary | lives from `br :` to closing `:` then deleted |
| `f` | function | standard named function |
| `fT` | function temporary | modified copy of existing function — lives for script duration, not saved, deleted after |

### system tokens — protected

system tokens are called with asterisk wrapping: `*sv*`, `*sf*`

| token | meaning | behaviour |
|---|---|---|
| `sv` | system variable | core, protected, default — cannot be altered without devKit + *dev* |
| `sf` | system function | core, protected, default function — cannot be altered without devKit + *dev* |

### modifier camelCase rule

any token that is a copy or alteration of an existing token uses camelCase. second letter indicates modification type. this is a framework — not every variant will be common but the pattern is defined and extensible.

examples:
- `fT` — function, temporary
- `fI` — function, inverted
- `vT` — variable, temporary

### fT — temporary function usage

```
br : { write; c; of; <existingFunction>; for; *fT*; 'named modded task maker; modifications include x and x' }; { read && run; *fT*; <moddedTaskMaker> } :
```

fT is created inline, operates for the duration of the script, then is deleted.

---

## 7. variables vs anchor values

both use `( )` — disambiguated as follows:

| syntax | type | rule |
|---|---|---|
| `v; (name)` | variable | always preceded by `v;` |
| `vT; (name)` | temporary variable | always preceded by `vT;` |
| `*sv*; (name)` | system variable | always preceded by `*sv*;` |
| `(A1)` — `(Z9)` | anchor value | always exactly two characters — one letter A-Z, one number 1-9 |

anchor values are used exclusively in intake flows with `ask` and `prompt`.
variables are never two characters. if you see `v;` before `( )` it is always a variable.

---

## 8. core commands

ten commands. nothing outside this list is a core command.

| command | role | notes |
|---|---|---|
| `read` | load file for context — no output | — |
| `fetch` | locate and hold file or variable | held until closing `:` |
| `write` | create new file or variable | — |
| `edit` | modify existing file and save | — |
| `delete` | remove file or section | routes to *sf* delete — requires user confirmation |
| `return` | output to user | followed by return type |
| `ask` | prompt user for input | `" "` literal, `' '` interpretive |
| `prompt` | deep interpretive user input | AI reasons and expands substantially |
| `catch` | receive and map user reply | always follows `ask` or `prompt` |
| `run` | execute `.br` file as b-rite script | `.br` files only |
| `do` | follow plain text instructions | `.md` or `.txt` files only — read the file and execute the instructions it contains |

**rule:** `run` on a non-`.br` file routes to `error.br`. `do` on a `.br` file routes to `error.br`.

---

## 9. return and system variable types

| type | output |
|---|---|
| `pt` | plain text returned in chat |
| `md` | returned as a `.md` file |
| `txt` | returned as a `.txt` file |
| `html` | returned as a `.html` file |
| `custom; 'file name'` | user specifies return file type |
| `null` | silent — no output, no confirmation |
| `v; (name)` | returns the value a variable points to |
| `f; <name>` | returns the value a function points to |

**null behaviour:**
- `' null '` — interpretive; AI processes and returns actual null (no output)
- `" null "` — literal; returns the word null as a string

examples:
```
br : { return; pt; "hello world." } :
br : { return; md } :
br : { return; null } :
br : { return; custom; '.docx' } :
```

---

## 10. input commands

**quote style is the sole interpretation signal — always.**

| quote | meaning |
|---|---|
| `" "` | literal — taken exactly as written, regardless of command |
| `' '` | interpretive — AI expands naturally before use |

`ask` vs `prompt` determines depth, not whether to interpret:

| command | depth |
|---|---|
| `ask; " "` | literal |
| `ask; ' '` | interpretive — natural expansion |
| `prompt; ' '` | deep interpretive — AI reasons substantially, produces full output |

never restate interpretation mode after the command. the quote style is sufficient.

**empty string rules:**
- `" "` with no text — syntax error; halt and return error
- `' '` with no text — AI interprets from surrounding context; valid

---

## 11. catch

`catch` reads the most recent user message and maps content to open anchor values.

**rules:**
- must always follow at least one `ask` or `prompt` — standalone `catch` routes to `error.br`
- `catch` with no anchor values = hold next user message as freeform input
- unmapped anchor values handled per catch mode
- extra user content not mapped to any anchor is ignored
- `opt` fields always silently skipped regardless of catch mode

**catch modes:**

| mode | behaviour |
|---|---|
| `catch` | default — flags missing required fields, continues |
| `catch; strict` | stops if required fields missing, prompts user to complete |

**user response format:**
```
A1 — answer here
A2 — answer here
```
the `—` separator is standard. AI maps left of separator to anchor code, right to value.

---

## 12. opt modifier

marks a field as optional in an intake flow.
default — all fields required.
`opt` fields skipped by user are silently left blank — never flagged, never enforced.

```
br : { ask; opt; (B7); 'additional notes' } :
```

`opt` sits between the command and the anchor value. respected in both `catch` and `catch; strict`.

---

## 13. scope and memory

- all fetched context, files, and held values persist from `br :` to closing `:`
- once closing `:` is hit, all held context is released automatically
- permanent variables (`v`) persist to variables.br and survive session end
- temporary variables (`vT`) are released at closing `:`
- a script may complete over multiple user messages before closing `:`

---

## 14. function calls

```
br : { run; <functionName> } :
br : { run; <functionName>; "argument" } :
```

arguments must always be wrapped in `" "` or `' '`. unwrapped values are not treated as arguments and route to `error.br`.

positional references inside `.br` function files: `{arg1}`, `{arg2}` etc.

**chaining limit:** functions may chain three levels deep. level 3 cannot call another function — routes to `error.br` if attempted.

---

## 15. logging system

every action logs a one-line entry to `master_changelog.br` via `*sv*; (mLog)` automatically.

**three modes:**

| mode | behaviour |
|---|---|
| default | one-line entry per action, auto-written to mLog |
| `*sf*; <no-log>` | suppresses logging for this script run; writes "user ran no-log." |
| `*sf*; <log>; " "` | creates detailed named log entry; name required in `" "` |
| `*sf*; <log>; ' '` | creates detailed log entry; AI names it from context |

---

## 16. file type conventions

| extension | what it is | who reads it | editable? |
|---|---|---|---|
| `.br` | b-rite script — written in b-rite syntax | AI executes | only if you know the language |
| `.md` | plain english prompt or instruction — AI reads and follows | AI reads and executes | yes — human readable and editable |
| `.txt` | guide, documentation, changelog | humans only | yes — freely |

---

## 17. inter mode

inter mode relaxes strict parsing. when enabled, AI infers intent on minor syntax errors rather than routing to error files.

```
interMode = 0    // strict — default
interMode = 1    // relaxed — AI infers on minor errors
```

set in `options.br`. !ADMIN! auto-enables inter mode.

---

## 18. devKit

devKit unlocks language development capabilities. off by default.

```
devKit = 0    // off — default
devKit = 1    // on
```

**when devKit = 1:**
- `*dev*` token is available at the start of any script
- `*dev*` enables alteration of `*sv*` and `*sf*` protected files
- `*dev*` enables syntax override and inter mode
- `*dev*` does NOT allow altering files listed in `br-ignore.br`
- `<nFunction>`, `<nVariable>`, `<devKit>`, `<nSDK>` functions are active
- `<nSystemFunction>`, `<nSystemVariable>` — create *sf* *sv*; **require !ADMIN! *dev***

**`*dev*` usage:**
```
*dev* br : { edit; *sv*; (mLog); [new/path/] } :
```

`*dev*` sits before the entry point, outside the script block. never inside `br :`.

**without devKit = 1, `*dev*` is not recognised. scripts using `*dev*` with devKit = 0 route to `error.br`.**

set devKit on or off via the `<start>` function or manually in `options.br`.

---

## 19. !ADMIN! token

!ADMIN! is the highest permission level. used only by the language author.

**requires:** `*dev*` token also present. devKit must be on.

**when !ADMIN! + *dev*:**
- full access to all files including files listed in `br-ignore.br`
- inter mode auto-enabled
- syntax rules can be altered
- `br-ignore.br` itself can be modified

**usage:**
```
!ADMIN! *dev* br : { edit; [root/ai/b-rite/br-ignore.br]; 'add new protected file' } :
```

!ADMIN! sits before *dev*, before the entry point. never inside `br :`.

**!ADMIN! is defined in `br-ignore.br` and cannot be redefined, removed, or overridden by any b-rite script — including scripts using !ADMIN! itself. the definition is permanent and manual-edit only.**

---

## 20. br-ignore.br — protected files

files listed in `br-ignore.br` cannot be altered or deleted by any b-rite command under standard or devKit operation. attempting to do so fires a system warning and halts execution.

only !ADMIN! + *dev* can touch files on this list.

`br-ignore.br` itself cannot be altered by any b-rite command under any permission level except manual file editing.

---

## 21. !sdk|###| — SDK-scoped execution

when a script is prefixed with `!sdk|###|` before the `br :` block, the AI navigates to the SDK directory for the given code, loads its brain-block.md, then executes the script in that context.

**syntax:**
```
*dev* !sdk|001| br : { run; <podPlan> } :
```

**resolution:**
1. read [root/ai/b-rite/sdk-registry.br] — maps codes (001, 002, …) to SDK paths
2. if code not found → ERROR: no SDK with code ### exists. check sdk-registry.br.
3. if found → read that SDK's brain-block.md (e.g. [root/ai/sdks/sdk-podcast/podcast-brain-block.md])
4. execute the br block with SDK context loaded

**placement:** `!sdk|###|` sits before the entry point, after *dev* or !ADMIN! if present. never inside `br :`.

**note:** when using !sdk|###|, the SDK context can call plugins. SDKs compose plugins; running an SDK loads its brain block and any plugins it references.

---

## 21b. !plugin|###| — plugin-scoped execution

when a script is prefixed with `!plugin|###|` before the `br :` block, the AI navigates to the plugin directory for the given code, loads its brain-block, then executes the script in that context. !plugin|###| loads only the plugin — not an SDK.

**syntax:**
```
*dev* !plugin|001| br : { run; <podPlan> } :
```

**resolution:**
1. read [root/ai/b-rite/plugin-registry.br] — maps codes (001, 002, …) to plugin paths
2. if code not found → ERROR: no plugin with code ### exists. check plugin-registry.br.
3. if found → read that plugin's brain-block (e.g. [root/ai/plugins/plugin-podcast/plugin-podcast-brain-block.md])
4. execute the br block with plugin context loaded

**placement:** `!plugin|###|` sits before the entry point, after *dev* or !ADMIN! if present. never inside `br :`.

**plugin vs sdk:** !plugin|###| loads a single plugin. !sdk|###| loads an SDK, which can call plugins. use !plugin|###| when you want only that plugin's context.

---

## 22. *sf* <install> — SDK install

adds a specified SDK or addon to the project. user links AI to the install doc path.

**call:**
```
*dev* br{sf} : { run; *sf*; <install>; "[root/ai/sdks/sdk-name/install.br]" } :
```

**install doc requirements:**
- must exist at the given path — if not found, ERROR with reason
- must have this at the top (first 5 lines): `br : { read; pt; 'Install Doc' } :`
- if header not detected → ERROR: invalid install doc. missing required header.

**behaviour:** AI follows the install doc instructions, then updates b-rite.md, lang.md, and affected docs.

---

## 23. *sf* <directory> — search for existing feature

searches for an existing feature, file, or path. user provides interpretive context.

**call:**
```
br{sf} : { run; *sf*; <directory>; 'context describing what you're looking for' } :
```

**behaviour:** AI searches variables.br, functions.br, lang.md, folder structure. returns best match: `[path] — [description]`. if no match: suggests `<at>` with exact name.

---

## 24. *sf* <index> — check if something exists

verifies that something exists (e.g. SDK installed, files present). use after install to confirm.

**call:**
```
br{sf} : { run; *sf*; <index>; 'what to verify exists' } :
```

**behaviour:** AI checks sdk-registry, folder structure, required files. returns `exists — [paths]` or `missing — [items]`.

---

## 24b. *sf* <systemVersion> — return language version

returns the current b-rite language version in plain text.

**call:**
```
br{f} : { run; <systemVersion> } :
```

---

## 24c. *sf* <systemUpdates> — apply syntax updates

applies language syntax updates from a version file (e.g. br-v-0-3.md). document is ADDITIVE — adds only; does not remove unless `{DELETE} -> (target)` specified. when changing core *sf* or *sv*: requires !ADMIN! *dev*. prompts: save to current version or create new; HTML guide; detect and update SDKs/plugins.

**call:**
```
br : { run; <systemUpdates>; [root/ai/b-rite/lang/versions/br-v-0-3.md] } :
!sdk|003| br : { run; <systemUpdates>; [root/ai/sdks/sdk-web/br-v-0-3.md] } :
!plugin|001| br : { run; <systemUpdates>; [root/ai/plugins/plugin-podcast/br-v-0-3.md] } :
```

version file may contain !ADMIN! override at top — allows non-admin to run additive updates. core *sf* *sv* add/delete/alter still requires !ADMIN! *dev*.

---

## 25. path rules

all paths must be wrapped in `[ ]`. bare paths without `[ ]` are invalid and route to `error.br`.

`root` resolves to the project root as defined in variables.br `[system]` block.

**archived:** [root/archived] is where archived files live. archived files are never called by b-rite but can be kept by the user for future reference instead of deleting. do not read or execute files in [root/archived] unless the user explicitly requests it.

```
[root/ai/tasks/]        // valid
root/ai/tasks/          // invalid — missing [ ]
```

---

## 26. hello world

```
br : { return; pt; "hello world." } :
```

---

## 27. files the AI reads

on any `br` call, read in this order:
1. this file — `b-rite.md`
2. `options.br` — always; check devKit and interMode settings
3. **validate script structure** — if block is incomplete (missing `} :`), halt. do not execute. return error. skip this only if interMode = 1 or !ADMIN!.
4. `variables.br` — if `br` or `br{v}`
5. `functions.br` — if `br` or `br{f}`
6. execute script as written

do not read function files until they are called. do not hold function content in context until needed.

enforce rules strictly unless `interMode = 1` in `options.br`. if strict, return a short descriptive error for any syntax mistakes, naming mismatches, or missing directories. **incomplete script block = halt before any execution.**

---

## 28. silent execution

unless a return statement is present in the script, do not narrate what you read, 
what files you opened, or what steps you took.

default response when no return is specified:
  Command executed — [one short phrase describing what happened]

examples:
  Command executed — task file created
  Command executed — variable saved
  Command executed — options updated

this applies to all scripts. the user already knows what they asked for.
narrating the process wastes tokens and clutters the conversation.

exception: if an error occurs, always explain the error clearly regardless of 
whether a return was requested.
