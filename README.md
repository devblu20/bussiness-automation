# Aaliden — Kinetic Glass

A single-page AI and automation consultancy website built with React, TypeScript, and Vite. The production homepage is rendered to HTML at build time, then hydrated for the accessible mobile menu. There is no backend or account system.

## Local development

Run `npm install`, then `npm run dev`. Open http://127.0.0.1:4173.

Run `npm run build` to check TypeScript, build assets, and pre-render the homepage. `npm run preview` serves the production output after the development server has stopped. Deploy to Vercel using the existing `vercel.json` configuration.

## Editing

- `src/App.tsx`: the full homepage, contact links, and mobile menu.
- `src/content.ts`: descriptions and image references for four practices.
- `src/styles.css`: semantic color tokens, typography, responsive layout, subtle motion, and reduced-motion support.
- `src/main.tsx`: production hydration and development rendering.
- `scripts/prerender.mjs`: complete homepage HTML during the production build.
- `index.html`: SEO metadata and Sora/Manrope font loading.
- `public/images/`: generated photographs documented in `ASSETS.md`.

The weekly-report before/after is explicitly illustrative, not a customer result. No client names, testimonials, or performance metrics are used. The email button opens Gmail compose directly; the phone button uses a telephone link. Gmail may ask visitors to sign in. Neither link sends a message automatically.
