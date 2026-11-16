import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertOctagon,
} from 'lucide-react'

const levelConfig = {
  info: {
    icon: Info,
    color: 'text-zinc-400',
    bg: 'bg-zinc-800/30',
    dot: 'bg-zinc-500',
  },
  success: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/5',
    dot: 'bg-emerald-500',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/5',
    dot: 'bg-amber-500',
  },
  error: {
    icon: AlertOctagon,
    color: 'text-rose-400',
    bg: 'bg-rose-500/5',
    dot: 'bg-rose-500',
  },
}

export function AuditDrawer({ isOpen, onClose, auditLog, stages, stageStatuses }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800/60 z-50 flex flex-col"
            role="dialog"
            aria-label="Audit trail drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/60">
              <div>
                <h2 className="text-sm font-semibold text-zinc-100">Execution Audit Trail</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {auditLog.length} entries recorded
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                aria-label="Close audit drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stage summary bar */}
            <div className="px-5 py-3 border-b border-zinc-800/40 flex gap-2">
              {stages.map((stage, i) => {
                const status = stageStatuses[i]
                return (
                  <div
                    key={stage.id}
                    className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${
                      status === 'completed' ? 'bg-emerald-500' :
                      status === 'running' ? 'bg-emerald-500/40 animate-pulse-subtle' :
                      status === 'paused' ? 'bg-amber-500/60' :
                      'bg-zinc-800'
                    }`}
                    title={`Stage ${stage.id}: ${stage.title} - ${status}`}
                  />
                )
              })}
            </div>

            {/* Log entries */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {auditLog.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                    <Info className="w-5 h-5 text-zinc-600" />
                  </div>
                  <p className="text-sm text-zinc-500">No entries yet</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    Launch the pipeline to begin recording
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {auditLog.map((entry, i) => {
                    const config = levelConfig[entry.level] || levelConfig.info
                    const Icon = config.icon

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.02 }}
                        className={`rounded-lg px-3 py-2.5 ${config.bg} group`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                            <span className="text-[10px] font-mono text-zinc-500 w-20">
                              {entry.timestamp}
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed ${config.color} flex-1`}>
                            {entry.action}
                          </p>
                          {entry.confidence !== null && entry.confidence !== undefined && (
                            <ConfidenceBadge value={entry.confidence} />
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer legend */}
            <div className="px-5 py-3 border-t border-zinc-800/40">
              <div className="flex items-center gap-4">
                {Object.entries(levelConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                    <span className="text-[10px] text-zinc-600 capitalize">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function ConfidenceBadge({ value }) {
  const pct = Math.round(value * 100)
  let color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  if (pct < 70) color = 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  else if (pct < 85) color = 'text-amber-400 bg-amber-500/10 border-amber-500/20'

  return (
    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0 ${color}`}>
      {pct}%
    </span>
  )
}
