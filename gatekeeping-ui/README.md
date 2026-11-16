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

## 3. Interactive 3-Step Simulation Flow

The prototype guides the user through a realistic supervisory session across three distinct states:

* **Step 1: Pipeline Ready (Initialization):** A visual Directed Acyclic Graph (DAG) layout displaying the multi-step financial pipeline in standby mode.
* **Step 2: Autonomous Execution (The "Act" State):** Low-risk ingestion and modeling steps execute automatically with non-intrusive status pills, preserving efficiency without micromanagement.
* **Step 3: Gatekeeping Interruption (The "Ask" State):** At the Regulatory Compliance check, execution pauses. A frosted backdrop-blur modal appears, strictly adhering to the 4-chunk working memory limit:
  * **Chunk 1: Proposed Action badge** (Short Position on Asset X - £2.5M).
  * **Chunk 2: Inconsistency Warning badge** (Volatility feed divergence detected).
  * **Chunk 3: Clickable Source Snippet** previewing raw terminal feeds.
  * **Chunk 4: Reversal & Control Bar** (`[Approve Override]`, `[Edit Parameter]`, `[Rollback Step]`).

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

In accordance with module development guidelines, AI coding assistants (such as Antigravity / Cursor / Claude Code) were utilized to accelerate boilerplate scaffolding and Tailwind CSS styling adherence.

* **Prompt Example 1:** *"Refactor the static pipeline view into a 3-step state machine that pauses on step 3 and triggers a 4-chunk modal card."*  
  * **Verification & Modification:** The AI initially generated a standard multi-step form. Manually refactored the component structure to enforce the strict 4-chunk card layout and added Framer Motion blur-backdrop transitions to ensure compliance with Cowan (2001) cognitive load principles.
* **Prompt Example 2:** *"Build an n8n-inspired workflow overview directory and interactive full-screen node canvas with dark dot-grid styling."*  
  * **Verification & Modification:** Audited layout to ensure zero UI collision between telemetry drawer triggers and evaluator controls. Replaced all theoretical citation badges in the user-facing UI with production-grade operational metrics, keeping academic citations strictly in documentation to maintain ecological validity.
