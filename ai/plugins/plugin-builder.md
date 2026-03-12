# plugin builder
**purpose:** instructions for building a new b-rite plugin.
**hierarchy:** custom functions → Plugins → SDKs (multiple plugins) → SaaS SDK
**AI reads this file when creating a new plugin.**

---

## what a plugin is

a plugin is an executable custom function library — single-purpose, focused feature set.
plugins can be loaded standalone or composed into SDKs.
plugins live in [root/ai/plugins/] and are activated by adding their brain block to brain.md.

---

## plugin vs sdk

**Plugin when:** single domain or output type (podcast, film, e-book, scraper, data, music/graphic, writer)
**SDK when:** platform or stack (web, app, content hub, game) that combines multiple plugins

---

## minimum plugin structure

```
/ai/plugins/plugin-name/
├── plugin-name-brain-block.md   — paste into brain.md to activate
├── install.br                    — install doc (required for *sf* <install>)
├── variables.br                  — domain paths and file references
├── functions.br                  — domain function index
├── plugin-name-guide.txt         — human-readable guide
└── plugin-syntax-update.md       — template for language updates (copy from ai/plugins/)
```

---

## install doc format

install docs are required for *sf* <install>. they must have this at the top (first 5 lines):

```
br : { read; pt; 'Install Doc' } :
```

---

## plugin code registry

each plugin has a 3-digit code (001, 002, …) in [root/ai/b-rite/plugin-registry.br].
!plugin|###| syntax (when implemented in b-rite.md) enables plugin-scoped execution.

---

## brain block format

```
## plugin-name
this plugin covers [domain].
plugin variables: [root/ai/plugins/plugin-name/variables.br]
plugin functions: [root/ai/plugins/plugin-name/functions.br]
key functions: <fn1>, <fn2>, <fn3>
```

---

## quick scaffold

1. create folder [root/ai/plugins/plugin-name/]
2. copy structure from plugin-podcast or plugin-film
3. assign next code in plugin-registry.br
4. add brain block to brain.md
