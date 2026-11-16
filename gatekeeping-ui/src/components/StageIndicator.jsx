import { motion } from 'framer-motion'
import {
  Database,
  BarChart3,
  ShieldCheck,
  Send,
  CheckCircle2,
  Loader2,
  Pause,
  Circle,
} from 'lucide-react'

const stageIcons = [Database, BarChart3, ShieldCheck, Send]

const statusConfig = {
  idle: {
    bg: 'bg-zinc-900/40',
    border: 'border-zinc-800/40',
    iconColor: 'text-zinc-600',
    titleColor: 'text-zinc-600',
    subtitleColor: 'text-zinc-700',
    indicator: null,
  },
  running: {
    bg: 'bg-zinc-900/80',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    titleColor: 'text-zinc-100',
    subtitleColor: 'text-zinc-400',
    indicator: 'emerald',
  },
  paused: {
    bg: 'bg-zinc-900/80',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    titleColor: 'text-zinc-100',
    subtitleColor: 'text-zinc-400',
    indicator: 'amber',
  },
  completed: {
    bg: 'bg-zinc-900/60',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    titleColor: 'text-zinc-300',
    subtitleColor: 'text-zinc-500',
    indicator: 'done',
  },
}

export function StageIndicator({ stage, index, status, isCurrent, hallucinationMode }) {
  const Icon = stageIcons[index]
  const config = statusConfig[status]
  const riskBadge = stage.risk === 'high'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative rounded-xl p-4
        ${config.bg} border ${config.border}
        transition-all duration-300
        ${isCurrent ? 'ring-1 ring-inset' : ''}
        ${status === 'running' ? 'ring-emerald-500/20' : ''}
        ${status === 'paused' ? 'ring-amber-500/20' : ''}
      `}
    >
      {/* Status indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          status === 'running' ? 'bg-emerald-500/10' :
          status === 'paused' ? 'bg-amber-500/10' :
          status === 'completed' ? 'bg-emerald-500/10' :
          'bg-zinc-800/60'
        }`}>
          <Icon className={`w-4 h-4 ${config.iconColor}`} />
        </div>

        <div className="flex items-center gap-1.5">
          {riskBadge && (
            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
              High Risk
            </span>
          )}
          <StatusDot status={status} hallucinationMode={hallucinationMode && isCurrent} />
        </div>
      </div>

      <h3 className={`text-sm font-semibold tracking-tight mb-1 ${config.titleColor}`}>
        {stage.title}
      </h3>
      <p className={`text-xs leading-relaxed ${config.subtitleColor} line-clamp-2`}>
        {stage.subtitle}
      </p>

      {/* Gatekeeping mode label */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className={`text-[10px] font-mono uppercase tracking-wider ${
          stage.gatekeeping === 'act' ? 'text-emerald-500/60' :
          stage.gatekeeping === 'ask' ? 'text-amber-500/60' :
          'text-zinc-600'
        }`}>
          {stage.gatekeeping === 'act' ? 'Auto-Execute' :
           stage.gatekeeping === 'ask' ? 'Human Gate' :
           'Await Signal'}
        </span>
      </div>

      {/* Connector line (not on last) */}
      {index < 3 && (
        <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-px bg-zinc-800" />
      )}
    </motion.div>
  )
}

function StatusDot({ status, hallucinationMode }) {
  if (status === 'idle') {
    return <Circle className="w-3 h-3 text-zinc-700" />
  }
  if (status === 'completed') {
    return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
  }
  if (status === 'paused') {
    return (
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Pause className={`w-3.5 h-3.5 ${hallucinationMode ? 'text-rose-400' : 'text-amber-400'}`} />
      </motion.div>
    )
  }
  if (status === 'running') {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="w-3.5 h-3.5 text-emerald-400" />
      </motion.div>
    )
  }
  return null
}
