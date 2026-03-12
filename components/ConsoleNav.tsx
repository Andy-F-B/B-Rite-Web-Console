import Link from 'next/link'
import { BRLogo } from './BRLogo'

export function ConsoleNav() {
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
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
        <Link href="/login">Sign in</Link>
        <Link href="/signup">Sign up</Link>
        <Link href="/profile">Profile</Link>
      </span>
    </nav>
  )
}
