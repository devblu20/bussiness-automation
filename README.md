# Aaliden — Kinetic Glass

An AI and automation consultancy website built with React, TypeScript, and Vite. The homepage and four service pages are rendered to HTML at build time, then hydrated for the accessible mobile menu. There is no backend or account system.

Service pages are available at `/services/trading/`, `/services/ecommerce/`, `/services/marketing/`, and `/services/operations/`. Their content and shared layout are in `src/ServicePage.tsx`. Homepage practice cards and footer links lead to these pages.

## Local development

Run `npm install`, then `npm run dev`. Open http://127.0.0.1:4173.

Run `npm run build` to check TypeScript, build assets, and pre-render all five pages. `npm run preview` serves the production output after the development server has stopped. Deploy to Vercel using the existing `vercel.json` configuration.

## Editing

- `src/App.tsx`: the full homepage, contact links, and mobile menu.
- `src/content.ts`: descriptions and image references for four practices.
- `src/styles.css`: semantic color tokens, typography, responsive layout, subtle motion, and reduced-motion support.
- `src/main.tsx`: production hydration and development rendering.
- `scripts/prerender.mjs`: complete HTML and page-specific metadata for all five routes during the production build.
- `index.html`: SEO metadata and Sora/Manrope font loading.
- `public/images/`: optimized generated photographs documented in `ASSETS.md`.

The weekly-report before/after is explicitly illustrative, not a customer result. No client names, testimonials, or performance metrics are used. The email button opens Gmail compose directly; the phone button uses a telephone link. Gmail may ask visitors to sign in. Neither link sends a message automatically.

## Search visibility

The production build includes pre-rendered text, page-specific titles, descriptions and canonical URLs under `https://www.aaliden.com/`, Organization and WebSite structured data, social metadata, `robots.txt`, and a five-page `sitemap.xml`. Keep those URLs aligned if the primary domain changes. After deployment, verify the site in Google Search Console, submit `https://www.aaliden.com/sitemap.xml`, and inspect the page URLs. Search indexing and ranking are determined by search engines, not by the build.
