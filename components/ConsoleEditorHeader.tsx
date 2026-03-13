'use client'

import { useState } from 'react'
import { FeatureLibraryInfoModal } from './FeatureLibraryInfoModal'

const SDK_WEB_FUNCTIONS = [
  'sdkWebSetup', 'quickStart', 'specPhase', 'anchorPhase', 'taskPhase', 'migrationPhase',
  'buildPhase', 'auditPhase', 'previewPhase', 'runSinglePhase', 'runPhases', 'runFullPipeline',
  'agentHandoff', 'masterProgramMaker', 'projectVersion', 'deployGuide', 'createFeaturePack',
  'runLocal', 'npmInstall', 'gitSetup',
]

const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 12 }
const label: React.CSSProperties = { fontSize: 13, color: 'var(--muted)' }
const select: React.CSSProperties = {
  padding: '6px 10px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  borderRadius: 4,
  fontSize: 13,
  minWidth: 140,
}
const keybinds: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--muted)',
  padding: '6px 0',
  borderTop: '1px solid var(--border)',
  marginTop: 8,
}

export type ScriptMode = 'native' | 'sdk' | 'plugins'
export type SdkChoice = 'web-sdk' | null
export type SdkSubChoice = 'edit' | 'create' | null

export function ConsoleEditorHeader({
  scriptMode,
  onScriptModeChange,
  sdkChoice,
  onSdkChoiceChange,
  sdkSubChoice,
  onSdkSubChoiceChange,
}: {
  scriptMode: ScriptMode
  onScriptModeChange: (m: ScriptMode) => void
  sdkChoice: SdkChoice
  onSdkChoiceChange: (s: SdkChoice) => void
  sdkSubChoice: SdkSubChoice
  onSdkSubChoiceChange: (s: SdkSubChoice) => void
}) {
  const showSdkDropdown = scriptMode === 'sdk'
  const showSdkSubDropdown = showSdkDropdown && sdkChoice === 'web-sdk'
  const [featureLibraryOpen, setFeatureLibraryOpen] = useState(false)

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={row}>
        <span style={label}>Script mode:</span>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <input
            type="radio"
            name="scriptMode"
            checked={scriptMode === 'native'}
            onChange={() => {
              onScriptModeChange('native')
              onSdkChoiceChange(null)
              onSdkSubChoiceChange(null)
            }}
          />
          <span>b-rite native</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <input
            type="radio"
            name="scriptMode"
            checked={scriptMode === 'sdk'}
            onChange={() => onScriptModeChange('sdk')}
          />
          <span>SDKs</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', opacity: 0.5 }}>
          <input type="radio" name="scriptMode" checked={scriptMode === 'plugins'} disabled />
          <span>Plugins (coming soon)</span>
        </label>
      </div>

      {showSdkDropdown && (
        <div style={row}>
          <span style={label}>SDK:</span>
          <select
            value={sdkChoice ?? ''}
            onChange={(e) => {
              const v = e.target.value as SdkChoice
              onSdkChoiceChange(v || null)
              onSdkSubChoiceChange(null)
            }}
            style={select}
          >
            <option value="web-sdk">web-sdk</option>
          </select>
          {showSdkSubDropdown && (
            <>
              <span style={label}>Function library:</span>
              <select
                value={sdkSubChoice ?? ''}
                onChange={(e) => onSdkSubChoiceChange((e.target.value as SdkSubChoice) || null)}
                style={select}
              >
                <option value="">— Select —</option>
                <option value="edit">Edit existing</option>
                <option value="create">Create new</option>
              </select>
              {sdkSubChoice === 'edit' && (
                <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 400 }}>
                  Functions: {SDK_WEB_FUNCTIONS.join(', ')}. Edit via [root/ai/sdks/sdk-web/functions/].
                </div>
              )}
              {sdkSubChoice === 'create' && (
                <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 400 }}>
                  Create .br in sdk-web/functions/, add entry to functions.br. See nFunction.br process.
                </div>
              )}
              <button
                type="button"
                onClick={() => setFeatureLibraryOpen(true)}
                style={{ ...select, minWidth: 'auto', padding: '6px 12px' }}
              >
                feature library info/commands
              </button>
            </>
          )}
        </div>
      )}

      <FeatureLibraryInfoModal open={featureLibraryOpen} onClose={() => setFeatureLibraryOpen(false)} />

      <div style={keybinds}>
        <strong>Keybinds:</strong> Ctrl+Alt+D — Search functions{showSdkSubDropdown ? ' (incl. createFeaturePack)' : ''} | <code>:</code> after <code>br </code> or <code>{'}'} </code> → <code>{'{ '}</code>
      </div>
    </div>
  )
}
