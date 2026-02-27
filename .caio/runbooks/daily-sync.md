# Runbook: Daily Production → Staging Sync

Copies the production Neon Postgres database to the staging database. Must complete by **6:00 AM Eastern** every day.

---

## Prerequisites

- [ ] Access to Neon dashboard or CLI for both production and staging projects
- [ ] Neon API key: `[PLACEHOLDER]`
- [ ] Production database connection string: `[PLACEHOLDER]`
- [ ] Staging database connection string: `[PLACEHOLDER]`
- [ ] Notification channel configured: `[PLACEHOLDER — email/Slack webhook]`

## Steps

### 1. Create production backup

```bash
# Using Neon CLI or API
# [PLACEHOLDER — exact command depends on Neon project setup]
neonctl branches create --project-id [PROD_PROJECT_ID] --name backup-$(date +%Y%m%d)
```

**Expected**: Backup branch created successfully.
**On failure**: Check Neon dashboard for service status. Retry once. If still failing, trigger failure alert (Step 6).

### 2. Export production data

```bash
pg_dump [PRODUCTION_CONNECTION_STRING] --format=custom --no-owner --no-acl > /tmp/prod-backup-$(date +%Y%m%d).dump
```

**Expected**: Dump file created without errors.
**On failure**: Check connection string, verify production DB is accessible. Check disk space.

### 3. Restore to staging database

```bash
pg_restore --clean --if-exists --no-owner --no-acl -d [STAGING_CONNECTION_STRING] /tmp/prod-backup-$(date +%Y%m%d).dump
```

**Expected**: Staging database updated with production data.
**On failure**: Check staging connection, verify staging DB is accessible. May need to drop and recreate schema first.

### 4. Verify staging data

```bash
# Compare row counts on key tables
psql [STAGING_CONNECTION_STRING] -c "SELECT 'users' as tbl, count(*) FROM users UNION ALL SELECT 'projects', count(*) FROM projects UNION ALL SELECT 'organizations', count(*) FROM organizations;"
```

**Expected**: Row counts match production (within reason for any in-flight transactions).
**On failure**: Re-run restore. If persistent mismatch, investigate specific tables.

### 5. Run staging smoke tests

- [ ] Application loads on staging URL
- [ ] Login works with test credentials
- [ ] Project data visible and correct
- [ ] Multi-tenant isolation intact (spot-check 2 organizations)

### 6. Send confirmation or failure alert

**On success**:
```
To: Director of AI Strategy Alignment
Subject: [CAIO Hub] Daily sync completed — [DATE]
Body: Production → staging sync completed successfully at [TIME] ET. Staging data verified.
```

**On failure**:
```
To: Director of AI Strategy Alignment
Subject: [URGENT] [CAIO Hub] Daily sync FAILED — [DATE]
Body: Production → staging sync failed at step [N]. Error: [details]. Investigating immediately.
```

### 7. Clean up

```bash
rm /tmp/prod-backup-$(date +%Y%m%d).dump
```

## Automation

This process should be automated via:
- **Option A**: GitHub Actions scheduled workflow (cron: `0 10 * * *` UTC = 5:00 AM ET)
- **Option B**: Cloudflare Worker cron trigger
- **Option C**: Neon's built-in branching/restore features

The manual steps above serve as the reference and fallback procedure.

## Timing

| Step | Expected Duration |
|------|-------------------|
| Backup | ~2 minutes |
| Export | ~5-10 minutes (depends on DB size) |
| Restore | ~5-10 minutes |
| Verify | ~2 minutes |
| Total | ~15-25 minutes |

Start by **5:30 AM ET** at the latest to meet the 6:00 AM deadline.
