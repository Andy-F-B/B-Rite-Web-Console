import { NextResponse } from 'next/server'

const SDK_README = `# B-Rite Web SDK v2

Stack: Next.js + Supabase + Vercel

Install: Place sdk-web folder in [root/ai/sdks/]
Register: Add 003 = [root/ai/sdks/sdk-web/] to sdk-registry.br

Invoke: *dev* !sdk|003| br : { run; <functionName> } :
`

export async function GET() {
  return new NextResponse(SDK_README, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="sdk-web-v2-readme.txt"',
    },
  })
}
