'use client'

const FEATURE_LIBRARY_CONTENT = {
  command: '*dev* !sdk|003| br : { run; <createFeaturePack> } :',
  process: [
    'AI asks for (A1) name in kebab-case (e.g. auth-system, notifications)',
    'AI asks for (A2) brief description',
    'Creates feature-packs/{name}/ with README.md and features.md',
  ],
  template: {
    readme: '# {name} — {description}\n\n## Usage\nCopy components and lib into project.',
    features: '## Components\n## Lib\n## Pages\n## RLS',
  },
}

export function FeatureLibraryInfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 60,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          minWidth: 420,
          maxWidth: 520,
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 16 }}>Feature library info/commands</h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
          Create a feature pack (reusable module) in feature-packs/. AI guides you through the process.
        </p>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ fontSize: 12, color: 'var(--muted)' }}>Command</strong>
          <pre style={{ background: 'var(--bg)', padding: 12, borderRadius: 4, fontSize: 12, overflow: 'auto' }}>
            {FEATURE_LIBRARY_CONTENT.command}
          </pre>
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ fontSize: 12, color: 'var(--muted)' }}>Process</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, fontSize: 13 }}>
            {FEATURE_LIBRARY_CONTENT.process.map((p, i) => (
              <li key={i} style={{ marginBottom: 4 }}>{p}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong style={{ fontSize: 12, color: 'var(--muted)' }}>Template</strong>
          <p style={{ fontSize: 12, marginTop: 8 }}>README.md: name, description, Usage. features.md: Components, Lib, Pages, RLS.</p>
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          Ctrl+Alt+D — search for createFeaturePack to insert the command.
        </p>
        <button
          type="button"
          onClick={onClose}
          style={{ marginTop: 16, padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
