# Runbook: Backup Recovery Testing

Periodic drill to verify that production backups can be fully restored. Recovery testing is expected on a **regular basis**, not only when a problem occurs.

---

## Frequency

- Recommended: **Monthly**
- Minimum: `[PLACEHOLDER — define with Director]`

## Prerequisites

- [ ] Access to a recent production backup
- [ ] Ability to provision a temporary/isolated database (Neon branch or separate project)
- [ ] Recovery test log template ready: [templates/recovery-test-log.md](../templates/recovery-test-log.md)

## Steps

### 1. Select a backup

Choose the most recent daily backup. Record the backup identifier and date.

### 2. Provision temporary database

```bash
# Create an isolated Neon branch for testing
neonctl branches create --project-id [PROJECT_ID] --name recovery-test-$(date +%Y%m%d) --parent [BACKUP_BRANCH]
```

**Important**: This must be an isolated environment — never restore test data into staging or production.

### 3. Restore the backup

```bash
pg_restore --clean --if-exists --no-owner --no-acl -d [TEMP_CONNECTION_STRING] /path/to/backup.dump
```

### 4. Run data integrity checks

```bash
# Verify key tables exist and have data
psql [TEMP_CONNECTION_STRING] -c "
  SELECT 'users' as tbl, count(*) FROM users
  UNION ALL SELECT 'projects', count(*) FROM projects
  UNION ALL SELECT 'organizations', count(*) FROM organizations
  UNION ALL SELECT 'meetings', count(*) FROM meetings;
"
```

- [ ] All expected tables exist
- [ ] Row counts are reasonable (compare to known production counts)
- [ ] No corruption errors

### 5. Test application connectivity

- [ ] Point a local or test instance of the app at the restored database
- [ ] Verify login works
- [ ] Verify project data loads correctly
- [ ] Verify multi-tenant data isolation intact

### 6. Record results

Fill out [templates/recovery-test-log.md](../templates/recovery-test-log.md) with:
- Pass/fail status
- Time to recover
- Any issues found
- Recommendations

### 7. Tear down temporary database

```bash
neonctl branches delete --project-id [PROJECT_ID] --branch recovery-test-$(date +%Y%m%d)
```

**Important**: Always clean up test databases to avoid unnecessary costs and data exposure.

## Pass/Fail Criteria

| Criteria | Pass | Fail |
|----------|------|------|
| Backup restored without errors | Yes | Any error |
| All tables present | Yes | Missing tables |
| Row counts match production (±1%) | Yes | Significant mismatch |
| Application connects and loads data | Yes | Connection or data errors |
| Recovery completed within 30 minutes | Yes | Exceeded |

## Reporting

- Results sent to Director of AI Strategy Alignment
- Failed tests require immediate investigation and re-test after fix
