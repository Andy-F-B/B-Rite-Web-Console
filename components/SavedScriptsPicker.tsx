'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

type Script = { id: string; title: string; content: string; created_at: string }

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
  list: { maxHeight: 320, overflowY: 'auto' },
  item: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    fontSize: 13,
  },
  itemHover: { background: 'var(--accent)', color: 'var(--bg)' },
}

export function SavedScriptsPicker({
  open,
  onClose,
  onInsert,
}: {
  open: boolean
  onClose: () => void
  onInsert: (content: string) => void
}) {
  const [scripts, setScripts] = useState<Script[]>([])
  const [query, setQuery] = useState('')
  const [hoverIndex, setHoverIndex] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    if (!open) return
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from('scripts')
        .select('id, title, content, created_at')
        .eq('user_id', user.id)
        .is('archived_at', null)
        .order('created_at', { ascending: false })
        .then(({ data }) => setScripts(data || []))
    })
    setQuery('')
    setHoverIndex(0)
  }, [open, supabase])

  const filtered = query.trim()
    ? scripts.filter((s) => s.title.toLowerCase().includes(query.trim().toLowerCase()))
    : scripts
  const display = filtered.slice(0, 20)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHoverIndex((i) => Math.min(i + 1, display.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHoverIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && display[hoverIndex]) {
        e.preventDefault()
        onInsert(display[hoverIndex].content)
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, display, hoverIndex, onClose, onInsert])

  if (!open) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search saved scripts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <div style={styles.list}>
          {display.length === 0 ? (
            <div style={{ padding: 16, color: 'var(--muted)', fontSize: 13 }}>
              {scripts.length === 0 ? 'No saved scripts.' : 'No matches.'}
            </div>
          ) : (
            display.map((s, i) => (
              <div
                key={s.id}
                style={{
                  ...styles.item,
                  ...(i === hoverIndex ? styles.itemHover : {}),
                }}
                onClick={() => {
                  onInsert(s.content)
                  onClose()
                }}
                onMouseEnter={() => setHoverIndex(i)}
              >
                <div style={{ fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>
                  {new Date(s.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
