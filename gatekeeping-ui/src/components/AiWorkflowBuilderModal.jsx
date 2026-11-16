import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  X,
  Bot,
  Shield,
  Layers,
  Cpu,
  Check,
  ArrowRight,
  Sliders,
  AlertCircle,
  HelpCircle,
  Wand2,
  Workflow,
  CheckCircle2,
} from 'lucide-react'

const TEMPLATE_PRESETS = [
  {
    id: 'quant-finance',
    name: 'Quantitative Derivatives & Volatility Calibration',
    domain: 'FINANCE / RISK',
    prompt:
      'Build a 4-step pipeline analyzing FTSE 100 derivatives, SABR volatility surfaces, and cross-checking MiFID II regulatory constraints with 4-chunk progressive gatekeeping.',
    gatekeeper: 'Stage 03 (Human Compliance Gate)',
    threshold: '10% Variance',
  },
  {
    id: 'fx-arbitrage',
    name: 'Algorithmic FX Arbitrage & Liquidity Gate',
    domain: 'FOREX / EXECUTION',
    prompt:
      'Construct a high-frequency triangular arbitrage pipeline monitoring GBP/USD, EUR/USD and EUR/GBP feeds with human circuit-breaker for illiquid market conditions.',
    gatekeeper: 'Stage 03 (Liquidity Slippage Gate)',
    threshold: '15bps Spread',
  },
  {
    id: 'cross-border',
    name: 'Cross-Border Capital Flows & Anti-Money Laundering',
    domain: 'COMPLIANCE / AML',
    prompt:
      'Orchestrate a multi-source transaction scanner cross-referencing SWIFT messaging against sanctions lists with mandatory 4-chunk supervisory sign-off.',
    gatekeeper: 'Stage 02 (Sanctions Dual-Key Gate)',
    threshold: 'Strict Rule Match',
  },
  {
    id: 'clinical-safety',
    name: 'Pharmacovigilance & Drug Interaction Scanner',
    domain: 'HEALTHCARE / BIO',
    prompt:
      'Ingest clinical trial adverse event streams and run molecular docking tests with human-in-the-loop safety gating before regulatory submission.',
    gatekeeper: 'Stage 03 (FDA 21 CFR Part 11)',
    threshold: 'Adverse Signal > 5%',
  },
]

