import React from 'react'
import {
  Shield,
  AlertTriangle,
  Play,
} from 'lucide-react'

export function ArchitectureBannerNode() {
  return (
    <div className="w-[1244px] rounded-xl bg-[#141419] border border-[#262630] p-4 select-none text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#22222a]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            SYSTEM ARCHITECTURE &amp; RESEARCH PROBLEM
          </span>
          <span className="text-xs font-semibold text-zinc-100">
            Chunked Mixed-Initiative Gatekeeping for Autonomous Multi-Step Agentic Workflows
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span>UoB Intelligent Interactive Systems</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300">ID: 3185459</span>
        </div>
      </div>

      {/* 3 Concise Summary Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
        {/* Column 1: The Problem */}
        <div className="p-2.5 rounded-lg bg-[#181820] border border-[#24242e]">
          <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[10px] font-semibold uppercase mb-1">
            <AlertTriangle className="w-3 h-3" />
            <span>The Problem Solved</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-snug font-sans">
            Multi-step LLM workflows cause <strong className="text-zinc-100">Automation Bias</strong> (uncritical trust in fluent text) and <strong className="text-zinc-100">Cognitive Overload</strong> (drowning in raw logs), widening Norman&apos;s Gulf of Evaluation.
          </p>
        </div>

        {/* Column 2: The Solution */}
        <div className="p-2.5 rounded-lg bg-[#181820] border border-[#24242e]">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-semibold uppercase mb-1">
            <Shield className="w-3 h-3" />
            <span>Mixed-Initiative Solution</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-snug font-sans">
            Horvitz&apos;s model <strong className="text-emerald-300">Acts</strong> on low-risk steps (1 &amp; 2) and pauses to <strong className="text-amber-300">Ask</strong> at Step 3, strictly bounding review to <strong className="text-zinc-100">&le;4 cognitive chunks</strong> (Cowan, 2001).
          </p>
        </div>

        {/* Column 3: How to Test */}
        <div className="p-2.5 rounded-lg bg-[#181820] border border-[#24242e]">
          <div className="flex items-center gap-1.5 text-indigo-400 font-mono text-[10px] font-semibold uppercase mb-1">
            <Play className="w-3 h-3" />
            <span>How to Observe Flow</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-snug font-sans">
            Click <strong className="text-zinc-100 font-semibold">Execute workflow</strong> below. Watch autonomous execution halt at Step 3 to trigger the 4-chunk supervisory gatekeeper modal with rollback controls.
          </p>
        </div>
      </div>
    </div>
  )
}
