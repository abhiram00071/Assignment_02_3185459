# Mitigating Automation Bias in Multi-Step Agentic Workflows: Chunked Mixed-Initiative Gatekeeping Interface

**Module:** Intelligent Interactive Systems (University of Birmingham)  
**Student ID:** 3185459  
**Project Phase:** Phase 2 Prototype & Implementation Report  
**Live Repository:** [https://github.com/abhiram00071/Assignment_02_3185459.git](https://github.com/abhiram00071/Assignment_02_3185459.git)

---

## 1. Project Overview & Research Motivation

As knowledge workers increasingly delegate multi-step analytical workflows (such as financial data extraction, synthesis, and trade execution) to autonomous Large Language Model (LLM) agents, a critical interaction breakdown emerges. While natural language prompting dramatically narrows Norman's (1986, 2013) Gulf of Execution, executing multi-stage inference loops behind opaque conversational summaries severely widens the Gulf of Evaluation.

Without granular observability, supervisors face an intractable dilemma: manually auditing exhaustive execution traces (violating working memory limits) or uncritically trusting fluent system outputs. This uncritical trust fosters automation bias and costly commission errors (Parasuraman & Riley, 1997; Skitka et al., 1999), eroding human agency (Haggard, 2017).

This project implements a **Chunked Mixed-Initiative Gatekeeping Interface** tailored for a quantitative finance and derivatives market analysis pipeline. It balances high computer automation with strict human supervisory control (Shneiderman, 2022) by dynamically pausing execution at high-risk junctures (*Ask* state) and presenting information strictly bounded by human working memory constraints.

---

## 2. Theoretical Grounding & Design Rationale

The interface design directly addresses three core interaction traps identified in Phase 1 literature:

* **The Telemetry Dump Trap:** Exhaustive trace logs overwhelm human working memory, which Cowan (2001) bounds to approximately four chunks. Our system enforces a strict $\le 4$ chunk layout on all supervisory checkpoints.
* **The Conversational Persuasion Trap:** Fluent natural language explanations foster an "illusion of explanatory depth" (He et al., 2025; Kim et al., 2025). We replace verbose text prose with verifiable source snippets and explicit inconsistency warning badges.
* **The Rigid Friction Trap:** Non-adaptive forcing functions cause severe alert fatigue and user aversion (Bo et al., 2025; Breznitz, 1984). Our system uses Horvitz's (1999) expected-cost threshold to *Act* autonomously on low-risk steps while pausing to *Ask* only when uncertainty or risk is high.

---

## 3. Interactive 4-Stage Supervisory Simulation Flow

The prototype guides the user through a realistic supervisory session across four pipeline stages and three mixed-initiative states (`Ready` -> `Act` -> `Ask` -> `Complete`):

* **Stage 1: Multi-Source Data Ingestion (*Act* State):** Autonomous ingestion of tick data across Bloomberg Terminal, Reuters Eikon, and internal Oracle DB without interrupting the operator.
* **Stage 2: Statistical Scenario Modeling (*Act* State):** Autonomous SABR volatility surface calibration and 50,000-path Monte Carlo stress simulations.
* **Stage 3: Regulatory Compliance Check (*Ask* State):** At the pre-trade compliance juncture, cross-feed divergence exceeds 10%, triggering an automatic execution freeze. A frosted-glass modal appears, strictly adhering to Cowan's (2001) $\le 4$ chunk working memory limit:
  * **Chunk 1: Proposed Action badge** (Short Position on FTSE 100 Dec Puts - £2.5M notional).
  * **Chunk 2: Inconsistency Warning badge** (+14.2% Volatility feed divergence detected).
  * **Chunk 3: Verifiable Telemetry Snippet** (Raw JSON excerpts contrasting Bloomberg BVOL vs. Internal Oracle).
  * **Chunk 4: Decision & Control Bar** (`[Approve]`, `[Edit Parameter]` slider, `[Rollback to Step 02]`).
* **Stage 4: Trade Execution / Report (Post-Gate *Act* State):** Upon supervisor authorization or parameter steering, executes FIX 4.4 order routing to LSE Turquoise and archives cryptographic audit logs.

---

## 4. System Architecture & Conceptual Spine Mapping

The architecture maps directly onto the module's 11-layer Conceptual Spine:

* **Sensing & Context:** Ingests live financial data feeds and market parameters across Bloomberg, Reuters, and internal Oracle sources.
* **Model & Planning:** Evaluates step criticality, calculates variance metrics, and flags discrepancies exceeding the Horvitz threshold (>10% divergence).
* **Tools & Action:** Renders the 4-chunk progressive disclosure gatekeeping modal and isolates human review to critical decision points.
* **Feedback & Adaptation:** Processes user overrides, parameter adjustments, or step rollbacks to update agent state and restore the supervisor's sense of agency (Haggard, 2017).

---

## 5. Technology Stack

* **Framework:** React 19+ (Vite Single Page Application)
* **Canvas Engine:** `@xyflow/react` (React Flow) for interactive DAG execution graphs
* **Styling & Theme:** Tailwind CSS configured with custom dark-mode variables matching modern workflow UI aesthetics (Obsidian palette, dot-grid canvas, subtle micro-interactions)
* **Icons:** `lucide-react`
* **Animations:** `framer-motion` for smooth modal transitions and node state pulses

---

## 6. Implementation Status (Implemented vs. Stubbed)

| Component / Feature | Implementation Status | Technical Notes |
| :--- | :--- | :--- |
| **Pipeline State Machine** | Fully Implemented | Manages step-by-step asynchronous execution (`Ready` -> `Act` -> `Ask`) and pause triggers. |
| **4-Chunk Gatekeeping Modal** | Fully Implemented | Enforces cognitive limits ($\le 4$ items) with action badges, discrepancy warnings, source text snippets, and override controls. |
| **Workflow Directory & Metrics** | Fully Implemented | n8n-inspired dark catalog with live operational metrics (`Runs`, `Pauses`, `Anomalies`, `Chunk Load`, `Override Rate`). |
| **Audit Drawer & Evaluator Bar** | Fully Implemented | Provides granular telemetry logs, seeded error toggles, and step-jump testing tools for evaluation. |
| **Examiner Walkthrough Drawer** | Fully Implemented | In-situ slide-over guide featuring a 3-minute test script, interaction trap taxonomy, and conceptual spine mapping. |
| **Live LLM Backend API** | Stubbed (Simulated JSON) | Uses pre-scripted agent traces with seeded errors to guarantee reproducible evaluation and zero latency jitter. |

---

## 7. Setup & Local Installation

To run the prototype locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/abhiram00071/Assignment_02_3185459.git

# 2. Navigate to project directory
cd Assignment_02_3185459/gatekeeping-ui

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173/` (or the port indicated in your terminal).

---

## 8. AI Assistance & Development Log

In accordance with module guidelines, an AI coding assistant (Google Antigravity / Gemini) was utilized as a directed technical accelerator. All research problem framing, cognitive design criteria, and architectural constraints originated from the student's Phase 1 literature review; the AI was strictly instructed to implement these specifications into React, Tailwind CSS, and Framer Motion.

### 8.1 Research-to-Prompt Translation & Audit Trail

| Focus Area | Literature Grounding | Prompt Instructions & Student Audit |
| :--- | :--- | :--- |
| **Mixed-Initiative Pipeline** | Horvitz (1999) *Act vs. Ask* | **Instruction:** Implement a 4-stage financial DAG executing autonomously in *Act* state, pausing dynamically at Step 03 when cross-feed variance exceeds 10%.<br>**Student Audit:** Adjusted state machine transitions to ensure the gatekeeper hold cannot be bypassed without explicit human action. |
| **Cognitive Gatekeeper Modal** | Cowan (2001) $\le 4$ Chunks;<br>Parasuraman & Riley (1997) | **Instruction:** Bound modal layout strictly to 4 semantic chunks (Action, Variance Badge, Raw Telemetry Snippet, Controls); ban conversational prose to prevent the Persuasion Trap.<br>**Student Audit:** Replaced binary approve/cancel buttons with continuous parameter sliders and state rollback (Shneiderman, 2022). |
| **Enterprise Canvas & Ticker** | Ecological Validity;<br>Endsley (1995) | **Instruction:** Build an n8n-inspired dark dashboard with live-simulated market tickers and operational telemetry metrics instead of static demo forms.<br>**Student Audit:** Stripped distracting visual glow/drop-shadows, enforced an obsidian theme, and added persistent mock-data disclaimers. |
| **Examiner Evaluation Guide** | IIS Marking Rubric | **Instruction:** Add an in-situ walkthrough drawer mapping the prototype directly to module rubrics (3-min test script, 3 traps, theory matrix, conceptual spine).<br>**Student Audit:** Corrected citation nuances, replaced AI-generated decorative purple accents with native obsidian styling, and optimized fitView canvas zoom. |

### 8.2 Academic Integrity & Contribution Matrix

* **Student Role (100% Ownership):** Problem formulation, theoretical grounding (Cowan, Horvitz, Norman, Parasuraman, Shneiderman), UI layout specifications, verification of all telemetry metrics/citations, and quality auditing.
* **AI Tool Role (Execution & Scaffolding):** Generating boilerplate React JSX, configuring Tailwind utility classes, scaffolding Framer Motion transitions, and implementing DOM event handlers under step-by-step instruction.
