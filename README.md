# AutoFlow

A responsive React + TypeScript SaaS product frontend, published through Sites. The marketing site and application share one visual system, accessible Radix dialogs, Lucide interface icons, and selected Simple Icons integration marks. Vite produces static assets in `dist`.

## Run

```sh
npm ci
npm run dev
npm run build
```

Routes use hashes so every application view works on static hosting. Start at `#/`, `#/login`, `#/register`, or `#/app/overview`.

## Implemented frontend

- Marketing sections, interactive workflow sequence, solution dialogs, agent cards, integration search, ROI estimator, pricing, fictional testimonials, FAQ, and locally saved demo inquiry drafts.
- Login/register forms validate sample input and enter the demo. No credentials are stored or sent.
- Workspace overview, searchable and paginated automation management, create/duplicate/pause/delete operations, notifications, and activity.
- Visual builder with drag-and-drop, keyboard-accessible reorder controls, configurable steps, branch threshold testing, simulated failures, and local saving.
- AI agent controls and instructions, simulated integration connections, analytics period controls, CSV report export, profile/settings, JSON workflow export, and illustrative billing plans.
- Responsive layouts, persistent dark mode, reduced-motion support, form validation, empty states, progress states, and toast feedback.

## Data and production boundary

This is an interactive **frontend demo**, not a deployed automation backend. Example business metrics and testimonials are fictional and labeled. Browser localStorage holds demo state under `af-*` keys. Reset demo data through Settings. No real OAuth grants, emails, scheduled jobs, AI requests, payments, or meeting bookings occur.

The 1,000 integration figure is a roadmap target; 16 providers are demonstrated. SOC 2, SSO, permissions, encryption controls, and production audit logging are roadmap items, not certifications or implemented security guarantees.

## Proposed production architecture

Use a Node or FastAPI service with PostgreSQL for tenants, users, workflow versions, agents, integration metadata, and run records. Use a durable queue and separate workers for scheduled/event-driven runs, retry policies, idempotency, and step results. Authenticate through a managed identity provider; enforce tenant and role checks server-side. Store provider tokens in an encrypted secrets service, never browser localStorage.

Expose authenticated REST endpoints for workflow CRUD, versioned execution, run history, agents, integration authorization, usage, and billing. Validate webhook signatures and apply rate limits. Call the AI provider from workers with bounded tool permissions and human review for consequential actions. Connect a payment provider and verify subscription webhooks before enforcing plan entitlements. These services are not included in this static preview.

## Validation

Production build includes strict TypeScript checking. Browser QA covers desktop and mobile layouts, dark mode, workflow creation/persistence and step editing, successful/review/failed test runs, simulated integration connections, ROI updates, and responsive navigation.
