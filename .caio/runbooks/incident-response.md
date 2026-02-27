# Runbook: Incident Response

What to do when the CAIO Hub experiences an outage, degraded performance, or critical issue.

---

## Severity Levels

| Level | Definition | Examples |
|-------|-----------|----------|
| **P1** | Platform down or data at risk | Full outage, database unreachable, data breach |
| **P2** | Degraded functionality | Slow responses, partial feature failure, login issues |
| **P3** | Minor issue, no user impact | Cosmetic bug, non-critical log errors |

## Detection

Incidents may be detected via:
- Uptime monitoring alerts (see [uptime-monitoring.md](../uptime-monitoring.md))
- Daily sync failure (see [backup-and-sync.md](../backup-and-sync.md))
- UserSnap ticket from affected user (see [ticketing.md](../ticketing.md))
- Direct observation during development

## Response Steps

### 1. Acknowledge

- Note the time the incident was detected
- Begin a timeline (will be used in the incident report)

### 2. Assess severity

- Determine P1, P2, or P3 based on the table above
- Check: Is user data at risk? Is the platform accessible? How many users affected?

### 3. Notify

| Severity | Notification |
|----------|-------------|
| **P1** | Immediately notify Director of AI Strategy Alignment |
| **P2** | Notify Director within 30 minutes |
| **P3** | Include in next status update or ticket response |

Channel: `[PLACEHOLDER — Slack/email/phone for P1]`

### 4. Diagnose

- Check application logs
- Check Cloudflare dashboard for traffic anomalies
- Check Neon database status
- Check recent deployments (was anything just pushed?)
- Check uptime monitoring history

### 5. Resolve

**Option A — Quick fix**: If the issue is clear and fixable, apply the fix to staging first, verify, then deploy to production per [deployment.md](../deployment.md).

**Option B — Rollback**: If a recent deployment caused the issue, immediately rollback to the previous version.

**Option C — Infrastructure**: If the issue is Cloudflare/Neon infrastructure, check their status pages and escalate with their support.

### 6. Verify resolution

- [ ] Platform is accessible
- [ ] Affected functionality is working
- [ ] Uptime monitoring shows green
- [ ] No ongoing error patterns in logs

### 7. Post-incident report

- Complete [templates/incident-report.md](../templates/incident-report.md)
- Deliver to Director of AI Strategy Alignment
- Include: timeline, root cause, resolution, preventive action items

## Communication Cadence During Active Incident

| Severity | Update Frequency |
|----------|-----------------|
| **P1** | Every 30 minutes until resolved |
| **P2** | Every 60 minutes until resolved |
| **P3** | At resolution |

Updates go to Director via: `[PLACEHOLDER — channel]`
