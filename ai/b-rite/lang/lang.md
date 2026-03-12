# b-rite language state reference
**version:** 0.2
**purpose:** master reference of every token, command, function, and variable currently in the system.
**updated:** automatically when new functions or variables are created via nFunction or nVariable.
**use:** AI reads this for current language state. humans read this to understand what exists.

---

## current token map

| token | type | meaning |
|---|---|---|
| v | variable | permanent |
| vT | variable | temporary |
| *sv* | system variable | protected core |
| f | function | standard |
| fT | function | temporary |
| *sf* | system function | protected core |

modifier camelCase rule: second letter = modification type. extensible.

---

## current commands

read, fetch, write, edit, delete, return, ask, prompt, catch, run, do

---

## current system functions (*sf*)

| function | purpose |
|---|---|
| <no-log> | suppress logging |
| <log> | detailed log entry |
| <delete> | delete with confirmation |
| <move> | move file |
| <copy> | copy file or text |
| <new> | create new file or structure |
| <help> | troubleshooting assistant |
| <install> | add SDK/addon via install doc path |
| <directory> | search for existing feature — returns path |
| <index> | check if something exists — returns exists/missing |
| <archive> | move file or archive content to [root/archived] |
| <fileIntegrity> | scan native/protected/system files for integrity; writes report if issues |
| <systemVersion> | return current b-rite language version (pt) |
| <systemUpdates> | apply syntax updates from version file; additive; core changes require !ADMIN! *dev* |

---

## current standard functions

| function | purpose |
|---|---|
| <start> | onboarding and setup |
| <task> | task creation flow |
| <commit> | git stage, commit, push |
| <debug> | debug and cross-reference |
| <audit> | full repository audit |
| <at> | resolve location of target |
| <for> | apply prior action to target |

---

## current dev functions (devKit = 1)

| function | purpose |
|---|---|
| <nFunction> | create new function |
| <nVariable> | create new variable |
| <devKit> | language dashboard |
| <nSDK> | scaffold new sdk |
| <nSystemFunction> | create new *sf* — REQUIRES !ADMIN! *dev* |
| <nSystemVariable> | create new *sv* — REQUIRES !ADMIN! *dev* |
| <package> | guided packaging for SDKs, plugins, templates — requires *dev* |

---

## current system variables (*sv*)

| variable | value |
|---|---|
| (root) | project root |
| (mLog) | master changelog path |
| (options) | options.br path |
| (brIgnore) | br-ignore.br path |
| (lang) | this file path |
| (error_nf) | file not found error handler |
| (error_vf) | variable/function not found error handler |
| (error) | general error handler |
| (install) | install.br path |
| (directory) | directory.br path |
| (index) | index.br path |
| (archive) | sf_archive.br path — points to <archive> |
| (fileIntegrity) | sf_fileIntegrity.br path — points to <fileIntegrity> |
| (systemVersion) | systemVersion.br path — points to <systemVersion> |
| (systemUpdates) | systemUpdates.br path — points to <systemUpdates> |
| (versionFile) | version.br path — current language version |

---

## current user variables (v)

| variable | value |
|---|---|
| (tasks) | root/ai/tasks/ |
| (specs) | root/ai/specs/ |
| (migrations) | root/db/migrations/ |
| (functions) | root/ai/b-rite/functions/ |
| (brite) | root/ai/b-rite/ |
| (sdks) | root/ai/sdks/ |
| (plugins) | root/ai/plugins/ |
| (archived) | root/archived/ |
| (typeScripts) | root/ai/type scripts/ |
| (versions) | root/ai/b-rite/lang/versions/ |
| (brain) | root/ai/brain.md |
| (taskTemplate) | root/ai/tasks/task_template.md |

---

## installed plugins

| plugin | status |
|---|---|
(none — Web SDK template)

---

## installed sdks

| sdk | path |
|---|---|
| sdk-web | [root/ai/sdks/sdk-web/] |

---

## help system

| file | purpose |
|---|---|
| [root/ai/help/help.br] | troubleshooting system function |
| [root/ai/help/help-log.md] | auto-written session log |

---

## permission levels

| level | access |
|---|---|
| standard | normal operation |
| devKit + *dev* | sv/sf access; no br-ignore files |
| !ADMIN! + *dev* | full access including br-ignore files |

---

## language changelog

see lang-changelog.txt for full history.
