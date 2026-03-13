'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Script = { id: string; title: string; content: string; created_at: string; folder_id: string | null; archived_at: string | null }
type Folder = { id: string; name: string }

export default function SavedPage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [newFolderName, setNewFolderName] = useState('')
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)
  const [showArchived, setShowArchived] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const fetchScripts = useCallback(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
        return
      }
      supabase
        .from('scripts')
        .select('id, title, content, created_at, folder_id, archived_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error) setScripts(data || [])
        })
      supabase
        .from('folders')
        .select('id, name')
        .eq('user_id', user.id)
        .order('name')
        .then(({ data, error }) => {
          if (!error) setFolders(data || [])
          // If folders table doesn't exist yet, keep empty
        })
      setLoading(false)
    })
  }, [supabase, router])

  useEffect(() => {
    fetchScripts()
  }, [fetchScripts])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this script?')) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('scripts').delete().eq('id', id).eq('user_id', user.id)
    if (!error) fetchScripts()
  }

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content)
    setCopyFeedback('Copied!')
    setTimeout(() => setCopyFeedback(null), 1500)
  }

  const handleArchive = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('scripts').update({ archived_at: new Date().toISOString() }).eq('id', id).eq('user_id', user.id)
    if (!error) { setMenuOpen(null); fetchScripts() }
  }

  const handleUnarchive = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('scripts').update({ archived_at: null }).eq('id', id).eq('user_id', user.id)
    if (!error) { setMenuOpen(null); fetchScripts() }
  }

  const handleSaveToFolder = async (scriptId: string, folderId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('scripts').update({ folder_id: folderId }).eq('id', scriptId).eq('user_id', user.id)
    if (!error) { setMenuOpen(null); fetchScripts() }
  }

  const handleRemoveFromFolder = async (scriptId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('scripts').update({ folder_id: null }).eq('id', scriptId).eq('user_id', user.id)
    if (!error) { setMenuOpen(null); fetchScripts() }
  }

  const handleCreateFolder = async () => {
    const name = newFolderName.trim()
    if (!name) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('folders').insert({ user_id: user.id, name })
    if (!error) {
      setNewFolderName('')
      setShowNewFolder(false)
      fetchScripts()
    }
  }

  const displayedScripts = scripts.filter((s) => {
    if (showArchived) return !!s.archived_at
    if (selectedFolderId) return s.folder_id === selectedFolderId
    return !s.archived_at && !s.folder_id
  })

  if (loading) return <main style={{ padding: 48 }}>Loading...</main>

  return (
    <main style={{ padding: 48, maxWidth: 720 }}>
      <h1 style={{ marginBottom: 24 }}>Saved Scripts</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => { setShowArchived(false); setSelectedFolderId(null) }}
          style={{ padding: '8px 16px', borderRadius: 4, background: !showArchived && !selectedFolderId ? 'var(--accent)' : 'transparent', color: !showArchived && !selectedFolderId ? 'var(--bg)' : 'inherit', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 14 }}
        >
          Unfiled
        </button>
        <button
          type="button"
          onClick={() => setShowArchived(!showArchived)}
          style={{ padding: '8px 16px', borderRadius: 4, background: showArchived ? 'var(--accent)' : 'transparent', color: showArchived ? 'var(--bg)' : 'inherit', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 14 }}
        >
          {showArchived ? 'Saved' : 'Archived'}
        </button>
        {folders.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => { setShowArchived(false); setSelectedFolderId(selectedFolderId === f.id ? null : f.id) }}
            style={{ padding: '8px 16px', borderRadius: 4, background: selectedFolderId === f.id ? 'var(--accent)' : 'transparent', color: selectedFolderId === f.id ? 'var(--bg)' : 'inherit', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 14 }}
          >
            {f.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowNewFolder(!showNewFolder)}
          style={{ padding: '8px 16px', borderRadius: 4, background: 'var(--accent)', color: 'var(--bg)', border: 'none', cursor: 'pointer', fontSize: 14 }}
        >
          New folder
        </button>
        {showNewFolder && (
          <span style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              style={{ padding: 8, borderRadius: 4, width: 160 }}
            />
            <button type="button" onClick={handleCreateFolder} style={{ padding: '8px 12px', borderRadius: 4, cursor: 'pointer' }}>
              Create
            </button>
          </span>
        )}
      </div>

      {copyFeedback && <p style={{ color: 'var(--accent)', marginBottom: 12 }}>{copyFeedback}</p>}

      {displayedScripts.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>
          {showArchived ? 'No archived scripts.' : selectedFolderId ? 'No scripts in this folder.' : 'No unfiled scripts. Save from the Editor or move from a folder.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayedScripts.map((s) => (
            <div
              key={s.id}
              style={{
                padding: 16,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 4,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong>{s.title}</strong>
                  <p style={{ color: 'var(--muted)', fontSize: 12, margin: '4px 0' }}>
                    {new Date(s.created_at).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleCopy(s.content)}
                    style={{ fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'white' }}
                    title="Copy"
                  >
                    Copy
                  </button>
                  <div style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === s.id ? null : s.id) }}
                      style={{ fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'white' }}
                      title="More"
                    >
                      ⋯
                    </button>
                    {menuOpen === s.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 24,
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 4,
                          padding: 8,
                          minWidth: 140,
                          zIndex: 10,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => (showArchived ? handleUnarchive(s.id) : handleArchive(s.id))}
                          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '4px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'white' }}
                        >
                          {showArchived ? 'Restore' : 'Archive'}
                        </button>
                        {s.folder_id && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFromFolder(s.id)}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '4px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'white' }}
                          >
                            Move to Unfiled
                          </button>
                        )}
                        {folders.length > 0 && (
                          <>
                            <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />
                            <span style={{ fontSize: 12, color: 'white' }}>Save to folder:</span>
                            {folders.map((f) => (
                              <button
                                key={f.id}
                                type="button"
                                onClick={() => handleSaveToFolder(s.id, f.id)}
                                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '4px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'white' }}
                              >
                                {f.name}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <pre style={{ fontSize: 12, overflow: 'auto', maxHeight: 80 }}>{s.content.slice(0, 100)}...</pre>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <Link href={`/console?load=${s.id}&edit=1`} style={{ fontSize: 14 }}>Edit</Link>
                <Link href={`/console?load=${s.id}`} style={{ fontSize: 14 }}>Open in Editor →</Link>
                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  style={{ fontSize: 14, background: 'none', border: 'none', color: 'var(--destructive, #ef4444)', cursor: 'pointer', padding: 0 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
