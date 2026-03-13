import Link from 'next/link'

const DOWNLOADS = [
  {
    name: 'B-Rite Script Template',
    description: 'Official b-rite script template (v0.2). Windows, macOS, Linux.',
    href: '/api/downloads/template',
  },
  {
    name: 'B-Rite Script (zip)',
    description: 'Full b-rite language package (v2.0). Windows, macOS, Linux.',
    href: '/downloads/B-RITE%20NATIVE%20V.2.0.zip',
  },
  {
    name: 'Web SDK v2',
    description: 'Current v2 web SDK for Next.js + Supabase. Windows, macOS, Linux.',
    href: '/api/downloads/sdk',
  },
  {
    name: 'Web SDK (zip)',
    description: 'Full sdk-web package (v3.0) for Next.js + Supabase. Windows, macOS, Linux.',
    href: '/downloads/B-RITE%20WEB%20SDK%20V.3.0.zip',
  },
]

export default function DownloadsPage() {
  return (
    <main style={{ padding: 48, maxWidth: 720 }}>
      <h1 style={{ marginBottom: 24 }}>Downloads</h1>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: 'var(--accent)' }}>Templates & SDK</h3>
        {DOWNLOADS.map((d) => (
          <div
            key={d.name}
            style={{
              padding: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              marginBottom: 12,
            }}
          >
            <strong>{d.name}</strong>
            <p style={{ color: 'var(--muted)', margin: '8px 0', fontSize: 14 }}>{d.description}</p>
            <Link href={d.href} style={{ fontSize: 14 }}>
              Download →
            </Link>
          </div>
        ))}
      </section>

      <section>
        <h3 style={{ marginBottom: 16, color: 'var(--accent)' }}>Install Plugins</h3>
        <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
          Plugins extend b-rite with additional functions. Place plugin folders in [root/ai/plugins/] and run the install flow.
        </p>
        <div
          style={{
            padding: 16,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 4,
          }}
        >
          <p style={{ margin: 0, fontSize: 14 }}>
            <code>*dev* br{'{'}sf{'}'} : {'{'} run; *sf*; {'<'}install{'>'}; [root/ai/plugins/plugin-name/install.br] {'}'} :</code>
          </p>
        </div>
      </section>
    </main>
  )
}
