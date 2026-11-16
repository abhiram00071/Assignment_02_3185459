import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bug,
  ToggleLeft,
  ToggleRight,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Zap,
  Eye,
  Boxes,
  Settings,
} from 'lucide-react'

export function EvaluatorToolbar({ state, dispatch }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-4 w-72 space-y-4"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Evaluator Controls
              </h3>
              <span className="text-[9px] font-mono text-zinc-600 px-1.5 py-0.5 bg-zinc-800 rounded">
                DEV
              </span>
            </div>

            {/* Hallucination Toggle */}
            <ToolbarRow
              label="Seeded Hallucination"
              description="Forces agent confidence collapse"
              icon={<Bug className="w-3.5 h-3.5" />}
              active={state.hallucinationMode}
              onClick={() => dispatch({ type: 'TOGGLE_HALLUCINATION' })}
              activeColor="rose"
            />

            {/* Initiative Mode Toggle */}
            <ToolbarRow
              label="Mixed-Initiative Mode"
              description="Enables human gatekeeping at high-risk stages"
              icon={<Eye className="w-3.5 h-3.5" />}
              active={state.mixedInitiativeMode}
              onClick={() => dispatch({ type: 'TOGGLE_INITIATIVE_MODE' })}
              activeColor="emerald"
            />

            {/* Working Memory Chunks */}
            <div className="flex items-center justify-between py-2 border-t border-zinc-800/40">
              <div className="flex items-center gap-2">
                <Boxes className="w-3.5 h-3.5 text-zinc-500" />
                <div>
                  <p className="text-xs text-zinc-300">Memory Chunks</p>
                  <p className="text-[10px] text-zinc-600">Working Memory Capacity: 4</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-mono transition-colors ${
                      n <= state.workingMemoryChunks
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-zinc-800/60 text-zinc-600 border border-zinc-700/40'
                    }`}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>

            {/* State Inspector */}
            <div className="pt-2 border-t border-zinc-800/40 space-y-1.5">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-3 h-3 text-zinc-500" />
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">State Inspector</p>
              </div>
              <StateRow label="Current Stage" value={state.currentStage < 4 ? `Stage ${state.currentStage + 1}` : 'Done'} />
              <StateRow label="Pipeline" value={state.isRunning ? 'Running' : 'Idle'} />
              <StateRow label="Paused" value={state.isPaused ? 'Yes' : 'No'} />
              <StateRow label="Last Decision" value={state.gatekeepingDecision || 'None'} />
              {state.overrideValue && (
                <StateRow label="Override Value" value={`${state.overrideValue}%`} />
              )}
            </div>

            {/* Reset */}
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-zinc-400 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-zinc-200 transition-colors active:scale-[0.98]"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Pipeline
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-[0.95] shadow-lg ${
          expanded
            ? 'bg-zinc-800 border border-zinc-700 text-zinc-300'
            : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
        }`}
        aria-label={expanded ? 'Close evaluator toolbar' : 'Open evaluator toolbar'}
        aria-expanded={expanded}
      >
        <Zap className="w-4 h-4" />
      </button>
    </div>
  )
}

function ToolbarRow({ label, description, icon, active, onClick, activeColor }) {
  const colors = {
    emerald: {
      activeBg: 'bg-emerald-500/10',
      activeBorder: 'border-emerald-500/20',
      activeText: 'text-emerald-400',
      toggleBg: 'bg-emerald-500',
    },
    rose: {
      activeBg: 'bg-rose-500/10',
      activeBorder: 'border-rose-500/20',
      activeText: 'text-rose-400',
      toggleBg: 'bg-rose-500',
    },
  }

  const c = colors[activeColor]

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all ${
        active
          ? `${c.activeBg} ${c.activeBorder}`
          : 'bg-zinc-900/40 border-zinc-800/40 hover:border-zinc-700/60'
      }`}
    >
      <div className="flex items-center gap-2.5 text-left">
        <span className={active ? c.activeText : 'text-zinc-500'}>{icon}</span>
        <div>
          <p className={`text-xs font-medium ${active ? 'text-zinc-200' : 'text-zinc-400'}`}>
            {label}
          </p>
          <p className="text-[10px] text-zinc-600">{description}</p>
        </div>
      </div>
      <div className={`w-8 h-4.5 rounded-full flex items-center transition-colors ${
        active ? c.toggleBg : 'bg-zinc-700'
      }`}>
        <motion.div
          animate={{ x: active ? 14 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-3.5 h-3.5 rounded-full bg-white shadow-sm"
        />
      </div>
    </button>
  )
}

function StateRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-zinc-600">{label}</span>
      <span className="text-[10px] font-mono text-zinc-400">{value}</span>
    </div>
  )
}
