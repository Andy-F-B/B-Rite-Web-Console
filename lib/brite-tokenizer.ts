/**
 * B-Rite tokenizer for syntax highlighting.
 * Returns spans with token types for display-only styling.
 */

export type BriteTokenType =
  | 'string'
  | 'command'
  | 'function'
  | 'systemFunction'
  | 'variable'
  | 'path'
  | 'comment'
  | 'sdkPrefix'
  | 'default'

export interface BriteToken {
  start: number
  end: number
  type: BriteTokenType
  value: string
}

const COMMANDS = [
  'read', 'run', 'return', 'ask', 'prompt', 'catch', 'write', 'edit',
  'delete', 'fetch', 'do', 'no-log', 'log',
]

export function tokenizeBrite(content: string): BriteToken[] {
  const tokens: BriteToken[] = []
  let i = 0
  const len = content.length

  while (i < len) {
    // SDK prefix !sdk|###|
    const sdkMatch = content.slice(i).match(/^!sdk\|\d+\|/)
    if (sdkMatch) {
      tokens.push({ start: i, end: i + sdkMatch[0].length, type: 'sdkPrefix', value: sdkMatch[0] })
      i += sdkMatch[0].length
      continue
    }

    // Double-quoted string
    if (content[i] === '"') {
      let j = i + 1
      while (j < len && content[j] !== '"') {
        if (content[j] === '\\') j++
        j++
      }
      if (j < len) j++
      tokens.push({ start: i, end: j, type: 'string', value: content.slice(i, j) })
      i = j
      continue
    }

    // Single-quoted string
    if (content[i] === "'") {
      let j = i + 1
      while (j < len && content[j] !== "'") {
        if (content[j] === '\\') j++
        j++
      }
      if (j < len) j++
      tokens.push({ start: i, end: j, type: 'string', value: content.slice(i, j) })
      i = j
      continue
    }

    // Line comment //
    if (content[i] === '/' && content[i + 1] === '/') {
      let j = i + 2
      while (j < len && content[j] !== '\n') j++
      tokens.push({ start: i, end: j, type: 'comment', value: content.slice(i, j) })
      i = j
      continue
    }

    // System function *sf*
    const sfMatch = content.slice(i).match(/^\*sf\*/)
    if (sfMatch) {
      tokens.push({ start: i, end: i + sfMatch[0].length, type: 'systemFunction', value: sfMatch[0] })
      i += sfMatch[0].length
      continue
    }

    // Function <name>
    if (content[i] === '<') {
      let j = i + 1
      while (j < len && content[j] !== '>' && content[j] !== '\n') j++
      if (j < len && content[j] === '>') {
        j++
        tokens.push({ start: i, end: j, type: 'function', value: content.slice(i, j) })
        i = j
        continue
      }
    }

    // Variable (name)
    if (content[i] === '(') {
      let j = i + 1
      while (j < len && content[j] !== ')' && content[j] !== '\n') j++
      if (j < len && content[j] === ')') {
        j++
        tokens.push({ start: i, end: j, type: 'variable', value: content.slice(i, j) })
        i = j
        continue
      }
    }

    // Path [path]
    if (content[i] === '[') {
      let j = i + 1
      while (j < len && content[j] !== ']' && content[j] !== '\n') j++
      if (j < len && content[j] === ']') {
        j++
        tokens.push({ start: i, end: j, type: 'path', value: content.slice(i, j) })
        i = j
        continue
      }
    }

    // Command (whole word)
    const cmdMatch = content.slice(i).match(/^([a-z][a-z0-9-]*)\b/)
    if (cmdMatch && COMMANDS.includes(cmdMatch[1])) {
      const wordEnd = i + cmdMatch[1].length
      tokens.push({ start: i, end: wordEnd, type: 'command', value: cmdMatch[1] })
      i = wordEnd
      continue
    }

    // Single char default
    tokens.push({ start: i, end: i + 1, type: 'default', value: content[i] })
    i++
  }

  return tokens
}
