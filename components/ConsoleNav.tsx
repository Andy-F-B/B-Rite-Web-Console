'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { BRLogo } from './BRLogo'

type Profile = { name: string | null; avatar: string | null }

export function ConsoleNav() {
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u ?? null)
      if (u) {
        supabase.from('profiles').select('name, avatar').eq('id', u.id).single().then(({ data }) => {
          setProfile(data ?? null)
        })
      }
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(({ data: { user: u } }) => {
        setUser(u ?? null)
        if (u) {
          supabase.from('profiles').select('name, avatar').eq('id', u.id).single().then(({ data }) => {
            setProfile(data ?? null)
          })
        } else {
          setProfile(null)
        }
      })
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    window.location.href = '/'
  }

  const rightSide = loading ? null : user ? (
    <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {profile?.avatar && (
        <img
          src={profile.avatar}
          alt=""
          width={28}
          height={28}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
      )}
      {profile?.name && <span style={{ fontSize: 14 }}>{profile.name}</span>}
      <Link href="/profile" style={{ fontSize: 14 }}>Profile</Link>
      <button
        type="button"
        onClick={handleSignOut}
        style={{ fontSize: 14, background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
      >
        Sign out
      </button>
    </span>
  ) : (
    <span style={{ display: 'flex', gap: 16 }}>
      <Link href="/login">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </span>
  )

  return (
    <nav className="console-nav">
      <Link href="/">
        <BRLogo size={28} />
      </Link>
      <Link href="/">B-Rite Console</Link>
      <Link href="/console">Editor</Link>
      <Link href="/downloads">Downloads</Link>
      <Link href="/saved">Saved</Link>
      <Link href="/privacy">Privacy</Link>
      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        {rightSide}
      </span>
    </nav>
  )
}
