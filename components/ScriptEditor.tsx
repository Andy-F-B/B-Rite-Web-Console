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
  }
>(function ScriptEditor(
  {
    initialContent = DEFAULT_SCRIPT,
    content: controlledContent,
    onContentChange,
    onSave,
    readOnly = false,
  },
  ref
) {
  const [internalContent, setInternalContent] = useState(initialContent)
  const content = controlledContent !== undefined ? controlledContent : internalContent
  const setContent = onContentChange ?? setInternalContent
  const [errors, setErrors] = useState<BriteError[]>([])
  const [showErrors, setShowErrors] = useState(true)
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
    if (e.key === ':') {
      const ta = textareaRef.current
      if (!ta) return
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const before = content.slice(0, start)
      // Only auto-insert after "br " or "} " (b-rite block context)
      if (before.match(/(?:^|\s)(?:br|})\s*$/)) {
        e.preventDefault()
        const after = content.slice(end)
        setContent(before + ': { ' + after)
        setTimeout(() => {
          ta.setSelectionRange(start + 4, start + 4)
        }, 0)
      }
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
