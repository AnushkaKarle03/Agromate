# PLAN-004: Application Review, Direct Hiring & Alerts

**Created:** 2026-11-23
**Status:** Completed
**Addresses:** Farmers cannot review applicants, accept workers, or reveal direct contact details (phone/WhatsApp) to coordinate farm labour (Feature 4 in `spec.md`).

---

## 1. Context & motivation

The core value proposition of Agromate is connecting farmers directly with workers without middlemen commissions. Once workers apply to a job post, the farmer needs an efficient interface to inspect the applicants (individual labourer vs. crew leader, past agricultural experience, crew size), accept or reject candidates, and establish direct contact.

To protect user privacy and avoid unsolicited phone calls, contact numbers must remain masked until the farmer explicitly accepts the applicant. Once accepted, both parties must have immediate access to verified phone numbers with one-tap "Call Now" and "WhatsApp" action links. Furthermore, once enough workers have been hired to fulfill `workersNeeded`, the job post must automatically transition to `FILLED`.

---

## 2. Goals

- **G1:** API endpoint `GET /api/jobs/:id/applicants` allowing the posting farmer to review all applicants with privacy-masked contact info.
- **G2:** API endpoint `PATCH /api/applications/:id/decision` allowing farmer to `ACCEPT` or `REJECT` applications with atomic capacity updates.
- **G3:** Privacy-preserving contact reveal: applicant phone number is masked (`XXXXXX1234`) until status is `ACCEPTED`; once accepted, both farmer and labourer can view full phone numbers.
- **G4:** Direct communication action triggers: "Call Now" (`tel:...`) and "WhatsApp Message" (`https://wa.me/...`) buttons appear on accepted applicant cards.
- **G5:** Auto-fill lifecycle trigger: when total accepted worker count equals or exceeds `JobPost.workersNeeded`, `JobPost.status` automatically updates to `FILLED`.
- **G6:** In-app notification / status alert on Labourer dashboard displaying application acceptance or rejection updates.
- **G7:** Comprehensive test suite verifying authorization, contact masking logic, atomic status transitions, and auto-close triggers with ≥ 90% coverage.

---

## 3. Non-goals

- In-app VOIP calling or proprietary messaging (direct phone dialer and WhatsApp links are preferred for rural simplicity).
- Payment settlement or escrow transactions (direct cash / UPI payment between farmer and worker).
- Post-work dispute arbitration system (deferred to post-v1).

---

## 4. Approach

### 4.1 Contact Masking & Security
- The serializer utility masks phone numbers by default: `(phone: string) => phone.slice(0, 2) + "******" + phone.slice(-2)`.
- Full phone number is only returned if:
  1. The authenticated user is the job owner AND the application is `ACCEPTED`.
  2. The authenticated user is the applicant labourer AND the application is `ACCEPTED`.
- In all other states (`PENDING`, `REJECTED`), numbers are masked to prevent harvester scraping.

### 4.2 Atomic Acceptance & Capacity Management
- Using Prisma interactive transaction (`prisma.$transaction`):
  1. Verify the calling user owns the job post.
  2. Update application status to `ACCEPTED`.
  3. Sum all accepted workers (`workersOffered`) for this job post.
  4. If sum >= `workersNeeded`, set `JobPost.status = 'FILLED'`.
- Prevents race conditions when multiple applicants are accepted concurrently.

### 4.3 Mobile Action UI
- Farmer applicant view renders worker card with skills, crew size, and action buttons (`Accept` / `Reject`).
- Once accepted, card shifts to green highlight and exposes:
  - `<a href="tel:+91..." className="btn-call">Call Now</a>`
  - `<a href="https://wa.me/91..." className="btn-whatsapp">WhatsApp</a>`
- Labourer "My Applications" screen displays acceptance badge and farmer's direct contact card.

---

## 5. Task breakdown

| # | Task | Est. | Depends on |
|---|------|------|------------|
| 1 | Write unit tests for phone masking helper and acceptance transaction rules | 30 min | PLAN-003 |
| 2 | Implement `GET /api/jobs/:id/applicants` endpoint with role and ownership validation | 40 min | 1 |
| 3 | Implement `PATCH /api/applications/:id/decision` with Prisma interactive transaction and auto-close logic | 45 min | 2 |
| 4 | Implement `GET /api/applications/:id/contact` endpoint verifying accepted status before revealing numbers | 30 min | 3 |
| 5 | Build Farmer Applicant Management Screen with accept/reject buttons | 1 hr | 2, 3 |
| 6 | Build Accepted Worker Contact Card with direct "Call Now" (`tel:`) and "WhatsApp" action links | 45 min | 4, 5 |
| 7 | Build Labourer In-App Status Notification & Farmer Contact Card | 45 min | 4 |
| 8 | Write integration tests covering entire hiring loop: application → acceptance → contact reveal → auto-fill | 45 min | 5–7 |
| 9 | Update `AGENT_MD_v1/plan/current_state_report.md` with Feature 4 completion | 15 min | 8 |

---

## 6. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Overhiring past `workersNeeded` due to rapid parallel accepts | Medium | Medium | Interactive DB transaction locks job record and validates capacity before accepting |
| Accidental disclosure of phone numbers before acceptance | Low | High | Unit tests explicitly verify that serializers mask numbers for all `PENDING` states |
| Invalid phone format causing broken dialer links | Low | Low | Standardize phone numbers to E.164 format (+91XXXXXXXXXX) at registration |

---

## 7. Success criteria

- [ ] **G1 verified:** Farmer can retrieve list of applicants for their job posts; non-owners get 403 Forbidden.
- [ ] **G2 verified:** Farmer can accept or reject an applicant; status transitions execute cleanly.
- [ ] **G3 verified:** Unaccepted applicants have masked phone numbers; accepted applicants reveal full phone number.
- [ ] **G4 verified:** "Call Now" triggers mobile dialer (`tel:`) and "WhatsApp" opens WhatsApp chat link.
- [ ] **G5 verified:** Job post automatically switches to `FILLED` when accepted worker count reaches `workersNeeded`.
- [ ] **G6 verified:** Labourer receives visible alert on dashboard when accepted.
- [ ] **G7 verified:** Vitest test suite achieves ≥ 90% coverage on applicant decision and contact reveal modules.
- [ ] `current_state_report.md` updated with Feature 4 status.

---

## 8. References

- `AGENT_MD_v1/spec.md` — Feature 4 (Application Review, Direct Hiring & Alerts)
- `AGENT_MD_v1/plan/plans/PLAN-003_job_discovery_application.md`
