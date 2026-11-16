/* ── Agent Pipeline State Machine ────────────────────────────────
   Manages the 3-step mixed-initiative flow:
   - 'Ready' (Standby)
   - 'Act'   (Autonomous execution of stages 1 & 2)
   - 'Ask'   (Gatekeeping pause at stage 3 with 4-chunk modal)
────────────────────────────────────────────────────────────────── */

export const STAGES = [
  {
    id: 1,
    key: 'data-ingestion',
    title: 'Multi-Source Data Ingestion',
    subtitle: 'Extracting feeds from Bloomberg Terminal, Reuters Eikon, and internal Oracle',
    risk: 'low',
    gatekeeping: 'act',
    duration: 2600,
    details: {
      sources: ['Bloomberg Terminal L2', 'Reuters Eikon API', 'Internal Oracle DB'],
      records: '2.4M tick records',
      assets: ['FTSE 100 Derivatives', 'EUR/GBP Spot', 'Gilt Futures'],
      confidence: 0.97,
    },
    auditEntries: [
      { timestamp: '16:42:01.204', action: 'Connected to Bloomberg B-PIPE', confidence: 0.99, level: 'info' },
      { timestamp: '16:42:01.891', action: 'Reuters Eikon session established', confidence: 0.98, level: 'info' },
      { timestamp: '16:42:02.445', action: 'Oracle DB query: derivatives_positions_v3', confidence: 0.96, level: 'info' },
      { timestamp: '16:42:03.112', action: 'Tick data normalised: 2.4M records across 3 asset classes', confidence: 0.97, level: 'success' },
    ],
  },
  {
    id: 2,
    key: 'scenario-modeling',
    title: 'Statistical Scenario Modeling',
    subtitle: 'Volatility calibration via SABR model with Monte Carlo simulation',
    risk: 'low',
    gatekeeping: 'act',
    duration: 2800,
    details: {
      model: 'SABR + Heston Hybrid',
      simulations: '50,000 Monte Carlo paths',
      volSurface: 'ATM IV: 18.7%, 25D RR: -2.1%, 25D BF: 0.8%',
      confidence: 0.94,
    },
    auditEntries: [
      { timestamp: '16:42:06.501', action: 'SABR calibration initiated (alpha=0.3, beta=0.5, rho=-0.25, nu=0.4)', confidence: 0.94, level: 'info' },
      { timestamp: '16:42:07.223', action: 'Heston parameters: kappa=2.0, theta=0.04, sigma=0.3, v0=0.04', confidence: 0.93, level: 'info' },
      { timestamp: '16:42:08.891', action: 'Monte Carlo: 50K paths x 252 steps, antithetic variates enabled', confidence: 0.95, level: 'info' },
      { timestamp: '16:42:11.045', action: 'Vol surface constructed: smile skew detected at 25-delta', confidence: 0.91, level: 'warning' },
      { timestamp: '16:42:11.502', action: 'Scenario matrix: 12 stress scenarios generated', confidence: 0.94, level: 'success' },
    ],
  },
  {
    id: 3,
    key: 'compliance-check',
    title: 'Regulatory Compliance Check',
    subtitle: 'Cross-referencing risk thresholds against MiFID II and internal mandates',
    risk: 'high',
    gatekeeping: 'ask',
    duration: null,
    details: {
      proposedAction: 'Short Position on FTSE 100 Dec Puts',
      notional: '2,500,000',
      currency: 'GBP',
      discrepancy: {
        type: 'Volatility Feed Divergence',
        magnitude: '+14.2%',
        sourceA: { name: 'Bloomberg BVOL', value: '18.7%' },
        sourceB: { name: 'Internal Oracle', value: '21.4%' },
        reference: 'Pre-Trade Risk Protocol - Multi-Feed Volatility Divergence Control',
      },
      riskMetrics: {
        var95: '187,500',
        var99: '312,000',
        maxDrawdown: '7.2%',
        sharpeRatio: '1.34',
      },
      rawSnippet: `{
  "feed": "BVOL_INDEX",
  "timestamp": "2026-11-16T16:42:08.891Z",
  "atm_iv": 0.187,
  "skew_25d": -0.021,
  "butterfly_25d": 0.008,
  "status": "VALIDATED",
  "checksum": "a3f9c7e2"
}

// CONFLICT: Internal Oracle Feed
{
  "feed": "ORACLE_VOL_SURFACE_V3",
  "timestamp": "2026-11-16T16:42:09.102Z",
  "atm_iv": 0.214,
  "skew_25d": -0.018,
  "butterfly_25d": 0.011,
  "status": "PENDING_REVIEW",
  "checksum": "b7d1e4f8"
}`,
      complianceFlags: [
        'MiFID II Article 17: Algorithmic trading risk controls',
        'Internal Mandate: Max single-name notional GBP 3M',
        'EMIR Margin: Initial margin impact under SIMM 2.6',
      ],
    },
    auditEntries: [
      { timestamp: '16:42:14.201', action: 'MiFID II pre-trade check initiated', confidence: 0.92, level: 'info' },
      { timestamp: '16:42:14.890', action: 'ALERT: Volatility divergence detected between feeds', confidence: 0.61, level: 'error' },
      { timestamp: '16:42:15.102', action: 'Bloomberg BVOL: ATM IV 18.7% vs Oracle: ATM IV 21.4%', confidence: 0.58, level: 'error' },
      { timestamp: '16:42:15.445', action: 'Discrepancy exceeds 10% threshold - gatekeeping triggered', confidence: 0.55, level: 'error' },
      { timestamp: '16:42:15.501', action: 'Agent execution PAUSED - awaiting human decision', confidence: null, level: 'warning' },
    ],
  },
  {
    id: 4,
    key: 'execution',
    title: 'Trade Execution / Report',
    subtitle: 'FIX protocol submission to venue with post-trade compliance reporting',
    risk: 'high',
    gatekeeping: 'wait',
    duration: 2200,
    details: {
      venue: 'LSE Turquoise',
      protocol: 'FIX 4.4',
      reportType: 'MiFID II Transaction Report (RTS 25)',
      confidence: 0.96,
    },
    auditEntries: [
      { timestamp: '16:42:22.101', action: 'Human decision received: parameter override applied', confidence: 0.99, level: 'info' },
      { timestamp: '16:42:22.445', action: 'Recalibrating with adjusted volatility input: 20.1%', confidence: 0.95, level: 'info' },
      { timestamp: '16:42:23.201', action: 'FIX 4.4 session established with LSE Turquoise', confidence: 0.97, level: 'info' },
      { timestamp: '16:42:23.890', action: 'Order submitted: SELL 250 FTSE Dec Puts @ 145.20', confidence: 0.96, level: 'success' },
      { timestamp: '16:42:24.502', action: 'Post-trade report generated: RTS 25 compliant', confidence: 0.98, level: 'success' },
    ],
  },
]

