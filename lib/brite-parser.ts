/**
 * B-Rite syntax validator — code-based (no LLM).
 * Validates structure per b-rite.md: br : { } :, wrapping rules, casing.
 */

export interface BriteError {
  message: string
  start: number
  end: number
}

export function validateBrite(content: string): BriteError[] {
  const errors: BriteError[] = []
  const lines = content.split('\n')

  // Check script opens with br :
  const openMatch = content.match(/^\s*(br\s*:\s*)/)
  if (!openMatch && content.trim()) {
    const idx = content.indexOf('br')
    if (idx === -1) {
      errors.push({ message: 'Expected br : at start', start: 0, end: Math.min(10, content.length) })
    }
  }

  // Check script closes with } :
  const closeMatch = content.match(/\}\s*:\s*$/)
  if (!closeMatch && content.trim()) {
    const lastBrace = content.lastIndexOf('}')
    const lastColon = content.lastIndexOf(':')
    if (lastBrace >= 0 && lastColon < lastBrace) {
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

  // Check for balanced { }
  let depth = 0
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') depth++
    else if (content[i] === '}') depth--
    if (depth < 0) {
      errors.push({ message: 'Unexpected }', start: i, end: i + 1 })
      break
    }
  }
  if (depth > 0 && !errors.length) {
    const lastOpen = content.lastIndexOf('{')
    errors.push({ message: 'Unclosed {', start: lastOpen, end: lastOpen + 1 })
  }

  // Casing: commands lowercase (read, run, return, ask, etc.)
  const commands = ['read', 'run', 'return', 'ask', 'prompt', 'catch', 'write', 'edit', 'delete', 'fetch', 'do']
  const commandRegex = new RegExp(`\\b(${commands.join('|')})\\b`, 'gi')
  let m
  while ((m = commandRegex.exec(content)) !== null) {
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
