'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { profileUpdateSchema } from '@/lib/schemas/profile.schema'

type Profile = {
  id: string
  email: string | null
  name: string | null
  avatar: string | null
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.name ?? '')
  const [avatar, setAvatar] = useState(profile.avatar ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    setName(profile.name ?? '')
    setAvatar(profile.avatar ?? '')
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const parsed = profileUpdateSchema.safeParse({ name: name || undefined, avatar: avatar || undefined })
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Invalid input')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('profiles')
      .update(parsed.data)
      .eq('id', profile.id)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <h2>Profile</h2>
      <p>Email: {profile.email ?? '—'}</p>
      {error && <p style={{ color: '#ef4444' }}>{error}</p>}
      {success && <p style={{ color: '#10b981' }}>Profile updated.</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8, borderRadius: 4 }}
      />
      <input
        type="url"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        style={{ padding: 8, borderRadius: 4 }}
      />
      <button type="submit" disabled={loading} style={{ padding: 8, borderRadius: 4 }}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}
