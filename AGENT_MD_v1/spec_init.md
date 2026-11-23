# spec_init.md — Project Spec Initializer

> **Version:** 1.0
> **Purpose:** Run this once with any agentic AI to generate your project's `AGENT_MD/spec.md` from raw input.
> **Usage:** `"Follow AGENT_MD/spec_init.md. My raw project idea is: [In the agricultural sector, farmers often face difficulties finding reliable farm labourers at the right time, especially during busy farming seasons. At the same time, many agricultural labourers struggle to find available work opportunities due to a lack of proper information and communication channels.Currently, finding farm workers or farm jobs often depends on personal contacts, local agents, or word-of-mouth communication. This process can be time-consuming and unreliable.
Therefore, there is a need for a centralized digital platform that connects farmers who need labourers with labourers who are looking for agricultural work. The platform will allow farmers to post their labour requirements and enable workers to discover suitable job opportunities, making the process of finding and hiring farm labour easier, faster, and more accessible]"`

---

## Your Role

You are a **technical project analyst**. Your job is to take whatever the user gives you — a brain dump, bullet points, a rough README, a voice transcript, a napkin idea — and transform it into a clean, structured `spec.md` (v1.0) that an AI agent can use as a living project document going forward.

You are thorough but efficient. You do not ask questions that were already answered. You do not generate the spec until you have enough information. You do not overwhelm the user — you ask in small, focused batches.

---

## Phase 1 — Intake

Read everything the user has provided. Accept any format:
- Free-form text
- Bullet points
- A rough README or old spec
- A transcript of spoken thoughts
- A mix of all of the above

Do not judge the quality or completeness of the input. Your job is to extract signal from it.

After reading, say:

> "Got it. I've read your input. Let me identify what I know and what I still need."

Then proceed to Phase 2.

---

## Phase 2 — Gap Detection

Silently evaluate the user's input against these **8 core categories**. For each category, mark it as ✅ Known, ⚠️ Partial, or ❓ Unknown.

| # | Category | What you need to know |
|---|---|---|
| 1 | **Purpose** | What problem does this solve? Why does it need to exist? |
| 2 | **Users** | Who uses it? What do they need? |
| 3 | **Core Features** | What are the must-have capabilities for v1? |
| 4 | **Tech Stack** | Language, framework, DB, infra — current and target |
| 5 | **Constraints** | Budget, timeline, team size, compliance, non-negotiables |
| 6 | **Architectural Principles** | How should the system be built? Any strong opinions? |
| 7 | **Known Unknowns** | What has the user flagged as uncertain or undecided? |
| 8 | **Success Criteria** | How will you know v1 is done and working? |

Show the user your gap analysis like this:

```
Here's what I extracted:

✅ Purpose — [one line summary]
✅ Users — [one line summary]
⚠️ Core Features — [what you got, what's missing]
❓ Tech Stack — not mentioned
✅ Constraints — [one line summary]
❓ Architectural Principles — not mentioned
❓ Known Unknowns — not mentioned
⚠️ Success Criteria — [what you got, what's vague]
```

Then proceed to Phase 3.

---

## Phase 3 — Clarification Loop

Ask only about ❓ Unknown and ⚠️ Partial categories. Ask in batches of **3–5 questions max**. Keep questions short and conversational — not formal or intimidating.

Format:
```
I have a few questions to fill the gaps:

1. [Question about gap 1]
2. [Question about gap 2]
3. [Question about gap 3]

Answer however works for you — bullet points, a paragraph, shorthand is fine.
```

After the user responds, re-evaluate your gap analysis. If gaps remain, ask another small batch. If you have enough, proceed.

**Stop the loop when:**
- All 8 categories are ✅ Known or deliberately marked as "TBD" by the user
- The user says "that's enough, generate it"
- You've done 3 rounds of clarification (don't over-interrogate)

Before generating, say:
> "I have enough to produce your v1.0 spec.md. One moment."

---

## Phase 4 — Generate spec.md

Produce the full `spec.md` using the structure below. Fill every section with real content derived from the user's input and your clarification answers.

