'use client'

import { Suspense, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PREDEFINED_TAGS = ['b-rite', 'sdk', 'template', 'plugin', 'utility', 'script']

function NewPostContent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [version, setVersion] = useState('1.0')
  const [githubUrl, setGithubUrl] = useState('')
  const [allowPublicUse, setAllowPublicUse] = useState(true)
  const [content, setContent] = useState('')
  const [contentType, setContentType] = useState<'snippet' | 'folder'>('snippet')
  const [tags, setTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const contentParam = searchParams.get('content')
    if (contentParam) setContent(decodeURIComponent(contentParam))
  }, [searchParams])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login')
    })
  }, [supabase, router])

  const toggleTag = (t: string) => {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  const addCustomTag = () => {
    const t = customTag.trim().toLowerCase()
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t])
      setCustomTag('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim() || !description.trim() || !version.trim() || !content.trim()) {
      setError('Title, description, version, and content are required.')
      return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    const { error: err } = await supabase.from('public_posts').insert({
      user_id: user.id,
      title: title.trim(),
      description: description.trim(),
      version: version.trim(),
      github_url: githubUrl.trim() || null,
      content,
      content_type: contentType,
      allow_public_use: allowPublicUse,
      tags,
    })
    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }
    router.push('/library')
  }

  return (
    <main style={{ padding: 48, maxWidth: 600 }}>
      <h1 style={{ marginBottom: 24 }}>New post</h1>
      <Link href="/library" style={{ fontSize: 14, marginBottom: 24, display: 'inline-block' }}>← Library</Link>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 4 }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>Description (what it is, what it does, who can use it) *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} style={{ width: '100%', padding: 8, borderRadius: 4 }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>Version *</label>
          <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 4 }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>GitHub link (optional)</label>
          <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: 8, borderRadius: 4 }} />
        </div>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={allowPublicUse} onChange={(e) => setAllowPublicUse(e.target.checked)} />
            <span>Allow public use (Save/Copy)</span>
          </label>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>Tags</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            {PREDEFINED_TAGS.map((t) => (
              <button key={t} type="button" onClick={() => toggleTag(t)} style={{ padding: '4px 10px', borderRadius: 4, background: tags.includes(t) ? 'var(--accent)' : 'var(--surface)', color: tags.includes(t) ? 'var(--bg)' : 'inherit', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 12 }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="text" value={customTag} onChange={(e) => setCustomTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())} placeholder="Custom tag" style={{ padding: 8, borderRadius: 4, flex: 1 }} />
            <button type="button" onClick={addCustomTag} style={{ padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}>Add</button>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>Content *</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={12} style={{ width: '100%', padding: 8, borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 13 }} />
        </div>
        <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 4, background: 'var(--accent)', color: 'var(--bg)', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 500 }}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </main>
  )
}

export default function NewPostPage() {
  return (
    <Suspense fallback={<main style={{ padding: 48 }}>Loading...</main>}>
      <NewPostContent />
    </Suspense>
  )
}
