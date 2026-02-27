# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Monorepo containing three independent React 19 + Vite 6 apps deployed to GitHub Pages under `/caio-sandbox/`. Each app has its own `package.json`, `node_modules`, and build. No shared package workspace — dependencies are installed per-app with **npm**.

## Apps

| App | Path | Dev Command | Port | Base Path |
|-----|------|-------------|------|-----------|
| **Portfolio** | `apps/portfolio/` | `npm run dev` | 5175 | `/caio-sandbox/` |
| **ICP Qualifier** | `apps/icp-qualifier/` | `npm run dev` | 5174 (frontend) + 3001 (backend) | `/caio-sandbox/icp-qualifier/` |
| **Mastermind Landing** | `site/` | `npm run dev` | 5173 | `/caio-sandbox/site/` |

## Build & Deploy

```bash
# Build a single app (run from its directory)
npm run build

# Build and deploy all apps to GitHub Pages
bash deploy.sh
```

The deploy script builds all three apps, assembles them into `.deploy/`, and pushes via `gh-pages`. Portfolio sits at root, others in subdirectories.

## ICP Qualifier Backend

Requires `ANTHROPIC_API_KEY` in `apps/icp-qualifier/.env` (see `.env.example`). The `npm run dev` command runs both the Vite frontend and Express backend (`server.js`) concurrently. The backend proxies to Claude Sonnet for prospect scoring via `POST /api/score`.

## Tech Stack

- **React 19** — no React Router; all apps use `useState` for page/view switching
- **Tailwind CSS 3** — utility-first styling with custom "Brutalist Signal" theme
- **GSAP 3 + ScrollTrigger** — animations throughout; always clean up GSAP contexts in `useEffect` returns
- **Lucide React** — icon library
- **Express 5** — backend servers for ICP Qualifier and Mastermind Landing

## Design System (Brutalist Signal)

Defined in each app's `tailwind.config.js`:
- **Colors:** `paper` (#E8E4DD), `signal` (#E63B2E), `offwhite` (#F5F3EE), `ink` (#111111)
- **Fonts:** `font-heading` (Space Grotesk), `font-drama` (DM Serif Display), `font-mono` (Space Mono)
- **Pattern:** `NoiseOverlay` SVG filter component is duplicated across all apps for texture

## Architecture Notes

- **No routing library** — apps use React state (`useState`) to switch between views (e.g., `'landing'`, `'apply'`, `'confirmed'`)
- **Mastermind Landing** (`site/src/App.jsx`) is a single monolithic ~1100-line file with all sections inline
- **ICP Qualifier** has a proper component split: `ProspectForm`, `ScoreDisplay`, `HistoryPanel` plus utilities in `src/lib/` (prompt template, score parser, CSV export)
- **Portfolio** uses a tab-based layout: `HeroPanel` (left sidebar) + `ContentZone` (right, switches via `TabNav`)
- **Data persistence** is CSV files written by Express servers (no database)
- **GEMINI.md** at repo root defines the "Cinematic Landing Page Builder" agent spec with 4 aesthetic presets — reference it when building new landing pages
