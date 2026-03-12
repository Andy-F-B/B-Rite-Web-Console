'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { ScriptEditor } from '@/components/ScriptEditor'
import type { ScriptEditorRef } from '@/components/ScriptEditor'
import { createClient } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { AUTO_PROMPTS } from '@/lib/auto-prompts'

const DEFAULT_SCRIPT = 'br : { return; pt; "hello world." } :\n'

function ConsoleContent() {
  const [editorContent, setEditorContent] = useState(DEFAULT_SCRIPT)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const editorRef = useRef<ScriptEditorRef>(null)

  useEffect(() => {
    const loadId = searchParams.get('load')
    if (loadId) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          supabase.from('scripts').select('content').eq('id', loadId).eq('user_id', user.id).single().then(({ data }) => {
            if (data) setEditorContent(data.content)
          })
        }
      })
    }
  }, [searchParams, supabase])

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

  return (
    <main>
      <div style={{ padding: '24px 24px 0' }}>
        <h2 style={{ marginBottom: 16 }}>Script Editor</h2>
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
