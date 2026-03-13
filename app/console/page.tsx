'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { ScriptEditor } from '@/components/ScriptEditor'
import type { ScriptEditorRef } from '@/components/ScriptEditor'
import { ConsoleEditorHeader, type ScriptMode, type SdkChoice, type SdkSubChoice } from '@/components/ConsoleEditorHeader'
import { FunctionSearchBar } from '@/components/FunctionSearchBar'
import { createClient } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { AUTO_PROMPTS } from '@/lib/auto-prompts'

const DEFAULT_SCRIPT = 'br : { return; pt; "hello world." } :\n'

function ConsoleContent() {
  const [editorContent, setEditorContent] = useState(DEFAULT_SCRIPT)
  const [scriptMode, setScriptMode] = useState<ScriptMode>('native')
  const [sdkChoice, setSdkChoice] = useState<SdkChoice>(null)
  const [sdkSubChoice, setSdkSubChoice] = useState<SdkSubChoice>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  let supabase: ReturnType<typeof createClient> | null = null
  try {
    supabase = createClient()
  } catch (e) {
    return (
      <main style={{ padding: 24, maxWidth: 560 }}>
        <h2 style={{ marginBottom: 16, color: 'var(--error)' }}>Configuration Error</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
          {e instanceof Error ? e.message : 'Missing Supabase config.'}
        </p>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 12 }}>
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to Vercel → Settings → Environment Variables, then redeploy.
        </p>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>
          <strong>Advanced:</strong> Visit <a href="/api/debug-config" target="_blank" rel="noopener">/api/debug-config</a> — if it shows hasUrl/hasKey true but this page still fails, <code>NEXT_PUBLIC_</code> vars are inlined at build time. In Vercel: Deployments → ⋮ → Redeploy with &quot;Clear build cache&quot;. Ensure vars exist for Production, Preview, and Development.
        </p>
      </main>
    )
  }
  const editorRef = useRef<ScriptEditorRef>(null)

  const loadId = searchParams.get('load')
  const isEditMode = searchParams.get('edit') === '1'

  useEffect(() => {
    if (!supabase || !loadId) return
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase.from('scripts').select('content').eq('id', loadId).eq('user_id', user.id).single().then(({ data }) => {
          if (data) setEditorContent(data.content)
        })
      }
    })
  }, [loadId, supabase])

  const handleAutoPromptSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (!id) return
    const prompt = AUTO_PROMPTS.find((p) => p.id === id)
    if (prompt) {
      editorRef.current?.insertAtCursor(prompt.text)
    }
    e.target.value = ''
  }

  const handleSave = async (content: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    if (isEditMode && loadId) {
      const { error } = await supabase.from('scripts').update({ content, updated_at: new Date().toISOString() }).eq('id', loadId).eq('user_id', user.id)
      if (error) {
        alert('Failed to save: ' + error.message)
      } else {
        alert('Saved.')
      }
    } else {
      const { error } = await supabase.from('scripts').insert({
        user_id: user.id,
        title: `Script ${new Date().toISOString().slice(0, 10)}`,
        content,
      })
      if (error) {
        alert('Failed to save: ' + error.message)
      } else {
        alert('Saved.')
      }
    }
  }

  const searchMode = sdkChoice === 'web-sdk' ? 'sdk-web' : 'native'

  return (
    <main>
      <div style={{ padding: '24px 24px 0' }}>
        <h2 style={{ marginBottom: 16 }}>Script Editor</h2>
        <ConsoleEditorHeader
          scriptMode={scriptMode}
          onScriptModeChange={setScriptMode}
          sdkChoice={sdkChoice}
          onSdkChoiceChange={setSdkChoice}
          sdkSubChoice={sdkSubChoice}
          onSdkSubChoiceChange={setSdkSubChoice}
        />
        <div style={{ marginBottom: 16 }}>
          <label style={{ marginRight: 8 }}>Auto Prompt:</label>
          <select
            onChange={handleAutoPromptSelect}
            style={{
              padding: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: 4,
              minWidth: 220,
            }}
            defaultValue=""
          >
            <option value="">— Select to insert at cursor —</option>
            {AUTO_PROMPTS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <span style={{ marginLeft: 8, color: 'var(--muted)', fontSize: 13 }}>
            Click to open, select option to insert
          </span>
        </div>
      </div>
      <ScriptEditor
        ref={editorRef}
        content={editorContent}
        onContentChange={setEditorContent}
        onSave={handleSave}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <FunctionSearchBar
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onInsert={(text) => {
          editorRef.current?.insertAtCursor(text)
          setSearchOpen(false)
        }}
        mode={searchMode}
      />
    </main>
  )
}

export default function ConsolePage() {
  return (
    <Suspense fallback={<main><p style={{ padding: 24 }}>Loading...</p></main>}>
      <ConsoleContent />
    </Suspense>
  )
}
