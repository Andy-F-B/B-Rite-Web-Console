import { NextResponse } from 'next/server'

const TEMPLATE = `br : { return; pt; "hello world." } :
`

export async function GET() {
  return new NextResponse(TEMPLATE, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="brite-template.br"',
    },
  })
}
