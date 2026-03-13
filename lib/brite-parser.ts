/**
 * B-Rite syntax validator — code-based (no LLM).
 * Validates structure per b-rite.md: br : { } :, wrapping rules, casing.
 * Skips validation inside quoted strings ' ' and " ".
 */

export interface BriteError {
  message: string
  start: number
  end: number
}

function getStringRanges(content: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = []
  let i = 0
  const len = content.length
  while (i < len) {
    if (content[i] === '"' || content[i] === "'") {
      const quote = content[i]
      let j = i + 1
      while (j < len && content[j] !== quote) {
        if (content[j] === '\\') j++
        j++
      }
      if (j < len) j++
      ranges.push([i, j])
      i = j
    } else {
      i++
    }
  }
  return ranges
}

function isInsideString(offset: number, ranges: Array<[number, number]>): boolean {
  return ranges.some(([s, e]) => offset >= s && offset < e)
}

export function validateBrite(content: string): BriteError[] {
  const errors: BriteError[] = []
  const stringRanges = getStringRanges(content)

  // Check script opens with br :
  const openMatch = content.match(/^\s*(br\s*:\s*)/)
  if (!openMatch && content.trim()) {
    const idx = content.indexOf('br')
    if (idx === -1 && !isInsideString(0, stringRanges)) {
      errors.push({ message: 'Expected br : at start', start: 0, end: Math.min(10, content.length) })
    }
  }

  // Check script closes with } :
  const closeMatch = content.match(/\}\s*:\s*$/)
  if (!closeMatch && content.trim()) {
    const lastBrace = content.lastIndexOf('}')
    const lastColon = content.lastIndexOf(':')
    if (lastBrace >= 0 && lastColon < lastBrace && !isInsideString(lastBrace, stringRanges)) {
      errors.push({
        message: 'Script block incomplete. Expected } :',
        start: lastBrace,
        end: content.length,
      })
    } else if (!content.includes('}') && content.trim().length > 5) {
      errors.push({
        message: 'Expected } : to close script',
        start: Math.max(0, content.length - 10),
        end: content.length,
      })
    }
  }

  // Check for balanced { } — skip inside strings
  let depth = 0
  for (let i = 0; i < content.length; i++) {
    if (isInsideString(i, stringRanges)) continue
    if (content[i] === '{') depth++
    else if (content[i] === '}') depth--
    if (depth < 0) {
      errors.push({ message: 'Unexpected }', start: i, end: i + 1 })
      break
    }
  }
  if (depth > 0 && !errors.length) {
    const lastOpen = content.lastIndexOf('{')
    if (!isInsideString(lastOpen, stringRanges)) {
      errors.push({ message: 'Unclosed {', start: lastOpen, end: lastOpen + 1 })
    }
  }

  // Casing: commands lowercase — skip inside strings
  const commands = ['read', 'run', 'return', 'ask', 'prompt', 'catch', 'write', 'edit', 'delete', 'fetch', 'do']
  const commandRegex = new RegExp(`\\b(${commands.join('|')})\\b`, 'gi')
  let m
  while ((m = commandRegex.exec(content)) !== null) {
    if (isInsideString(m.index, stringRanges)) continue
    const lower = m[1].toLowerCase()
    if (m[1] !== lower) {
      errors.push({
        message: `Command must be lowercase: ${lower}`,
        start: m.index,
        end: m.index + m[1].length,
      })
    }
  }

  return errors
}

export function offsetToLineCol(content: string, offset: number): { line: number; col: number } {
  const before = content.slice(0, offset)
  const lines = before.split('\n')
  return { line: lines.length, col: lines[lines.length - 1].length + 1 }
}

export function formatBrite(content: string): string {
  let out = content
  // Fix command casing
  const commands = ['read', 'run', 'return', 'ask', 'prompt', 'catch', 'write', 'edit', 'delete', 'fetch', 'do']
  commands.forEach((cmd) => {
    const re = new RegExp(`\\b${cmd}\\b`, 'gi')
    out = out.replace(re, cmd)
  })
  return out
}
