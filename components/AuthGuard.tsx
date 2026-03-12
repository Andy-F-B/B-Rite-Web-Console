'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ id: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ? { id: user.id } : null)
      if (!user) router.replace('/login')
      setLoading(false)
    })
  }, [supabase.auth, router])

  if (loading) return <p>Loading...</p>
  if (!user) return null
  return <>{children}</>
}