export const INITIAL_STATE = {
  flowState: 'Ready', // 'Ready' | 'Act' | 'Ask' | 'Complete'
  currentStage: 0,
  stageStatuses: ['idle', 'idle', 'idle', 'idle'],
  isPaused: false,
  isRunning: false,
  hallucinationMode: false,
  mixedInitiativeMode: true,
  gatekeepingDecision: null,
  overrideValue: null,
  auditLog: [],
  workingMemoryChunks: 0,
}

export function pipelineReducer(state, action) {
  switch (action.type) {
    case 'START_PIPELINE':
      return {
        ...state,
        flowState: 'Act',
        isRunning: true,
        currentStage: 0,
        stageStatuses: ['running', 'idle', 'idle', 'idle'],
        isPaused: false,
        gatekeepingDecision: null,
        overrideValue: null,
        auditLog: [],
        workingMemoryChunks: 0,
      }

    case 'COMPLETE_STAGE': {
      const newStatuses = [...state.stageStatuses]
      newStatuses[action.stageIndex] = 'completed'
      const nextStage = action.stageIndex + 1

      if (nextStage < 4) {
        const nextStageData = STAGES[nextStage]
        // Gatekeeping Point at Stage 3
        if (nextStageData.gatekeeping === 'ask' && state.mixedInitiativeMode) {
          newStatuses[nextStage] = 'paused'
          return {
            ...state,
            flowState: 'Ask',
            currentStage: nextStage,
            stageStatuses: newStatuses,
            isPaused: true,
            workingMemoryChunks: 4,
            auditLog: [
              ...state.auditLog,
              ...STAGES[action.stageIndex].auditEntries,
              ...nextStageData.auditEntries,
            ],
          }
        }

        newStatuses[nextStage] = 'running'
        return {
          ...state,
          flowState: 'Act',
          currentStage: nextStage,
          stageStatuses: newStatuses,
          auditLog: [
            ...state.auditLog,
            ...STAGES[action.stageIndex].auditEntries,
          ],
        }
      }

      return {
        ...state,
        flowState: 'Complete',
        currentStage: nextStage,
        stageStatuses: newStatuses,
        isRunning: false,
        auditLog: [
          ...state.auditLog,
          ...STAGES[action.stageIndex].auditEntries,
        ],
      }
    }

    case 'APPROVE_GATE': {
      const newStatuses = [...state.stageStatuses]
      newStatuses[state.currentStage] = 'completed'
      if (state.currentStage + 1 < 4) {
        newStatuses[state.currentStage + 1] = 'running'
      }
      return {
        ...state,
        flowState: 'Act',
        isPaused: false,
        gatekeepingDecision: 'approved',
        stageStatuses: newStatuses,
        currentStage: state.currentStage + 1,
        workingMemoryChunks: 0,
      }
    }

    case 'OVERRIDE_GATE': {
      const newStatuses = [...state.stageStatuses]
      newStatuses[state.currentStage] = 'completed'
      if (state.currentStage + 1 < 4) {
        newStatuses[state.currentStage + 1] = 'running'
      }
      return {
        ...state,
        flowState: 'Act',
        isPaused: false,
        gatekeepingDecision: 'overridden',
        overrideValue: action.value,
        stageStatuses: newStatuses,
        currentStage: state.currentStage + 1,
        workingMemoryChunks: 0,
      }
    }

    case 'ROLLBACK_GATE': {
      const prevStage = 1 // Step 2 (Statistical Scenario Modeling)
      const newStatuses = ['completed', 'running', 'idle', 'idle']
      return {
        ...state,
        flowState: 'Act',
        isPaused: false,
        gatekeepingDecision: 'rolledback',
        currentStage: prevStage,
        stageStatuses: newStatuses,
        workingMemoryChunks: 0,
        auditLog: [
          ...state.auditLog,
          {
            timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            action: 'ROLLBACK: Reverted from Step 3 (Compliance Check) to Step 2 (Scenario Modeling)',
            confidence: null,
            level: 'warning',
          },
        ],
      }
    }

    case 'TOGGLE_HALLUCINATION':
      return { ...state, hallucinationMode: !state.hallucinationMode }

    case 'TOGGLE_INITIATIVE_MODE':
      return { ...state, mixedInitiativeMode: !state.mixedInitiativeMode }

    case 'RESET':
      return { ...INITIAL_STATE }

    case 'ADD_AUDIT_ENTRY':
      return {
        ...state,
        auditLog: [...state.auditLog, action.entry],
      }

    case 'FORCE_HALLUCINATION_PAUSE': {
      const newStatuses = [...state.stageStatuses]
      newStatuses[state.currentStage] = 'paused'
      return {
        ...state,
        flowState: 'Ask',
        isPaused: true,
        workingMemoryChunks: 4,
        stageStatuses: newStatuses,
        auditLog: [
          ...state.auditLog,
          {
            timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
            action: 'HALLUCINATION DETECTED: Agent confidence dropped below safety threshold',
            confidence: 0.23,
            level: 'error',
          },
        ],
      }
    }

    default:
      return state
  }
}
