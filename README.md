# MedAlign Landing Page

React + TypeScript + Tailwind CSS landing page for MedAlign, a patient-to-clinic matching platform.

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 3 with the `brand` theme palette (`royal`, `mint`, `steel`, `gradientBlue`, `grey`, `lightBg`)
- Plus Jakarta Sans (Google Fonts) and FontAwesome 6.4.0 via CDN

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck (tsc -b) + production build to dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Structure

- `src/components/` — one component per page section
- `src/components/Reveal.tsx` — `<Reveal>` wrapper that fades/slides content in when it scrolls into view
- `src/hooks/useReveal.ts` — IntersectionObserver hook powering `Reveal` (also usable directly, e.g. `Navbar`)
- `src/index.css` — Tailwind entry plus the custom `.gradient-bg`, `.gradient-text`, `.glass-card`, `.custom-shadow`, `.custom-shadow-lg` utilities and the `.reveal` animation classes
- `tailwind.config.js` — brand color and font theme
- `index.html` — meta tags, Open Graph tags, and MedicalOrganization JSON-LD schema

## Animations

Entry animations are dependency-free: `Reveal` observes its element and toggles the `is-visible` class, which drives a CSS opacity/transform transition. Props: `as` (rendered tag), `direction` (`up`, `down`, `left`, `right`, `scale`, `fade`), `delay`, `duration`, `threshold`. Nested `Reveal` elements wait for their parent to appear. `prefers-reduced-motion: reduce` disables all motion.
