import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw,
  AlertOctagon,
  TrendingDown,
  Code2,
  X,
} from 'lucide-react'

export function GatekeepingModal({ stageData, onDecision, hallucinationMode }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValuation, setEditedValuation] = useState('20.1')
  const details = stageData.details

  // Keyboard navigation: Enter to Approve, Escape to Rollback
  useEffect(() => {
    function handleKeyDown(e) {
      if (isEditing) return
      if (e.key === 'Enter') {
        e.preventDefault()
        onDecision('approve')
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onDecision('rollback')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onDecision, isEditing])

  const handleEditSubmit = useCallback(() => {
    onDecision('override', editedValuation)
    setIsEditing(false)
  }, [onDecision, editedValuation])

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gatekeeping-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl rounded-2xl p-px bg-gradient-to-b from-zinc-700/60 via-zinc-800/40 to-zinc-900/20 shadow-2xl shadow-black/80"
      >
        {/* Obsidian Gradient Inner Card */}
        <div className="rounded-2xl bg-gradient-to-b from-[#18181b] via-[#0f0f12] to-[#09090b] border border-zinc-800/80 p-6 relative overflow-hidden">
          {/* Subtle top indicator line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/80 to-transparent" />

          {/* Modal Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h2
                  id="gatekeeping-modal-title"
                  className="text-sm font-semibold tracking-tight text-zinc-100"
                >
                  Step 3 Gatekeeping Check
                </h2>
                <p className="text-[11px] font-mono text-zinc-500">
                  Regulatory Compliance and Risk Validation
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/60 text-zinc-400">
              State: Ask
            </span>
          </div>

          {/* ── Strict 4-Chunk Layout ──────────────────────────────── */}
          <div className="space-y-3.5">
            {/* Chunk 1: The Proposed Action */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
                  Chunk 1: Proposed Action
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <p className="text-xs font-semibold text-zinc-200">
                  Proposing Short Position: {details.proposedAction?.split(' on ')[1] || 'FTSE 100 Dec Puts'}
                </p>
                <span className="text-xs font-mono text-zinc-300 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 self-start sm:self-auto">
                  Notional: {details.currency} {Number(details.notional).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Chunk 2: Red Inconsistency Warning Badge */}
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-md bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                      Chunk 2: Inconsistency Warning
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/25 text-rose-200 border border-rose-500/40 font-semibold">
                      {details.discrepancy.magnitude} Discrepancy Detected
                    </span>
                  </div>
                  <p className="text-xs text-rose-200 font-medium leading-relaxed">
                    {details.discrepancy.type}: {details.discrepancy.sourceA.name} ({details.discrepancy.sourceA.value}) diverges from {details.discrepancy.sourceB.name} ({details.discrepancy.sourceB.value}).
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 italic font-sans">
                    Safety Rule: Pre-Trade Multi-Feed Volatility Divergence Control
                  </p>
                </div>
              </div>
            </div>

            {/* Chunk 3: Read-Only Source Text Snippet Box */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
                    Chunk 3: Raw Source Telemetry
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                  Read-Only
                </span>
              </div>
              <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/90 text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-36 leading-relaxed select-text">
                <code>{details.rawSnippet}</code>
              </pre>
            </div>

            {/* Chunk 4: Bottom Control Bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                  Chunk 4: Supervisory Control Bar
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  Enter = Approve | Esc = Rollback
                </span>
              </div>

              {/* Inline Parameter Override Field (when Edit Parameter is toggled) */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-3 p-3 rounded-xl bg-zinc-900/90 border border-amber-500/40 overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="param-override-input" className="text-xs font-semibold text-amber-300">
                        Adjust Calibrated Volatility Parameter (%)
                      </label>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="text-zinc-500 hover:text-zinc-300 p-0.5"
                        aria-label="Close parameter editor"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        id="param-override-input"
                        type="number"
                        step="0.1"
                        min="10"
                        max="40"
                        value={editedValuation}
                        onChange={(e) => setEditedValuation(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                      <button
                        onClick={handleEditSubmit}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold rounded-lg transition-colors active:scale-[0.98]"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Exactly 3 Control Buttons: 'Approve', 'Edit Parameter', and 'Rollback' */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => onDecision('approve')}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-emerald-500 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold rounded-lg border border-zinc-700 transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-amber-500 shadow-sm"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  Edit Parameter
                </button>
                <button
                  onClick={() => onDecision('rollback')}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-rose-400 hover:text-rose-300 text-xs font-semibold rounded-lg border border-rose-500/25 hover:border-rose-500/40 transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-rose-500 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Rollback
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
