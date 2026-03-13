import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ padding: 48, maxWidth: 720 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>B-Rite Console</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>
        B-Rite Console is a web app for writing and managing b-rite scripts. It provides auto-formatting, syntax validation, SDK integration (web-sdk), and downloads for the official template and Web SDK. Use it to run b-rite workflows, save scripts, and build AI-driven web apps.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <Link href="/console" style={{ padding: '12px 24px', background: 'var(--accent)', color: 'var(--bg)', borderRadius: 4, fontWeight: 500 }}>
          Open Editor
        </Link>
        <Link href="/downloads" style={{ padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 4 }}>
          Downloads
        </Link>
        <Link href="/saved" style={{ padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 4 }}>
          Saved
        </Link>
        <Link href="/library" style={{ padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 4 }}>
          Public Library
        </Link>
      </div>

      <section style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, marginBottom: 12, color: 'var(--accent)' }}>News</h3>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text)' }}>Web SDK v3.0 released</strong> — Full sdk-web package for Next.js + Supabase. Download from the Downloads page.
        </p>
      </section>

      <section>
        <h3 style={{ fontSize: 16, marginBottom: 12, color: 'var(--accent)' }}>b-rite v0.2 changelog</h3>
        <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
          Latest language updates: systemVersion, systemUpdates, token map (v, vT, sv, f, fT, sf), devKit, inter mode, logging (mLog, log, no-log), nFunction, nVariable, nSDK, file conventions (.br, .md, .txt), path enforcement, casing rules.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: 12 }}>
          See <code>lang-changelog.txt</code> for full details.
        </p>
      </section>
    </main>
  )
}
