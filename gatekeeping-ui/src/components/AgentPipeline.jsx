import React, { useReducer, useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pipelineReducer, INITIAL_STATE, STAGES } from '../data/pipeline'
import { FlowGraph } from './FlowGraph'
import { GatekeepingModal } from './GatekeepingModal'
import { AuditDrawer } from './AuditDrawer'
import { EvaluatorToolbar } from './EvaluatorToolbar'
import {
  Plus,
  Home,
  User,
  HelpCircle,
  Settings,
  ArrowLeft,
  ChevronDown,
  Check,
  Share2,
  MoreVertical,
  Activity,
  SlidersHorizontal,
  Clock,
  CheckCircle2,
} from 'lucide-react'

export default function AgentPipeline({ onBack }) {
  const [state, dispatch] = useReducer(pipelineReducer, INITIAL_STATE)
  const timerRef = useRef(null)
  const [auditOpen, setAuditOpen] = useState(false)
  const [activeCanvasTab, setActiveCanvasTab] = useState('Editor') // 'Editor' | 'Executions' | 'Evaluator'
  const [isWorkflowActive, setIsWorkflowActive] = useState(true)

  // Sequential execution handler for stages
  const runStage = useCallback(
    (stageIndex) => {
      if (stageIndex >= STAGES.length) return
      const stage = STAGES[stageIndex]

      // If this stage requires human gatekeeping ('Ask')
      if (stage.gatekeeping === 'ask' && state.mixedInitiativeMode) {
        dispatch({ type: 'COMPLETE_STAGE', stageIndex: stageIndex - 1 >= 0 ? stageIndex - 1 : 0 })
        return
      }

      const duration =
        state.hallucinationMode && stageIndex >= 1
          ? Math.min(stage.duration || 2000, 1600)
          : stage.duration || 2400

      timerRef.current = setTimeout(() => {
        dispatch({ type: 'COMPLETE_STAGE', stageIndex })

        if (state.hallucinationMode && stageIndex === 1) {
          setTimeout(() => {
            dispatch({ type: 'FORCE_HALLUCINATION_PAUSE' })
          }, 500)
          return
        }

        const nextStage = stageIndex + 1
        if (nextStage < STAGES.length) {
          const nextData = STAGES[nextStage]
          if (nextData.gatekeeping !== 'ask' || !state.mixedInitiativeMode) {
            runStage(nextStage)
          }
        }
      }, duration)
    },
    [state.mixedInitiativeMode, state.hallucinationMode],
  )

  const handleStart = useCallback(() => {
    dispatch({ type: 'START_PIPELINE' })
  }, [])

  // Auto-run Stage 0 when starting execution in Act state
  useEffect(() => {
    if (state.flowState === 'Act' && state.currentStage === 0 && state.stageStatuses[0] === 'running') {
      runStage(0)
    }
  }, [state.flowState, state.currentStage, state.stageStatuses, runStage])

  // Run Stage 4 when gate decision is made
  useEffect(() => {
    if (
      state.flowState === 'Act' &&
      state.currentStage === 3 &&
      state.stageStatuses[3] === 'running'
    ) {
      runStage(3)
    }
  }, [state.flowState, state.currentStage, state.stageStatuses, runStage])

  // Run Stage 1 (Step 2) when rollback is engaged
  useEffect(() => {
    if (
      state.flowState === 'Act' &&
      state.gatekeepingDecision === 'rolledback' &&
      state.currentStage === 1 &&
      state.stageStatuses[1] === 'running'
    ) {
      runStage(1)
    }
  }, [state.flowState, state.gatekeepingDecision, state.currentStage, state.stageStatuses, runStage])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleGateDecision = useCallback((decision, value) => {
    switch (decision) {
      case 'approve':
        dispatch({ type: 'APPROVE_GATE' })
        break
      case 'override':
        dispatch({ type: 'OVERRIDE_GATE', value })
        break
      case 'rollback':
        dispatch({ type: 'ROLLBACK_GATE' })
        break
    }
  }, [])

  const handleTabClick = (tab) => {
    setActiveCanvasTab(tab)
    if (tab === 'Executions') {
      setAuditOpen(true)
    }
  }

  const currentStageData = state.currentStage < STAGES.length ? STAGES[state.currentStage] : null

  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#0e0e11] text-[#e4e4e7] flex flex-row font-sans selection:bg-[#ff5d44]/30 selection:text-white antialiased">
      {/* ── Left Sidebar (Matching n8n Icon Rail) ──────────── */}
      <aside className="w-14 h-full bg-[#141418] border-r border-[#222228] flex flex-col items-center justify-between py-3 flex-shrink-0 z-30 select-none overflow-hidden">
        {/* Top Icons */}
        <div className="flex flex-col items-center gap-2.5 w-full">
          {/* Plus icon */}
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="w-9 h-9 rounded-lg border border-[#2a2a32] bg-[#1a1a20] hover:bg-[#22222a] hover:border-[#383844] flex items-center justify-center text-zinc-300 transition-colors"
            title="New / Reset Workflow"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Home icon - navigates back to landing page */}
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-lg border border-transparent hover:border-[#2f2f38] hover:bg-[#1f1f26] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            title="Back to Workflows Overview"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Credentials / User icon */}
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-lg hover:bg-[#1f1f26] text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition-colors"
            title="Credentials"
          >
            <User className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center gap-2.5 w-full">
          <button
            className="w-8 h-8 text-zinc-500 hover:text-zinc-300 flex items-center justify-center transition-colors"
            title="Help and Documentation"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            className="w-8 h-8 text-zinc-500 hover:text-zinc-300 flex items-center justify-center transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Initials Avatar */}
          <div
            className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9333ea] to-[#ec4899] flex items-center justify-center text-[10px] font-bold text-white shadow-sm mt-0.5 cursor-pointer"
            title="Account: Abhiram (UoB IIS)"
          >
            AB
          </div>
        </div>
      </aside>

      {/* ── Main Canvas Viewport ───────────────────────────── */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#0e0e11] overflow-hidden relative">
        {/* ── n8n Canvas Header Bar ─────────────────────────── */}
        <header className="h-12 bg-[#141418] border-b border-[#222228] px-4 flex items-center justify-between z-20 flex-shrink-0 select-none">
          {/* Left: Breadcrumbs & Workflow Name */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors py-1 px-1.5 rounded hover:bg-[#1f1f26]"
              title="Return to Workflows"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
              <span>Workflows</span>
            </button>

            <span className="text-zinc-600 text-xs">/</span>

            <div className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
              <User className="w-3 h-3 text-zinc-500" />
              <span>Personal</span>
            </div>

            <span className="text-zinc-600 text-xs">/</span>

            <h1 className="text-xs font-semibold text-zinc-100 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              Quantitative Derivatives &amp; Volatility Calibration
            </h1>

            <span className="hidden md:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Stage 03 Gatekeeper
            </span>
          </div>

          {/* Center: Segmented Editor / Executions Tab Pill */}
          <div className="hidden lg:flex items-center p-0.5 rounded-lg bg-[#0e0e11] border border-[#222228] text-xs font-medium">
            <button
              onClick={() => handleTabClick('Editor')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeCanvasTab === 'Editor'
                  ? 'bg-[#1f1f26] text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => handleTabClick('Executions')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeCanvasTab === 'Executions'
                  ? 'bg-[#1f1f26] text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Executions
            </button>
          </div>

          {/* Right: Active Toggle, Share, Saved Pill, More */}
          <div className="flex items-center gap-3">
            {/* Active / Inactive switch */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsWorkflowActive(!isWorkflowActive)}
            >
              <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                {isWorkflowActive ? 'Active' : 'Inactive'}
              </span>
              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                  isWorkflowActive ? 'bg-emerald-500' : 'bg-zinc-700'
                }`}
              >
                <motion.div
                  animate={{ x: isWorkflowActive ? 16 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full bg-white shadow-sm"
                />
              </div>
            </div>

            {/* Share Button */}
            <button className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#2a2a34] bg-[#1a1a20] hover:bg-[#22222a] text-xs text-zinc-300 transition-colors">
              <Share2 className="w-3 h-3 text-zinc-400" />
              <span>Share</span>
            </button>

            {/* Saved Status Indicator */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Saved</span>
            </div>

            {/* More Options */}
            <button
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Workflow settings"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ── Canvas Area: Full Screen React Flow ───────────── */}
        <div className="flex-1 w-full h-[calc(100dvh-48px)] relative overflow-hidden">
          <FlowGraph
            stages={STAGES}
            stageStatuses={state.stageStatuses}
            currentStage={state.currentStage}
            flowState={state.flowState}
            onStart={handleStart}
            onReset={() => dispatch({ type: 'RESET' })}
            onOpenAudit={() => setAuditOpen(true)}
          />
        </div>
      </div>

      {/* ── Progressive Disclosure Gatekeeping Modal ─────────── */}
      <AnimatePresence>
        {state.flowState === 'Ask' && currentStageData && (
          <GatekeepingModal
            stageData={currentStageData}
            onDecision={handleGateDecision}
            hallucinationMode={state.hallucinationMode}
          />
        )}
      </AnimatePresence>

      {/* ── Observability Audit Drawer ───────────────────────── */}
      <AuditDrawer
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
        auditLog={state.auditLog}
        stages={STAGES}
        stageStatuses={state.stageStatuses}
      />

      {/* ── Evaluator / Developer Toolbar ────────────────────── */}
      <EvaluatorToolbar state={state} dispatch={dispatch} />
    </div>
  )
}
