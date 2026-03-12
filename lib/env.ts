// Environment validation — validates Supabase config before use
// Throws a clear error if vars are missing or still placeholder

const PLACEHOLDERS = ['your_supabase_url', 'your_supabase_anon_key']

function getEnv(key: string): string {
  const value = process.env[key]
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
  return {
    url: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  }
}
