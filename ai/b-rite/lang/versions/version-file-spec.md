# Version update file specification
**for br-v-X-X.md files used by <systemUpdates>**

---

## required structure

```
# b-rite language update — ADDITIVE
**!ADMIN! override:** (optional) allows non-admin to run additive updates. core *sf* *sv* changes still require !ADMIN! *dev*.

**version:** X.X
**type:** additive

---

## MAIN
[instructions for main b-rite language]

---

## SDK
[instructions for SDKs — apply only if update affects SDK .br code]

---

## PLUGIN
[instructions for plugins — apply only if update affects plugin .br code]
```

---

## sections

| section | applies to | when to include |
|---------|------------|-----------------|
| MAIN | [root/ai/b-rite/], brain.md, b-rite.md, variables.br, functions.br, lang.md, fileIntegrityScan.md, options.br | always |
| SDK | each [root/ai/sdks/*/] | only if change affects SDK .br files |
| PLUGIN | each [root/ai/plugins/*/] | only if change affects plugin .br files |

---

## additive vs delete

**default:** all instructions are ADDITIVE — add or edit. do not remove existing content unless explicitly instructed.

**delete syntax:** `{DELETE} -> (target)`
- `{DELETE} -> (varName)` — remove from variables.br
- `{DELETE} -> <fnName>` — remove from functions.br, archive .br file
- use sparingly; document reason in update file

---

## targeting files

- reference paths with [root/...] or relative to target context
- be explicit: "add to functions.br under *sf* section" not "update functions"
- one instruction per logical change

---

## naming

`br-v-X-X.md` — e.g. br-v-0-3.md for version 0.3
