# Security Requirements

The CAIO Hub handles client data across multiple organizations. Security controls must prevent cross-tenant data access, protect against malicious traffic, and apply equally to staging and production environments.

---

## DNS Protection (Cloudflare)

- [ ] **DMARC** record configured and active
- [ ] **DKIM** record configured and active
- [ ] Records verified via MXToolbox or equivalent
- [ ] Setup procedure: [runbooks/dns-setup.md](runbooks/dns-setup.md)

## Rate Limiting

- [ ] Login endpoints: rate limited to `[PLACEHOLDER — e.g., 10 requests/minute per IP]`
- [ ] API endpoints: rate limited to `[PLACEHOLDER — e.g., 100 requests/minute per user]`
- [ ] Rate limit responses return appropriate HTTP 429 status
- [ ] Implemented via Cloudflare rules and/or application middleware

## IP Blocking

- [ ] Malicious traffic detection enabled
- [ ] IP block list maintained in Cloudflare
- [ ] Blocked IPs logged for audit purposes
- [ ] Review frequency: `[PLACEHOLDER — weekly recommended]`

## Multi-Tenant Access Control

This is the most critical security requirement. Users in one client organization must **never** access data belonging to another.

- [ ] Every database query scopes data to the authenticated user's organization
- [ ] API endpoints enforce tenant isolation at the middleware level
- [ ] No endpoint returns data without tenant verification
- [ ] Cross-tenant access is tested for and verified absent (see [runbooks/security-audit.md](runbooks/security-audit.md))

## Session Management & Authentication

- [ ] Secure session tokens (HttpOnly, Secure, SameSite flags)
- [ ] Session expiry configured: `[PLACEHOLDER — e.g., 24 hours]`
- [ ] Passwords hashed with a strong algorithm (bcrypt/argon2)
- [ ] Failed login attempts tracked and throttled
- [ ] Session invalidation on password change

## Staging = Production Security

The staging environment holds real client data. It is **not** a lower-priority environment.

- [ ] Same access controls as production
- [ ] Same authentication requirements
- [ ] Same encryption standards
- [ ] Access strictly limited to authorized team members
- [ ] Access list reviewed and confirmed regularly

See [backup-and-sync.md](backup-and-sync.md) for staging data sync details.

## Vulnerability Management

- [ ] Security vulnerabilities identified and addressed **before** reaching production
- [ ] Dependency audit (`npm audit`) run regularly
- [ ] No known critical/high vulnerabilities in production dependencies
- [ ] Periodic audit: [runbooks/security-audit.md](runbooks/security-audit.md)

---

## Verification

- [ ] DMARC and DKIM records are active and verified
- [ ] Rate limiting is enforced on login and API endpoints
- [ ] Multi-tenant data isolation has been tested
- [ ] Session security flags are correctly configured
- [ ] Staging security matches production
- [ ] No unresolved critical vulnerabilities