export function AiWorkflowBuilderModal({ isOpen, onClose, onApplyWorkflow }) {
  const [prompt, setPrompt] = useState(TEMPLATE_PRESETS[0].prompt)
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_PRESETS[0].id)
  const [gatekeeperPolicy, setGatekeeperPolicy] = useState('balanced')
  const [chunkLimit, setChunkLimit] = useState('strict-4')
  const [aiModel, setAiModel] = useState('reasoning')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState('')

  if (!isOpen) return null

  const handleSelectTemplate = (preset) => {
    setSelectedTemplate(preset.id)
    setPrompt(preset.prompt)
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setGenerationStep('Deconstructing natural language objective...')

    setTimeout(() => {
      setGenerationStep('Synthesizing 4-stage Directed Acyclic Graph (DAG)...')
    }, 500)

    setTimeout(() => {
      setGenerationStep('Calibrating mixed-initiative gatekeeper thresholds...')
    }, 1000)

    setTimeout(() => {
      setGenerationStep('Applying strict 4-chunk supervisory boundaries...')
    }, 1500)

    setTimeout(() => {
      setIsGenerating(false)
      onApplyWorkflow({
        templateId: selectedTemplate,
        prompt,
        gatekeeperPolicy,
        chunkLimit,
        aiModel,
      })
      onClose()
    }, 1900)
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -16 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl bg-[#141418] border border-[#2b2b36] shadow-2xl overflow-hidden my-auto select-none"
      >
        {/* ── Modal Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181820] border-b border-[#262632]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-white">
                  Build Workflow with AI Copilot
                </h2>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Agentic Synthesis
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Specify pipeline intent and cognitive gatekeeping parameters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Modal Body ───────────────────────────────────── */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-130px)] overflow-y-auto">
          {/* Section 1: Natural Language Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Describe your desired workflow or pipeline objective</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">
                Natural Language Prompting
              </span>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="e.g. Build a 4-step pipeline analyzing derivatives volatility surfaces with human gatekeeper on anomalies..."
              className="w-full px-3.5 py-2.5 bg-[#0e0e12] border border-[#2b2b36] rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 font-sans leading-relaxed resize-none transition-colors"
            />

            {/* Quick Templates Presets */}
            <div className="mt-2.5">
              <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1.5">
                Or choose a validated template preset:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TEMPLATE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectTemplate(preset)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedTemplate === preset.id
                        ? 'bg-purple-500/10 border-purple-500/40 text-purple-200'
                        : 'bg-[#181820] border-[#262632] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-500">{preset.domain}</span>
                      {selectedTemplate === preset.id && (
                        <Check className="w-3 h-3 text-purple-400" />
                      )}
                    </div>
                    <div className="text-xs font-medium text-zinc-200 truncate">
                      {preset.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#22222a]" />

          {/* Section 2: Core Valid Configuration Options */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
              Agentic Configuration &amp; Interaction Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option 1: Mixed-Initiative Gatekeeper Policy */}
              <div className="p-3.5 rounded-xl bg-[#181820] border border-[#262632] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Gatekeeping Policy</span>
                  </span>
                  <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    Mixed-Initiative
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  Threshold determining when execution pauses for supervisory review.
                </p>

                <div className="space-y-1.5 pt-1">
                  {[
                    {
                      id: 'balanced',
                      label: 'Balanced (Pause on >10% variance)',
                      desc: 'Autonomously executes low-risk steps; halts on anomalies',
                    },
                    {
                      id: 'strict',
                      label: 'Strict Zero-Tolerance (Pause on all flags)',
                      desc: 'Halts on any parameter shift or metric divergence',
                    },
                    {
                      id: 'autonomous',
                      label: 'Autonomous (Log only, pause on capital cap)',
                      desc: 'Fastest throughput; pauses only on severe regulatory caps',
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer border transition-colors ${
                        gatekeeperPolicy === opt.id
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                          : 'bg-[#131318] border-[#22222a] text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gatekeeperPolicy"
                        value={opt.id}
                        checked={gatekeeperPolicy === opt.id}
                        onChange={() => setGatekeeperPolicy(opt.id)}
                        className="mt-0.5 text-amber-500 focus:ring-amber-500"
                      />
                      <div className="text-[11px]">
                        <div className="font-medium text-zinc-200">{opt.label}</div>
                        <div className="text-[10px] text-zinc-500">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Option 2: Cognitive Load Bounding */}
              <div className="p-3.5 rounded-xl bg-[#181820] border border-[#262632] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cognitive Chunk Limit</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Memory Cap
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  Bounds information presented during checkpoints to prevent overload.
                </p>

                <div className="space-y-1.5 pt-1">
                  {[
                    {
                      id: 'strict-4',
                      label: 'Strict Working Memory Limit (≤ 4 Chunks)',
                      desc: 'Action, Discrepancy, Source Snippet, Reversal Controls',
                    },
                    {
                      id: 'extended-6',
                      label: 'Extended Audit Card (6 Chunks)',
                      desc: 'Adds secondary Greeks breakdown and correlation feeds',
                    },
                    {
                      id: 'full-telemetry',
                      label: 'Exhaustive Trace Inspection',
                      desc: 'Full raw terminal logs (higher cognitive load)',
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer border transition-colors ${
                        chunkLimit === opt.id
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                          : 'bg-[#131318] border-[#22222a] text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="chunkLimit"
                        value={opt.id}
                        checked={chunkLimit === opt.id}
                        onChange={() => setChunkLimit(opt.id)}
                        className="mt-0.5 text-emerald-500 focus:ring-emerald-500"
                      />
                      <div className="text-[11px]">
                        <div className="font-medium text-zinc-200">{opt.label}</div>
                        <div className="text-[10px] text-zinc-500">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Option 3: Agentic Reasoning Model */}
            <div className="p-3.5 rounded-xl bg-[#181820] border border-[#262632] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs font-semibold text-zinc-200">
                    Inference &amp; Verification Model
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Engine powering pipeline generation and anomaly detection
                  </div>
                </div>
              </div>

              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="bg-[#111115] border border-[#2a2a36] text-xs font-mono text-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
              >
                <option value="reasoning">Claude 3.5 Sonnet / Deepseek-R1 (Quantitative)</option>
                <option value="verifier">Formal Verifier &amp; MiFID II Auditor Engine</option>
                <option value="speed">Gemini 1.5 Flash (Ultra-Low Latency Execution)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Modal Footer ─────────────────────────────────── */}
        <div className="px-6 py-4 bg-[#181820] border-t border-[#262632] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preserves human supervisory control and reversibility</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#202028] hover:bg-[#282834] text-zinc-300 text-xs font-semibold rounded-lg border border-[#2d2d3c] transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 sm:flex-none px-5 py-2 bg-gradient-to-r from-purple-600 to-[#ff5d44] hover:from-purple-500 hover:to-[#ff4e33] text-white text-xs font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{generationStep || 'Generating...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthesize Workflow with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