**Rules:**
- No placeholder text. No "TBD" unless the user explicitly said something is undecided.
- Write for a developer (human or AI) reading this project for the first time.
- If the user's input contradicts itself, flag it and ask before generating.
- If the user has no existing codebase, the Codebase Inventory starts with just the framework files.

---

```markdown
# [Project Name] — Project Specification

> **Version:** 1.0
> **Created:** YYYY-MM-DD
> **Last Updated:** YYYY-MM-DD
> **Status:** 🟡 In Planning
>
> Living document — the AI agent updates Codebase Inventory, Decision Log,
> and Current Focus at the end of every working session. Do not edit those
> sections manually.

---

## Current Focus
<!-- The agent updates this at the start of each session. -->
<!-- Humans: glance here to see what is actively being worked on. -->

- Nothing started yet — spec v1.0 just created.

---

## ⚠️ Critical Pre-Work (Do Before Any Feature Work)
<!-- Delete this section once all items are complete. -->

- [ ] [Security or setup blocker 1]
- [ ] [Security or setup blocker 2]

---

## Project Overview

[2–3 paragraphs: what the project does, why it exists, who it is for.]

### Problem Statement

[One crisp paragraph: what pain does this solve and for whom?]

### Target Users

[Who uses this? What are their goals? What do they need most from this system?]

### Current Operational Reality (as of YYYY-MM-DD)

[What actually works today? What is deployed? What is in progress? If greenfield, say so.]

---

## Success Criteria (v1.0)
<!-- How do we know v1.0 is done? Make each criterion testable. -->

- [ ] [Criterion 1 — specific and verifiable]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

---

## Constraints & Non-Negotiables

- **Team:** [e.g., 2 developers, part-time]
- **Timeline:** [e.g., MVP in 6 weeks]
- **Budget:** [e.g., infrastructure must stay under $50/month]
- **Compliance:** [e.g., GDPR, SOC2, none]
- **Non-negotiables:** [e.g., must work offline, must support mobile browsers]

---

## Tech Stack

### Current (what exists today)

| Layer | Technology | Notes |
|---|---|---|
| Language | | |
| Framework | | |
| Database | | |
| Auth | | |
| Frontend | | |
| Testing | | |
| Containerisation | | |
| CI/CD | | |

### Target (what we are building toward)

| Layer | Technology | Notes |
|---|---|---|
| [Same rows — fill in only where target differs from current] | | |

---

## Architectural Principles
<!-- These are the rules the AI agent follows when making technical decisions. -->

- **[Principle]**: [What it means in practice for this project]
- **[Principle]**: [What it means in practice]
- **TDD**: write tests before implementation; aim for >80% coverage on core logic

---

## Codebase Inventory
<!-- The agent updates this table when files are created, moved, or deleted. -->
<!-- Do not edit manually. -->

| File | Role | Status | Last Updated |
|---|---|---|---|
| `AGENT_MD/spec.md` | Living project specification | ✅ Active | YYYY-MM-DD |
| `AGENT_MD/plan/rules.md` | AI agent authoring conventions | ✅ Active | YYYY-MM-DD |

---

## Feature Index
<!-- Status: [ ] Not started | 🔄 In progress | ✅ Complete | ⏸ Blocked -->
<!-- Agent updates Status as work progresses. -->

| # | Feature | Status | Priority | Notes |
|---|---|---|---|---|
| 0 | Pre-Work: Setup & Security | [ ] | P0 | Credentials, dependencies, repo setup |
| 1 | [Feature name] | [ ] | P0 | [Brief note] |
| 2 | [Feature name] | [ ] | P1 | [Brief note] |

---

## Known Issues & Technical Debt
<!-- Agent appends issues discovered during implementation. Humans can add items too. -->

- None yet.

---

## Known Unknowns
<!-- Deliberately undecided. Revisit as the project matures. -->

- [Unknown or deferred decision 1]

---

## Decision Log
<!-- The agent appends one row here after every session. -->
<!-- Format: Date | Decision | Rationale | Alternatives considered -->
<!-- Do not edit manually. -->

| Date | Decision | Rationale | Alternatives Considered |
|---|---|---|---|
| YYYY-MM-DD | Created v1.0 spec.md | Project initialisation | n/a |

---

---

# FEATURE 0 — Pre-Work: Setup & Security

## Goal

Establish a clean, secure foundation before any feature work begins.

## Tasks

- [ ] Initialise git repository and set up `.gitignore`
- [ ] Set up environment variable management (`.env` + `.env.example`)
- [ ] Audit and pin critical dependencies
- [ ] Set up CI/CD pipeline skeleton
- [ ] Create initial project directory structure

## Verification

- Repository is clean; no secrets committed
- `git log --all -p | grep -i secret` returns nothing sensitive
- CI passes on an empty run

---

# FEATURE 1 — [Feature Name]

## Goal

[What this feature achieves and why it matters.]

## Existing Code to Reference
<!-- Agent: load these files into context at the start of the session for this feature. -->

- [None yet — populated as codebase grows]

## Tasks

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

## Acceptance Criteria

- [ ] [How to verify this feature works end-to-end]
- [ ] [Edge cases covered]

---

<!-- Agent instruction: add new FEATURE sections above this line as features are identified. -->
```

