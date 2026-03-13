## sdk-web

version: 0.2 (b-rite 0.2)
this sdk covers AI-driven web app development per the AI App Development Handbook.
stack: Next.js + Supabase + Vercel.
scope: web only (phones, tablets, desktop — responsive). no iOS/Android/Desktop app frameworks.

sdk variables: [root/ai/sdks/sdk-web/variables.br]
sdk functions: [root/ai/sdks/sdk-web/functions.br]

when working on web app tasks, read sdk-web/variables.br for paths.
spec templates live in sdk-web/specs/, context/, tasks/. outputs go to [root/ai/specs/], [root/ai/context/], [root/ai/tasks/], [root/UI/], [root/UI/dev-output/].

key functions:
- <sdkWebSetup>   — how to install and connect sdk-web to b-rite
- <specPhase>     — A1 interview or A2 paste prompt → specs
- <anchorPhase>   — context anchors
- <taskPhase>     — task breakdown
- <migrationPhase> — migrations
- <buildPhase>    — build
- <auditPhase>    — audit
- <previewPhase>  — HTML previews → [root/UI/]
- <runSinglePhase> — run one phase by name
- <runPhases>     — run selected phases
- <runFullPipeline> — all phases, B1 ref option
- <masterProgramMaker> — agent-switch per section, B1 ref option
- <agentHandoff>  — generate handoff when user declines agent
- <deployGuide>   — Git, Vercel, Supabase walkthrough
- <createFeaturePack> — scaffold feature pack
- <runLocal> — run app locally (npm run dev)
- <npmInstall>   — run npm install in project root (once per project)
- <gitSetup>     — initial git setup + push (provide remote URL)
- <taskVariable> — create task variable (camelCase) in [taskVariables]. read; (varName) summarizes task.
