import { motion } from 'framer-motion'
import {
  Loader2,
  Pause,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

export function StatusPill({ state }) {
  const { isRunning, isPaused, hallucinationMode, stageStatuses, currentStage } = state
  const allCompleted = stageStatuses.every((s) => s === 'completed')

  if (allCompleted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        <CheckCircle2 className="w-3 h-3" />
        Complete
      </span>
    )
  }

  if (isPaused) {
    return (
      <motion.span
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
          hallucinationMode
            ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
            : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
        }`}
      >
        {hallucinationMode ? (
          <>
            <AlertTriangle className="w-3 h-3" />
            Hallucination
          </>
        ) : (
          <>
            <Pause className="w-3 h-3" />
            Awaiting Review
          </>
        )}
      </motion.span>
    )
  }

  if (isRunning) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-3 h-3" />
        </motion.div>
        Processing
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-500 bg-zinc-800/60 border border-zinc-800 rounded-full">
      Idle
    </span>
  )
}
