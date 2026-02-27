# Time Tracking — Clockify

All time must be logged accurately in **Clockify** with detailed descriptions. This is required for budget oversight and billing.

---

## Requirements

- Log time at the end of each work session (not retroactively days later)
- Every entry must clearly indicate what work was performed
- Logging hours without sufficient detail is **not acceptable**

## Description Standards

Each time entry must include:
- **Task name**: What was worked on (e.g., "Fix login redirect bug")
- **Ticket reference**: UserSnap ticket ID if applicable
- **Context**: Brief description of what was done (e.g., "Debugged session expiry issue, updated middleware, tested on staging")

### Good Example
> `[USN-142] Fix login redirect — Traced issue to expired session cookie, updated middleware to refresh tokens, tested on staging, deployed`

### Bad Example
> `Development work`

## Suggested Tags

| Tag | Use For |
|-----|---------|
| `development` | New feature implementation |
| `bugfix` | Bug fixes and patches |
| `ops` | Infrastructure, backups, monitoring |
| `deployment` | Staging and production deployments |
| `meeting` | Meetings and communication |
| `review` | Code review, testing, QA |

## Budget Connection

- Time entries are used for budget oversight — accuracy directly impacts billing
- Non-routine work must have an approved estimate before starting (see [estimates-and-budget.md](estimates-and-budget.md))
- Actual hours vs. estimated hours are tracked for future estimation accuracy

---

## Verification

- [ ] All work sessions logged in Clockify
- [ ] Descriptions include task name, ticket reference, and context
- [ ] Time logged on the day work was performed
- [ ] Tags applied consistently
