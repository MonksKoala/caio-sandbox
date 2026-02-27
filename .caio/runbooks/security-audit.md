# Runbook: Periodic Security Audit

Checklist-driven review of all security controls for the CAIO Hub platform. See [security.md](../security.md) for full requirements.

---

## Frequency

- Recommended: **Monthly**
- Minimum: `[PLACEHOLDER — define with Director]`

## Checklist

### DNS & Cloudflare

- [ ] DMARC record is active and valid (verify via MXToolbox)
- [ ] DKIM record is active and valid
- [ ] Cloudflare proxy enabled (orange cloud) for all public-facing records
- [ ] SSL/TLS mode set to Full (Strict)

### Rate Limiting

- [ ] Login endpoint rate limits are active
- [ ] API endpoint rate limits are active
- [ ] Review rate limit logs for blocked requests — any patterns?
- [ ] Limits are appropriate for current traffic levels

### IP Blocking

- [ ] Review Cloudflare firewall event logs
- [ ] Block list is up to date
- [ ] No legitimate traffic being blocked (check for false positives)

### Multi-Tenant Data Isolation

- [ ] Test: Log in as User A (Org 1), verify cannot see Org 2 data
- [ ] Test: Log in as User B (Org 2), verify cannot see Org 1 data
- [ ] Review API endpoints for proper tenant scoping
- [ ] Check database queries for missing tenant filters

### Authentication & Sessions

- [ ] Session cookies have HttpOnly, Secure, SameSite flags
- [ ] Session expiry is set and enforced
- [ ] Failed login throttling is active
- [ ] Password hashing uses bcrypt or argon2

### Staging Environment

- [ ] Staging has same access controls as production
- [ ] Staging access list reviewed — only authorized team members
- [ ] Staging connection strings are not exposed in code/logs

### Dependencies

```bash
npm audit
```

- [ ] No critical or high vulnerabilities
- [ ] If found: patch, update, or document accepted risk with Director approval

### Access Control

- [ ] Review who has access to production environment
- [ ] Review who has access to staging environment
- [ ] Review who has access to Cloudflare dashboard
- [ ] Review who has access to Neon database console
- [ ] Remove any access that is no longer needed

## Results

- Document findings and any remediations taken
- Report to Director of AI Strategy Alignment
- Track open items until resolved
