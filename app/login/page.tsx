import { SignInForm } from '@/components/SignInForm'

export default function LoginPage() {
  return (
    <main style={{ padding: 48, maxWidth: 400 }}>
      <h1 style={{ marginBottom: 24 }}>Sign in</h1>
      <SignInForm />
    </main>
  )
}
