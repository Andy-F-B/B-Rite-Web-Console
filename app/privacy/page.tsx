export default function PrivacyPage() {
  return (
    <main style={{ padding: 48, maxWidth: 720 }}>
      <h1 style={{ marginBottom: 24 }}>Privacy Policy</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Last updated: March 2025</p>

      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12, color: 'var(--accent)' }}>Information We Collect</h3>
        <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
          This app collects account information (email, name) when you sign up. Scripts and saved items you create are stored and associated with your account.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12, color: 'var(--accent)' }}>How We Use It</h3>
        <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
          Your data is used to provide the service: storing your scripts, enabling downloads, and managing your account. We do not sell your data.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12, color: 'var(--accent)' }}>Data Storage</h3>
        <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
          Data is stored securely via Supabase. Authentication uses industry-standard practices.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12, color: 'var(--accent)' }}>Contact</h3>
        <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
          For privacy-related questions, contact the project maintainer.
        </p>
      </section>
    </main>
  )
}
