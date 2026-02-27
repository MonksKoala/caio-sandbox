# Deployment Workflow

All production deployments require prior approval from the **Director of AI Strategy Alignment**. No exceptions — this applies to bug fixes, feature updates, and any other modifications.

---

## Pre-Deployment Checklist

- [ ] Code reviewed and merged to main branch
- [ ] All tests passing
- [ ] No open blockers or critical bugs
- [ ] Release notes prepared (see [release-notes.md](release-notes.md))
- [ ] Estimate approved if non-routine work (see [estimates-and-budget.md](estimates-and-budget.md))

## 1. Deploy to Staging

- [ ] Push changes to staging environment
- [ ] Verify staging environment mirrors production configuration
- [ ] Run smoke tests on staging
- [ ] Test all affected features end-to-end
- [ ] Verify no regressions in existing functionality
- [ ] Confirm multi-tenant data isolation is intact

## 2. Request Approval

- [ ] Present tested changes to Director of AI Strategy Alignment
- [ ] Include: what changed, why, testing results, release notes
- [ ] Approval channel: `[PLACEHOLDER — Slack/email/ticket]`
- [ ] **Wait for explicit written approval before proceeding**

## 3. Deploy to Production

- [ ] Merge/deploy approved changes to production
- [ ] Monitor application logs for errors (minimum 15 minutes)
- [ ] Verify critical paths: login, project views, data access
- [ ] Confirm uptime monitoring shows green status

## 4. Post-Deployment

- [ ] Finalize and distribute release notes to Director (see [templates/release-note.md](templates/release-note.md))
- [ ] Log time in Clockify (see [time-tracking.md](time-tracking.md))
- [ ] Close related UserSnap tickets (see [ticketing.md](ticketing.md))

## Rollback Procedure

If production deployment causes issues:

1. Immediately revert to the previous working deployment
2. Notify Director of AI Strategy Alignment
3. Investigate root cause on staging
4. File incident report if user-facing impact occurred (see [templates/incident-report.md](templates/incident-report.md))
5. Re-enter this workflow from the top once fixed

---

## Verification

- [ ] No production push happened without Director approval
- [ ] Staging was tested before production deployment
- [ ] Release notes were delivered at time of deployment
- [ ] Time was logged in Clockify
