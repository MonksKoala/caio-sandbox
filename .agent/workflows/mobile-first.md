---
description: Enforce mobile-first approach for all projects
---

# Mobile-First Development Rule

All projects in this workspace **must** follow a mobile-first approach. This is a non-negotiable standard.

## Requirements

1. **CSS breakpoints go upward.** Start with base styles for the smallest screens, then layer on `min-width` media queries (or Tailwind's `sm:`, `md:`, `lg:`, `xl:` prefixes) to enhance for larger viewports. Never write desktop-first styles and override downward with `max-width`.

2. **Layout.** Default layouts must be single-column stacks. Multi-column grids, side-by-side layouts, and horizontal arrangements are added only at `md` (768px) or above.

3. **Typography.** Base font sizes, line heights, and heading scales must be legible and proportionate on a 320px-wide viewport. Scale up at larger breakpoints.

4. **Touch targets.** All interactive elements (buttons, links, form controls) must have a minimum tap target of **44×44px** on mobile.

5. **Images & media.** Use responsive images (`srcset`, `<picture>`, or CSS `object-fit`). Never serve oversized assets to small screens.

6. **Testing order.** Always preview and test the mobile viewport **first** before checking tablet and desktop.

7. **Navigation.** Default to a collapsed/hamburger menu on mobile. Expanded horizontal navbars are only for `md`+ breakpoints.

## Tailwind CSS Specifics (when applicable)

- Write utility classes **unprefixed for mobile**, then add responsive prefixes for larger screens:
  ```html
  <!-- ✅ Correct: mobile-first -->
  <div class="flex flex-col md:flex-row gap-4 md:gap-8">

  <!-- ❌ Wrong: desktop-first thinking -->
  <div class="flex flex-row max-md:flex-col gap-8 max-md:gap-4">
  ```

## Vanilla CSS Specifics (when applicable)

- Structure media queries using `min-width` only:
  ```css
  /* Base: mobile */
  .container { padding: 1rem; }

  /* Tablet and up */
  @media (min-width: 768px) {
    .container { padding: 2rem; }
  }

  /* Desktop and up */
  @media (min-width: 1024px) {
    .container { padding: 3rem; max-width: 1200px; }
  }
  ```

## Enforcement

Before finishing any UI work, verify:
- [ ] Base styles render correctly at 320px width
- [ ] No horizontal scroll on mobile
- [ ] Touch targets meet 44×44px minimum
- [ ] Breakpoints use `min-width` (not `max-width`)
