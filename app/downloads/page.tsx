'use client'

import Link from 'next/link'
import { useState } from 'react'

const DOWNLOADS = [
  {
    name: 'B-Rite Script Template',
    description: 'Official b-rite script template (v0.2). Windows, macOS, Linux.',
    href: '/api/downloads/template',
  },
  {
    name: 'Web SDK (zip)',
    description: 'Full sdk-web package (v3.0) for Next.js + Supabase. Windows, macOS, Linux.',
    href: '/downloads/B-RITE%20WEB%20SDK%20V.3.0.zip',
  },
]

const DOCS = [
  {
    name: 'Web SDK Guide v.3.0 - PDF',
    description: 'Complete guide to the sdk-web package: setup, phases, functions, and deployment.',
    href: '/downloads/Web-SDK-Guide-v.3.0.pdf',
  },
  {
    name: 'AI App Development Handbook v.2.1 - PDF',
    description: 'Handbook for AI-assisted web app development with Next.js, Supabase, and b-rite.',
    href: '/downloads/AI_App_Development_Handbook_V2_1.pdf',
  },
]

export default function DownloadsPage() {
  const [docsOpen, setDocsOpen] = useState(false)

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

      <section style={{ marginBottom: 32 }}>
        <button
          type="button"
          onClick={() => setDocsOpen(!docsOpen)}
          style={{
            width: '100%',
            padding: 14,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            color: 'var(--text)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>Documentation</span>
          <span>{docsOpen ? '▼' : '▶'}</span>
        </button>
        {docsOpen && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DOCS.map((d) => (
              <div
                key={d.name}
                style={{
                  padding: 16,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 84,
                    minWidth: 64,
                    background: 'var(--border)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    color: 'var(--muted)',
                  }}
                >
                  📄
                </div>
                <div style={{ flex: 1 }}>
                  <strong>{d.name}</strong>
                  <p style={{ color: 'var(--muted)', margin: '8px 0', fontSize: 13 }}>{d.description}</p>
                  <Link href={d.href} download style={{ fontSize: 14 }}>
                    Download PDF →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
