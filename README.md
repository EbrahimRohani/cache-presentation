# Frontend Stack Evaluation

An internal technical presentation for evaluating the frontend stack of a new redesign project, with a primary focus on React Router and Next.js.

The audience includes frontend engineers, the CTO, and directors. The application is intentionally structured as a presentation deck: every top-level section has its own route, and navigation moves through the sections in a fixed sequence.

## Project status

The presentation framework is implemented, including routing, shared presentation chrome, keyboard controls, responsive behavior, and isolated section directories.

The research content is still in progress. Current pages contain explicit TODO placeholders; they do not contain fabricated benchmark values, framework scores, technical conclusions, or a final recommendation.

## Presentation sections

| # | Section | Route |
|---:|---|---|
| 1 | Requirements Definition | `/requirements` |
| 2 | Framework Discovery | `/framework-discovery` |
| 3 | Ecosystem & Credibility | `/ecosystem-credibility` |
| 4 | Feature Comparison | `/feature-comparison` |
| 5 | Cache Comparison | `/cache-comparison` |
| 6 | Benchmark & Demo Analysis | `/benchmark-analysis` |
| 7 | Developer Experience | `/developer-experience` |
| 8 | Conclusion | `/conclusion` |

Visiting `/` redirects to `/requirements`.

## Presentation controls

- Use **Previous** and **Next** to move through sections.
- Use the section selector to jump directly to another section.
- Press <kbd>ArrowRight</kbd> to move forward.
- Press <kbd>ArrowLeft</kbd> to move backward.
- Browser Back and Forward navigation continue to work normally.

Keyboard shortcuts are ignored while an input, textarea, select, or editable element has focus. Navigation stops at the first and final sections rather than wrapping.

## Technology

- React 19
- React Router 8 in Framework Mode
- TypeScript
- Vite
- Tailwind CSS 4
- Server-side rendering through React Router

The project deliberately avoids presentation, animation, charting, and global state libraries until a concrete requirement justifies one.

## Getting started

### Prerequisites

- Node.js 20.19 or newer (Node.js 22.12 or newer is recommended)
- npm

### Install dependencies

```bash
npm install
```

For a clean, lockfile-based installation, use:

```bash
npm ci
```

### Start development

```bash
npm run dev
```

The development server is available at `http://localhost:5173` by default.

### Validate the project

```bash
npm run typecheck
npm run build
```

### Run the production build

```bash
npm run build
npm run start
```

## Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run typecheck` | Generate React Router types and run TypeScript checks |
| `npm run build` | Create the client and server production bundles |
| `npm run start` | Serve an existing production build |

## Architecture

```text
app/
  app.css                    Global theme tokens and base styles
  root.tsx                   HTML document, metadata, and root error boundary
  routes.ts                  Registry-derived React Router configuration

  presentation/
    registry.ts              Ordered section navigation metadata
    index.tsx                Redirect from / to the first section
    layout.tsx               Pathless route that mounts the shared shell
    README.md                Section ownership rules

    shared/                  Stable presentation-wide infrastructure
      placeholder-panel.tsx
      presentation-navigation.ts
      presentation-shell.tsx
      section-page.tsx
      use-presentation-keyboard-navigation.ts

    requirements/
      page.tsx
    framework-discovery/
      page.tsx
      ...local components and data
    ecosystem-credibility/
      page.tsx
    feature-comparison/
      page.tsx
      ...local components and data
    cache-comparison/
      page.tsx
      ...local components and data
    benchmark-analysis/
      page.tsx
      ...local components and data
    developer-experience/
      page.tsx
      ...local components and data
    conclusion/
      page.tsx
```

### Route registry

`app/presentation/registry.ts` is the canonical ordered list of top-level sections. It contains navigation metadata only:

- `id`
- `title`
- `path`

The array position defines presentation order. A separate numeric order is intentionally omitted to avoid two sources of truth.

`app/routes.ts` derives route modules using this convention:

```text
app/presentation/<section-id>/page.tsx
```

As a result, editing an existing section never requires a router change.