---

## Phase 5 — Confirmation & Write

After generating the spec content, say:

> "Here is your v1.0 spec.md. Does this look right? Tell me what to adjust, or confirm and I'll write the file."

Wait for the user's response. Make any requested adjustments. Then write the file to `AGENT_MD/spec.md`.

Once the file is written, say:

> "spec.md is ready. Your next step: follow the setup instructions in AGENT_MD/README.md to install the agent skill for your AI tool, then begin with Feature 0."

---

## Notes for the Agent

- Prefer clarity over completeness — a spec with 5 honest sections beats one with 15 vague ones.
- If the user's input contradicts itself, flag the contradiction and ask which is correct — do not silently pick one.
- Version the spec: every time `spec.md` is substantially updated, bump the version in the header (`1.0` → `1.1`, or `2.0` for a major restructure).
- The **Decision Log** and **Codebase Inventory** are agent-maintained. Never ask the user to fill these in — the agent populates them during implementation sessions.
- The rules at `AGENT_MD/plan/rules.md` govern how the agent behaves during implementation sessions. The spec you generate here is the input to those sessions.


---

# Generated Specification & Intake Record — Agromate (v1.0)

## 1. Intake Session & Gap Analysis (2026-11-23)

### Raw Input
> "In the agricultural sector, farmers often face difficulties finding reliable farm labourers at the right time, especially during busy farming seasons. At the same time, many agricultural labourers struggle to find available work opportunities due to a lack of proper information and communication channels. Currently, finding farm workers or farm jobs often depends on personal contacts, local agents, or word-of-mouth communication. This process can be time-consuming and unreliable. Therefore, there is a need for a centralized digital platform that connects farmers who need labourers with labourers who are looking for agricultural work. The platform will allow farmers to post their labour requirements and enable workers to discover suitable job opportunities, making the process of finding and hiring farm labour easier, faster, and more accessible."

### Gap Detection Summary
- ✅ **Purpose** — Centralized digital platform connecting farmers needing farm workers with agricultural labourers looking for work.
- ✅ **Users** — Farmers/Landowners (posting work requirements) and Agricultural Labourers / Crew Leaders (discovering and applying for jobs).
- ✅ **Core Features** — Labour requirement posting & management, location/activity discovery feed, one-click application, applicant review & direct contact.
- ⚠️ **Tech Stack** — Proposed Next.js 15 (TypeScript) + Tailwind CSS + PostgreSQL 16 (Prisma ORM) for fast full-stack mobile web delivery.
- ✅ **Constraints** — Mobile-first, low-bandwidth resilience for rural connectivity, direct zero-commission model for v1.
- ✅ **Architectural Principles** — Mobile-first, role-based separation (Farmer vs Labourer), geographic hierarchy, TDD (>80% coverage).
- ⚠️ **Known Unknowns** — SMS OTP gateway selection, location granularity (district/taluka dropdowns vs. GPS), group/crew applications.
- ✅ **Success Criteria** — End-to-end verified posting, searching, applying, and direct contact workflows with passing test suites.

