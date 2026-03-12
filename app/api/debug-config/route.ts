// Debug endpoint — returns whether Supabase env vars exist (no values exposed)
// Use: GET /api/debug-config to verify Vercel env injection
// If hasUrl/hasKey are true but client still fails, clear build cache and redeploy.

import { NextResponse } from 'next/server'

export async function GET() {
  const hasUrl = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.toLowerCase().includes('your_supabase')
  )
  const hasKey = !!(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.toLowerCase().includes('your_supabase')
  )
  return NextResponse.json({
    hasUrl,
    hasKey,
    hint:
      !hasUrl || !hasKey
        ? 'Vars missing at runtime. Add to Vercel → Settings → Environment Variables for all envs, then redeploy with cache cleared.'
        : 'Server has vars. If client still fails, NEXT_PUBLIC_ vars are inlined at build time — clear Vercel build cache and redeploy.',
  })
}
