'use client'

import { useState, useEffect } from 'react'
import { ScriptEditor } from '@/components/ScriptEditor'
import { createClient } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

const AUTO_TYPE_SCRIPTS = [
  { id: 'default', name: 'Default template', content: 'br : { return; pt; "hello world." } :' },
  { id: 'task', name: 'Task creation', content: 'br : { run; <task>; "task_0001" } :' },
  { id: 'help', name: 'Help', content: 'br{sf} : { run; *sf*; <help> } :' },
]

export default function ConsolePage() {
  const [selectedScript, setSelectedScript] = useState('default')
  const [editorContent, setEditorContent] = useState(AUTO_TYPE_SCRIPTS[0].content)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

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

  const loadScript = (id: string) => {
    const script = AUTO_TYPE_SCRIPTS.find((s) => s.id === id)
    if (script) {
      setSelectedScript(id)
      setEditorContent(script.content)
    }
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
          <label style={{ marginRight: 8 }}>Auto-type script:</label>
          <select
            value={selectedScript}
            onChange={(e) => loadScript(e.target.value)}
            style={{
              padding: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: 4,
            }}
          >
            {AUTO_TYPE_SCRIPTS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>
      <ScriptEditor content={editorContent} onContentChange={setEditorContent} onSave={handleSave} />
    </main>
  )
}
