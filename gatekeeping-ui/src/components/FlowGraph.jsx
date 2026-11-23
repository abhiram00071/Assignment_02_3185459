import React, { useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  useReactFlow,
  useViewport,
  ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { PipelineNode } from './PipelineNode'
import { StageExplainerNode } from './StageExplainerNode'
import { ArchitectureBannerNode } from './ArchitectureBannerNode'
import {
  Play,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertOctagon,
  Plus,
  Minus,
  StickyNote,
  Maximize2,
  Sliders,
  Terminal,
  Bot,
  HelpCircle,
} from 'lucide-react'

const nodeTypes = {
  pipelineNode: PipelineNode,
  explainerNode: StageExplainerNode,
  architectureBanner: ArchitectureBannerNode,
}

function FlowGraphInner({
  stages,
  stageStatuses,
  currentStage,
  flowState,
  onStart,
  onReset,
  onOpenAudit,
}) {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const { zoom } = useViewport()
  const [showExplainer, setShowExplainer] = useState(false)

  // Construct nodes from stage data positioned cleanly along the canvas center
  const nodes = useMemo(() => {
    const spacingX = 330
    const startX = 60
    const startY = showExplainer ? 190 : 160

    const pipelineNodes = stages.map((stage, idx) => ({
      id: `stage-${stage.id}`,
      type: 'pipelineNode',
      position: { x: startX + idx * spacingX, y: startY },
      data: {
        stage,
        index: idx,
        status: stageStatuses[idx],
        isCurrent: currentStage === idx,
      },
    }))

    if (!showExplainer) return pipelineNodes

    const bannerNode = {
      id: 'architecture-banner',
      type: 'architectureBanner',
      position: { x: startX, y: 15 },
      data: {},
      draggable: true,
      selectable: false,
    }

    const explainerNodes = stages.map((stage, idx) => ({
      id: `explainer-${stage.id}`,
      type: 'explainerNode',
      position: { x: startX + idx * spacingX, y: startY + 190 },
      data: {
        index: idx,
      },
      draggable: true,
      selectable: false,
    }))

    return [bannerNode, ...pipelineNodes, ...explainerNodes]
  }, [stages, stageStatuses, currentStage, showExplainer])

  // Construct directed edges with animated execution
  const edges = useMemo(() => {
    const isStep1Done = stageStatuses[0] === 'completed'
    const isStep2Running = stageStatuses[1] === 'running'
    const isStep2Done = stageStatuses[1] === 'completed'
    const isStep3Active = stageStatuses[2] === 'running' || stageStatuses[2] === 'paused'
    const isStep3Done = stageStatuses[2] === 'completed'
    const isStep4Active = stageStatuses[3] === 'running'

    const baseEdges = [
      {
        id: 'e1-2',
        source: 'stage-1',
        sourceHandle: 'right',
        target: 'stage-2',
        targetHandle: 'left',
        animated: isStep1Done || isStep2Running,
        style: {
          stroke: isStep1Done ? '#10b981' : isStep2Running ? '#10b981' : '#2c2c36',
          strokeWidth: isStep1Done || isStep2Running ? 2.5 : 1.5,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isStep1Done || isStep2Running ? '#10b981' : '#2c2c36',
          width: 14,
          height: 14,
        },
      },
      {
        id: 'e2-3',
        source: 'stage-2',
        sourceHandle: 'right',
        target: 'stage-3',
        targetHandle: 'left',
        animated: isStep2Done || isStep3Active,
        style: {
          stroke:
            stageStatuses[2] === 'paused'
              ? '#f43f5e'
              : isStep2Done
              ? '#10b981'
              : '#2c2c36',
          strokeWidth: isStep2Done || isStep3Active ? 2.5 : 1.5,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color:
            stageStatuses[2] === 'paused'
              ? '#f43f5e'
              : isStep2Done
              ? '#10b981'
              : '#2c2c36',
          width: 14,
          height: 14,
        },
      },
      {
        id: 'e3-4',
        source: 'stage-3',
        sourceHandle: 'right',
        target: 'stage-4',
        targetHandle: 'left',
        animated: isStep3Done || isStep4Active,
        style: {
          stroke: isStep3Done ? '#10b981' : '#2c2c36',
          strokeWidth: isStep3Done || isStep4Active ? 2.5 : 1.5,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isStep3Done ? '#10b981' : '#2c2c36',
          width: 14,
          height: 14,
        },
      },
    ]

    if (!showExplainer) return baseEdges

    const explainerEdges = stages.map((stage, idx) => ({
      id: `e-down-${stage.id}`,
      source: `stage-${stage.id}`,
      sourceHandle: 'bottom',
      target: `explainer-${stage.id}`,
      targetHandle: 'top',
      type: 'straight',
      animated: false,
      style: {
        stroke: idx === 2 ? '#92400e' : '#33333e',
        strokeDasharray: '3 3',
        strokeWidth: 1.5,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: idx === 2 ? '#b45309' : '#4b4b58',
        width: 10,
        height: 10,
      },
    }))

    return [...baseEdges, ...explainerEdges]
  }, [stageStatuses, stages, showExplainer])

  return (
    <div className="w-full h-full relative select-none">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: showExplainer ? 0.08 : 0.4, maxZoom: showExplainer ? 0.82 : 0.85 }}
        minZoom={0.2}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        {/* n8n style crisp dot grid */}
        <Background variant="dots" color="#353544" gap={20} size={1.2} />
      </ReactFlow>

      {/* ── Top-Left Floating State Badge & Flowchart Explainer Toggle ── */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141418] border border-[#222228] text-xs font-mono text-zinc-300">
          <span
            className={`w-2 h-2 rounded-full ${
              flowState === 'Act'
                ? 'bg-emerald-400'
                : flowState === 'Ask'
                ? 'bg-rose-400'
                : flowState === 'Complete'
                ? 'bg-emerald-400'
                : 'bg-zinc-500'
            }`}
          />
          <span>State: {flowState.toUpperCase()}</span>
        </div>

        <button
          onClick={() => {
            const next = !showExplainer
            setShowExplainer(next)
            setTimeout(() => {
              fitView({ padding: next ? 0.08 : 0.4, duration: 300 })
            }, 50)
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors active:scale-95 ${
            showExplainer
              ? 'bg-[#1b1928] border-indigo-500/40 text-indigo-300 hover:bg-[#232034]'
              : 'bg-[#141418] border-[#222228] text-zinc-400 hover:text-white hover:bg-[#1c1c22]'
          }`}
          title="Toggle Architecture & Node Flowchart Explanations"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>Flowchart Guide: {showExplainer ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* ── Right-Edge Floating Canvas Tools (n8n node tools) ─── */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={onStart}
          className="w-8 h-8 rounded-lg bg-[#141418] border border-[#262632] hover:bg-[#1d1d24] text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition-colors"
          title="Add node"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const next = !showExplainer
            setShowExplainer(next)
            setTimeout(() => {
              fitView({ padding: next ? 0.08 : 0.4, duration: 300 })
            }, 50)
          }}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
            showExplainer
              ? 'bg-[#1b1928] border-indigo-500/40 text-indigo-300'
              : 'bg-[#141418] border-[#262632] text-zinc-400 hover:text-zinc-200 hover:bg-[#1d1d24]'
          }`}
          title="Toggle Flowchart & Architecture Sticky Note"
        >
          <StickyNote className="w-4 h-4" />
        </button>
        <button
          onClick={() => fitView({ padding: showExplainer ? 0.08 : 0.4, maxZoom: 0.82, duration: 300 })}
          className="w-8 h-8 rounded-lg bg-[#141418] border border-[#262632] hover:bg-[#1d1d24] text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition-colors"
          title="Fit view"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Bottom-Left Canvas Navigation Controls ───────────── */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center bg-[#141418] border border-[#222228] rounded-lg px-2 py-1 gap-1.5 select-none">
        <button
          onClick={() => fitView({ padding: showExplainer ? 0.08 : 0.4, maxZoom: 0.82, duration: 250 })}
          className="px-2 py-0.5 rounded text-xs font-mono text-zinc-300 hover:text-white hover:bg-[#202028] transition-colors flex items-center justify-center min-w-[46px]"
          title="Reset Zoom to Fit"
        >
          {Math.round(zoom * 100)}%
        </button>
        <div className="w-px h-3.5 bg-[#2d2d38] mx-0.5" />
        <button
          onClick={() => zoomIn({ duration: 200 })}
          className="w-6 h-6 rounded text-zinc-400 hover:text-white hover:bg-[#202028] flex items-center justify-center transition-colors active:scale-90"
          title="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => zoomOut({ duration: 200 })}
          className="w-6 h-6 rounded text-zinc-400 hover:text-white hover:bg-[#202028] flex items-center justify-center transition-colors active:scale-90"
          title="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Bottom-Center Floating Execution Action Bar (n8n signature) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {flowState === 'Ready' && (
          <>
            <button
              type="button"
              className="px-4 py-2.5 bg-[#17171e] hover:bg-[#20202a] text-zinc-200 border border-[#2b2b38] hover:border-purple-500/50 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all group cursor-default select-none"
              title="AI Workflow Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span>Build with AI</span>
            </button>

            <button
              onClick={onStart}
              className="px-5 py-2.5 bg-[#ff5d44] hover:bg-[#ff4e33] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute workflow</span>
            </button>
          </>
        )}

        {flowState === 'Act' && (
          <div className="px-5 py-2.5 bg-[#141418] border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-2.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            <span>Executing steps autonomously...</span>
          </div>
        )}

        {flowState === 'Ask' && (
          <div className="px-5 py-2.5 bg-[#141418] border border-rose-500/40 text-rose-300 text-xs font-semibold rounded-lg flex items-center gap-2.5">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Paused at Step 3 for human review</span>
          </div>
        )}

        {flowState === 'Complete' && (
          <div className="flex items-center gap-2 bg-[#141418] border border-emerald-500/40 p-1.5 rounded-lg">
            <div className="px-3 py-1 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Execution Complete</span>
            </div>
            <button
              onClick={onReset}
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-md border border-zinc-700 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom-Right Execution Logs Bar (n8n Logs Toggle) ── */}
      <div className="absolute bottom-4 right-20 z-20">
        <button
          onClick={onOpenAudit}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#141418] border border-[#222228] hover:border-zinc-700 rounded-lg text-xs font-mono text-zinc-300 hover:text-white transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span>Logs &amp; Telemetry</span>
        </button>
      </div>
    </div>
  )
}

export function FlowGraph(props) {
  return (
    <ReactFlowProvider>
      <FlowGraphInner {...props} />
    </ReactFlowProvider>
  )
}
