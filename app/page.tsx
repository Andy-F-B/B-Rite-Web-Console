import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ padding: 48, maxWidth: 720 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>B-Rite Console</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>
        Write, validate, and manage b-rite scripts. Auto-formatting, syntax validation, and downloads for the official template and SDK.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link href="/console" style={{ padding: '12px 24px', background: 'var(--accent)', color: 'var(--bg)', borderRadius: 4, fontWeight: 500 }}>
          Open Editor
        </Link>
        <Link href="/downloads" style={{ padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 4 }}>
          Downloads
        </Link>
        <Link href="/saved" style={{ padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 4 }}>
          Saved
        </Link>
      </div>
    </main>
  )
}
