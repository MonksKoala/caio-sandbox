# Ticketing — UserSnap

All bug reports and feature requests are submitted through **UserSnap**. Timely response and clear communication are required throughout.

---

## Response SLA

- **Maximum response time**: 24 hours from submission
- This is a **minimum standard**, not a target — respond as quickly as possible
- Every ticket must receive an acknowledgment within the SLA

## Ticket Lifecycle

```
New → Acknowledged → In Progress → Resolved → Closed
```

### New
- Ticket submitted via UserSnap
- Timer starts on SLA

### Acknowledged
- Developer confirms receipt within 24 hours
- Include: initial assessment, expected timeline, any questions for the reporter

### In Progress
- Developer actively working on the issue
- Provide status updates if resolution takes more than one business day
- Link to related branches/PRs if applicable

### Resolved
- Fix deployed to staging and verified
- Notify reporter with summary of what was done
- Follow [deployment.md](deployment.md) for production push

### Closed
- Fix confirmed in production
- Reporter satisfied or no response after reasonable follow-up period

## Communication Standards

Each status update should include:
- Current status (which lifecycle stage)
- What has been done since last update
- What is next / expected timeline
- Any blockers or questions

## Escalation

Escalate to Director of AI Strategy Alignment when:
- Resolution requires more than routine maintenance (triggers [estimates-and-budget.md](estimates-and-budget.md))
- Ticket involves a security concern (see [security.md](security.md))
- Reporter is dissatisfied with resolution
- SLA is at risk of being missed

---

## Verification

- [ ] All tickets acknowledged within 24 hours
- [ ] Status updates provided throughout resolution
- [ ] Resolved tickets include summary of changes
- [ ] Escalation triggers are followed when applicable
