/**
 * Function/variable search index — build-time static data.
 * Sourced from [root/ai/b-rite/functions/functions.br], lang.md, sdk-web functions.br.
 */

export type SearchSource = 'native' | 'sdk'
export type SearchType = 'function' | 'variable'

export interface FunctionSearchEntry {
  name: string
  type: SearchType
  description: string
  example: string
  source: SearchSource
  insertText: string
}

const NATIVE_FUNCTIONS: FunctionSearchEntry[] = [
  { name: '<run>', type: 'function', description: 'Execute .br file as b-rite script', example: 'run; <task>; "arg"', source: 'native', insertText: 'run; ' },
  { name: '<return>', type: 'function', description: 'Output to user', example: 'return; pt; "text"', source: 'native', insertText: 'return; pt; ' },
  { name: '<read>', type: 'function', description: 'Load file for context', example: 'read; [root/ai/specs/product.md]', source: 'native', insertText: 'read; ' },
  { name: '<write>', type: 'function', description: 'Create new file or variable', example: 'write; v; (name); [path]', source: 'native', insertText: 'write; ' },
  { name: '<task>', type: 'function', description: 'Task creation flow', example: 'run; <task>; "task_0001"', source: 'native', insertText: '<task>' },
  { name: '<commit>', type: 'function', description: 'Git stage, commit, push', example: 'run; <commit>; "message"', source: 'native', insertText: '<commit>' },
  { name: '<help>', type: 'function', description: 'Troubleshooting assistant', example: 'run; *sf*; <help>; \'context\'', source: 'native', insertText: '<help>' },
  { name: '<directory>', type: 'function', description: 'Search for existing feature', example: 'run; *sf*; <directory>; \'search term\'', source: 'native', insertText: '<directory>' },
  { name: '<index>', type: 'function', description: 'Check if something exists', example: 'run; *sf*; <index>; \'target\'', source: 'native', insertText: '<index>' },
  { name: '<at>', type: 'function', description: 'Resolve location of target', example: 'run; <at>; "filename"', source: 'native', insertText: '<at>' },
  { name: '<for>', type: 'function', description: 'Apply prior action to target', example: 'run; <for>; "target"', source: 'native', insertText: '<for>' },
  { name: '<lastPrompt>', type: 'function', description: 'Reference most recent prompt', example: 'run; <lastPrompt>; \'Agent\'', source: 'native', insertText: '<lastPrompt>' },
  { name: '<no-log>', type: 'function', description: 'Suppress logging for this run', example: 'run; *sf*; <no-log>', source: 'native', insertText: '<no-log>' },
  { name: '<log>', type: 'function', description: 'Create detailed log entry', example: 'run; *sf*; <log>; "entry name"', source: 'native', insertText: '<log>' },
  { name: '<do>', type: 'function', description: 'Follow plain text instructions in .md/.txt', example: 'do; [root/ai/specs/product.md]', source: 'native', insertText: 'do; ' },
  { name: '<prompt>', type: 'function', description: 'Deep interpretive user input', example: 'prompt; \'instruction\'', source: 'native', insertText: 'prompt; \'' },
  { name: '<ask>', type: 'function', description: 'Prompt user for input', example: 'ask; (A1); "question"', source: 'native', insertText: 'ask; ' },
  { name: '<catch>', type: 'function', description: 'Receive and map user reply', example: 'catch', source: 'native', insertText: 'catch' },
]

const NATIVE_VARIABLES: FunctionSearchEntry[] = [
  { name: '(root)', type: 'variable', description: 'Project root path', example: '[root/ai/tasks/]', source: 'native', insertText: '(root)' },
  { name: '(tasks)', type: 'variable', description: 'Tasks directory', example: '[root/ai/tasks/]', source: 'native', insertText: '(tasks)' },
  { name: '(specs)', type: 'variable', description: 'Specs directory', example: '[root/ai/specs/]', source: 'native', insertText: '(specs)' },
  { name: '(functions)', type: 'variable', description: 'Functions directory', example: '[root/ai/b-rite/functions/]', source: 'native', insertText: '(functions)' },
  { name: '(brain)', type: 'variable', description: 'Brain.md path', example: '[root/ai/brain.md]', source: 'native', insertText: '(brain)' },
]

const SDK_WEB_FUNCTIONS: FunctionSearchEntry[] = [
  { name: '<specPhase>', type: 'function', description: 'Interview or generate spec files', example: 'run; <specPhase>; \'app idea\'', source: 'sdk', insertText: '<specPhase>' },
  { name: '<taskPhase>', type: 'function', description: 'Task breakdown from specs', example: 'run; <taskPhase>; "feature"', source: 'sdk', insertText: '<taskPhase>' },
  { name: '<buildPhase>', type: 'function', description: 'Implement feature per task', example: 'run; <buildPhase>; "feature"', source: 'sdk', insertText: '<buildPhase>' },
  { name: '<auditPhase>', type: 'function', description: 'Security, RLS, checklist verification', example: 'run; <auditPhase>', source: 'sdk', insertText: '<auditPhase>' },
  { name: '<migrationPhase>', type: 'function', description: 'Generate database migrations', example: 'run; <migrationPhase>; "plan"', source: 'sdk', insertText: '<migrationPhase>' },
  { name: '<anchorPhase>', type: 'function', description: 'Generate context anchors', example: 'run; <anchorPhase>', source: 'sdk', insertText: '<anchorPhase>' },
  { name: '<previewPhase>', type: 'function', description: 'HTML previews', example: 'run; <previewPhase>; "page"', source: 'sdk', insertText: '<previewPhase>' },
  { name: '<deployGuide>', type: 'function', description: 'Deployment walkthrough', example: 'run; <deployGuide>', source: 'sdk', insertText: '<deployGuide>' },
  { name: '<runLocal>', type: 'function', description: 'Run app locally', example: 'run; <runLocal>', source: 'sdk', insertText: '<runLocal>' },
  { name: '<npmInstall>', type: 'function', description: 'Run npm install', example: 'run; <npmInstall>', source: 'sdk', insertText: '<npmInstall>' },
  { name: '<gitSetup>', type: 'function', description: 'Initial git setup and push', example: 'run; <gitSetup>', source: 'sdk', insertText: '<gitSetup>' },
]

export function getFunctionSearchIndex(mode: 'native' | 'sdk-web'): FunctionSearchEntry[] {
  const native = [...NATIVE_FUNCTIONS, ...NATIVE_VARIABLES]
  if (mode === 'native') return native
  return [...native, ...SDK_WEB_FUNCTIONS]
}

export function searchFunctions(query: string, mode: 'native' | 'sdk-web'): FunctionSearchEntry[] {
  const index = getFunctionSearchIndex(mode)
  const q = query.trim().toLowerCase()
  if (!q) return index.slice(0, 20)
  return index
    .filter((e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
    .slice(0, 20)
}
