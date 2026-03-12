'use client'

import { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { validateBrite, formatBrite, offsetToLineCol, type BriteError } from '@/lib/brite-parser'

const DEFAULT_SCRIPT = `br : { return; pt; "hello world." } :
`

export interface ScriptEditorRef {
  insertAtCursor: (text: string) => void
}

export const ScriptEditor = forwardRef<
  ScriptEditorRef,
  {
    initialContent?: string
    content?: string
    onContentChange?: (content: string) => void
    onSave?: (content: string) => void
    readOnly?: boolean
    onSearchOpen?: () => void
  }
>(function ScriptEditor(
  {
    initialContent = DEFAULT_SCRIPT,
    content: controlledContent,
    onContentChange,
    onSave,
    readOnly = false,
    onSearchOpen,
  },
  ref
) {
  const [internalContent, setInternalContent] = useState(initialContent)
  const content = controlledContent !== undefined ? controlledContent : internalContent
  const setContent = onContentChange ?? setInternalContent
  const [errors, setErrors] = useState<BriteError[]>([])
  const [showErrors, setShowErrors] = useState(true)
  const [pendingSemicolon, setPendingSemicolon] = useState(false)
  const [blockEndError, setBlockEndError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const validate = useCallback(() => {
    const errs = validateBrite(content)
    setErrors(errs)
  }, [content])

  useEffect(() => {
    validate()
  }, [content, validate])

  const insertAtCursor = useCallback(
    (text: string) => {
      const ta = textareaRef.current
      if (!ta) return
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const before = content.slice(0, start)
      const after = content.slice(end)
      const newContent = before + text + after
      setContent(newContent)
      setTimeout(() => {
        ta.focus()
        const newPos = start + text.length
        ta.setSelectionRange(newPos, newPos)
      }, 0)
    },
    [content, setContent]
  )

  useImperativeHandle(ref, () => ({ insertAtCursor }), [insertAtCursor])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const before = content.slice(0, start)
    const after = content.slice(end)

    // Ctrl+Alt+D — open function search
    if (e.key === 'd' && e.ctrlKey && e.altKey) {
      e.preventDefault()
      onSearchOpen?.()
      return
    }

    // Pending "} ;" — wait for next char
    if (pendingSemicolon) {
      setPendingSemicolon(false)
      if (e.key === '{') {
        e.preventDefault()
        const newBefore = before.replace(/\}\s+;\s*$/, '};')
        const insert = '\n  { '
        setContent(newBefore + insert + after)
        setTimeout(() => {
          ta.setSelectionRange(newBefore.length + insert.length, newBefore.length + insert.length)
        }, 0)
      } else if (
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        !['Backspace', 'Escape', 'Tab', 'Enter'].includes(e.key)
      ) {
        e.preventDefault()
        setBlockEndError('Code block must be ended with :')
        setTimeout(() => setBlockEndError(null), 3000)
      }
      return
    }

    // `};` (touching) — next block follows
    if (e.key === ';' && before.endsWith('}')) {
      e.preventDefault()
      const newBefore = before.slice(0, -1) + '};'
      const insert = '\n  { '
      setContent(newBefore + insert + after)
      setTimeout(() => {
        ta.setSelectionRange(newBefore.length + insert.length, newBefore.length + insert.length)
      }, 0)
      return
    }

    // `} ;` (space between) — wait for { or show error on other char
    if (e.key === ';' && before.match(/\}\s+$/)) {
      e.preventDefault()
      setPendingSemicolon(true)
      setContent(before + ';' + after)
      setTimeout(() => ta.setSelectionRange(start + 1, start + 1), 0)
      return
    }

    // `:` after `br ` — start first block
    if (e.key === ':' && before.match(/(?:^|\s)br\s*$/)) {
      e.preventDefault()
      setContent(before + ': { ' + after)
      setTimeout(() => ta.setSelectionRange(start + 4, start + 4), 0)
      return
    }

    // `:` after `} ` — end block, two newlines
    if (e.key === ':' && before.match(/\}\s*$/)) {
      e.preventDefault()
      setContent(before + ':\n\n' + after)
      setTimeout(() => ta.setSelectionRange(start + 3, start + 3), 0)
      return
    }
  }

  const handleFormat = () => {
    const formatted = formatBrite(content)
    setContent(formatted)
  }

  const handleAutoFill = () => {
    if (!content.trim()) {
      setContent(DEFAULT_SCRIPT)
    } else if (!content.includes('br :')) {
      setContent(`br : { ${content.trim()} } :`)
    }
  }

  return (
    <div className="script-editor">
      <div className="editor-toolbar">
        <button type="button" onClick={handleFormat}>Format</button>
        <button type="button" onClick={handleAutoFill}>Auto-fill</button>
        {onSave && <button type="button" onClick={() => onSave(content)}>Save</button>}
        <label>
          <input type="checkbox" checked={showErrors} onChange={(e) => setShowErrors(e.target.checked)} />
          Show errors
        </label>
      </div>
      <div className="editor-wrapper">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          readOnly={readOnly}
          className={errors.length && showErrors ? 'has-errors' : ''}
          data-gramm={false}
        />
        {blockEndError && (
          <div className="error-item" style={{ borderLeftColor: '#ef4444', marginTop: 8 }}>
            {blockEndError}
          </div>
        )}
        {showErrors && errors.length > 0 && (
          <div className="error-list">
            {errors.map((e, i) => {
              const { line, col } = offsetToLineCol(content, e.start)
              return (
                <div key={i} className="error-item" style={{ borderLeftColor: '#ef4444' }}>
                  <strong>Line {line}:</strong> {e.message}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
})
