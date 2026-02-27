# Release Notes

Every production deployment must be accompanied by release notes documenting all changes. This is completed **at the time of each deployment**, not batched after the fact.

---

## When to Write

- Every production push, regardless of size
- Bug fixes, feature updates, configuration changes — all documented

## Audience

- **Primary**: Director of AI Strategy Alignment
- **Secondary**: Development team and stakeholders

## Content Requirements

Each release note must include:
- Date and version/identifier
- Who deployed and who approved
- List of changes (features, improvements)
- List of bug fixes
- Database changes (if any)
- Confirmation that staging was tested

## Template

Use [templates/release-note.md](templates/release-note.md) for every deployment.

## Distribution

- Deliver to Director of AI Strategy Alignment at time of deployment
- Channel: `[PLACEHOLDER — email/Slack/shared drive]`
- Archive: `[PLACEHOLDER — location for historical release notes]`

---

## Verification

- [ ] Release notes completed at time of deployment (not retroactively)
- [ ] All changes, fixes, and DB modifications documented
- [ ] Director received the release notes
- [ ] Template was used for consistent formatting
