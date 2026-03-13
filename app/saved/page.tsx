'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Script = { id: string; title: string; content: string; created_at: string }

export default function SavedPage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)
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
        .select('id, title, content, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error) setScripts(data || [])
          setLoading(false)
        })
    })
  }, [supabase, router])

  useEffect(() => {
    fetchScripts()
  }, [fetchScripts])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this script?')) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('scripts').delete().eq('id', id).eq('user_id', user.id)
    if (!error) fetchScripts()
  }

  if (loading) return <main style={{ padding: 48 }}>Loading...</main>

  return (
    <main style={{ padding: 48, maxWidth: 720 }}>
      <h1 style={{ marginBottom: 24 }}>Saved Scripts</h1>
      {scripts.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No saved scripts. Save from the Editor.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {scripts.map((s) => (
            <div
              key={s.id}
              style={{
                padding: 16,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 4,
              }}
            >
              <strong>{s.title}</strong>
              <p style={{ color: 'var(--muted)', fontSize: 12, margin: '4px 0' }}>
                {new Date(s.created_at).toLocaleString()}
              </p>
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
