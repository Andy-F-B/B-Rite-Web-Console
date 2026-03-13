/**
 * B-Rite syntax validator — code-based (no LLM).
 * Validates structure per b-rite.md: br : { } :, wrapping rules, casing.
 * Skips validation inside quoted strings ' ' and " ".
 */

export interface BriteError {
  message: string
  start: number
  end: number
  severity?: 'error' | 'warning'
}

export interface StringRange {
  start: number
  end: number
  quoteChar: '"' | "'"
}

function getStringRanges(content: string): StringRange[] {
  const ranges: StringRange[] = []
  let i = 0
  const len = content.length
  while (i < len) {
    if (content[i] === '"' || content[i] === "'") {
      const quote = content[i] as '"' | "'"
      let j = i + 1
      while (j < len && content[j] !== quote) {
        if (content[j] === '\\') j++
        j++
      }
      if (j < len) j++
      ranges.push({ start: i, end: j, quoteChar: quote })
      i = j
    } else {
      i++
    }
  }
  return ranges
}

function isInsideString(offset: number, ranges: StringRange[]): boolean {
  return ranges.some((r) => offset >= r.start && offset < r.end)
}

function findMatchesOutsideStrings(
  content: string,
  regex: RegExp,
  stringRanges: StringRange[]
): RegExpExecArray[] {
  const matches: RegExpExecArray[] = []
  let m: RegExpExecArray | null
  const re = new RegExp(regex.source, regex.flags)
  while ((m = re.exec(content)) !== null) {
    if (!isInsideString(m.index, stringRanges)) matches.push(m)
  }
  return matches
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

  // A. Empty literal string " "
  for (const r of stringRanges) {
    if (r.quoteChar !== '"') continue
    const inner = content.slice(r.start + 1, r.end - 1)
    if (/^\s*$/.test(inner)) {
      errors.push({
        message: 'Empty literal string " " is a syntax error. Use \' \' for empty interpretive string.',
        start: r.start,
        end: r.end,
      })
    }
  }

  // B. Missing ; between code blocks — }\s*{
  const missingSemi = findMatchesOutsideStrings(content, /\}\s*\{/g, stringRanges)
  for (const m of missingSemi) {
    errors.push({
      message: 'Missing ; between code blocks. Use }; to separate.',
      start: m.index,
      end: m.index + m[0].length,
    })
  }

  // C. Trailing ; after final block — };\s*: or }\s*;\s*: at end
  const trailingSemi = content.match(/\}\s*;\s*:\s*$/)
  if (trailingSemi) {
    const startIdx = content.length - trailingSemi[0].length
    const semiPos = content.indexOf(';', startIdx)
    if (semiPos >= 0 && semiPos < content.length && !isInsideString(startIdx, stringRanges)) {
      errors.push({
        message: 'Trailing ; after final block. Remove the semicolon before the closing :.',
        start: semiPos,
        end: semiPos + 1,
      })
    }
  }

  // D. run with non-.br path — run; [path] where path does NOT end in .br
  const runPathMatch = findMatchesOutsideStrings(
    content,
    /\brun\s*;\s*\[([^\]]+)\]/g,
    stringRanges
  )
  for (const m of runPathMatch) {
    const path = m[1].trim()
    if (!path.toLowerCase().endsWith('.br')) {
      errors.push({
        message: 'run requires a .br file. Use `do` for .md or .txt files.',
        start: m.index,
        end: m.index + m[0].length,
        severity: 'warning',
      })
    }
  }

  // E. do with .br path
  const doPathMatch = findMatchesOutsideStrings(
    content,
    /\bdo\s*;\s*\[([^\]]+)\]/g,
    stringRanges
  )
  for (const m of doPathMatch) {
    const path = m[1].trim()
    if (path.toLowerCase().endsWith('.br')) {
      errors.push({
        message: 'do requires a .md or .txt file. Use `run` for .br scripts.',
        start: m.index,
        end: m.index + m[0].length,
        severity: 'warning',
      })
    }
  }

  // F. -> with spaces
  const pointsToSpaced = findMatchesOutsideStrings(content, /\s+->\s+/g, stringRanges)
  for (const m of pointsToSpaced) {
    errors.push({
      message: 'Points-to operator -> must have no spaces. Use identifier->path, not identifier -> path.',
      start: m.index,
      end: m.index + m[0].length,
      severity: 'warning',
    })
  }

  // H. Invalid entry point — br{...} where content is not f, v, sf, sv
  const entryPointMatch = content.match(/br\s*\{([^}]*)\}/g)
  if (entryPointMatch) {
    for (const ep of entryPointMatch) {
      const inner = ep.replace(/^br\s*\{/, '').replace(/\}$/, '').trim()
      if (inner && !/^(f|v|sf|sv)$/.test(inner)) {
        const idx = content.indexOf(ep)
        if (idx >= 0 && !isInsideString(idx, stringRanges)) {
          errors.push({
            message: 'Invalid entry point. Valid options: br, br{f}, br{v}, br{sf}, br{sv}.',
            start: idx,
            end: idx + ep.length,
          })
        }
      }
    }
  }

  // I. *dev* or !ADMIN! inside code block (after first { that starts block)
  const colonIdx = content.indexOf(' :')
  const blockStart = colonIdx >= 0 ? content.indexOf('{', colonIdx + 1) : -1
  if (blockStart >= 0) {
    const checkToken = (token: string) => {
      let idx = content.indexOf(token)
      while (idx >= 0) {
        if (idx >= blockStart && !isInsideString(idx, stringRanges)) {
          errors.push({
            message: '*dev* / !ADMIN! must appear before the entry point, outside the script block.',
            start: idx,
            end: idx + token.length,
          })
        }
        idx = content.indexOf(token, idx + 1)
      }
    }
    checkToken('*dev*')
    checkToken('!ADMIN!')
  }

  // J. Anchor format — (XX) must be (A1)–(Z9)
  const anchorMatch = findMatchesOutsideStrings(content, /\(([^)]{2})\)/g, stringRanges)
  for (const m of anchorMatch) {
    const val = m[1]
    const valid = /^[A-Z][1-9]$/.test(val)
    if (!valid) {
      errors.push({
        message: 'Anchor values must be format (A1)–(Z9): one uppercase letter + one digit 1-9.',
        start: m.index,
        end: m.index + m[0].length,
        severity: 'warning',
      })
    }
  }

  // K. Underscore in function/variable names
  const underscoreFn = findMatchesOutsideStrings(content, /<[a-z]+_[a-z]/g, stringRanges)
  const underscoreVar = findMatchesOutsideStrings(content, /\([a-z]+_[a-z]/g, stringRanges)
  for (const m of [...underscoreFn, ...underscoreVar]) {
    errors.push({
      message: 'Use camelCase for multi-word names: <taskMaker>, not <task_maker>.',
      start: m.index,
      end: m.index + m[0].length,
      severity: 'warning',
    })
  }

  // L. Modifier token casing: vt, ft, fi → vT, fT, fI
  const modMatch = findMatchesOutsideStrings(content, /\b(vt|ft|fi)\b/gi, stringRanges)
  for (const m of modMatch) {
    errors.push({
      message: 'Token modifier must be camelCase: vT, fT, fI — not vt, ft, fi.',
      start: m.index,
      end: m.index + m[0].length,
      severity: 'warning',
    })
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
  // Fix -> spacing (strip spaces around points-to operator)
  out = out.replace(/\s+->\s+/g, '->')
  return out
}
