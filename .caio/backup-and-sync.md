# Backup & Daily Data Sync

Daily automated backups of the Neon Postgres production database and a production-to-staging sync are required. The staging environment must mirror production at all times.

---

## Backup Requirements

- **Scope**: All client project data, user records, and platform configuration
- **Database**: Neon Postgres (production)
- **Frequency**: Daily automated backup
- **Retention**: `[PLACEHOLDER — define retention period]`

## Daily Sync: Production → Staging

- **Schedule**: Must complete by **6:00 AM Eastern** every day
- **Purpose**: Staging always reflects current production state for testing, training, and QA
- **Method**: See [runbooks/daily-sync.md](runbooks/daily-sync.md) for step-by-step procedure

### Notification Flow

- **On success**: Confirmation notification sent to Director of AI Strategy Alignment each morning
- **On failure**: Immediate alert triggered
  - Issue must be resolved and reported **before the start of the business day**
  - Follow [runbooks/incident-response.md](runbooks/incident-response.md) if resolution is delayed

### Notification channel: `[PLACEHOLDER — email/Slack/webhook]`

## Staging Security

The staging database holds **real client data** and must be treated with exactly the same security as production:

- [ ] Same access controls as production
- [ ] Same authentication requirements
- [ ] Same encryption standards
- [ ] Access limited to authorized team members only
- [ ] Access list reviewed regularly

See [security.md](security.md) for full security requirements.

## Recovery Testing

Backups are only valuable if they can be restored. Recovery testing must happen on a **regular basis**, not only when problems occur.

- **Frequency**: `[PLACEHOLDER — monthly recommended]`
- **Procedure**: See [runbooks/recovery-testing.md](runbooks/recovery-testing.md)
- **Results**: Logged using [templates/recovery-test-log.md](templates/recovery-test-log.md)

---

## Verification

- [ ] Daily backup is automated and completing successfully
- [ ] Daily sync completes by 6:00 AM ET
- [ ] Director receives confirmation notification each morning
- [ ] Failure alerts are configured and tested
- [ ] Staging DB has identical security posture to production
- [ ] Recovery testing is conducted on schedule
