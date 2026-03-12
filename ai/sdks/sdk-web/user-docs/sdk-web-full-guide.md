# Web SDK — Full Documentation Guide

**version:** 0.3  
**b-rite compatible:** 0.2

---

## 1. Quick Tools — b-rite Language

### Entry points
```
br          — core + functions + variables
br{f}       — functions only
br{v}       — variables only
br{sf}      — system functions only
```

### Invoking the Web SDK
```
*dev* !sdk|003| br : { run; <functionName> } :
*dev* !sdk|003| br : { run; <specPhase>; 'app idea' } :
```

### Common one-liners
```
*dev* !sdk|003| br : { run; <quickStart> } :
*dev* !sdk|003| br : { run; <runFullPipeline> } :
*dev* !sdk|003| br : { run; <deployGuide> } :
br{sf} : { run; *sf*; <autoScriptWebSDK> } :
```

---

## 2. Running SDK Prompts Manually (Without b-rite)

If not using b-rite, you can run the phase prompts directly. Tell the AI to:

1. **Spec phase:** Read [root/ai/sdks/sdk-web/prompts/spec-phase-prompt.md], then execute. Ask A1/A2: interview or paste prompt.
2. **Anchor phase:** Read [root/ai/sdks/sdk-web/prompts/anchor-phase-prompt.md], execute. Output to [root/ai/context/].
3. **Task phase:** Read [root/ai/sdks/sdk-web/prompts/task-phase-prompt.md], execute. Output to [root/ai/tasks/].
4. **Migration phase:** Read [root/ai/sdks/sdk-web/prompts/migration-phase-prompt.md], execute. Output to [root/db/migrations/].
5. **Build phase:** Read [root/ai/sdks/sdk-web/prompts/master-builder-prompt.md], execute. Output to app/, components/, lib/.
6. **Audit phase:** Read [root/ai/sdks/sdk-web/prompts/security-audit-prompt.md], execute.
7. **Preview phase:** Read [root/ai/sdks/sdk-web/prompts/preview-phase-prompt.md], execute. Output to [root/UI/].

**Reference files:** [root/ai/sdks/sdk-web/variables.br] for paths. [root/ai/sdks/sdk-web/setup-procedure.txt] for full flow.

---

## 3. SDK Functions and Variables

### SDK functions (sdk-web)
| Function | Args | Notes |
|----------|------|-------|
| <sdkWebSetup> | none | Setup instructions |
| <quickStart> | none | Full kickstart |
| <specPhase> | opt arg1 = app idea | A1/A2 choice: interview or paste prompt |
| <anchorPhase> | opt arg1 = feature | Context anchors |
| <taskPhase> | arg1 = feature or "all" | Task breakdown |
| <migrationPhase> | arg1 = table or "plan" | Migrations |
| <buildPhase> | arg1 = feature | Implement feature |
| <auditPhase> | opt arg1 = scope | Security + checklist |
| <previewPhase> | arg1, opt arg2="multi" | HTML previews |
| <runSinglePhase> | arg1 = phase name | Run one phase |
| <runPhases> | arg1 = comma phases | Run selected |
| <runFullPipeline> | none | All phases, B1 ref option |
| <masterProgramMaker> | none | Agent-switch per section, B1 ref option |
| <agentHandoff> | arg1 = section | Handoff when switching |
| <deployGuide> | none | Git, Vercel, Supabase walkthrough |
| <createFeaturePack> | none | Scaffold feature pack |
| <npmInstall> | none | Run npm install in project root |
| <gitSetup> | none | Initial git setup + push (provide remote URL) |
| <projectVersion> | none | Version info |

### SDK variables (sdk-web variables.br)
| Variable | Path |
|----------|------|
| deployGuide | [root/ai/sdks/sdk-web/functions/deployGuide.br] |
| npmInstall | [root/ai/sdks/sdk-web/functions/npmInstall.br] |
| gitSetup | [root/ai/sdks/sdk-web/functions/gitSetup.br] |
| setupProcedure | [root/ai/sdks/sdk-web/setup-procedure.txt] |
| coreFeaturesPlan | [root/ai/sdks/sdk-web/core-features-plan.txt] |
| specs | [root/ai/sdks/sdk-web/specs/] |
| context | [root/ai/sdks/sdk-web/context/] |
| tasks | [root/ai/sdks/sdk-web/tasks/] |
| aiSpecs | [root/ai/specs/] |
| aiContext | [root/ai/context/] |
| aiTasks | [root/ai/tasks/] |
| output | [root/UI/dev-output/] |

---

## 4. b-rite Functions and Variables (Core)

### Auto-type (*sf*)
| Function | Launches |
|----------|----------|
| <autoScript> | brite-auto.ahk |
| <autoScriptAdmin> | brite-ADMIN-auto.ahk |
| <autoScriptDev> | brite-dev-auto.ahk |
| <autoScriptWebSDK> | brite-webSDK.ahk |
| <autoScriptAdminWebSDK> | brite-webSDK-ADMIN-auto.ahk |
| <autoScriptDevWebSDK> | brite-webSDK-dev.auto.ahk |

### System functions (*sf*)
<help>, <install>, <directory>, <index>, <archive>, <no-log>, <log>, <delete>, <move>, <copy>, <new>, <fileIntegrity>, <systemVersion>, <systemUpdates>

### Core functions
<start>, <task>, <commit>, <debug>, <audit>, <at>, <for>, <lastPrompt>, <package>, <createAutoType>, <devKit>, <nFunction>, <nVariable>, <nSDK>

### Key variables (variables.br [system])
root, error_nf, error_vf, error, mLog, options, brIgnore, sdkRegistry, pluginRegistry, autoScript*, systemVersion, systemUpdates

---

## 5. Pipeline Options

### A1/A2 (spec phase)
- **A1** — Agent interviews you for specs
- **A2** — Paste your prompt; agent auto-fills

### B1 (runFullPipeline / masterProgramMaker)
- **B1** — Reference paths for context. Format: `[B1] - [path/to/file] Brief explanation`
- Example: `[B1] - [root/UI/dev-output/design-ref.html] I want to incorporate the same style of UI`

---

## 6. Output Paths

| Content | Target |
|---------|--------|
| Specs | [root/ai/specs/] |
| Anchors | [root/ai/context/] |
| Tasks | [root/ai/tasks/] |
| Migrations | [root/db/migrations/] |
| App code | [root/app/], [root/components/], [root/lib/] |
| Previews | [root/UI/] |
| Reports, plans | [root/UI/dev-output/] |
