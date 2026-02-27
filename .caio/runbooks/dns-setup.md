# Runbook: Cloudflare DMARC/DKIM Configuration

Step-by-step guide for configuring DNS email protection records in Cloudflare.

---

## Prerequisites

- [ ] Access to Cloudflare dashboard for the domain
- [ ] Domain: `[PLACEHOLDER — e.g., caiohub.com]`
- [ ] Email service provider DKIM values (if using a third-party email service)

## DMARC Setup

DMARC (Domain-based Message Authentication, Reporting & Conformance) protects against email spoofing.

### 1. Navigate to DNS

- Log into Cloudflare dashboard
- Select the domain
- Go to **DNS** → **Records**

### 2. Add DMARC record

| Field | Value |
|-------|-------|
| Type | TXT |
| Name | `_dmarc` |
| Content | `v=DMARC1; p=quarantine; rua=mailto:[PLACEHOLDER]@[DOMAIN]; pct=100` |
| TTL | Auto |

**Policy options:**
- `p=none` — Monitor only (start here if first setup)
- `p=quarantine` — Suspicious emails go to spam
- `p=reject` — Reject unauthorized emails (strongest, use after monitoring period)

### 3. Verify DMARC

```bash
dig TXT _dmarc.[DOMAIN]
```

Or verify at: https://mxtoolbox.com/dmarc.aspx

## DKIM Setup

DKIM (DomainKeys Identified Mail) adds a cryptographic signature to outbound emails.

### 1. Get DKIM values from email provider

Your email service (e.g., Google Workspace, SendGrid, Postmark) will provide:
- A selector name (e.g., `google`, `s1`, `default`)
- A TXT record value (long string starting with `v=DKIM1;`)

### 2. Add DKIM record in Cloudflare

| Field | Value |
|-------|-------|
| Type | TXT |
| Name | `[SELECTOR]._domainkey` |
| Content | `[VALUE FROM EMAIL PROVIDER]` |
| TTL | Auto |

### 3. Verify DKIM

```bash
dig TXT [SELECTOR]._domainkey.[DOMAIN]
```

Or verify at: https://mxtoolbox.com/dkim.aspx

## SPF Record (Recommended Companion)

While not explicitly required, SPF complements DMARC/DKIM:

| Field | Value |
|-------|-------|
| Type | TXT |
| Name | `@` |
| Content | `v=spf1 include:[EMAIL_PROVIDER_SPF] ~all` |
| TTL | Auto |

## Post-Setup

- [ ] Wait for DNS propagation (up to 48 hours, usually minutes)
- [ ] Verify all records with MXToolbox
- [ ] Send test email and check headers for DMARC/DKIM pass
- [ ] Document configuration in security audit records

## Maintenance

- Review records during each security audit (see [security-audit.md](security-audit.md))
- Update DKIM records if email provider changes
- Escalate DMARC policy from `none` → `quarantine` → `reject` over time
