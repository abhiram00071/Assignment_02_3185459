import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  BookOpen,
  Play,
  ShieldAlert,
  Layers,
  Workflow,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw,
  Info,
  Clock,
  ExternalLink,
  ChevronRight,
  Terminal,
} from 'lucide-react'

export function EvaluationGuideDrawer({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('script') // 'script' | 'traps' | 'theory' | 'spine'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel (matches n8n execution/node inspector panel) */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#111115] border-l border-[#22222a] z-50 flex flex-col shadow-2xl text-zinc-200"
            role="dialog"
            aria-label="Academic Research & Evaluation Guide"
          >
            {/* ── Header ────────────────────────────────────────── */}
            <div className="p-5 border-b border-[#202028] bg-[#141419] flex-shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1c1c24] border border-[#282834] flex items-center justify-center text-zinc-300 flex-shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#1e1e26] text-zinc-300 border border-[#2c2c38] font-semibold">
                        UoB IIS - Student ID: 3185459
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Phase 2 Prototype
                      </span>
                    </div>
                    <h2 className="text-sm font-semibold text-white mt-1.5 tracking-tight">
                      Examiner Walkthrough &amp; Research Evaluation Guide
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                      Chunked Mixed-Initiative Gatekeeping for Autonomous Multi-Step Agentic Workflows
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-[#1e1e26] transition-colors flex-shrink-0"
                  aria-label="Close guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Segmented Tab Bar (n8n signature style) */}
              <div className="flex items-center gap-1 mt-4 p-1 rounded-lg bg-[#0c0c0f] border border-[#1e1e24] text-xs">
                <button
                  onClick={() => setActiveTab('script')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md font-medium transition-all ${
                    activeTab === 'script'
                      ? 'bg-[#1e1e26] text-white border border-[#2a2a36] shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 text-[#ff5d44]" />
                  <span>3-Min Test Script</span>
                </button>

                <button
                  onClick={() => setActiveTab('traps')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md font-medium transition-all ${
                    activeTab === 'traps'
                      ? 'bg-[#1e1e26] text-white border border-[#2a2a36] shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Problem &amp; Traps</span>
                </button>

                <button
                  onClick={() => setActiveTab('theory')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md font-medium transition-all ${
                    activeTab === 'theory'
                      ? 'bg-[#1e1e26] text-white border border-[#2a2a36] shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Theory Grounding</span>
                </button>

                <button
                  onClick={() => setActiveTab('spine')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md font-medium transition-all ${
                    activeTab === 'spine'
                      ? 'bg-[#1e1e26] text-white border border-[#2a2a36] shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Conceptual Spine</span>
                </button>
              </div>
            </div>

            {/* ── Scrollable Body ───────────────────────────────── */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs leading-relaxed text-zinc-300">
              {/* TAB 1: 3-MINUTE TEST SCRIPT */}
              {activeTab === 'script' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-lg bg-[#15151c] border border-[#242430] flex items-start gap-3">
                    <Info className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-zinc-100 text-xs">Examiner Evaluation Instructions</h4>
                      <p className="text-zinc-400 mt-1">
                        Run through this 4-step sequence to verify the autonomous Act-Ask state machine, Cowan-bounded modal disclosure, parameter steering, and reversible state rollback.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Step 1 */}
                    <div className="p-4 rounded-lg bg-[#141419] border border-[#22222a] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-[11px]">
                            1
                          </span>
                          <h5 className="font-semibold text-white text-xs">
                            Trigger Autonomous Act Pipeline
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c24] text-zinc-400 border border-[#282832]">
                          Horvitz Act Protocol
                        </span>
                      </div>
                      <p className="text-zinc-400 pl-7">
                        Click the orange <span className="text-white font-medium">Execute workflow</span> button at the bottom of the canvas.
                        <span className="text-emerald-400 font-medium"> Step 01</span> (Data Ingestion) and <span className="text-emerald-400 font-medium">Step 02</span> (Scenario Modeling) execute automatically without demanding human verification, preventing supervisory alert fatigue for deterministic tasks.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-4 rounded-lg bg-[#141419] border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-mono font-bold text-[11px]">
                            2
                          </span>
                          <h5 className="font-semibold text-amber-200 text-xs">
                            Observe Supervisory Gatekeeper Pause
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Horvitz Ask Protocol
                        </span>
                      </div>
                      <p className="text-zinc-400 pl-7">
                        Execution freezes automatically at <span className="text-amber-300 font-medium">Step 03 (Regulatory Compliance Check)</span>.
                        The workflow halts before any irreversible actions (order routing to LSE / capital commitment) can take place, presenting the supervisory gatekeeper modal.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-4 rounded-lg bg-[#141419] border border-[#22222a] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-[11px]">
                            3
                          </span>
                          <h5 className="font-semibold text-white text-xs">
                            Inspect 4-Chunk Bounded Cognitive Layout
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          Cowan (2001) Limit
                        </span>
                      </div>
                      <div className="text-zinc-400 pl-7 space-y-1.5">
                        <p>Verify that the modal strictly presents four structured cognitive chunks:</p>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-[#181820] border border-[#242430]">
                            <span className="text-zinc-200 font-medium block">Chunk 1: Proposed Action</span>
                            <span className="text-zinc-500 text-[10px]">FIX 4.4 routing specification</span>
                          </div>
                          <div className="p-2 rounded bg-[#181820] border border-[#242430]">
                            <span className="text-amber-400 font-medium block">Chunk 2: Discrepancy Badge</span>
                            <span className="text-zinc-500 text-[10px]">12.4% cross-feed variance</span>
                          </div>
                          <div className="p-2 rounded bg-[#181820] border border-[#242430]">
                            <span className="text-zinc-200 font-medium block">Chunk 3: Telemetry Snippet</span>
                            <span className="text-zinc-500 text-[10px]">Excerpts verifiable JSON logs</span>
                          </div>
                          <div className="p-2 rounded bg-[#181820] border border-[#242430]">
                            <span className="text-zinc-200 font-medium block">Chunk 4: Decision Controls</span>
                            <span className="text-zinc-500 text-[10px]">Approve, Edit, or Rollback</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="p-4 rounded-lg bg-[#141419] border border-[#22222a] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center justify-center font-mono font-bold text-[11px]">
                            4
                          </span>
                          <h5 className="font-semibold text-white text-xs">
                            Test Supervisory Interventions
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c24] text-zinc-400 border border-[#282832]">
                          Shneiderman Human Agency
                        </span>
                      </div>
                      <div className="text-zinc-400 pl-7 space-y-2">
                        <p>
                          <strong className="text-zinc-200">A. Parameter Override:</strong> Click <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#1c1c24] text-zinc-300 border border-[#2a2a36]">Edit Parameter</span>. Adjust the volatility cap slider to 16.5% and submit. The pipeline proceeds to Step 04 with human-adjusted constraints.
                        </p>
                        <p>
                          <strong className="text-zinc-200">B. State Rollback:</strong> Alternatively, click <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">Rollback to Step 02</span>. The state machine rolls execution back to Step 02 for recalibration, preserving supervisor autonomy over agent outputs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROBLEM & TRAPS */}
              {activeTab === 'traps' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-lg bg-[#15151c] border border-[#242430]">
                    <h4 className="font-semibold text-zinc-100 text-xs">Interaction Dilemma in Multi-Step Agentic Systems</h4>
                    <p className="text-zinc-400 mt-1">
                      As autonomous pipelines handle high-consequence operational domains, supervisors regularly succumb to three documented HCI failure modes:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Trap 1 */}
                    <div className="p-3.5 rounded-lg bg-[#141419] border border-[#22222a] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-rose-300 text-xs">1. Conversational Persuasion Trap</span>
                        <span className="text-[10px] font-mono text-zinc-500">Parasuraman &amp; Riley (1997)</span>
                      </div>
                      <p className="text-zinc-400">
                        Chatbot interfaces explain reasoning with high linguistic confidence. Human operators exhibit Automation Bias, uncritically accepting flawed decisions due to conversational persuasiveness.
                      </p>
                      <div className="p-2 rounded bg-[#181820] border border-[#242430] text-[11px] text-zinc-300">
                        <strong className="text-white">Our Solution:</strong> Eliminate chat prose inside critical review gates; present structured discrepancy badges and raw telemetry excerpts instead.
                      </div>
                    </div>

                    {/* Trap 2 */}
                    <div className="p-3.5 rounded-lg bg-[#141419] border border-[#22222a] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-300 text-xs">2. Telemetry Dump Trap</span>
                        <span className="text-[10px] font-mono text-zinc-500">Cowan (2001); Endsley (1995)</span>
                      </div>
                      <p className="text-zinc-400">
                        Developer dashboards dump hundreds of lines of unstructured JSON logs. This causes working memory exhaustion, leading to Alert Fatigue where supervisors click "Approve" blindly.
                      </p>
                      <div className="p-2 rounded bg-[#181820] border border-[#242430] text-[11px] text-zinc-300">
                        <strong className="text-white">Our Solution:</strong> Strict Cowan-bounded 4-chunk layout with progressive disclosure drill-downs for raw verification.
                      </div>
                    </div>

                    {/* Trap 3 */}
                    <div className="p-3.5 rounded-lg bg-[#141419] border border-[#22222a] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-300 text-xs">3. Rigid Friction Trap</span>
                        <span className="text-[10px] font-mono text-zinc-500">Horvitz (1999)</span>
                      </div>
                      <p className="text-zinc-400">
                        Static popups interrupt trivial routine steps, destroying workflow velocity. Fully automated pipelines, on the other hand, eliminate human control when agent anomalies arise.
                      </p>
                      <div className="p-2 rounded bg-[#181820] border border-[#242430] text-[11px] text-zinc-300">
                        <strong className="text-white">Our Solution:</strong> Mixed-initiative state machine dynamically toggling Act (autonomous) and Ask (gated) based on variance thresholds (&gt;10%).
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: THEORETICAL GROUNDING */}
              {activeTab === 'theory' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-[#15151c] border border-[#242430]">
                    <h4 className="font-semibold text-zinc-100 text-xs">HCI &amp; Cognitive Literature Matrix</h4>
                    <p className="text-zinc-400 mt-1">
                      Direct mapping of prototype architectural choices to seminal academic citations:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white text-xs">Mixed-Initiative Interaction (Act vs. Ask)</h5>
                        <span className="text-[10px] font-mono text-zinc-400">Horvitz (1999)</span>
                      </div>
                      <p className="text-zinc-400 mt-1 text-[11px]">
                        Dynamic balancing of autonomous task execution with selective clarification dialogues based on expected utility and decision uncertainty.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white text-xs">Working Memory Capacity Limit (&le; 4 Chunks)</h5>
                        <span className="text-[10px] font-mono text-zinc-400">Cowan (2001)</span>
                      </div>
                      <p className="text-zinc-400 mt-1 text-[11px]">
                        Adult short-term working memory holds roughly 4 chunks. Gatekeeping modal restricts simultaneous visual items to 4 semantic clusters.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white text-xs">Gulf of Evaluation &amp; Gulf of Execution</h5>
                        <span className="text-[10px] font-mono text-zinc-400">Norman (2013)</span>
                      </div>
                      <p className="text-zinc-400 mt-1 text-[11px]">
                        Discrepancy badges bridge the Gulf of Evaluation (understanding what the agent did); override sliders and rollback bridge the Gulf of Execution.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white text-xs">Automation Bias &amp; Errors of Commission</h5>
                        <span className="text-[10px] font-mono text-zinc-400">Parasuraman &amp; Riley (1997)</span>
                      </div>
                      <p className="text-zinc-400 mt-1 text-[11px]">
                        Contrast-rich anomaly badges disrupt uncritical agreement and prompt deliberate supervisory review before execution.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-white text-xs">Human-Centered AI &amp; Sense of Agency</h5>
                        <span className="text-[10px] font-mono text-zinc-400">Shneiderman (2022); Haggard (2017)</span>
                      </div>
                      <p className="text-zinc-400 mt-1 text-[11px]">
                        Ensures supervisors maintain continuous steering control through fine-grained parameter sliders rather than simple binary accept/reject choices.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CONCEPTUAL SPINE */}
              {activeTab === 'spine' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-[#15151c] border border-[#242430]">
                    <h4 className="font-semibold text-zinc-100 text-xs">Module Conceptual Spine Mapping</h4>
                    <p className="text-zinc-400 mt-1">
                      Systematic alignment with the 4 core dimensions of Intelligent Interactive Systems:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <h5 className="font-semibold text-white text-xs">1. Sensing &amp; Input Representation</h5>
                      </div>
                      <p className="text-zinc-400 mt-1 pl-4 text-[11px]">
                        Multi-source ingestion from Bloomberg, Reuters, and internal databases; real-time SABR volatility surfaces and variance telemetry.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        <h5 className="font-semibold text-white text-xs">2. Modeling &amp; Planning</h5>
                      </div>
                      <p className="text-zinc-400 mt-1 pl-4 text-[11px]">
                        Finite state machine (Act vs. Ask vs. Complete) evaluating cross-feed divergence against risk thresholds; 10,000-path Monte Carlo simulations.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        <h5 className="font-semibold text-white text-xs">3. Tools &amp; Action Execution</h5>
                      </div>
                      <p className="text-zinc-400 mt-1 pl-4 text-[11px]">
                        FIX 4.4 routing engine to LSE / ICE execution venues with cryptographic audit trail generation; live parameter steering.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#141419] border border-[#22222a]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                        <h5 className="font-semibold text-white text-xs">4. Feedback &amp; Adaptation</h5>
                      </div>
                      <p className="text-zinc-400 mt-1 pl-4 text-[11px]">
                        Cognitively bounded progressive gatekeeper modal, discrepancy attribution badges, and reversible state rollback mechanism.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer ────────────────────────────────────────── */}
            <div className="p-4 border-t border-[#202028] bg-[#141419] flex items-center justify-between flex-shrink-0 text-xs">
              <span className="text-zinc-500 font-mono text-[11px]">
                University of Birmingham - Intelligent Interactive Systems
              </span>
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-[#1f1f27] hover:bg-[#282834] text-zinc-200 border border-[#2d2d3a] font-medium transition-colors"
              >
                Close Guide
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
