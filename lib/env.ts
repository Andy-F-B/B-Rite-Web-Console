// Environment validation — validates Supabase config before use
// Throws a clear error if vars are missing or still placeholder
//
// CRITICAL: Use static access (process.env.NEXT_PUBLIC_X) not dynamic (process.env[key]).
// Next.js only inlines static references at build time. Dynamic keys stay undefined on client.

const PLACEHOLDERS = ['your_supabase_url', 'your_supabase_anon_key']

function validate(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing ${key}. Local: add to .env.local. Production: add to Vercel → Settings → Environment Variables (all envs), then redeploy.`
    )
  }
  if (PLACEHOLDERS.some((p) => value.toLowerCase().includes(p))) {
    throw new Error(
      `${key} is still the placeholder. Replace with your Supabase URL and anon key from Project Settings → API. See README "First Run" section.`
    )
  }
  return value
}

export function getSupabaseConfig() {
  // Static access — required for Next.js to inline at build time (client bundle)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return {
    url: validate('NEXT_PUBLIC_SUPABASE_URL', url),
    anonKey: validate('NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey),
  }
}
