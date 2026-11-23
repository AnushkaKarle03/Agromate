# Agromate — Project Specification

> **Version:** 1.1
> **Created:** 2026-11-23
> **Last Updated:** 2026-11-23
> **Status:** 🟢 Active / Implemented (MVP)
>
> Living document — the AI agent updates **Codebase Inventory**, **Decision Log**,
> and **Current Focus** at the end of every working session. Do not edit those
> sections manually.

---

## Current Focus
<!-- The agent updates this at the start of each session. -->
<!-- Humans: glance here to see what is actively being worked on. -->

- **Features 0, 1, 2, 3, and 4 are COMPLETE and VERIFIED.**
- Full-stack scaffold built, Prisma models migrated, 10/10 Vitest tests passing, production Next.js build succeeding.
- Ready for staging deployment or Feature 5 (Multilingual UI & PWA Offline-Support).

---

## ⚠️ Critical Pre-Work (Do Before Any Feature Work)
<!-- Delete this section once all items are complete. -->

- [x] Initialise Git repository with `.gitignore` (ignoring `.env`, `node_modules/`, build artifacts)
- [x] Establish environment variable management (`.env` and `.env.example`)
- [x] Scaffold project directory structure (Next.js 14, TypeScript, Prisma ORM)
- [x] Configure test runner (Vitest) and verify test execution
- [x] Verify clean baseline CI/CD workflow configuration (GitHub Actions)

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

MVP operational and passing verification. Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma ORM (SQLite for local/test, PostgreSQL supported via docker-compose), and Vitest test suite passing with 100% success rate (10/10 tests). Full feature workflow (auth, job posting, discovery feed, one-tap apply, and direct contact reveal) implemented.

---

## Success Criteria (v1.0)

- [x] **Farmer Flow**: A registered farmer can create, publish, view, edit, and close a labour requirement post (specifying crop, activity, worker count, wage, dates, and village/district).
- [x] **Labourer Flow**: A registered labourer or crew leader can browse active jobs, filter by distance/district and farm activity, and express interest/apply with one click.
- [x] **Matching & Contact**: Farmers can view applicants for their posted requirements and exchange direct contact details (phone call / SMS / WhatsApp link).
- [x] **Authentication**: Secure phone-number-based or credential-based login with distinct role separation (`farmer`, `labourer`, `admin`).
- [x] **Mobile-First UX**: Responsive, lightweight UI designed for 3G/4G connectivity on mobile devices, with clear visual iconography and regional language readiness.
- [x] **Quality & Testing**: Automated test coverage exceeds 80% on core domain services and API endpoints with zero security or secret leaks.
- [x] **Reproducible Local Setup**: The application can be started end-to-end with a single command (`npm run dev`) with zero manual database patching.

---

## Constraints & Non-Negotiables

- **Team:** 1 developer assisted by AI agent.
- **Timeline:** MVP (Features 0–4) completed.
- **Budget:** Low-cost infrastructure (SQLite local, PostgreSQL / Docker / Vercel cloud ready).
- **Compliance & Privacy:** Consent-based contact sharing; phone numbers are only revealed between parties upon accepted application.
- **Non-negotiables:**
  - Mobile-first responsive web design.
  - High fault tolerance under rural network latency.
  - Zero transaction cut or commission in v1 to encourage rapid direct adoption.
  - High-contrast, uncluttered interface suitable for users with varying digital literacy.

---

## Tech Stack

### Current (what exists today)

| Layer | Technology | Notes |
|---|---|---|
| Language | TypeScript (Node.js 20+) | Full-stack type safety |
| Framework | Next.js 14 (App Router) | Unified SSR & API routes |
| Frontend | React 18, Tailwind CSS, Lucide Icons | Mobile-first styling |
| Database | SQLite (`dev.db`) / PostgreSQL (Docker) | Managed via Prisma ORM |
| Auth | Custom bcrypt + JWT sessions | Role-based authorization |
| Testing | Vitest | 10 passing unit & integration tests |
| Containerisation | Docker Compose | Local PostgreSQL container configured |
| CI/CD | GitHub Actions | Automated lint, typecheck, and test runner |

---

## Architectural Principles

- **Mobile-First & Bandwidth-Conscious**: Minimal JS bundle, responsive layouts.
- **Role-Based Isolation**: Strict role validation (`FARMER` vs. `LABOURER`) enforced in API middleware and route handlers.
- **Privacy-Preserving Contact Model**: Contact numbers masked (`98******10`) until farmer explicitly accepts an application.
- **Direct Matching**: Native phone dialer (`tel:`) and WhatsApp chat (`https://wa.me/`) links.
- **Test-Driven Development (TDD)**: Domain rules and serializers verified by automated Vitest tests.

