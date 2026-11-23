# Agromate — Agricultural Labour Matching Platform

Agromate is a centralized digital labour-matching marketplace that directly connects farmers needing farm labourers with agricultural labourers looking for work during critical farming seasons.

---

## Project Structure Overview

```
Agromate/
├── AGENT_MD_v1/                  # AI-Assisted Development Framework (Specs, Plans & Reports)
│   ├── spec.md                   # Master project specification (v1.1)
│   ├── spec_init.md              # Initializer intake interview & gap analysis
│   ├── plan/
│   │   ├── rules.md              # Authoring rules for plans and reports
│   │   ├── current_state_report.md # Living codebase audit
│   │   ├── plans/                # Execution plans (PLAN-000 to PLAN-004)
│   │   └── reports/              # Implementation reports (REPORT-000 to REPORT-004)
├── docs/
│   └── ARCHITECTURE.md           # Full technical architecture and module layout
├── prisma/
│   ├── schema.prisma             # Data schema (User, Profiles, JobPost, JobApplication)
│   └── dev.db                    # Local SQLite database
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── api/                  # REST API routes (auth, jobs, applications)
│   │   ├── auth/                 # Sign-in and Registration pages
│   │   ├── farmer/               # Farmer Dashboard, Post creation, Applicant review
│   │   ├── labourer/             # Job Feed with filters, Application tracker
│   │   ├── globals.css           # Tailwind CSS styles
│   │   ├── layout.tsx            # Sticky header & footer layout
│   │   └── page.tsx              # Landing page
│   ├── components/               # UI components (ui/, common/, jobs/, applicants/)
│   ├── config/                   # Constants (districts, activities, status colors)
│   ├── hooks/                    # React hooks (useAuth)
│   ├── lib/                      # Core helpers (auth, prisma, serializers)
│   └── types/                    # Shared TypeScript interfaces
├── tests/                        # Vitest automated test suites
├── docker-compose.yml            # PostgreSQL 16 container definition
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # Path aliases (@/* -> src/*)
```

---

## Features Implemented

1. **Feature 0: Setup & Tooling** — Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, Vitest test harness, CI pipeline.
2. **Feature 1: User Auth & Role Profiles** — `FARMER` and `LABOURER` onboarding, bcrypt password hashing, JWT sessions.
3. **Feature 2: Labour Requirement Posting** — Farmers post jobs with crop type, tasks (harvesting, weeding, etc.), wages, and location.
4. **Feature 3: Job Discovery & Application** — Labourers filter by district and task, one-tap apply with duplicate prevention.
5. **Feature 4: Hiring & Privacy Contact Reveal** — Masked phone numbers (`98******10`) until accepted; direct "Call Now" and "WhatsApp" links.

---

## Quick Start Commands

```bash
# Install dependencies (already installed)
npm install

# Push database schema
npx prisma db push

# Run automated tests
npm test

# Build production application
npm run build

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.
