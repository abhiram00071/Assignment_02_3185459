import React from 'react'
import { Handle, Position } from '@xyflow/react'
import {
  Database,
  Cpu,
  ShieldAlert,
  Send,
} from 'lucide-react'

const EXPLAINER_DETAILS = [
  {
    step: 'STAGE 01',
    name: 'Data Ingestion',
    mode: 'Act (Auto)',
    modeBadge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: Database,
    action: 'Ingests live tick feeds from Bloomberg, Reuters Eikon & internal Oracle database.',
    rationale: 'Low uncertainty and risk. Runs 100% autonomously to eliminate unnecessary human interruption and alert fatigue.',
  },
  {
    step: 'STAGE 02',
    name: 'SABR Modeling',
    mode: 'Act (Auto)',
    modeBadge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: Cpu,
    action: 'Calibrates volatility surfaces across strikes and simulates 10,000 Monte Carlo price paths.',
    rationale: 'Routine analytical calculation. Prepares portfolio Greeks (Delta, Gamma, Vega) and scenario metrics autonomously.',
  },
  {
    step: 'STAGE 03',
    name: 'Gatekeeper Check',
    mode: 'Ask (Gatekeeper)',
    modeBadge: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    icon: ShieldAlert,
    isGatekeeper: true,
    action: 'Cross-checks feeds against MiFID II compliance rules and firm £5M risk limits.',
    rationale: 'Solves Automation Bias: If feed divergence exceeds 10%, halts execution and displays strictly ≤4 cognitive chunks (Cowan, 2001) for human review.',
  },
  {
    step: 'STAGE 04',
    name: 'FIX Execution',
    mode: 'Wait (Clearance)',
    modeBadge: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    icon: Send,
    action: 'Routes orders via FIX 4.4 protocol to market venues and files audit compliance logs.',
    rationale: 'Irreversible action protection: Order routing is locked until Step 3 is approved by the supervisor.',
  },
]

export function StageExplainerNode({ data }) {
  const { index } = data
  const info = EXPLAINER_DETAILS[index] || EXPLAINER_DETAILS[0]

  return (
    <div
      className={`w-64 rounded-xl p-3 select-none transition-colors relative ${
        info.isGatekeeper
          ? 'bg-[#15151c] border border-amber-500/40'
          : 'bg-[#141419] border border-[#262630]'
      }`}
    >
      {/* Top Handle connected from the Pipeline Node above */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-2 !h-2 !bg-zinc-600 !border-2 !border-zinc-950 transition-colors"
      />

      {/* Explainer Header */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#22222a]">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${info.isGatekeeper ? 'bg-amber-400' : 'bg-zinc-500'}`} />
          <span className="text-[10px] font-mono text-zinc-300 font-semibold tracking-wider">
            {info.step} GUIDE
          </span>
        </div>
        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-medium ${info.modeBadge}`}>
          {info.mode}
        </span>
      </div>

      {/* Structured Content */}
      <div className="space-y-1.5 text-left text-[11px] leading-snug">
        <div>
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">
            Role:
          </span>
          <p className="text-zinc-200 font-sans">
            {info.action}
          </p>
        </div>

        <div className="pt-1 border-t border-[#202026]">
          <span className={`text-[10px] font-mono uppercase block mb-0.5 ${info.isGatekeeper ? 'text-amber-400 font-semibold' : 'text-zinc-500'}`}>
            {info.isGatekeeper ? 'Problem Solved:' : 'Design Rationale:'}
          </span>
          <p className="text-zinc-400 text-[10.5px] font-sans">
            {info.rationale}
          </p>
        </div>
      </div>
    </div>
  )
}
