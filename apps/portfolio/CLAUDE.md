# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server on http://localhost:5175
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

Full deploy (all apps): `bash deploy.sh` from repo root. See root `CLAUDE.md` for monorepo overview, design system tokens, and deploy details.

## Architecture

Single-page portfolio with a two-panel layout — `HeroPanel` (left sidebar) + tabbed content area (right). No routing library; a single `activeTab` state in `App.jsx` drives everything.

### Component Tree

```
App.jsx — ErrorBoundary wrapper, owns activeTab state
├── NoiseOverlay — fixed SVG feTurbulence texture (z-9999, pointer-events: none)
└── Layout — flex container, orchestrates GSAP entrance timeline
    ├── HeroPanel — avatar, name, title, bio, StatusDot, CTA button
    │   └── RotatingMotif — decorative spinning SVG (25s rotation)
    └── right panel
        ├── TabNav — Work | Skills | Contact buttons
        └── ContentZone — renders active tab with GSAP transitions
            ├── WorkTab → ProjectCard[]
            ├── SkillsTab → SkillPill[] (grouped by category)
            └── ContactTab → contact links + CTA
```

### Data Layer

All portfolio content lives in `src/data/content.js` as exported constants: `HERO`, `PROJECTS`, `SKILLS`, `CONTACT`. Update content there — components read from these objects, nothing is hardcoded in JSX.

### State Flow

Props-only (no Context, no state library). `App.jsx` holds `activeTab` (`'work'` | `'skills'` | `'contact'`), passes it down through `Layout` → `TabNav` + `ContentZone`.

## GSAP Animation Patterns

All animations use `gsap.context()` inside `useEffect` and return `ctx.revert()` in cleanup. Two key animation sites:

- **Layout.jsx** — page entrance: hero elements stagger in from left (`x: -20...-30`), right panel slides in from right (`x: 20`)
- **ContentZone.jsx** — tab transitions: outgoing tab fades out (`opacity: 0, y: -10`, 0.2s), incoming tab fades in (`opacity: 0→1, y: 12→0`, 0.35s), then child elements stagger in (0.04s delay). All tabs render as absolute overlays; visibility/pointer-events toggled by GSAP.

## Custom CSS (`src/index.css`)

Beyond Tailwind directives, defines: `.btn-magnetic` (hover scale + bg slide), `.hover-lift` (translateY on hover), `.pulse-dot` (StatusDot animation), `.spin-slow` (RotatingMotif), `.content-fade-mask` (gradient mask for mobile overflow), and custom thin scrollbar styling.

## Responsive Layout

Mobile-first. Base layout is single-column with HeroPanel at `h-[30dvh]`; at `md:` breakpoint switches to side-by-side flex with HeroPanel as full-height sidebar. Viewport locked to `100dvh` with `overflow: hidden` on html/body — only tab panels scroll internally (`overflow-y: auto`, `overscroll-behavior: contain`).

## Asset Handling

Avatar at `public/avatar.jpg`, referenced via `import.meta.env.BASE_URL` for correct GitHub Pages path resolution. Google Fonts loaded via `<link>` tags in `index.html`. All icons from `lucide-react`.
