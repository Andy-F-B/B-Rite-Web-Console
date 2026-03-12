# b-rite packaging guide
**for shipping finalized SDKs, project templates, or plugins**

run: `*dev* br{f} : { run; <package> } :` for guided packaging with folder creation and export.

---

## what you can package

| type | contents | use when |
|------|----------|----------|
| **native template** | clean b-rite language, no SDKs/plugins | shipping base b-rite for new projects |
| **SDK** | single SDK folder (e.g. sdk-web) | shipping a domain-specific SDK |
| **plugin** | single plugin folder (e.g. plugin-podcast) | shipping a domain-specific plugin |
| **project template** | native + selected SDKs/plugins | shipping a pre-configured starter |

---

## native template — include

```
[root]/
├── PACKAGE.md
├── ai/
│   ├── brain.md              (minimal: b-rite spec, permission levels, empty plugins/sdks)
│   ├── b-rite/               (full core)
│   │   ├── b-rite.md
│   │   ├── variables.br      (root = [B-RITE PROJECT], projectName, empty registries)
│   │   ├── options.br
│   │   ├── br-ignore.br
│   │   ├── sdk-registry.br    ([registry] empty)
│   │   ├── plugin-registry.br ([registry] empty)
│   │   ├── master_changelog.br ([log] empty)
│   │   ├── b-rite-mod.md
│   │   ├── lang/
│   │   │   ├── lang.md
│   │   │   ├── version.br
│   │   │   ├── lang-changelog.txt
│   │   │   ├── lang-evolution-checklist.md
│   │   │   └── versions/
│   │   │       ├── br-v-0-2-template.md
│   │   │       └── version-file-spec.md
│   │   ├── quick-start/
│   │   │   └── b-rite-cheatsheet.md
│   │   ├── errors/
│   │   └── functions/
│   ├── help/
│   │   ├── help.br
│   │   └── help-log.md       (template only, no entries)
│   ├── tasks/
│   │   └── task_template.md
│   ├── specs/              (empty — SDK outputs go here when sdk-web installed)
│   ├── plugins/              (empty folder)
│   ├── sdks/                 (sdk-builder.md, sdk-builder-guide.txt only)
│   ├── archived/             (empty)
│   └── type scripts/
│       ├── brite-auto.ahk
│       ├── brite-ADMIN-auto.ahk
│       ├── brite-dev-auto.ahk
│       └── auto-type-rules.txt
└── UI/
    └── dev-output/            (optional, empty — plans, docs, txt returns)
```

---

## native template — exclude

- installed SDKs (ai/sdks/sdk-web/, etc.)
- installed plugins (ai/plugins/plugin-podcast/, etc.)
- filled logs (master_changelog.br entries, help-log.md entries)
- UI/dev-output contents
- project-specific: autoScriptWebSDK, brite-webSDK.ahk, createAutoType (or keep for template)
- sdk-registry entries, plugin-registry entries
- brain.md plugin/SDK sections

---

## SDK package — include

```
sdk-name/
├── sdk-name-brain-block.md
├── variables.br
├── functions.br
├── install.br
├── sdk-guide.txt
├── sdk-syntax-update.md
├── functions/                (all .br files)
├── specs/                    (if present)
├── context/                  (if present)
├── tasks/                    (if present)
├── prompts/                  (if present)
├── ui-schema/                (if present)
├── setup-procedure.txt       (if present)
└── core-features-plan.txt    (if present)
```

---

## SDK package — exclude

- dev-output or temp files
- node_modules or build artifacts
- project-specific paths (ensure [root/...] for portability)

---

## plugin package — include

```
plugin-name/
├── plugin-name-brain-block.md
├── variables.br
├── functions.br
├── install.br
├── plugin-name-guide.txt
├── plugin-syntax-update.md
└── any domain-specific templates
```

---

## plugin package — exclude

- project-specific paths (use [root/...])
- temp or build files

---

## project template — include

native template + selected SDKs + selected plugins. When including sdk-web, ai/ structure shows:
  specs/ (product.md, architecture.md, etc. from sdk-web)
strip:
- master_changelog entries (or keep minimal)
- help-log entries
- set root = [B-RITE PROJECT] or placeholder
- registries with the included SDK/plugin codes only

---

## manual packaging steps

1. **choose type** — template, SDK, plugin, or project
2. **create export folder** — e.g. [root/packages/b-rite-native-0.2/]
3. **copy files** — per include lists above. use *sf* <copy> or manual copy
4. **strip** — remove excluded items. empty registries for template
5. **verify** — run *sf* <fileIntegrity> on output if it's a full project
6. **zip or distribute** — compress folder for distribution

---

## using <package>

run `*dev* br{f} : { run; <package> } :` for guided flow:

1. prompts: package type (template | sdk | plugin | project)
2. prompts: which item (for sdk: sdk-web; for plugin: plugin-podcast; for template: native)
3. prompts: export directory path (e.g. [root/packages/my-package/])
4. creates folder structure and copies files per type
5. returns path and summary

requires *dev* or !ADMIN! *dev*.
