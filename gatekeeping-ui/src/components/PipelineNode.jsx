import React from 'react'
import { Handle, Position } from '@xyflow/react'
import {
  Database,
  BarChart3,
  ShieldAlert,
  Send,
  CheckCircle2,
  Loader2,
  Pause,
  Circle,
} from 'lucide-react'

const icons = [Database, BarChart3, ShieldAlert, Send]

export function PipelineNode({ data }) {
  const { stage, status, index, isCurrent } = data
  const Icon = icons[index] || Database
  const isGatekeeper = stage.gatekeeping === 'ask'

  return (
    <div
      className={`
        w-64 rounded-xl p-4 transition-all duration-200 relative select-none
        ${
          status === 'running'
            ? 'bg-[#16161d] border border-emerald-500/70'
            : status === 'paused'
            ? 'bg-[#181518] border border-rose-500/70'
            : status === 'completed'
            ? 'bg-[#14141a] border border-emerald-500/30'
            : 'bg-[#141419] border border-[#262630] hover:border-zinc-700'
        }
      `}
    >
      {/* Left Handle (Target) */}
      {index > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-950 transition-colors"
        />
      )}

      {/* Node Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              status === 'running'
                ? 'bg-emerald-500/15 text-emerald-400'
                : status === 'paused'
                ? 'bg-rose-500/15 text-rose-400'
                : status === 'completed'
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-zinc-800/80 text-zinc-500'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
            Step 0{stage.id}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {isGatekeeper && (
            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Gatekeeper
            </span>
          )}
          <NodeStatusIndicator status={status} />
        </div>
      </div>

      {/* Node Title & Description */}
      <h3 className="text-xs font-semibold text-zinc-100 tracking-tight mb-1">
        {stage.title}
      </h3>
      <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
        {stage.subtitle}
      </p>

      {/* Telemetry pill */}
      <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>{stage.gatekeeping === 'act' ? 'Mode: Act' : stage.gatekeeping === 'ask' ? 'Mode: Ask' : 'Mode: Wait'}</span>
        <span
          className={
            status === 'completed'
              ? 'text-emerald-400 font-medium'
              : status === 'paused'
              ? 'text-rose-400 font-medium'
              : status === 'running'
              ? 'text-emerald-400 font-medium'
              : 'text-zinc-600'
          }
        >
          {status === 'running' ? 'EXECUTING' : status === 'paused' ? 'PAUSED' : status === 'completed' ? 'VERIFIED' : 'STANDBY'}
        </span>
      </div>

      {/* Right Handle (Source) */}
      {index < 3 && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-950 transition-colors"
        />
      )}

      {/* Bottom Handle (Connector to Explainer Node) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-zinc-950 transition-colors"
      />
    </div>
  )
}

function NodeStatusIndicator({ status }) {
  if (status === 'completed') {
    return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
  }
  if (status === 'paused') {
    return <Pause className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
  }
  if (status === 'running') {
    return <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
  }
  return <Circle className="w-3 h-3 text-zinc-700" />
}
