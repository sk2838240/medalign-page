# MedAlign Landing Page

React + TypeScript + Tailwind CSS landing page for MedAlign, a patient-to-speciality-clinic matching platform for med spas and cosmetic clinics.

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
npm run images   # re-download, crop and encode the site photography
```

## Images

Stock photography is sourced from [Pexels](https://www.pexels.com/license) (free commercial use, no attribution required) and encoded to WebP by `npm run images`. Supplied section imagery is used directly from `public/`.

- `public/images.jpeg` — About section image.
- `public/professiionals.webp` — Hero section image.

- `scripts/images.manifest.json` — the source of truth: source URL, fallback URL, photographer credit, target dimensions, WebP quality and byte budget per slot.
- `scripts/build-images.mjs` — downloads each source, crops with `sharp`'s attention strategy, encodes to WebP, fails the build if a slot exceeds its byte budget, composes `public/og-image.jpg`, and regenerates `src/assets/images/index.ts`.
- `src/assets/images/index.ts` — generated. Exports `siteImages` with the resolved URL, intrinsic `width`/`height` and alt text for every slot, so components cannot drift from the encoded file.
- `src/components/SectionImage.tsx` — the shared `<img>` primitive. Always emits `width`/`height` (no layout shift), lazy-loads by default, and supports decorative usage via `decorative`.
- `scripts/image-sources.log.md` — photographer credits and Pexels detail-page links for every photo.

## Brand logo

- `public/logo-final.png` — full-colour navigation mark used in the header.
- `public/footer-logo.png` — full-colour footer lockup used in the footer.
- `public/favicon.png` — square favicon generated from the navigation mark.

## Contact and chat

- `src/contactConfig.ts` — official business phone number, WhatsApp link, and FormSubmit lead recipient. Add the phone number to `businessPhone` when available.
- `src/components/FloatingActions.tsx` — fixed Call, WhatsApp, and AI Chat actions. The assistant collects contact details one field at a time and submits the lead through FormSubmit.

## Structure

- `src/components/` — one component per page section
- `src/components/VideoSection.tsx` — centred vertical video section (placed after `HowItWorks`). It plays `public/videos/Medalign Reel-1.mp4` in a `9:16` frame through a centered play control.
- `src/components/Reveal.tsx` — `<Reveal>` wrapper that fades/slides content in when it scrolls into view
- `src/components/SectionImage.tsx` — `<SectionImage>` wrapper that renders site photography with intrinsic dimensions, lazy loading and optional decorative mode
- `src/hooks/useReveal.ts` — IntersectionObserver hook powering `Reveal` (also usable directly, e.g. `Navbar`)
- `src/index.css` — Tailwind entry plus the custom `.gradient-bg`, `.gradient-text`, `.glass-card`, `.custom-shadow`, `.custom-shadow-lg` utilities and the `.reveal` animation classes
- `tailwind.config.js` — brand color and font theme
- `index.html` — meta tags, Open Graph tags, and MedicalOrganization JSON-LD schema

## Animations

Entry animations are dependency-free: `Reveal` observes its element and toggles the `is-visible` class, which drives a CSS opacity/transform transition. Props: `as` (rendered tag), `direction` (`up`, `down`, `left`, `right`, `scale`, `fade`), `delay`, `duration`, `threshold`. Nested `Reveal` elements wait for their parent to appear. `prefers-reduced-motion: reduce` disables all motion.