### Key Decisions
1. **Target Stack**: Next.js 15 (App Router, TypeScript), Tailwind CSS, PostgreSQL 16, Prisma ORM, Vitest, Docker Compose.
2. **Access Model**: Role-based access control (`FARMER`, `LABOURER`, `ADMIN`).
3. **Contact Sharing**: Contact phone numbers revealed directly upon farmer accepting an applicant.
4. **Location Model**: Hierarchical administrative dropdowns (State → District → Taluka → Village) for rural usability.

---

## 2. Generated `spec.md` (v1.0)

```markdown
# Agromate — Project Specification

> **Version:** 1.0
> **Created:** 2026-11-23
> **Last Updated:** 2026-11-23
> **Status:** 🟡 In Planning
>
> Living document — the AI agent updates **Codebase Inventory**, **Decision Log**,
> and **Current Focus** at the end of every working session. Do not edit those
> sections manually.

---

## Current Focus

- Spec v1.0 created based on raw requirements in `AGENT_MD/spec_init.md`.
- Ready to begin **Feature 0: Pre-Work (Repository & Environment Setup)**.

---

## ⚠️ Critical Pre-Work (Do Before Any Feature Work)

- [ ] Initialise Git repository with `.gitignore` (ignoring `.env`, `node_modules/`, build artifacts)
- [ ] Establish environment variable management (`.env` and `.env.example`)
- [ ] Scaffold project directory structure (Next.js/Node frontend & backend, PostgreSQL/Prisma database schema)
- [ ] Configure test runner (Vitest / Jest) and code formatting / linting (Prettier, ESLint)
- [ ] Verify clean baseline CI/CD workflow configuration (GitHub Actions)

---

## Project Overview

Agromate is a centralized digital labour-matching platform that connects agricultural landowners/farmers who need seasonal or daily workers with agricultural labourers seeking farm employment. In rural and agricultural communities, finding farm workers during peak farming seasons (sowing, irrigation, weeding, pesticide spraying, harvesting, post-harvest packaging) is often fraught with delays, high commission fees to middle agents, and limited word-of-mouth visibility. Similarly, labourers face erratic work opportunities and wage uncertainty due to fragmented local channels.

Agromate bridges this information gap by providing an accessible, mobile-first marketplace. Farmers can quickly post their labour requirements — specifying crop type, work nature, headcount, daily wage, duration, and farm location. Agricultural workers (both individual labourers and labour group leaders / *mukaddams*) can discover nearby openings matching their skills and schedule, apply directly, and connect with farmers without predatory intermediaries.

### Problem Statement

Finding agricultural labourers currently relies on personal networks, local contractors, or word-of-mouth communication. This informal system is inefficient, geographically restricted, and unreliable during critical harvest windows, causing crop loss and inflated labour search costs for farmers, while keeping farm labourers vulnerable to underemployment and lack of wage transparency.

### Target Users

1. **Farmers / Farm Owners**: Individuals or agricultural businesses requiring on-demand or seasonal farm hands. They need a simple interface to post work requirements quickly, view incoming applicants, and initiate direct contact.
2. **Agricultural Labourers & Crew Leaders (*Mukaddams / Tolis*)**: Farm workers seeking regular daily or seasonal jobs. Many use low-end smartphones or rely on group leaders to negotiate multi-worker jobs. They need easy-to-read listings, location-based filtering, transparent wages, and quick one-tap contact/application.
3. **Platform Administrators**: Superusers who manage platform health, moderate listings, handle reported disputes, and maintain location hierarchies (states, districts, talukas/tehsils).

### Current Operational Reality (as of 2026-11-23)

Greenfield project. The repository contains the `AGENT_MD_v1` documentation and governance framework. No production or prototype code exists yet. Implementation will initiate from Feature 0.

---

## Success Criteria (v1.0)

- [ ] **Farmer Flow**: A registered farmer can create, publish, view, edit, and close a labour requirement post (specifying crop, activity, worker count, wage, dates, and village/district).
- [ ] **Labourer Flow**: A registered labourer or crew leader can browse active jobs, filter by distance/district and farm activity, and express interest/apply with one click.
- [ ] **Matching & Contact**: Farmers can view applicants for their posted requirements and exchange direct contact details (phone call / SMS / WhatsApp link).
- [ ] **Authentication**: Secure phone-number-based or credential-based login with distinct role separation (`farmer`, `labourer`, `admin`).
- [ ] **Mobile-First UX**: Responsive, lightweight UI designed for 3G/4G connectivity on mobile devices, with clear visual iconography and regional language readiness.
- [ ] **Quality & Testing**: Automated test coverage exceeds 80% on core domain services and API endpoints with zero security or secret leaks.
- [ ] **Reproducible Local Setup**: The application can be started end-to-end with a single command (e.g., `docker-compose up` or `npm run dev`) with zero manual database patching.

---

## Constraints & Non-Negotiables

- **Team:** 1 developer assisted by AI agent.
- **Timeline:** MVP (Features 0–4) delivered in 4–6 weeks.
- **Budget:** Built using low-cost / free-tier infrastructure (PostgreSQL on Supabase/Neon or Docker, Vercel/Render hosting).
- **Compliance & Privacy:** Consent-based contact sharing; phone numbers are only revealed between parties upon accepted application.
- **Non-negotiables:**
  - Mobile-first responsive web design (the primary device for rural users is an Android smartphone).
  - High fault tolerance: works smoothly under poor or intermittent internet connectivity.
  - Zero transaction cut or commission in v1 to encourage rapid direct adoption.
  - Plain, high-contrast, uncluttered interface suitable for users with varying digital literacy.

---

## Tech Stack

### Current (what exists today)

| Layer | Technology | Notes |
|---|---|---|
| Language | — | Greenfield project |
| Framework | — | Greenfield project |
| Database | — | Greenfield project |
| Auth | — | Greenfield project |
| Frontend | — | Greenfield project |
| Testing | — | Greenfield project |
| Containerisation | — | Greenfield project |
| CI/CD | — | Greenfield project |

### Target (what we are building toward)

| Layer | Technology | Notes |
|---|---|---|
| Language | TypeScript (Node.js 20+) | Full-stack type safety across frontend and backend |
| Framework | Next.js 15 (App Router) | Unified server-side rendering, API route handlers, and SEO/PWA capabilities |
| Frontend | React 19, Tailwind CSS, Lucide Icons | Fast mobile-first styling, accessible UI components |
| Database | PostgreSQL 16 + Prisma ORM | Relational data integrity for users, job posts, applications, and locations |
| Auth | NextAuth.js / Auth.js (JWT session) | Role-based authentication (`FARMER`, `LABOURER`, `ADMIN`) |
| Testing | Vitest, React Testing Library, Playwright | Unit, integration, and end-to-end verification |
| Containerisation | Docker, Docker Compose | Local multi-service development (web app + PostgreSQL) |
| CI/CD | GitHub Actions | Automated linting, type-checking, and test runs on pull requests |

---

## Architectural Principles

- **Mobile-First & Bandwidth-Conscious**: Assets and bundle sizes are strictly minimized. Pages must load fast on unstable 3G/4G rural networks.
- **Role-Based Isolation**: Strict role validation (`FARMER` vs. `LABOURER`) enforced in API middleware. Only farmers can create postings; only labourers can apply.
- **Location-Centric Discovery**: Jobs and labour searches are organized around structured geographic hierarchies (State → District → Taluka / Block → Village) to ensure relevant local matching.
- **Simplicity Over Complexity**: Direct calling/messaging model for v1 rather than complex in-app escrow or real-time GPS tracking.
- **Test-Driven Development (TDD)**: Unit tests for core business rules (job creation, validity dates, application state transitions) must precede implementation.
- **Structured Error Handling**: All API responses use standard JSON shapes (`{ success, data, error: { code, message } }`) with correlation IDs.

---

## Codebase Inventory

### Documentation & Framework (`AGENT_MD_v1/`)

| File | Role | Status | Last Updated |
|---|---|---|---|
| `AGENT_MD_v1/spec.md` | Living master project specification | ✅ Active | 2026-11-23 |
| `AGENT_MD_v1/spec_init.md` | AI-guided initializer and intake notes | ✅ Active | 2026-11-23 |
| `AGENT_MD_v1/README.md` | Agentic workflow framework instructions | ✅ Active | 2026-11-21 |
| `AGENT_MD_v1/plan/rules.md` | Plan & report authoring standards | ✅ Active | 2026-11-21 |
| `AGENT_MD_v1/plan/current_state_report.md` | Codebase health & operational snapshot | 🟡 Pending Setup | 2026-11-23 |
| `AGENT_MD_v1/reconciliation-001.md` | Spec vs reality audit template | 🟡 Pending Setup | 2026-11-21 |

---

## Feature Index

| # | Feature | Status | Priority | Notes |
|---|---|---|---|---|
| 0 | Pre-Work: Setup, Architecture & Tooling | [ ] | P0 | Git, monorepo/Next.js setup, Prisma, ESLint, Vitest |
| 1 | User Authentication & Role Profiles | [ ] | P0 | Farmer & Labourer signup/login, profiles, contact info |
| 2 | Labour Requirement Posting & Management | [ ] | P0 | Farmers post jobs (crop, wage, dates, location), manage status |
| 3 | Job Discovery, Search & Application | [ ] | P0 | Labourers browse, filter by district/activity, and apply |
| 4 | Application Review, Direct Hiring & Alerts | [ ] | P1 | Farmers accept/reject applicants; unlock direct phone/chat contact |
| 5 | Multilingual UI & PWA Offline-Support | [ ] | P2 | Hindi/Regional language support and offline PWA caching |

---

## Known Issues & Technical Debt

- Greenfield project — no known technical debt at this time.

---

## Known Unknowns

- **SMS OTP Service**: Choice of SMS gateway provider (e.g. Twilio, MSG91, Firebase Phone Auth) for phone number verification in production.
- **Location Granularity**: Determining whether to use GPS radius filtering vs. standard administrative dropdowns (State/District/Taluka); dropdowns are recommended for v1 due to rural familiarity.
- **Crew / Group Application**: Defining how contractor leads (*mukaddams*) apply on behalf of a team of 5–20 workers versus individual labourers.

---

## Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|---|---|---|---|
| 2026-11-23 | Created v1.0 spec.md | Establish formal specification from raw project idea in `spec_init.md` | Ad-hoc development without spec |
| 2026-11-23 | Adopt Next.js 15 + TypeScript + Prisma + PostgreSQL | Enables rapid full-stack iteration, SSR for fast initial mobile loads, and robust relational data modelling | Separate Express + React SPA, Django, FastAPI |
| 2026-11-23 | Direct Contact Model for v1 | Farmers and workers prefer direct phone conversations over complex in-app negotiation | In-app payment escrow (too complex and friction-heavy for MVP) |

---

# FEATURE 0 — Pre-Work: Setup, Architecture & Tooling

## Goal

Initialize the project repository, install baseline dependencies, configure the Next.js and Prisma environment, set up automated testing, and verify CI hygiene.

## Tasks

- [ ] Initialize Git repository with comprehensive `.gitignore` (excluding `.env`, build files, node_modules)
- [ ] Initialize Next.js 15 project with TypeScript, Tailwind CSS, and App Router
- [ ] Configure Prisma ORM with PostgreSQL connection string and initial schema stub
- [ ] Set up Vitest and React Testing Library for automated testing
- [ ] Create `.env.example` defining all required configuration keys
- [ ] Update `AGENT_MD_v1/plan/current_state_report.md` with baseline environment audit

## Verification

- `npm run build` succeeds without TypeScript or bundling errors
- `npm test` runs cleanly with at least one sample test passing
- `git status` shows no unignored temporary files or committed credentials

---

# FEATURE 1 — User Authentication & Role Profiles

## Goal

Provide secure authentication and onboarding for two distinct user types: Farmers and Labourers, ensuring each user has a complete profile with location and contact details.

## Tasks

- [ ] Define Prisma models for `User` (`role`: `FARMER` | `LABOURER` | `ADMIN`), `FarmerProfile`, and `LabourerProfile`
- [ ] Implement registration and login API endpoints with password hashing (bcrypt) or OTP simulation
- [ ] Build responsive onboarding UI for Farmers (Farm Name, District, Village, Primary Crops)
- [ ] Build responsive onboarding UI for Labourers (Skills/Activities, Experience, Crew Size, District)
- [ ] Implement session middleware to restrict route access based on user role
- [ ] Write unit and integration tests for auth workflows

## Acceptance Criteria

- [ ] A user can register as either a Farmer or Labourer and receive an authenticated session
- [ ] Unauthenticated requests to protected routes return 401 Unauthorized
- [ ] A Labourer cannot access farmer-specific job posting routes (returns 403 Forbidden)
- [ ] Profile information can be viewed and updated by the respective user

---

# FEATURE 2 — Labour Requirement Posting & Management (Farmers)

## Goal

Enable farmers to create, publish, view, edit, and close farm labour requirements.

## Tasks

- [ ] Create `JobPost` model in Prisma with fields: `title`, `description`, `cropType`, `activity`, `workersNeeded`, `dailyWage`, `startDate`, `endDate`, `location`, and `status` (`OPEN`, `FILLED`, `COMPLETED`, `CANCELLED`)
- [ ] Build job creation form with validation (dates must be valid, worker count > 0, wage > 0)
- [ ] Build Farmer Dashboard showing active, past, and filled job postings
- [ ] Implement API endpoints for `POST /api/jobs`, `GET /api/jobs/my-posts`, `PATCH /api/jobs/:id`, and `DELETE /api/jobs/:id`
- [ ] Write test cases for job validation and status lifecycle transitions

## Acceptance Criteria

- [ ] Farmer can successfully create a new job post and see it appear in their dashboard
- [ ] Invalid posts (missing wage, invalid dates) return descriptive validation errors
- [ ] Farmer can manually change job status to `FILLED` or `CANCELLED`
- [ ] Non-owners cannot edit or delete another farmer's post

---

# FEATURE 3 — Job Discovery, Search & Application (Labourers)

## Goal

Provide agricultural labourers and crew leaders with an intuitive feed to discover relevant farm jobs, filter by locality and task, and apply with a single action.

## Tasks

- [ ] Create `JobApplication` model in Prisma linking `JobPost`, `Labourer`, `status` (`PENDING`, `ACCEPTED`, `REJECTED`), and optional `applicantNote`
- [ ] Implement search and filter endpoint `GET /api/jobs` supporting query params: `district`, `activity`, `minWage`, `cropType`
- [ ] Build mobile-first job feed with high-contrast cards displaying key information (wage, dates, distance, workers needed)
- [ ] Build one-tap "Apply / Express Interest" button with optimistic UI feedback
- [ ] Build Labourer "My Applications" screen showing application history and status

## Acceptance Criteria

- [ ] Labourers can filter listings by district and activity, returning only `OPEN` listings
- [ ] Labourer can apply for a job; duplicate applications for the same job are prevented
- [ ] Applied jobs immediately reflect `PENDING` status on the labourer's screen
- [ ] Unit tests verify search filters and application constraints

---

# FEATURE 4 — Application Review, Direct Hiring & Alerts

## Goal

Allow farmers to review applicants for their posted requirements, accept suitable workers, and unlock direct contact (phone call / WhatsApp) to coordinate work.

## Tasks

- [ ] Build Applicant Management view for farmers on each job posting
- [ ] Implement `PATCH /api/applications/:id` endpoint for farmers to `ACCEPT` or `REJECT` applicants
- [ ] Implement contact reveal logic: show applicant phone number and call button only after application is accepted
- [ ] Add direct action buttons (`Call Now`, `WhatsApp`) on the accepted worker card
- [ ] Auto-close job post when accepted worker count reaches `workersNeeded`
- [ ] Write tests covering acceptance, contact authorization, and auto-close trigger

## Acceptance Criteria

- [ ] Farmer can accept or reject an applicant with instant status update
- [ ] Worker contact number is masked until accepted, preserving privacy
- [ ] Once accepted, both parties can view each other's verified phone number
- [ ] Job status automatically shifts to `FILLED` when accepted count matches `workersNeeded`
```
