# Aaliden — Editorial Index

A single-page AI and automation consultancy website built with React, TypeScript, and Vite. The production homepage is rendered to HTML at build time, then hydrated for the mobile menu and subtle motion. There is no backend or account system.

## Local development

Run `npm install`, then `npm run dev`. Open http://127.0.0.1:4173.

Run `npm run build` to check TypeScript, build assets, and pre-render the homepage. `npm run preview` serves the production output after the development server has stopped. Deploy to Vercel using the existing `vercel.json` configuration.

## Editing

- `src/App.tsx`: complete homepage, contact details, accessible mobile menu, and native reveal/parallax effects.
- `src/content.ts`: service descriptions and photo references.
- `src/styles.css`: semantic color tokens, editorial layout, responsive rules, and reduced-motion styles.
- `src/main.tsx`: production hydration and development rendering.
- `scripts/prerender.mjs`: generates complete homepage HTML during the production build.
- `index.html`: SEO metadata and Space Grotesk font loading.
- `public/`: local photography and favicon; sources are documented in `ASSETS.md`.

The website uses one consistent navy theme. The cream approval card is an illustrative editorial accent, not a live approval system. Photos share a cool tonal treatment. Grain is a static SVG texture. Reveals progressively enhance readable HTML; labels and parallax stop for reduced motion. Hero animation pauses when offscreen or the tab is hidden. No animation libraries are used.

The email address opens a Gmail compose window; the phone number uses a telephone link. Gmail may ask visitors to sign in. Neither link sends a message automatically.
