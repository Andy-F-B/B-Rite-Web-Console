import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/ProfileForm'
import { SignOutButton } from '@/components/SignOutButton'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return <p>Profile not found.</p>
  }

  return (
    <main style={{ padding: 48, maxWidth: 400 }}>
      <h1 style={{ marginBottom: 24 }}>Profile</h1>
      <ProfileForm profile={profile} />
      <div style={{ marginTop: 24 }}>
        <SignOutButton />
      </div>
    </main>
  )
}