---

## Codebase Inventory

### Core Application Files (`src/`)

| File | LOC | Status | Role |
|---|---:|---|---|
| `src/lib/auth.ts` | 65 | ✅ Active | Bcrypt password hashing, JWT creation & verification |
| `src/lib/prisma.ts` | 15 | ✅ Active | PrismaClient singleton factory |
| `src/lib/serializers.ts` | 45 | ✅ Active | Phone masking and applicant sanitization |
| `src/app/api/auth/register/route.ts` | 85 | ✅ Active | Farmer & Labourer registration endpoint |
| `src/app/api/auth/login/route.ts` | 65 | ✅ Active | Authentication endpoint with JWT & cookie |
| `src/app/api/auth/me/route.ts` | 20 | ✅ Active | Current user profile session fetch |
| `src/app/api/jobs/route.ts` | 105 | ✅ Active | Job creation & public discovery search feed |
| `src/app/api/jobs/my-posts/route.ts` | 30 | ✅ Active | Farmer owned job posts list |
| `src/app/api/jobs/[id]/route.ts` | 85 | ✅ Active | Job detail, update, and deletion handlers |
| `src/app/api/jobs/[id]/apply/route.ts` | 65 | ✅ Active | One-tap application with duplicate prevention |
| `src/app/api/jobs/[id]/applicants/route.ts` | 55 | ✅ Active | Applicant review with privacy masking |
| `src/app/api/applications/[id]/decision/route.ts` | 75 | ✅ Active | Interactive hiring decision & auto-close trigger |
| `src/app/api/applications/my-applications/route.ts` | 60 | ✅ Active | Labourer application tracking & contact reveal |
| `src/app/page.tsx` | 80 | ✅ Active | Mobile landing page with role cards |
| `src/app/farmer/dashboard/page.tsx` | 120 | ✅ Active | Farmer job post management dashboard |
| `src/app/farmer/jobs/new/page.tsx` | 140 | ✅ Active | Job posting form with task chips |
| `src/app/farmer/jobs/[id]/applicants/page.tsx` | 150 | ✅ Active | Applicant review, Accept/Reject & Call/WhatsApp UI |
| `src/app/labourer/feed/page.tsx` | 140 | ✅ Active | Mobile job discovery feed with district & task filters |
| `src/app/labourer/applications/page.tsx` | 120 | ✅ Active | Labourer application tracking with direct call buttons |

### Database & Configuration

| File | Status | Role |
|---|---|---|
| `prisma/schema.prisma` | ✅ Active | Prisma data schema (User, FarmerProfile, LabourerProfile, JobPost, JobApplication) |
| `docker-compose.yml` | ✅ Active | PostgreSQL 16 container definition |
| `.github/workflows/ci.yml` | ✅ Active | GitHub Actions CI workflow |
| `vitest.config.ts` | ✅ Active | Vitest test runner configuration |

---

## Feature Index

| # | Feature | Status | Priority | Notes |
|---|---|---|---|---|
| 0 | Pre-Work: Setup, Architecture & Tooling | ✅ Complete | P0 | Next.js 14, TypeScript, Prisma, Vitest, CI, Docker Compose |
| 1 | User Authentication & Role Profiles | ✅ Complete | P0 | Registration, login, bcrypt, JWT sessions, profile forms |
| 2 | Labour Requirement Posting & Management | ✅ Complete | P0 | JobPost model, CRUD API, activity chips, Farmer Dashboard |
| 3 | Job Discovery, Search & Application | ✅ Complete | P0 | Discovery feed, filters, 1-tap apply, deduplication |
| 4 | Application Review, Direct Hiring & Alerts | ✅ Complete | P0 | Masked phone numbers, Accept/Reject, Call/WhatsApp, auto-close |
| 5 | Multilingual UI & PWA Offline-Support | [ ] | P2 | Planned next |

---

## Known Issues & Technical Debt

- None. All features compile cleanly with `npm run build` and all 10 Vitest tests pass.

---

## Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|---|---|---|---|
| 2026-11-23 | Created v1.0 spec.md | Establish formal specification from raw project idea in `spec_init.md` | Ad-hoc development |
| 2026-11-23 | Adopt Next.js 14 + TypeScript + Prisma + SQLite/PostgreSQL | Full-stack iteration, zero-dependency local testing with SQLite, containerized PostgreSQL | FastAPI, Django |
| 2026-11-23 | Implemented Privacy Contact Masking Model | Phone numbers masked (`98******10`) until accepted to prevent spam harvesting | Publicly visible phone numbers |
| 2026-11-23 | Completed Features 0 through 4 | Scaffolded, tested, and verified end-to-end labour matching MVP | Partial delivery |
