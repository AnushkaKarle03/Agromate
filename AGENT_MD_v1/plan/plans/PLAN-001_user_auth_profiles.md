# PLAN-001: User Authentication & Role-Based Profiles

**Created:** 2026-11-23
**Status:** Completed
**Addresses:** Agromate lacks user accounts, role separation (`FARMER` vs. `LABOURER`), profile onboarding, and session security (Feature 1 in `spec.md`).

---

## 1. Context & motivation

Agromate serves two fundamentally different stakeholder groups:
1. **Farmers**: Need to create job postings, review applicant worker teams, and manage field labor requirements.
2. **Agricultural Labourers / Crew Leaders**: Need to search for nearby daily or seasonal work, view transparent wages, and apply with minimal friction.

To maintain security and clean authorization boundaries, the platform must enforce strict role-based separation at both the data and API layers. Farmers must not apply to jobs as labourers, and labourers must not publish job requirements. A clean authentication and profile layer is prerequisite to building job posting and application workflows.

---

## 2. Goals

- **G1:** Prisma schema models `User`, `FarmerProfile`, and `LabourerProfile` with appropriate foreign key relationships and role enum (`FARMER`, `LABOURER`, `ADMIN`).
- **G2:** Registration API (`POST /api/auth/register`) accepts phone/email, password, and chosen role; passwords securely hashed with bcrypt (salt rounds = 10).
- **G3:** Session authentication implemented via NextAuth.js / Auth.js with JWT callbacks exposing `userId`, `role`, and `profileId`.
- **G4:** Route protection middleware (`src/middleware.ts`) restricting `/farmer/*` routes to `FARMER` role and `/labourer/*` routes to `LABOURER` role; unauthenticated requests return 401 or redirect to login.
- **G5:** Responsive onboarding and profile management screens for Farmers (Farm name, district, taluka, village, primary crops) and Labourers (skills, daily rate expectation, crew size, district).
- **G6:** Test suite covering password hashing, user registration, role enforcement, and profile endpoints with ≥ 85% branch coverage.

---

## 3. Non-goals

- Third-party social logins (Google, Facebook) — not suitable for rural audience in v1.
- SMS OTP telecom provider contracts (simulated OTP / credential auth used for MVP development).
- Job posting forms (that is PLAN-002).
- Job application submission (that is PLAN-003).

---

## 4. Approach

### 4.1 Schema & Data Modeling
- `User` table: `id`, `phone` (unique), `email` (optional), `passwordHash`, `role` (`FARMER` | `LABOURER` | `ADMIN`), `createdAt`, `updatedAt`.
- `FarmerProfile` table: `id`, `userId` (1:1), `fullName`, `farmName`, `district`, `taluka`, `village`, `primaryCrops` (array/string), `isVerified`.
- `LabourerProfile` table: `id`, `userId` (1:1), `fullName`, `skills` (e.g. harvesting, spraying, weeding), `experienceYears`, `isCrewLeader`, `crewSize`, `district`, `taluka`, `village`.

### 4.2 Auth Implementation
- Use Auth.js / NextAuth.js with Credentials Provider.
- Passwords hashed using `bcryptjs`.
- JWT session token enriched with `role` and `profileId` to eliminate redundant database queries on protected API calls.

### 4.3 Onboarding UI & Middleware
- Mobile-first, high-contrast onboarding screens with large touch targets.
- Pre-populated district dropdowns for location standardization.
- Next.js middleware inspecting session token before serving protected paths.

---

## 5. Task breakdown

| # | Task | Est. | Depends on |
|---|------|------|------------|
| 1 | Write unit tests for password hashing and registration validation | 30 min | PLAN-000 |
| 2 | Add `User`, `FarmerProfile`, `LabourerProfile` models to Prisma schema and run migration | 30 min | 1 |
| 3 | Implement auth helper functions (`hashPassword`, `verifyPassword`, token creators) | 30 min | 2 |
| 4 | Implement `POST /api/auth/register` API endpoint with Zod input validation | 45 min | 3 |
| 5 | Configure NextAuth route handler (`/api/auth/[...nextauth]`) with Credentials Provider | 45 min | 3, 4 |
| 6 | Write integration tests for registration, login, and token generation | 45 min | 4, 5 |
| 7 | Build Farmer onboarding & profile editing view | 1 hr | 5 |
| 8 | Build Labourer onboarding & profile editing view | 1 hr | 5 |
| 9 | Implement Next.js role protection middleware (`src/middleware.ts`) | 30 min | 5 |
| 10 | Write middleware route protection tests (verify 401 and 403 status codes) | 30 min | 9 |
| 11 | Update `current_state_report.md` with Feature 1 status | 15 min | 10 |

---

## 6. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Role privilege escalation (e.g., labourer calling farmer API directly) | Medium | High | Enforce role check in both Next.js middleware and individual API route handlers |
| Duplicate phone numbers during registration | High | Medium | Unique database constraint on `User.phone` with user-friendly 409 Conflict error response |
| Missing mandatory profile fields preventing matching | Medium | Medium | Route guard redirects user to onboarding wizard until profile completeness is verified |

---

## 7. Success criteria

- [ ] **G1 verified:** Prisma migration successfully executes and models exist in PostgreSQL.
- [ ] **G2 verified:** `POST /api/auth/register` returns 201 with clean user record; duplicate phone returns 409.
- [ ] **G3 verified:** Successful login returns valid session with `user.role` attached.
- [ ] **G4 verified:** Unauthenticated request to `/api/farmer/*` returns 401; request from `LABOURER` role returns 403.
- [ ] **G5 verified:** Farmer and Labourer profile onboarding screens render cleanly on mobile viewport.
- [ ] **G6 verified:** Vitest test suite achieves ≥ 85% coverage across auth modules.
- [ ] `current_state_report.md` updated with Feature 1 completion.

---

## 8. References

- `AGENT_MD_v1/spec.md` — Feature 1 (User Authentication & Role Profiles)
- `AGENT_MD_v1/plan/plans/PLAN-000_setup_and_tooling.md`
