'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  description: string
  version: string
  github_url: string | null
  content: string
  content_type: string
  allow_public_use: boolean
  tags: string[]
  created_at: string
  user_id: string
  author_name?: string
  thumbs_count?: number
  user_reacted?: boolean
}

const PREDEFINED_TAGS = ['b-rite', 'sdk', 'template', 'plugin', 'utility', 'script']

export default function LibraryPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [filterTag, setFilterTag] = useState<string>('')
  const [search, setSearch] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function fetchPosts() {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: postsData, error } = await supabase
        .from('public_posts')
        .select('id, title, description, version, github_url, content, content_type, allow_public_use, tags, created_at, user_id')
        .order('created_at', { ascending: false })

      if (error || !postsData) {
        setPosts([])
        setLoading(false)
        return
      }

      const withAuthor = await Promise.all(
        postsData.map(async (p) => {
          const { data: profile } = await supabase.from('profiles').select('name').eq('id', p.user_id).single()
          const { count } = await supabase.from('post_reactions').select('*', { count: 'exact', head: true }).eq('post_id', p.id).eq('type', 'thumbs_up')
          const { data: reacted } = user
            ? await supabase.from('post_reactions').select('id').eq('post_id', p.id).eq('user_id', user.id).eq('type', 'thumbs_up').single()
            : { data: null }
          return {
            ...p,
            author_name: profile?.name ?? null,
            thumbs_count: count ?? 0,
            user_reacted: !!reacted,
          }
        })
      )
      setPosts(withAuthor)
      setLoading(false)
    }
    fetchPosts()
  }, [supabase])

  const filtered = posts.filter((p) => {
    const tagMatch = !filterTag || (p.tags && p.tags.includes(filterTag))
    const searchMatch = !search.trim() || p.title.toLowerCase().includes(search.toLowerCase()) || (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    return tagMatch && searchMatch
  })

  if (loading) return <main style={{ padding: 48 }}>Loading...</main>

  return (
    <main style={{ padding: 48, maxWidth: 800 }}>
      <h1 style={{ marginBottom: 24 }}>Public Library</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
        Share and discover b-rite scripts and code snippets. What it is, what it does, who can use it.
      </p>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, borderRadius: 4, minWidth: 160 }}
        />
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={{ padding: 8, borderRadius: 4, minWidth: 140 }}
        >
          <option value="">All tags</option>
          {PREDEFINED_TAGS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <Link href="/library/new" style={{ padding: '8px 16px', background: 'var(--accent)', color: 'var(--bg)', borderRadius: 4, fontSize: 14 }}>
          New post
        </Link>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No posts yet. Be the first to share!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} supabase={supabase} onUpdate={() => window.location.reload()} />
          ))}
        </div>
      )}
    </main>
  )
}

function PostCard({ post, supabase, onUpdate }: { post: Post; supabase: ReturnType<typeof createClient>; onUpdate: () => void }) {
  const [expanded, setExpanded] = useState(false)

  const handleThumbsUp = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    if (post.user_reacted) {
      await supabase.from('post_reactions').delete().eq('post_id', post.id).eq('user_id', user.id).eq('type', 'thumbs_up')
    } else {
      await supabase.from('post_reactions').insert({ post_id: post.id, user_id: user.id, type: 'thumbs_up' })
    }
    onUpdate()
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(post.content)
  }

  return (
    <div
      style={{
        padding: 16,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 4,
      }}
    >
      <Link href={`/library/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <strong style={{ fontSize: 16 }}>{post.title}</strong>
      </Link>
      <p style={{ color: 'var(--muted)', fontSize: 13, margin: '8px 0' }}>{post.description}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: 'var(--muted)' }}>
        <span>v{post.version}</span>
        {post.author_name && <span>by {post.author_name}</span>}
        {post.tags && post.tags.length > 0 && (
          <span>{post.tags.join(', ')}</span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); handleThumbsUp() }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: post.user_reacted ? 'var(--accent)' : 'var(--muted)' }}
        >
          👍 {post.thumbs_count ?? 0}
        </button>
        {post.allow_public_use && (
          <button type="button" onClick={(e) => { e.preventDefault(); handleCopy() }} style={{ fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)' }}>
            Copy
          </button>
        )}
        <button type="button" onClick={() => setExpanded(!expanded)} style={{ fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
          {expanded ? 'Less' : 'More'}
        </button>
      </div>
      {expanded && (
        <pre style={{ marginTop: 12, fontSize: 12, overflow: 'auto', maxHeight: 200, background: 'var(--bg)', padding: 12, borderRadius: 4 }}>
          {post.content}
        </pre>
      )}
    </div>
  )
}
