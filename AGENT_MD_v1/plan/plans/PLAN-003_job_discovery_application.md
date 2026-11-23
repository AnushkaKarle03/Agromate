# PLAN-003: Job Discovery, Search & Application

**Created:** 2026-11-23
**Status:** Completed
**Addresses:** Agricultural labourers and crew leaders lack an intuitive mechanism to discover nearby farm jobs, filter by locality or crop activity, and submit applications (Feature 3 in `spec.md`).

---

## 1. Context & motivation

Agricultural workers and crew leaders (*mukaddams*) currently rely on informal word-of-mouth or predatory village agents to secure farm work. This causes prolonged underemployment, unpredictable wages, and severe geographic restrictions.

This plan delivers the demand side of the Agromate marketplace: an accessible, mobile-first job discovery feed where labourers can browse active requirements, filter by district, taluka, crop type, or farming activity (e.g. harvesting, weeding), examine transparent daily wages, and submit an application with one tap.

---

## 2. Goals

- **G1:** Prisma schema model `JobApplication` establishing a relationship between `JobPost` and `LabourerProfile` with unique constraint on `(jobPostId, labourerId)` and status enum (`PENDING`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`).
- **G2:** Job Discovery API `GET /api/jobs` supporting search and filtering by `district`, `taluka`, `activity`, `cropType`, `minWage`, with pagination (`page`, `limit`).
- **G3:** Application submission API `POST /api/jobs/:id/apply` restricted to `LABOURER` role, enforcing duplicate prevention and capacity validation.
- **G4:** Labourer Applications API `GET /api/applications/my-applications` listing all jobs applied for with real-time status badges.
- **G5:** Mobile-first Job Feed UI with high-contrast cards displaying daily wage prominently, distance/district, activity badge, dates, and spots remaining.
- **G6:** Single-tap "Apply" button with optimistic UI state changes and withdrawal capability if still pending.
- **G7:** Automated test suite verifying query filter accuracy, deduplication logic, and role restrictions with ≥ 85% coverage.

---

## 3. Non-goals

- In-app payment escrow or advance processing (wages paid directly in v1).
- Real-time GPS device tracking (using administrative district/taluka filtering for rural reliability).
- Farmer decision workflow (covered in PLAN-004).

---

## 4. Approach

### 4.1 Data Model
- `JobApplication` table:
  - `id`: CUID/UUID
  - `jobPostId`: Foreign key to `JobPost`
  - `labourerId`: Foreign key to `LabourerProfile`
  - `workersOffered`: Integer (1 for individual, or crew count if crew leader)
  - `applicantNote`: Optional String
  - `status`: Enum (`PENDING`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`)
  - `createdAt`, `updatedAt`
  - `@@unique([jobPostId, labourerId])`

### 4.2 Query Optimization
- Index `JobPost` on `[status, district, activity, startDate]` to ensure millisecond query execution even on budget databases.
- `GET /api/jobs` filters out closed/cancelled jobs and expired dates by default.

### 4.3 Mobile-First UI/UX
- Designed for low-end Android mobile browsers on 3G/4G rural networks.
- Clean sticky filter bar for District and Farm Activity.
- Prominent rupee symbol (`₹ / day`) and date range displayed on each card.
- Immediate visual confirmation when application is submitted.

---

## 5. Task breakdown

| # | Task | Est. | Depends on |
|---|------|------|------------|
| 1 | Write unit tests for application validation and duplicate submission rejection | 30 min | PLAN-002 |
| 2 | Add `JobApplication` model to Prisma schema with unique constraints and run migration | 30 min | 1 |
| 3 | Implement `GET /api/jobs` search and filter endpoint with pagination | 45 min | 2 |
| 4 | Implement `POST /api/jobs/:id/apply` endpoint (`LABOURER` role only) | 40 min | 2, 3 |
| 5 | Implement `GET /api/applications/my-applications` route handler | 30 min | 4 |
| 6 | Implement `PATCH /api/applications/:id/withdraw` endpoint | 25 min | 4 |
| 7 | Build mobile Job Feed component with filter pills (District, Activity, Min Wage) | 1 hr | 3 |
| 8 | Build Job Detail card with One-Tap "Apply Now" button and confirmation dialog | 45 min | 4, 7 |
| 9 | Build Labourer "My Applications" screen showing status pills | 45 min | 5, 6 |
| 10 | Write integration tests for end-to-end discovery, filtering, and application | 45 min | 7–9 |
| 11 | Update `current_state_report.md` with Feature 3 completion | 15 min | 10 |

---

## 6. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Rapid duplicate submissions from accidental double taps | High | Low | Database unique constraint `(jobPostId, labourerId)` and UI disabled button state |
| Slow filter response on slow mobile networks | Medium | Medium | Paginate feed (10 items/page), select only required columns, and index filter keys |
| Labourers applying to jobs that are already filled | Medium | Medium | Atomically check `JobPost.status === 'OPEN'` before creating application |

---

## 7. Success criteria

- [ ] **G1 verified:** `JobApplication` model created with composite unique constraint on `(jobPostId, labourerId)`.
- [ ] **G2 verified:** `GET /api/jobs?district=Pune&activity=HARVESTING` returns only matching open jobs.
- [ ] **G3 verified:** Labourer can apply to an open job; second application attempt returns 409 Conflict.
- [ ] **G4 verified:** Labourer can fetch their active application list with correct status badges.
- [ ] **G5 verified:** Job cards render cleanly on mobile viewport with prominent wage and location details.
- [ ] **G6 verified:** Submitting an application instantly switches button to "Applied" with optimistic UI.
- [ ] **G7 verified:** Vitest test suite achieves ≥ 85% coverage across job application modules.
- [ ] `current_state_report.md` updated with Feature 3 status.

---

## 8. References

- `AGENT_MD_v1/spec.md` — Feature 3 (Job Discovery, Search & Application)
- `AGENT_MD_v1/plan/plans/PLAN-002_labour_requirement_posting.md`
