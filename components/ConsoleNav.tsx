'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { BRLogo } from './BRLogo'

type Profile = { name: string | null; avatar: string | null }

const MOBILE_BREAKPOINT = 600

export function ConsoleNav() {
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobile, setMobile] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const check = () => setMobile(typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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

  const navLinks = (
    <>
      <Link href="/" onClick={() => setDrawerOpen(false)}>B-Rite Console</Link>
      <Link href="/console" onClick={() => setDrawerOpen(false)}>Editor</Link>
      <Link href="/downloads" onClick={() => setDrawerOpen(false)}>Downloads</Link>
      <Link href="/saved" onClick={() => setDrawerOpen(false)}>Saved</Link>
      <Link href="/library" onClick={() => setDrawerOpen(false)}>Library</Link>
      <Link href="/privacy" onClick={() => setDrawerOpen(false)}>Privacy</Link>
    </>
  )

  if (mobile) {
    return (
      <>
        <nav className="console-nav" style={{ justifyContent: 'space-between' }}>
          <Link href="/">
            <BRLogo size={28} />
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 8, fontSize: 20 }}
            aria-label="Open menu"
          >
            ☰
          </button>
        </nav>
        {drawerOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.4)',
            }}
            onClick={() => setDrawerOpen(false)}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: 260,
                background: 'var(--surface)',
                borderLeft: '1px solid var(--border)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" onClick={() => setDrawerOpen(false)}>
                  <BRLogo size={24} />
                </Link>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 20 }}
                >
                  ×
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{navLinks}</div>
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {rightSide}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <nav className="console-nav">
      <Link href="/">
        <BRLogo size={28} />
      </Link>
      {navLinks}
      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        {rightSide}
      </span>
    </nav>
  )
}
