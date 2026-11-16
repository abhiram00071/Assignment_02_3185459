import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Home,
  User,
  HelpCircle,
  Settings,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  SlidersHorizontal,
  MoreVertical,
  X,
  Play,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react'

export const N8N_WORKFLOWS = [
  {
    id: 'quant-finance',
    name: 'Quantitative Derivatives & Volatility Calibration',
    description: 'Multi-step agentic pipeline analyzing FTSE 100 derivatives, SABR volatility surfaces, and cross-checking MiFID II regulatory constraints with 4-chunk progressive gatekeeping.',
    lastUpdated: 'just now',
    createdAt: '16 November',
    folder: 'Personal',
    isActive: true,
    executions: 14,
    stagesCount: 4,
    gatekeeper: 'Stage 03 (Human Compliance Gate)',
    isPrimary: true,
  },
  {
    id: 'clinical-trials',
    name: 'Pharmacovigilance & Drug Interaction Scanner',
    description: 'Ingests clinical trial adverse event streams and runs molecular docking tests with human-in-the-loop safety gating.',
    lastUpdated: '2 hours ago',
    createdAt: '14 November',
    folder: 'Personal',
    isActive: true,
    executions: 8,
    stagesCount: 5,
    gatekeeper: 'Stage 03 (FDA 21 CFR Part 11)',
    isPrimary: false,
  },
  {
    id: 'cloud-infra',
    name: 'Autonomous Multi-Cloud Terraform Provisioner',
    description: 'Executes speculative infrastructure plans across AWS and GCP, triggering budget ceiling alarms on cost overruns.',
    lastUpdated: 'yesterday',
    createdAt: '12 November',
    folder: 'Personal',
    isActive: false,
    executions: 3,
    stagesCount: 4,
    gatekeeper: 'Stage 03 (Zero-Trust FinOps)',
    isPrimary: false,
  },
  {
    id: 'legal-audit',
    name: 'M&A Contract Indemnity & Liability Risk Auditor',
    description: 'Scans cross-border transaction agreements for anomalous uncapped indemnities requiring executive sign-off.',
    lastUpdated: '3 days ago',
    createdAt: '08 November',
    folder: 'Personal',
    isActive: true,
    executions: 6,
    stagesCount: 3,
    gatekeeper: 'Stage 02 (Dual-Key Legal Key)',
    isPrimary: false,
  },
]

