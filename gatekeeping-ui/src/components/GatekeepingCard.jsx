import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Pencil,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldAlert,
  TrendingDown,
  FileWarning,
  X,
} from 'lucide-react'

export function GatekeepingCard({ stageData, onDecision, hallucinationMode }) {
  const [snippetExpanded, setSnippetExpanded] = useState(false)
  const [overrideOpen, setOverrideOpen] = useState(false)
  const [overrideValue, setOverrideValue] = useState('20.1')
  const details = stageData.details

  const handleOverrideSubmit = useCallback(() => {
    onDecision('override', overrideValue)
    setOverrideOpen(false)
  }, [onDecision, overrideValue])

  // Keyboard shortcuts: Enter to approve, Escape to rollback
  useEffect(() => {
    function handleKeyDown(e) {
      if (overrideOpen) return // Don't intercept when override input is focused
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
  }, [onDecision, overrideOpen])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl"
      role="alertdialog"
      aria-labelledby="gate-title"
      aria-describedby="gate-desc"
    >
      {/* Outer glow ring */}
      <div className={`rounded-2xl p-px ${
        hallucinationMode
          ? 'bg-gradient-to-b from-rose-500/30 to-rose-500/5'
          : 'bg-gradient-to-b from-amber-500/30 to-amber-500/5'
      }`}>
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800/60 overflow-hidden">
          {/* Header bar */}
          <div className={`px-6 py-3 flex items-center justify-between border-b ${
            hallucinationMode
              ? 'border-rose-500/20 bg-rose-500/5'
              : 'border-amber-500/20 bg-amber-500/5'
          }`}>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShieldAlert className={`w-4 h-4 ${hallucinationMode ? 'text-rose-400' : 'text-amber-400'}`} />
              </motion.div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                hallucinationMode ? 'text-rose-400' : 'text-amber-400'
              }`}>
                {hallucinationMode ? 'Hallucination Detected' : 'Human Review Required'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              4 chunks in working memory
            </span>
          </div>

          <div className="p-6 space-y-5">
            {/* ── Chunk 1: Proposed Action ──────────────────── */}
            <ChunkContainer
              number={1}
              label="Proposed Action"
              accentColor={hallucinationMode ? 'rose' : 'amber'}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100" id="gate-title">
                    Proposing Short Position on {details.proposedAction?.split(' on ')[1] || 'FTSE 100 Dec Puts'}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Notional: <span className="font-mono text-zinc-300">{details.currency} {Number(details.notional).toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </ChunkContainer>

            {/* ── Chunk 2: Inconsistency Cue ────────────────── */}
            <ChunkContainer
              number={2}
              label="Inconsistency Detected"
              accentColor="rose"
            >
              <div className="space-y-3" id="gate-desc">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-rose-300">
                      {details.discrepancy.type}: {details.discrepancy.magnitude} discrepancy
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {details.discrepancy.sourceA.name}: <span className="font-mono text-zinc-300">{details.discrepancy.sourceA.value}</span>
                      {' vs '}
                      {details.discrepancy.sourceB.name}: <span className="font-mono text-zinc-300">{details.discrepancy.sourceB.value}</span>
                    </p>
                  </div>
                </div>

                {/* Risk metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  <MiniMetric label="VaR 95%" value={`${details.currency} ${Number(details.riskMetrics.var95).toLocaleString()}`} />
                  <MiniMetric label="VaR 99%" value={`${details.currency} ${Number(details.riskMetrics.var99).toLocaleString()}`} />
                  <MiniMetric label="Max DD" value={details.riskMetrics.maxDrawdown} />
                  <MiniMetric label="Sharpe" value={details.riskMetrics.sharpeRatio} />
                </div>

                {/* Reference citation */}
                <div className="flex items-center gap-1.5 mt-1">
                  <FileWarning className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                  <p className="text-[10px] text-zinc-500 italic truncate">
                    Ref: {details.discrepancy.reference}
                  </p>
                </div>
              </div>
            </ChunkContainer>

            {/* ── Chunk 3: Source Snippet ────────────────────── */}
            <ChunkContainer
              number={3}
              label="Source Data Verification"
              accentColor="zinc"
            >
              <button
                onClick={() => setSnippetExpanded(!snippetExpanded)}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={snippetExpanded}
              >
                <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {snippetExpanded ? 'Hide' : 'Inspect'} raw feed data
                </span>
                {snippetExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                )}
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: snippetExpanded ? 'auto' : 0,
                  opacity: snippetExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <pre className="mt-3 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/60 text-[11px] font-mono text-zinc-400 overflow-x-auto leading-relaxed">
                  {details.rawSnippet}
                </pre>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {details.complianceFlags.map((flag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40 text-zinc-400"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      {flag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </ChunkContainer>

            {/* ── Chunk 4: Decision Controls ─────────────────── */}
            <ChunkContainer
              number={4}
              label="Reversibility and Control"
              accentColor="emerald"
            >
              <div className="space-y-3">
                {/* Override inline modal */}
                {overrideOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-lg bg-zinc-900/80 border border-zinc-800 p-4 mb-2"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-zinc-300">Override Volatility Parameter</p>
                      <button
                        onClick={() => setOverrideOpen(false)}
                        className="text-zinc-500 hover:text-zinc-300"
                        aria-label="Close override panel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label htmlFor="vol-override" className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">
                          Adjusted ATM IV (%)
                        </label>
                        <input
                          id="vol-override"
                          type="number"
                          step="0.1"
                          min="10"
                          max="40"
                          value={overrideValue}
                          onChange={(e) => setOverrideValue(e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                        />
                        <p className="mt-1 text-[10px] text-zinc-600">
                          Source range: {details.discrepancy.sourceA.value} - {details.discrepancy.sourceB.value}
                        </p>
                      </div>
                      <button
                        onClick={handleOverrideSubmit}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold rounded-lg transition-colors active:scale-[0.98]"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => onDecision('approve')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-semibold rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => setOverrideOpen(!overrideOpen)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold rounded-lg border border-zinc-700 transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Override
                  </button>
                  <button
                    onClick={() => onDecision('rollback')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-rose-400 hover:text-rose-300 text-sm font-semibold rounded-lg border border-rose-500/20 hover:border-rose-500/40 transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-rose-500 focus-visible:outline-offset-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Rollback
                  </button>
                </div>

                {/* Keyboard hint */}
                <p className="text-[10px] text-zinc-600 text-center">
                  Keyboard: <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-400 font-mono">Enter</kbd> to approve,
                  {' '}<kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-400 font-mono">Esc</kbd> to rollback
                </p>
              </div>
            </ChunkContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Chunk Container ──────────────────────────────────────────── */
function ChunkContainer({ number, label, accentColor, children }) {
  const colors = {
    amber: 'border-amber-500/15 bg-amber-500/[0.03]',
    rose: 'border-rose-500/15 bg-rose-500/[0.03]',
    emerald: 'border-emerald-500/15 bg-emerald-500/[0.03]',
    zinc: 'border-zinc-800/60 bg-zinc-900/30',
  }

  const numColors = {
    amber: 'text-amber-500/60',
    rose: 'text-rose-500/60',
    emerald: 'text-emerald-500/60',
    zinc: 'text-zinc-600',
  }

  return (
    <div className={`rounded-xl border p-4 ${colors[accentColor]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-mono font-bold ${numColors[accentColor]}`}>
          {String(number).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── Mini Metric Badge ────────────────────────────────────────── */
function MiniMetric({ label, value }) {
  return (
    <div className="bg-zinc-900/60 rounded-lg px-2.5 py-1.5">
      <p className="text-[9px] uppercase tracking-wider text-zinc-600 mb-0.5">{label}</p>
      <p className="text-[11px] font-mono text-zinc-300 truncate">{value}</p>
    </div>
  )
}
