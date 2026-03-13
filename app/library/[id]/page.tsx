'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  description: string
  version: string
  github_url: string | null
  content: string
  allow_public_use: boolean
  tags: string[]
  created_at: string
  user_id: string
}

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null)
  const [authorName, setAuthorName] = useState<string | null>(null)
  const [thumbsCount, setThumbsCount] = useState(0)
  const [userReacted, setUserReacted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  useEffect(() => {
    async function fetch() {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: postData, error } = await supabase.from('public_posts').select('*').eq('id', id).single()
      if (error || !postData) {
        setPost(null)
        setLoading(false)
        return
      }
      setPost(postData)
      setIsOwner(!!user && user.id === postData.user_id)
      const { data: profile } = await supabase.from('profiles').select('name').eq('id', postData.user_id).single()
      setAuthorName(profile?.name ?? null)
      const { count } = await supabase.from('post_reactions').select('*', { count: 'exact', head: true }).eq('post_id', id).eq('type', 'thumbs_up')
      setThumbsCount(count ?? 0)
      if (user) {
        const { data: r } = await supabase.from('post_reactions').select('id').eq('post_id', id).eq('user_id', user.id).eq('type', 'thumbs_up').single()
        setUserReacted(!!r)
      }
      setLoading(false)
    }
    fetch()
  }, [id, supabase])

  const handleThumbsUp = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    if (userReacted) {
      await supabase.from('post_reactions').delete().eq('post_id', id).eq('user_id', user.id).eq('type', 'thumbs_up')
      setThumbsCount((c) => c - 1)
      setUserReacted(false)
    } else {
      await supabase.from('post_reactions').insert({ post_id: id, user_id: user.id, type: 'thumbs_up' })
      setThumbsCount((c) => c + 1)
      setUserReacted(true)
    }
  }

  const handleCopy = async () => {
    if (post) await navigator.clipboard.writeText(post.content)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return
    const { error } = await supabase.from('public_posts').delete().eq('id', id)
    if (!error) router.push('/library')
  }

  if (loading) return <main style={{ padding: 48 }}>Loading...</main>
  if (!post) return <main style={{ padding: 48 }}>Post not found.</main>

  return (
    <main style={{ padding: 48, maxWidth: 720 }}>
      <Link href="/library" style={{ fontSize: 14, marginBottom: 24, display: 'inline-block' }}>← Library</Link>
      <h1 style={{ marginBottom: 8 }}>{post.title}</h1>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>
        v{post.version} · {authorName && `by ${authorName}`} · {new Date(post.created_at).toLocaleString()}
      </p>
      {post.tags && post.tags.length > 0 && (
        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Tags: {post.tags.join(', ')}</p>
      )}
      {post.github_url && (
        <a href={post.github_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, marginBottom: 16, display: 'inline-block' }}>
          GitHub →
        </a>
      )}
      <p style={{ lineHeight: 1.6, marginBottom: 24 }}>{post.description}</p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button type="button" onClick={handleThumbsUp} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: userReacted ? 'var(--accent)' : 'var(--muted)' }}>
          👍 {thumbsCount}
        </button>
        {post.allow_public_use && (
          <button type="button" onClick={handleCopy} style={{ fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)' }}>
            Copy code
          </button>
        )}
        {isOwner && (
          <>
            <Link href={`/library/${id}/edit`} style={{ fontSize: 14 }}>Edit</Link>
            <button type="button" onClick={handleDelete} style={{ fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}>
              Delete
            </button>
          </>
        )}
      </div>
      <pre style={{ background: 'var(--surface)', padding: 16, borderRadius: 4, overflow: 'auto', fontSize: 13, lineHeight: 1.5 }}>
        {post.content}
      </pre>
    </main>
  )
}
