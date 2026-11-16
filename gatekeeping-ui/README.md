# Chunked Mixed-Initiative Gatekeeping Platform (n8n-Inspired Architecture)

A production-grade interactive prototype for mitigating automation bias in multi-step agentic workflows, built for the University of Birmingham Intelligent Interactive Systems module (Assignment 2).

## Application Architecture

The platform features a cohesive two-tiered **n8n dark-mode aesthetic** across both the catalog and the execution canvas:

### 1. Workflow Directory Landing Page (`/`)
* **Left Navigation Rail:** Persistent icon rail with Create (`+`), Home / Workflows, User / Credentials, Help, Settings, and User Avatar (`AB`). Fitted to `h-[100dvh]` with zero scrolling.
* **Overview Header:** Clean title with `Create workflow ▾` split button.
* **5-Column Operational Metrics Strip:**
  1. `Pipeline runs`: **24** (*All monitored pipelines*)
  2. `Gatekeeper pauses`: **18** (*Human review triggered*)
  3. `Anomalies caught`: **7** (*Feed variance >10%*)
  4. `Max chunk load`: **4** (*Bounded modal layout*)
  5. `Override & rollback`: **29.2%** (*Human intervention rate*)
* **Workflows List:** Real-time search, sorting, and interactive workflow rows with active/inactive toggles.
* **Interactive Launch:** Clicking **Quantitative Derivatives & Volatility Calibration** opens the canvas studio.

---

### 2. Workflow Canvas Studio (`/#pipeline`)
Directly inspired by n8n's canvas editor while purpose-built for our multi-step agentic gatekeeping pipeline:

* **Top Canvas Header:**
  * Breadcrumbs: `< Workflows / 👤 Personal / Quantitative Derivatives & Volatility Calibration`
  * Tag: `Stage 03 Gatekeeper`
  * Segmented Mode Switcher: `[ Editor ]` / `[ Executions ]`
  * Operational Controls: `Active / Inactive` toggle, `Share`, `Saved` indicator, and options menu.
* **Full-Screen Dot Grid Canvas:**
  * React Flow canvas taking 100% of the viewport height with n8n dark dot background (`#23232b`).
  * 4 pipeline nodes arranged left to right:
    1. `Multi-Source Data Ingestion` (Mode: Act)
    2. `Statistical Scenario Modeling` (Mode: Act)
    3. `Regulatory Compliance Check` (Mode: Ask / Gatekeeper)
    4. `Trade Execution / Report` (Mode: Wait)
  * Nodes can be freely dragged, panned, and zoomed.
* **Floating Controls & Tools:**
  * **Bottom Center Action Bar:** Floating n8n coral button `[ ⚗ Execute workflow ]` to initiate autonomous execution.
  * **Bottom Left:** Zoom in (`+`), zoom out (`-`), and `100%` / fit-view reset buttons.
  * **Right Edge:** Floating quick actions (`+ Add node`, `Sticky note`, `Fit view`).
  * **Bottom Right:** `Logs & Telemetry` button opening the execution trace drawer.

---

### 3. Progressive Disclosure Gatekeeping Modal
When execution reaches Step 3 (`Regulatory Compliance Check`):
* The entire canvas is dimmed with a dark `backdrop-blur-md` overlay.
* A centered modal card appears with obsidian styling and strictly **4 informational chunks**:
  1. **Chunk 1:** Proposed Action (Short Position on FTSE 100 Dec Puts | £2.5M Notional).
  2. **Chunk 2:** Red Inconsistency Warning Badge (+14.2% divergence between Bloomberg and internal Oracle).
  3. **Chunk 3:** Read-Only Source Text Snippet Box (formatted raw JSON telemetry with checksums).
  4. **Chunk 4:** Supervisory Control Bar with **'Approve'**, **'Edit Parameter'**, and **'Rollback'** actions.
* Keyboard accessible (<kbd>Enter</kbd> to Approve, <kbd>Esc</kbd> to Rollback).

---

## Tech Stack & Design System Compliance

* **Framework:** React 19 + Vite
* **Graph Canvas:** `@xyflow/react` (React Flow)
* **Styling:** Tailwind CSS v4 + n8n dark theme tokens (`#0e0e11`, `#141418`, `#222228`, `#ff5d44` coral accent).
* **Typography:** Geist Sans + Geist Mono.
* **AI Tells Prohibited:** Strict 0 em-dashes (`—`) throughout the codebase.

---

## Running the Application

```bash
npm install
npm run dev
```

Open [http://localhost:5174/](http://localhost:5174/) (or [http://localhost:5173/](http://localhost:5173/)) in your browser.
