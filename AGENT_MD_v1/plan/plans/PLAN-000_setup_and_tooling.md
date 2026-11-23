# PLAN-000: Project Setup, Architecture & Tooling

**Created:** 2026-11-23
**Status:** Completed
**Addresses:** Greenfield repository lacks project scaffold, build toolchain, testing harness, database ORM setup, and CI/CD pipelines (Feature 0 in `spec.md`).

---

## 1. Context & motivation

Agromate is currently at baseline stage. The repository contains the `AGENT_MD_v1` specification and planning governance files, but no application code. Before implementing user authentication, job postings, or discovery workflows, the project requires a rock-solid, type-safe full-stack scaffold.

Following `spec.md`, the chosen target stack is Next.js 15 (TypeScript, App Router, React 19, Tailwind CSS) paired with PostgreSQL 16 and Prisma ORM. Establishing this setup with automated tests (Vitest), local containerisation (Docker Compose), and CI validation guarantees that subsequent feature plans can be developed and tested reliably under a Test-Driven Development (TDD) workflow.

---

## 2. Goals

- **G1:** Initialise Git repository with comprehensive `.gitignore` ensuring zero secret leaks (`.env`, `node_modules`, build artifacts).
- **G2:** Scaffold Next.js 15 App Router project with TypeScript, React 19, and Tailwind CSS; verify `npm run build` exits 0.
- **G3:** Configure Prisma ORM with PostgreSQL provider, initial connection configuration, and baseline migration skeleton.
- **G4:** Configure Vitest and React Testing Library; verify sample unit test passes.
- **G5:** Provide `docker-compose.yml` for local PostgreSQL 16 development database.
- **G6:** Create `.env.example` documenting all configuration keys (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
- **G7:** Configure GitHub Actions CI workflow to run linting, type-checking, and tests.
- **G8:** Update `AGENT_MD_v1/plan/current_state_report.md` with baseline environment audit.

---

## 3. Non-goals

- Building user authentication forms or sessions (deferred to PLAN-001).
- Building job posting or browsing interfaces (deferred to PLAN-002 and PLAN-003).
- Production cloud deployment infrastructure (e.g. AWS/Vercel production setups).

---

## 4. Approach

### 4.1 Repository & Next.js Scaffolding
- Initialise Git repository if not yet initialized.
- Scaffold Next.js 15 project in the workspace root with TypeScript, Tailwind CSS, ESLint, and App Router enabled.
- Set up path aliases (`@/*` pointing to `src/*`).

### 4.2 Database & ORM Setup
- Install `@prisma/client` and `prisma` CLI.
- Run `prisma init` to create `prisma/schema.prisma`.
- Configure `prisma/schema.prisma` with PostgreSQL datasource and a baseline `HealthCheck` or `User` stub model.
- Configure `docker-compose.yml` to spin up a local PostgreSQL 16 instance with persistent volume.

### 4.3 Testing Harness & CI
- Configure Vitest with `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`.
- Add test script to `package.json` (`npm test`).
- Add a sample test verifying that the test harness and assertion library function properly.
- Create `.github/workflows/ci.yml` running lint, type-check, and Vitest test execution on PRs.

---

## 5. Task breakdown

| # | Task | Est. | Depends on |
|---|------|------|------------|
| 1 | Initialise Git repository and verify `.gitignore` | 15 min | — |
| 2 | Scaffold Next.js 15 (TypeScript, Tailwind CSS, App Router) | 30 min | 1 |
| 3 | Install and initialize Prisma ORM with PostgreSQL schema stub | 30 min | 2 |
| 4 | Create `docker-compose.yml` for local PostgreSQL 16 | 20 min | 3 |
| 5 | Configure Vitest, React Testing Library, and write sanity test | 30 min | 2 |
| 6 | Create `.env.example` and load local environment variables | 15 min | 3 |
| 7 | Create GitHub Actions CI workflow (`.github/workflows/ci.yml`) | 20 min | 2, 5 |
| 8 | Run full verification (`npm run build`, `npm test`, Docker probe) | 20 min | 1–7 |
| 9 | Update `AGENT_MD_v1/plan/current_state_report.md` with baseline audit | 15 min | 8 |

---

## 6. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Local PostgreSQL port conflict (port 5432 already occupied) | Low | Medium | Use configurable port in `.env` (e.g., `5432` or `5433` in Docker Compose) |
| Next.js 15 / React 19 peer dependency warnings | Low | Low | Pin tested, compatible dependency versions in `package.json` |
| Vitest configuration issues with App Router components | Medium | Medium | Include `@vitejs/plugin-react` and standard path alias mappings in `vitest.config.ts` |

---

## 7. Success criteria

- [ ] **G1 verified:** `git status` shows clean tracking; no `.env` or temporary files tracked.
- [ ] **G2 verified:** `npm run build` completes successfully with zero TypeScript or bundling errors.
- [ ] **G3 verified:** `npx prisma validate` confirms valid Prisma schema.
- [ ] **G4 verified:** `npm test` runs Vitest and reports 100% passing tests.
- [ ] **G5 verified:** `docker-compose config` is valid and local DB connects.
- [ ] **G6 verified:** `.env.example` contains all required variables with placeholder documentation.
- [ ] **G7 verified:** CI workflow file `.github/workflows/ci.yml` is syntactically valid.
- [ ] `current_state_report.md` baseline audit section filled and updated.

---

## 8. References

- `AGENT_MD_v1/spec.md` — Feature 0 (Pre-Work: Setup, Architecture & Tooling)
- `AGENT_MD_v1/plan/rules.md` — Authoring standards
- `AGENT_MD_v1/plan/current_state_report.md` — Baseline audit document
