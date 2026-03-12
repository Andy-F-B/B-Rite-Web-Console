'use client'

import { useState, useEffect, useRef } from 'react'
import { searchFunctions, type FunctionSearchEntry } from '@/lib/function-search-data'

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 80,
  },
  panel: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    minWidth: 360,
    maxWidth: 480,
    maxHeight: 400,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 14,
    background: 'var(--bg)',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text)',
    outline: 'none',
    boxSizing: 'border-box',
  },
  list: {
    maxHeight: 320,
    overflowY: 'auto',
  },
  item: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    fontSize: 13,
  },
  itemHover: {
    background: 'var(--accent)',
    color: 'var(--bg)',
  },
  itemName: { fontWeight: 600, marginBottom: 2 },
  itemDesc: { fontSize: 12, opacity: 0.85 },
  itemExample: { fontSize: 11, fontFamily: 'monospace', marginTop: 4, opacity: 0.8 },
  badge: { fontSize: 10, padding: '1px 4px', borderRadius: 4, marginLeft: 6 },
}

export function FunctionSearchBar({
  open,
  onClose,
  onInsert,
  mode,
}: {
  open: boolean
  onClose: () => void
  onInsert: (text: string) => void
  mode: 'native' | 'sdk-web'
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FunctionSearchEntry[]>([])
  const [hoverIndex, setHoverIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setResults(searchFunctions(query, mode))
    setHoverIndex(0)
  }, [query, mode])

  useEffect(() => {
    if (open) {
      setQuery('')
      setHoverIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHoverIndex((i) => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHoverIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[hoverIndex]) {
        e.preventDefault()
        onInsert(results[hoverIndex].insertText)
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, hoverIndex, onClose, onInsert])

  if (!open) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search functions and variables..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <div ref={listRef} style={styles.list}>
          {results.map((entry, i) => (
            <div
              key={`${entry.name}-${i}`}
              style={{
                ...styles.item,
                ...(i === hoverIndex ? styles.itemHover : {}),
              }}
              onClick={() => {
                onInsert(entry.insertText)
                onClose()
              }}
              onMouseEnter={() => setHoverIndex(i)}
            >
              <div style={styles.itemName}>
                {entry.name}
                <span
                  style={{
                    ...styles.badge,
                    background: entry.source === 'sdk' ? 'var(--accent)' : 'var(--border)',
                    color: entry.source === 'sdk' ? 'var(--bg)' : 'var(--text)',
                  }}
                >
                  {entry.source}
                </span>
              </div>
              <div style={styles.itemDesc}>{entry.description}</div>
              <div style={styles.itemExample}>{entry.example}</div>
            </div>
          ))}
          {results.length === 0 && (
            <div style={{ padding: 16, color: 'var(--muted)', fontSize: 13 }}>No matches</div>
          )}
        </div>
      </div>
    </div>
  )
}
