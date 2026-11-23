# PLAN-002: Labour Requirement Posting & Management

**Created:** 2026-11-23
**Status:** Completed
**Addresses:** Farmers have no capability to create, publish, track, edit, or close labour requirement postings (Feature 2 in `spec.md`).

---

## 1. Context & motivation

In agricultural communities, labour demands surge drastically during seasonal windows (e.g., sowing, weeding, harvesting, threshing). A delayed harvest by even a few days due to worker shortages can destroy crop yields. Farmers currently depend on unreliable local word-of-mouth or expensive intermediaries.

This plan delivers the core supply side of the Agromate platform: enabling registered farmers to create clear, structured labour requirement postings with explicit job criteria (crop type, nature of work, headcount needed, daily wage, working dates, and village/district location) and manage their lifecycle from open to filled or cancelled.

---

## 2. Goals

- **G1:** Prisma schema model `JobPost` supporting all required agricultural metadata, status tracking (`OPEN`, `FILLED`, `COMPLETED`, `CANCELLED`), and relation to `FarmerProfile`.
- **G2:** REST API endpoints:
  - `POST /api/jobs`: Create new labour posting (Farmer only, Zod validated).
  - `GET /api/jobs/my-posts`: List all posts created by authenticated farmer with application count badges.
  - `GET /api/jobs/:id`: Fetch single job post detail.
  - `PATCH /api/jobs/:id`: Update posting details or manually transition status (`OPEN` → `CANCELLED` / `FILLED`).
  - `DELETE /api/jobs/:id`: Remove posting if no applications have been submitted.
- **G3:** Mobile-first Job Creation Form with visual agricultural task chips (Harvesting, Weeding, Sowing, Spraying, Packaging) and validation (dates in future, wage > 0, worker count > 0).
- **G4:** Farmer Job Dashboard providing quick status filters (Active, Filled, Past) and one-tap status toggling.
- **G5:** Automated tests covering input validation, ownership authorization, and status lifecycle state machine with ≥ 85% coverage.

---

## 3. Non-goals

- Labourer search feed or application submission (covered in PLAN-003).
- Reviewing applicant worker teams or contact reveal (covered in PLAN-004).
- Online wage escrow / advance payments.

---

## 4. Approach

### 4.1 Data Model
- `JobPost` table:
  - `id`: CUID/UUID
  - `farmerId`: Foreign key to `FarmerProfile`
  - `title`: String (e.g., "Wheat Harvesting Crew Needed")
  - `cropType`: String (e.g., "Wheat", "Paddy", "Cotton", "Sugarcane")
  - `activity`: Enum (`SOWING`, `WEEDING`, `SPRAYING`, `HARVESTING`, `PACKAGING`, `GENERAL_LABOUR`)
  - `workersNeeded`: Integer (> 0)
  - `dailyWage`: Decimal / Integer (in INR)
  - `wageType`: Enum (`PER_DAY`, `PER_ACRE`, `PER_BAG`)
  - `startDate`: DateTime
  - `endDate`: DateTime
  - `state`: String
  - `district`: String (indexed)
  - `taluka`: String
  - `village`: String
  - `additionalPerks`: String (e.g., "Lunch provided", "Transport included")
  - `status`: Enum (`OPEN`, `FILLED`, `COMPLETED`, `CANCELLED`)
  - `createdAt`, `updatedAt`

### 4.2 Security & Ownership Verification
- Every mutation endpoint (`PATCH`, `DELETE`) verifies that the requesting user's `farmerProfile.id` matches `JobPost.farmerId`. Non-owners receive 403 Forbidden.
- Status transitions are guarded: once a post is `COMPLETED`, it cannot be reopened.

### 4.3 Mobile UI Design
- Large numeric inputs for wage and worker count.
- Calendar picker constrained to current and future dates.
- Clear status badges (`Green = Open`, `Blue = Filled`, `Gray = Completed`, `Red = Cancelled`).

---

## 5. Task breakdown

| # | Task | Est. | Depends on |
|---|------|------|------------|
| 1 | Write unit tests for JobPost Zod validation and status transition rules | 30 min | PLAN-001 |
| 2 | Add `JobPost` model to Prisma schema with indexes and run migration | 30 min | 1 |
| 3 | Implement `POST /api/jobs` endpoint with role verification (`FARMER` only) | 45 min | 2 |
| 4 | Implement `GET /api/jobs/my-posts` and `GET /api/jobs/:id` route handlers | 30 min | 2 |
| 5 | Implement `PATCH /api/jobs/:id` (edit / status change) with ownership checks | 40 min | 3, 4 |
| 6 | Implement `DELETE /api/jobs/:id` with zero-applicant safeguard | 25 min | 4, 5 |
| 7 | Build responsive Job Creation Form UI with preset agricultural activity chips | 1 hr | 3 |
| 8 | Build Farmer Job Management Dashboard with active/closed filter tabs | 1 hr | 4, 5 |
| 9 | Write integration tests for job post CRUD and ownership restrictions | 45 min | 7, 8 |
| 10 | Update `current_state_report.md` with Feature 2 completion | 15 min | 9 |

---

## 6. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Farmers accidentally creating posts with past dates | Medium | Low | Zod validation rejects start dates earlier than current day |
| Unauthorised modification of job posts | Low | High | Strict `session.user.id == job.farmer.userId` check on all mutation routes |
| Stale job posts cluttering the platform | Medium | Medium | Automated query filter excluding posts whose `endDate` is past when listing open jobs |

---

## 7. Success criteria

- [ ] **G1 verified:** `JobPost` table exists in PostgreSQL with valid foreign keys and indexes.
- [ ] **G2 verified:** Farmer can create, view, update, and close job posts via API; unauthorized attempts return 401/403.
- [ ] **G3 verified:** Job Creation Form renders cleanly on mobile screen and prevents submission with invalid data.
- [ ] **G4 verified:** Farmer Dashboard lists all owned posts with accurate status indicators and worker counts.
- [ ] **G5 verified:** Test suite passes with ≥ 85% coverage across job posting services and endpoints.
- [ ] `current_state_report.md` updated with Feature 2 status.

---

## 8. References

- `AGENT_MD_v1/spec.md` — Feature 2 (Labour Requirement Posting & Management)
- `AGENT_MD_v1/plan/plans/PLAN-001_user_auth_profiles.md`