## Contributor workflow

Each top-level section is an independent ownership boundary. A contributor working on one section should normally change only:

```text
app/presentation/<section-id>/**
```

Within a section, create directories only when they are needed:

```text
<section-id>/
  page.tsx
  components/                Section-specific React components
  data/                      Typed research, table, and chart data
  assets/                    Images, diagrams, and raw visual assets
  styles.module.css          Optional section-specific complex styling
```

Do not create empty directories or placeholder barrel files.

### Dependency boundaries

| Keep shared | Keep section-local |
|---|---|
| Presentation shell and controls | Research content |
| Sequential navigation | Comparison tables and their data |
| Progress and section selection | Charts and chart configuration |
| Common page spacing and typography | Diagrams and images |
| Proven reusable primitives | Code examples and speaker notes |

Additional rules:

- Sections may import from `presentation/shared`.
- Shared code must never import from a section.
- One section must not import from another section.
- Do not place section content in the navigation registry.
- Do not create a global component switch or a central content object.
- Promote a component to `shared` only after genuine reuse exists.
- Avoid unrelated formatting or file movement in another contributor's section.

These boundaries keep parallel work merge-friendly and make ownership obvious during review.

## Adding or reordering a top-level section

Adding a new top-level section is an architectural change rather than ordinary content work.

1. Add one entry to `app/presentation/registry.ts` in the desired order.
2. Create `app/presentation/<section-id>/page.tsx`.
3. Confirm the route path and sequential navigation.
4. Run type checking and a production build.

No manual route entry is required because route configuration is derived from the registry.

To reorder sections, move the registry entries. Previous, Next, progress, and the jump selector all follow registry order automatically.

## Content guidelines

- Use verified research and reproducible benchmark results.
- Keep source data close to the section that presents it.
- Clearly distinguish observations from interpretation and recommendation.
- Do not add sample numbers that could be mistaken for actual results.
- Use explicit TODO labels while evidence is missing.
- Prefer concise, projector-readable content over dense application-style UI.
- Keep tables, charts, and diagrams scannable from a distance.
- Preserve the neutral comparison framing until the conclusion is supported.

## Styling guidelines

The shared visual system is a deterministic, high-contrast light theme defined in `app/app.css`. It uses system fonts so the presentation does not depend on external font services or network access.

- Use existing semantic theme colors such as `canvas`, `surface`, `heading`, `body`, `muted`, `border`, and `accent`.
- Keep global CSS limited to presentation-wide tokens and base behavior.
- Prefer Tailwind utilities for ordinary layout and typography.
- Use a section-local CSS Module when a complex visualization needs dedicated styles.
- Optimize first for wide laptop and projector displays, then ensure the page remains usable on narrow screens.

The shared shell owns the viewport. Section content may scroll inside it, and changing routes resets the content region to the top.

## Assets and data

Store section-specific assets beside their section and import them through Vite. Use `public/` only for application-wide files such as the favicon.

Prefer typed TypeScript modules for hand-authored presentation data. JSON is appropriate for generated or raw benchmark output. For benchmark work, keep raw measurements separate from the summarized values used in the presentation.

## Verification checklist

Before submitting a section change:

1. Run `npm run typecheck`.
2. Run `npm run build` when changing routes, shared infrastructure, assets, or build behavior.
3. Open the affected route directly.
4. Check the page at a wide projector-style viewport and a narrow viewport.
5. Confirm Previous, Next, section jumping, and keyboard navigation still work.
6. Confirm the first and final navigation boundaries remain disabled.
7. Confirm no placeholder value could be mistaken for real research.

Do not edit generated files under `.react-router/types`; they are regenerated by React Router.

## Local Codex task queue

Local implementation specs live under `codex_tasks/` and are intentionally gitignored. A fresh Codex session should select the first unblocked task from `codex_tasks/undone/`, satisfy its acceptance criteria, run its verification commands, and move it to `codex_tasks/done/` only after completion.

Because this queue is local, it is not a substitute for team-visible issues or merge-request tracking.
