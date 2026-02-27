# Tech Stack Reference

Approved technology stack for the CAIO Hub platform. This is a reference document for Phase 2 (application scaffold).

---

## Frontend

| Technology | Purpose |
|-----------|---------|
| React | UI framework |
| TypeScript | Type safety |
| TailwindCSS | Utility-first styling |
| ShadcnUI | Component library |
| TanStack Router | Client-side routing |
| TanStack Query | Server state management and data fetching |

## Backend

| Technology | Purpose |
|-----------|---------|
| Cloudflare Workers | Serverless runtime |
| Hono | API framework |
| Neon Postgres | Database (serverless Postgres) |
| Drizzle ORM | Database ORM and migrations |

## Tooling

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Git | Version control (regular, descriptive commits required) |

## Infrastructure

| Service | Purpose |
|---------|---------|
| Cloudflare | DNS, CDN, Workers hosting, security (rate limiting, IP blocking) |
| Neon | Production and staging Postgres databases |
| UserSnap | Bug reports and feature request ticketing |
| Clockify | Time tracking |
| `[PLACEHOLDER]` | Uptime monitoring |

## Multi-Tenant Architecture

- Authentication system supporting multiple client organizations
- Strict data isolation between tenants at the database query level
- Per-tenant access controls enforced at API middleware layer

---

*This document is a reference for Phase 2 scaffold work. No implementation in Phase 1.*
