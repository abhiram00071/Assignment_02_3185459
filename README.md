# Assignment_02_3185459
Interactive prototype of a chunked mixed-initiative gatekeeping interface for multi-step agentic workflows. Built to mitigate automation bias and cognitive overload in analytical pipelines (IIS Assignment 2).

# Mitigating Automation Bias in Multi-Step Agentic Workflows: A Chunked Mixed-Initiative Interface

**Module:** Intelligent Interactive Systems (IIS) — Assignment 2  
**Student ID:** 3185459  
**README Word Count:** 245 words  

---

## 1. Project Overview
This repository contains the prototype and implementation artifacts for **Assignment 2**, transitioning the theoretical literature review (Phase 1) into a functional interactive prototype. The system implements a **Chunked Mixed-Initiative Gatekeeping Interface** designed for knowledge workers supervising sequential agentic workflows (such as derivatives market data analysis and synthesis pipelines). 

By replacing opaque conversational summaries and exhaustive telemetry dumps with progress-disclosed, 4-chunk supervisory cards, the system bridges the Gulf of Evaluation, counteracts the *ELIZA effect* (Weizenbaum, 1966), and mitigates automation bias (Parasuraman & Riley, 1997; Skitka et al., 1999) without triggering alert fatigue (Breznitz, 1984; Bo et al., 2025).

---

## 2. Technology Stack
* **Frontend:** React, Tailwind CSS, Lucide Icons
* **State Management:** React Hooks (Local State Machine for Multi-Step Execution States)
* **Design Principles:** Cowan’s (2001) 4-chunk limit, Horvitz’s (1999) Act/Ask/Wait protocols, and Shneiderman’s (2022) 2D High-Control / High-Automation framework.

---

## 3. Implemented vs. Stubbed Features
* **[Implemented]** The interactive multi-step dashboard UI and dark-mode layout.
* **[Implemented]** The 4-chunk progressive disclosure gatekeeping card (Action, Inconsistency Badge, Source Snippet, and Reversibility Controls).
* **[Simulated / Stubbed]** Pre-scripted agent execution traces containing seeded logic errors and financial metric discrepancies (Kim et al., 2025) to test human override behaviors reliably.
* **[Implemented]** Step-level rollback and parameter editing controls preserving human agency (Haggard, 2017).

---

## 4. Local Setup and Execution
To run and inspect the prototype locally:

```bash
# Clone the repository
git clone https://github.com/abhiram00071/Assignment_02_3185459.git
# Navigate to the project directory
cd your-repo-name

# Install dependencies
npm install

# Run the development server
npm run dev
