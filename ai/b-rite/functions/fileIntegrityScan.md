# fileIntegrityScan — native reference
**purpose:** cross-reference for <fileIntegrity>. condensed transcripts of expected structure.
**AI reads this when running *sf* <fileIntegrity> to compare current state.**

---

## protected (br-ignore)
[root/ai/b-rite/br-ignore.br]
[root/ai/b-rite/b-rite.md]
[root/ai/b-rite/errors/error_nf.br]
[root/ai/b-rite/errors/error_vf.br]
[root/ai/b-rite/errors/error.br]
[root/ai/brain.md]
[root/ai/help/help.br]
[root/ai/help/help-log.md]

## core b-rite
[root/ai/b-rite/variables.br] — [system] [paths] [files] [values]
[root/ai/b-rite/options.br] — interMode devKit
[root/ai/b-rite/functions/functions.br] — *sf* and core index
[root/ai/b-rite/sdk-registry.br] — [registry] empty or 003 when installed
[root/ai/b-rite/plugin-registry.br] — [registry] empty or 001 002 when installed
[root/ai/b-rite/master_changelog.br] — [log]
[root/ai/b-rite/lang/lang.md] — token map functions variables
[root/ai/b-rite/lang/version.br] — current language version
[root/ai/b-rite/br-ignore.br] — [protected] [protected-tokens]

## system vars (variables.br [system])
root error_nf error_vf error mLog options brIgnore lang install sdkRegistry pluginRegistry directory index archive fileIntegrity autoScript autoScriptAdmin autoScriptDev autoScriptWebSDK systemVersion systemUpdates

## paths (variables.br [paths])
tasks specs migrations functions brite sdks plugins archived typeScripts versions

## plugins (plugin-registry)
[registry] - empty (installed format example - 001->[root/ai/plugins/plugin-podcast/])


## sdks (sdk-registry)
[registry] — empty (installed format example - 003=sdk-web when installed)

## brain.md sections
b-rite script language | permission levels | installed plugins | plugin-podcast | plugin-film | installed sdks | archived

## b-rite.md sections
critical error files | what b-rite is | entry points | script structure | wrapping rules | casing | tokens | variables vs anchors | core commands | return types | input | catch | opt | scope | function calls | logging | file types | inter mode | devKit | !ADMIN! | br-ignore | !sdk|###| | !plugin|###| | install | directory | index | systemVersion | systemUpdates | path rules | archived | files AI reads | silent execution

## expected plugin structure (per plugin)
plugin-name-brain-block.md | variables.br | functions.br | install.br | guide.txt | plugin-syntax-update.md (template for updates)

## expected sdk structure (per sdk)
sdk-name-brain-block.md | variables.br | functions.br | install.br | sdk-guide.txt | sdk-syntax-update.md (template for updates) | version.br (optional, sync with b-rite)
