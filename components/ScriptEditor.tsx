'use client'

import { useState, useCallback, useEffect } from 'react'
import { validateBrite, formatBrite, type BriteError } from '@/lib/brite-parser'

const DEFAULT_SCRIPT = `br : { return; pt; "hello world." } :
`

export function ScriptEditor({
  initialContent = DEFAULT_SCRIPT,
  content: controlledContent,
  onContentChange,
  onSave,
  readOnly = false,
}: {
  initialContent?: string
  content?: string
  onContentChange?: (content: string) => void
  onSave?: (content: string) => void
  readOnly?: boolean
}) {
  const [internalContent, setInternalContent] = useState(initialContent)
  const content = controlledContent !== undefined ? controlledContent : internalContent
  const setContent = onContentChange ?? setInternalContent
  const [errors, setErrors] = useState<BriteError[]>([])
  const [showErrors, setShowErrors] = useState(true)

  const validate = useCallback(() => {
    const errs = validateBrite(content)
    setErrors(errs)
  }, [content])

  useEffect(() => {
    validate()
  }, [content, validate])

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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
          readOnly={readOnly}
          className={errors.length && showErrors ? 'has-errors' : ''}
          data-gramm={false}
        />
        {showErrors && errors.length > 0 && (
          <div className="error-list">
            {errors.map((e, i) => (
              <div key={i} className="error-item" style={{ borderLeftColor: '#ef4444' }}>
                {e.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
