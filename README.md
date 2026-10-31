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
- `src/index.css` — Tailwind entry plus the custom `.gradient-bg`, `.gradient-text`, `.glass-card`, `.custom-shadow`, `.custom-shadow-lg` utilities
- `tailwind.config.js` — brand color and font theme
- `index.html` — meta tags, Open Graph tags, and MedicalOrganization JSON-LD schema
