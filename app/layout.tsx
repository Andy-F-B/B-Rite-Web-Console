import type { Metadata } from 'next'
import './globals.css'
import { ConsoleNav } from '@/components/ConsoleNav'

export const metadata: Metadata = {
  title: 'B-Rite Console',
  description: 'Write, validate, and manage b-rite scripts. Auto-formatting, syntax validation, and downloads for the official template and SDK.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ConsoleNav />
        {children}
      </body>
    </html>
  )
}