export function LandingPage({ onSelectWorkflow }) {
  const [activeTab, setActiveTab] = useState('Workflows')
  const [searchQuery, setSearchQuery] = useState('')
  const [workflowStates, setWorkflowStates] = useState({
    'quant-finance': true,
    'clinical-trials': true,
    'cloud-infra': false,
    'legal-audit': true,
  })
  const [modalWorkflow, setModalWorkflow] = useState(null)

  const tabs = ['Workflows', 'Credentials', 'Executions', 'Variables', 'Data tables']

  const toggleWorkflow = (id, e) => {
    e.stopPropagation()
    setWorkflowStates((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredWorkflows = N8N_WORKFLOWS.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRowClick = (workflow) => {
    if (workflow.isPrimary) {
      onSelectWorkflow(workflow.id)
    } else {
      setModalWorkflow(workflow)
    }
  }

  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#0e0e11] text-[#e4e4e7] flex flex-row font-sans selection:bg-[#ff5d44]/30 selection:text-white antialiased">
      {/* ── Left Sidebar (n8n Icon Rail) ───────────────────── */}
      <aside className="w-14 h-full bg-[#141418] border-r border-[#222228] flex flex-col items-center justify-between py-3 flex-shrink-0 z-20 select-none overflow-hidden">
        {/* Top Icons */}
        <div className="flex flex-col items-center gap-2.5 w-full">
          {/* Plus / Create icon */}
          <button
            onClick={() => onSelectWorkflow('quant-finance')}
            className="w-9 h-9 rounded-lg border border-[#2a2a32] bg-[#1a1a20] hover:bg-[#22222a] hover:border-[#383844] flex items-center justify-center text-zinc-300 transition-colors"
            title="Create workflow"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Home / Workflows icon (Active) */}
          <button
            className="w-9 h-9 rounded-lg border border-[#3f3f4a] bg-[#22222a] text-[#ff5d44] flex items-center justify-center transition-colors"
            title="Workflows Overview"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Credentials / User icon */}
          <button
            onClick={() => setActiveTab('Credentials')}
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

      {/* ── Main Content Area ──────────────────────────────── */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#0e0e11] overflow-y-auto">
        {/* Content Container */}
        <div className="max-w-[1300px] w-full mx-auto px-8 py-8 space-y-7">
          {/* ── Overview Header Strip ───────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                Overview
              </h1>
              <p className="text-xs text-zinc-400">
                All the multi-step agentic workflows, supervisory gatekeepers and execution pipelines you have access to
              </p>
            </div>

            {/* Create workflow button (n8n signature coral button) */}
            <div className="flex items-center">
              <button
                onClick={() => onSelectWorkflow('quant-finance')}
                className="inline-flex items-center gap-2 bg-[#ff5d44] hover:bg-[#ff4e33] text-white text-xs font-semibold px-4 py-2 rounded-l-lg transition-colors shadow-sm active:scale-[0.98]"
              >
                <span>Create workflow</span>
              </button>
              <button
                onClick={() => onSelectWorkflow('quant-finance')}
                className="bg-[#e44d36] hover:bg-[#d63f28] text-white px-2 py-2 rounded-r-lg border-l border-white/20 transition-colors"
                aria-label="Workflow creation options"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ── Operational Metrics Strip (5 Columns) ───────── */}
          <div className="grid grid-cols-2 sm:grid-cols-5 rounded-xl border border-[#222229] bg-[#141418] divide-y sm:divide-y-0 sm:divide-x divide-[#222229] overflow-hidden">
            {/* Metric 1 */}
            <div className="p-4 sm:p-5">
              <p className="text-xs text-zinc-400 font-medium mb-1.5 truncate">
                Pipeline runs
              </p>
              <p className="text-2xl font-semibold text-white tracking-tight font-mono">
                24
              </p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                All monitored pipelines
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-4 sm:p-5">
              <p className="text-xs text-zinc-400 font-medium mb-1.5 truncate">
                Gatekeeper pauses
              </p>
              <p className="text-2xl font-semibold text-amber-400 tracking-tight font-mono">
                18
              </p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                Human review triggered
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-4 sm:p-5">
              <p className="text-xs text-zinc-400 font-medium mb-1.5 truncate">
                Anomalies caught
              </p>
              <p className="text-2xl font-semibold text-rose-400 tracking-tight font-mono">
                7
              </p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                Feed variance &gt;10%
              </p>
            </div>

            {/* Metric 4 */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <p className="text-xs text-zinc-400 font-medium truncate">
                  Max chunk load
                </p>
                <Info className="w-3 h-3 text-zinc-500" title="4-chunk supervisory boundary" />
              </div>
              <p className="text-2xl font-semibold text-emerald-400 tracking-tight font-mono">
                4
              </p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                Bounded modal layout
              </p>
            </div>

            {/* Metric 5 */}
            <div className="p-4 sm:p-5 col-span-2 sm:col-span-1">
              <p className="text-xs text-zinc-400 font-medium mb-1.5 truncate">
                Override &amp; rollback
              </p>
              <p className="text-2xl font-semibold text-white tracking-tight font-mono">
                29.2%
              </p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                Human intervention rate
              </p>
            </div>
          </div>

          {/* ── Tabs Row ─────────────────────────────────────── */}
          <div className="flex items-center gap-6 border-b border-[#222229] pt-2 text-xs font-medium">
            {tabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 relative transition-colors ${
                    isActive
                      ? 'text-[#ff5d44] font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5d44]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Search, Sort, Filter Controls ───────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141418] border border-[#222229] rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#ff5d44] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141418] border border-[#222229] rounded-lg text-xs text-zinc-300 cursor-pointer hover:border-zinc-700 transition-colors">
                <span>Sort by last updated</span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </div>

              {/* Filter Button */}
              <button
                className="p-2 bg-[#141418] border border-[#222229] rounded-lg text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                title="Filter workflows"
              >
                <Filter className="w-3.5 h-3.5" />
              </button>

              {/* View options button */}
              <button
                className="p-2 bg-[#141418] border border-[#222229] rounded-lg text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                title="View settings"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ── n8n Workflow Rows List ───────────────────────── */}
          <div className="space-y-2">
            {filteredWorkflows.map((workflow) => {
              const isEnabled = workflowStates[workflow.id] ?? true
              const isPrimary = workflow.isPrimary

              return (
                <div
                  key={workflow.id}
                  onClick={() => handleRowClick(workflow)}
                  className={`
                    group rounded-xl border border-[#222229] bg-[#141418] hover:bg-[#18181e] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-150
                    ${isPrimary ? 'hover:border-[#ff5d44]/40 hover:shadow-lg hover:shadow-[#ff5d44]/5' : ''}
                  `}
                >
                  {/* Left Column: Name & Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors truncate">
                        {workflow.name}
                      </h3>
                      {isPrimary && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
                          Interactive
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5 truncate">
                      <span>Last updated {workflow.lastUpdated}</span>
                      <span className="text-zinc-600">|</span>
                      <span>Created {workflow.createdAt}</span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-zinc-500">{workflow.stagesCount} Stages</span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-[#ff5d44]/80">{workflow.gatekeeper}</span>
                    </p>
                  </div>

                  {/* Right Column: Personal Tag, Toggle, Context Menu */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {/* Personal Folder Pill */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1d1d24] border border-[#2b2b35] text-[11px] text-zinc-300">
                      <User className="w-3 h-3 text-zinc-400" />
                      <span>{workflow.folder}</span>
                    </div>

                    {/* Active / Inactive Switch */}
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => toggleWorkflow(workflow.id, e)}
                    >
                      <span className="text-[11px] font-mono text-zinc-400 hidden md:inline">
                        {isEnabled ? 'Active' : 'Inactive'}
                      </span>
                      <div
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          isEnabled ? 'bg-emerald-500' : 'bg-zinc-700'
                        }`}
                      >
                        <motion.div
                          animate={{ x: isEnabled ? 16 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="w-4 h-4 rounded-full bg-white shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Three Dots Menu */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRowClick(workflow)
                      }}
                      className="p-1 text-zinc-500 hover:text-zinc-200 transition-colors rounded"
                      aria-label="Workflow options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Footer Pagination Bar (matches n8n exact layout) */}
          <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-[#222229]">
            <span className="font-mono text-zinc-400">Total {filteredWorkflows.length}</span>

            <div className="flex items-center gap-4">
              {/* Pagination controls */}
              <div className="flex items-center gap-1">
                <button
                  className="w-7 h-7 rounded border border-[#222229] bg-[#141418] text-zinc-400 flex items-center justify-center hover:bg-zinc-800 disabled:opacity-40"
                  disabled
                >
                  &lt;
                </button>
                <button className="w-7 h-7 rounded border border-[#ff5d44] bg-[#ff5d44]/15 text-[#ff5d44] font-bold text-xs flex items-center justify-center">
                  1
                </button>
                <button
                  className="w-7 h-7 rounded border border-[#222229] bg-[#141418] text-zinc-400 flex items-center justify-center hover:bg-zinc-800 disabled:opacity-40"
                  disabled
                >
                  &gt;
                </button>
              </div>

              {/* Per page selector */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#141418] border border-[#222229] rounded text-xs font-mono text-zinc-300">
                <span>50/page</span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Simulation Modal for Non-Primary Rows ──────────── */}
      <AnimatePresence>
        {modalWorkflow && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              className="w-full max-w-lg rounded-2xl bg-[#141418] border border-[#2a2a34] p-6 relative shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1f28] text-zinc-400 border border-[#2d2d3a]">
                  Catalog Workflow Specification
                </span>
                <button
                  onClick={() => setModalWorkflow(null)}
                  className="text-zinc-500 hover:text-zinc-300 p-1"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-semibold text-white mb-1.5">
                {modalWorkflow.name}
              </h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                {modalWorkflow.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="p-3 rounded-lg bg-[#191920] border border-[#262632] text-xs">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                    Gatekeeper Protocol
                  </span>
                  <span className="text-zinc-200 font-mono">
                    {modalWorkflow.gatekeeper}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setModalWorkflow(null)
                    onSelectWorkflow('quant-finance')
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#ff5d44] hover:bg-[#ff4e33] text-white font-semibold text-xs rounded-xl transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Open Primary Quant Pipeline</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
                <button
                  onClick={() => setModalWorkflow(null)}
                  className="py-2.5 px-4 bg-[#1f1f26] hover:bg-[#282832] text-zinc-300 text-xs font-semibold rounded-xl border border-[#2b2b36]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
