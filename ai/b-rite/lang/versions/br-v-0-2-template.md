# b-rite language update — ADDITIVE
**!ADMIN! override:** this file may be run by non-admin users for additive updates. system-level *sf* *sv* add/delete/alter still requires !ADMIN! *dev*.

**version:** 0.2
**type:** additive (adds only; does not remove unless {DELETE} specified)

**format spec:** see version-file-spec.md in this folder.

---

## MAIN

Instructions for the main b-rite language. Apply to [root/ai/b-rite/], brain.md, b-rite.md, variables.br, functions.br, lang.md, fileIntegrityScan.md as specified.

Example additions:
- new *sf* <name> — add to functions.br, create sf_name.br
- new *sv* (name) — add to variables.br [system]
- new option — add to options.br
- new b-rite.md section — append to b-rite.md

Example deletion (use sparingly):
- {DELETE} -> (oldVar) — remove from variables.br
- {DELETE} -> <oldFn> — remove from functions.br, archive .br file

---

## SDK

Instructions for SDKs. Paste sdk-syntax-update.md into each SDK root. SDKs run: !sdk|###| br : { run; <systemUpdates>; [sdk/br-v-X-X.md] } :

**Rule:** Analyze the changes below. Update SDK syntax only if needed. If the below does not affect any .br code or functions in this SDK, do not alter. Otherwise make changes according to the instructions.

[SDK-specific changes go here — paths, new functions SDK should use, etc.]

---

## PLUGIN

Instructions for plugins. Paste plugin-syntax-update.md into each plugin root. Plugins run: !plugin|###| br : { run; <systemUpdates>; [plugin/br-v-X-X.md] } :

**Rule:** Analyze the changes below. Update plugin syntax only if needed. If the below does not affect any .br code or functions in this plugin, do not alter. Otherwise make changes according to the instructions.

[PLUGIN-specific changes go here]
