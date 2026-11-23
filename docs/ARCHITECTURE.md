# Agromate — Architecture & Directory Layout

This document describes the architectural layout, modules, and data flow of the Agromate platform.

---

## 1. Directory Tree

```
Agromate/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Automated GitHub Actions test & build pipeline
├── AGENT_MD_v1/                       # AI Agent specification and planning framework
│   ├── README.md                      # Framework user guide
│   ├── spec.md                        # Master project specification (v1.1)
│   ├── spec_init.md                   # Intake interview and gap analysis record
│   ├── reconciliation-001.md          # Spec vs reality audit template
│   ├── plan/
│   │   ├── rules.md                   # Authoring rules for plans and reports
│   │   ├── current_state_report.md    # Living audit of codebase, test suite, and risks
│   │   ├── plans/                     # Forward-looking plans
│   │   │   ├── PLAN-000_setup_and_tooling.md
│   │   │   ├── PLAN-001_user_auth_profiles.md
│   │   │   ├── PLAN-002_labour_requirement_posting.md
│   │   │   ├── PLAN-003_job_discovery_application.md
│   │   │   └── PLAN-004_application_review_hiring.md
│   │   └── reports/                   # Backward-looking verification reports
│   │       ├── README.md              # Reports index
│   │       ├── REPORT-000_setup_and_tooling.md
│   │       ├── REPORT-001_user_auth_profiles.md
│   │       ├── REPORT-002_labour_requirement_posting.md
│   │       ├── REPORT-003_job_discovery_application.md
│   │       └── REPORT-004_application_review_hiring.md
├── docs/
│   └── ARCHITECTURE.md                # System architecture documentation (this file)
├── prisma/
│   ├── dev.db                         # SQLite local development & testing database
│   └── schema.prisma                  # Data models (User, Profiles, JobPost, JobApplication)
├── src/
│   ├── app/                           # Next.js 14 App Router
│   │   ├── api/                       # REST API route handlers
│   │   │   ├── auth/                  # Registration, login, profile fetch
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── me/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── jobs/                  # Job posting & discovery endpoints
│   │   │   │   ├── route.ts           # GET (feed), POST (create)
│   │   │   │   ├── my-posts/route.ts  # GET (farmer postings)
│   │   │   │   └── [id]/              # Single job management
│   │   │   │       ├── route.ts       # GET, PATCH, DELETE
│   │   │   │       ├── applicants/route.ts  # GET (applicants with masked phone)
│   │   │   │       └── apply/route.ts       # POST (one-tap apply)
│   │   │   └── applications/          # Application decisions & tracking
│   │   │       ├── my-applications/route.ts # GET (labourer applications)
│   │   │       └── [id]/decision/route.ts   # PATCH (accept/reject with auto-fill)
│   │   ├── auth/                      # Authentication UI pages
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── farmer/                    # Farmer portal UI pages
│   │   │   ├── dashboard/page.tsx
│   │   │   └── jobs/
│   │   │       ├── new/page.tsx
│   │   │       └── [id]/applicants/page.tsx
│   │   ├── labourer/                  # Labourer portal UI pages
│   │   │   ├── feed/page.tsx
│   │   │   └── applications/page.tsx
│   │   ├── globals.css                # Tailwind CSS root stylesheet
│   │   ├── layout.tsx                 # Root layout with sticky navigation & footer
│   │   └── page.tsx                   # Landing page with role selector
│   ├── components/                    # Reusable React UI components
│   │   ├── common/
│   │   │   ├── Navbar.tsx             # Navigation header with auth status
│   │   │   └── Footer.tsx             # Standard footer
│   │   └── ui/
│   │       ├── Badge.tsx              # Status indicator badge
│   │       └── Button.tsx             # Accessible button with loading spinner
│   ├── config/
│   │   └── constants.ts               # District lists, task definitions, status colors
│   ├── hooks/
│   │   └── useAuth.ts                 # React hook for client-side authentication
│   ├── lib/
│   │   ├── auth.ts                    # Password hashing (bcrypt) & JWT sessions
│   │   ├── prisma.ts                  # PrismaClient singleton instance
│   │   └── serializers.ts             # Contact privacy masking (98******10)
│   └── types/
│       └── index.ts                   # Shared TypeScript domain interfaces
├── tests/                             # Automated Vitest test suite
│   ├── unit/
│   │   ├── auth.test.ts               # Bcrypt & JWT verification
│   │   ├── job_rules.test.ts          # Activity categorization & validation
│   │   └── serializers.test.ts        # Phone number privacy masking
│   └── integration/
│       └── hiring_lifecycle.test.ts   # Capacity calculation & auto-fill logic
├── .env                               # Local active environment variables
├── .env.example                       # Documented environment template
├── .gitignore                         # Secret, build, and dependency exclusion rules
├── docker-compose.yml                 # Local PostgreSQL 16 container definition
├── package.json                       # Project manifests and scripts
├── tailwind.config.js                 # Tailwind styling rules
├── tsconfig.json                      # TypeScript path aliases (@/* -> src/*)
└── vitest.config.ts                   # Vitest configuration with jsdom
```

---

## 2. Core Modules & Responsibilities

| Directory | Layer | Purpose |
|---|---|---|
| `src/app/api/` | Controller / API | REST endpoints handling validation, role auth, and database operations. |
| `src/lib/` | Core Utilities | Encryption, token generation, database client, and privacy serializers. |
| `src/components/` | Presentation | Modular UI components separated into common, domain, and reusable primitives. |
| `src/hooks/` | State Management | Encapsulated React hooks for auth sessions and persistent storage. |
| `src/types/` | Data Contracts | Shared TypeScript types ensuring compile-time safety across client and server. |
| `tests/` | Quality Assurance | Vitest unit and integration test suites enforcing domain invariant rules. |
| `prisma/` | Persistence | Declarative database schema, relations, indexes, and migrations. |
| `AGENT_MD_v1/` | Governance | Traceable specification, plans (`PLAN-000` to `004`), and reports (`REPORT-000` to `004`). |
