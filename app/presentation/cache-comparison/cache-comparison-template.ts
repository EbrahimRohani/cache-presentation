export const ssrDocumentFlow = [
  {
    number: "01",
    title: "Document request",
    description: "The browser requests a route URL.",
  },
  {
    number: "02",
    title: "Matched loaders",
    description: "Server loaders for the matched route branch run before rendering.",
  },
  {
    number: "03",
    title: "Render + serialize",
    description: "React Router renders the route tree and serializes loader data for hydration.",
  },
  {
    number: "04",
    title: "HTML document",
    description: "The server returns HTML; the browser hydrates it into an interactive router.",
  },
] as const;

export const clientNavigationFlow = [
  {
    number: "01",
    title: "Match the next URL",
    description: "The client router resolves the destination route branch.",
  },
  {
    number: "02",
    title: "Fetch route data",
    description: "React Router automatically calls the server for loader data.",
  },
  {
    number: "03",
    title: "Update router state",
    description: "The new loader results replace the relevant in-memory route data.",
  },
  {
    number: "04",
    title: "Render in place",
    description: "React updates the route tree without downloading a full HTML document.",
  },
] as const;

export const loaderDataLocations = [
  {
    label: "On the server",
    value:
      "Loader results are request-scoped. For the first document they are serialized into the server response.",
  },
  {
    label: "In the browser",
    value:
      "Hydration and navigation results live in the router's in-memory state, keyed by route ID as loaderData.",
  },
  {
    label: "What it is not",
    value:
      "It has no built-in TTL, is not shared across users, and is not a durable HTML or database cache.",
  },
] as const;

export const externalCacheLayers = [
  {
    title: "HTTP / CDN",
    description:
      "Use Cache-Control, validators, and a CDN for public response caching.",
    examples: "s-maxage · stale-while-revalidate · ETag",
  },
  {
    title: "Server / data source",
    description:
      "Cache expensive queries or computed results in Redis, the database, or a platform cache.",
    examples: "Redis · database cache · edge KV",
  },
  {
    title: "Browser",
    description:
      "Use clientLoader with an explicit storage and invalidation policy when client caching is required.",
    examples: "memory · IndexedDB · localStorage · Query cache",
  },
] as const;

export const mutationFlow = [
  "Form / fetcher submission",
  "action or clientAction mutation",
  "Successful action response",
  "Page loader data revalidated",
  "Fresh results committed to the UI",
] as const;

export const prefetchModes = [
  {
    value: "none",
    trigger: "Never",
    use: "Default; no data or module prefetching.",
  },
  {
    value: "intent",
    trigger: "Hover or focus",
    use: "Good general choice: fetch only when the user signals intent.",
  },
  {
    value: "render",
    trigger: "Link renders",
    use: "Aggressive: useful for a small set of highly likely destinations.",
  },
  {
    value: "viewport",
    trigger: "Link enters viewport",
    use: "Useful for mobile lists where hover does not exist.",
  },
] as const;

export const prerenderFlow = [
  {
    number: "01",
    title: "Select URLs",
    description: "prerender receives true, a path list, or a function that returns paths.",
  },
  {
    number: "02",
    title: "Build creates requests",
    description: "The build makes a Request for each URL and runs the normal matched loaders.",
  },
  {
    number: "03",
    title: "Emit static artifacts",
    description: "Each path gets an .html document and a .data payload for client navigation.",
  },
] as const;

export const isrFlow = [
  "CDN receives a public route request",
  "Fresh entry: serve immediately",
  "Stale entry: serve stale and revalidate in the background",
  "Runtime SSR origin renders a new document and data response",
  "CDN replaces the cached document and data variants",
] as const;

export const manifestFacts = [
  {
    label: "What it is",
    value:
      "A versioned map of the route tree and its build metadata—not application or loader data.",
  },
  {
    label: "What it contains",
    value:
      "Route IDs, paths, parent/index relationships, loader/action flags, and JavaScript/CSS import metadata.",
  },
  {
    label: "Where it comes from",
    value:
      "React Router derives it at build time from routes.ts (or file routes) plus the Vite asset graph.",
  },
  {
    label: "How the browser gets it",
    value:
      "Initial SSR includes the needed branch. Lazy discovery patches missing routes through /__manifest.",
  },
] as const;

export const rscRequestFlow = [
  {
    title: "Document request",
    description:
      "The RSC server produces a component payload; the SSR layer turns it into initial HTML.",
  },
  {
    title: "Client navigation",
    description:
      "The browser requests server component output and merges the RSC payload without replacing the document.",
  },
  {
    title: "Server Function",
    description:
      "After a mutation, React Router automatically revalidates the route and returns updated server content.",
  },
] as const;

export const rscComparison = [
  {
    criterion: "Framework status",
    reactRouter:
      "RSC Framework Mode is unstable and uses the React Router RSC + Vite RSC plugins.",
    nextJs:
      "RSC is the native rendering model of the App Router and integrated with Cache Components.",
  },
  {
    criterion: "Persistent output cache",
    reactRouter:
      "No built-in cacheLife/tag/path cache for Server Component output or RSC payloads.",
    nextJs:
      "use cache, cacheLife, cacheTag, route output caching, and ISR are framework-managed.",
  },
  {
    criterion: "CDN caching",
    reactRouter:
      "Possible through standard HTTP policy when the response is public and the cache key separates response variants.",
    nextJs:
      "Static and ISR RSC variants are cacheable; the CDN must preserve Next's variant keys and Cache-Control behavior.",
  },
  {
    criterion: "Invalidation",
    reactRouter:
      "Route revalidation refreshes content; purging a persistent CDN/server cache is application infrastructure work.",
    nextJs:
      "revalidateTag/revalidatePath update the Next server cache; an external CDN may still need its own purge.",
  },
] as const;

export const backForwardFacts = [
  {
    title: "SPA history navigation",
    description:
      "Back/Forward produces a POP navigation. In SSR Framework Mode, matched loaders revalidate by default.",
  },
  {
    title: "No route snapshot guarantee",
    description:
      "React Router does not promise a persistent per-history-entry data cache comparable to Next's Router Cache.",
  },
  {
    title: "What may still be reused",
    description:
      "A still-matched route can retain loaderData when shouldRevalidate returns false; HTTP or custom caches may also hit.",
  },
  {
    title: "Browser bfcache is separate",
    description:
      "For full-document history, the browser may restore an entire page from bfcache. React Router does not control it.",
  },
] as const;

export const cacheSources = [
  {
    label: "React Router — Data Loading",
    href: "https://reactrouter.com/start/framework/data-loading",
  },
  {
    label: "React Router — Route Module / shouldRevalidate",
    href: "https://reactrouter.com/start/framework/route-module#shouldrevalidate",
  },
  {
    label: "React Router — Actions",
    href: "https://reactrouter.com/start/framework/actions",
  },
  {
    label: "React Router — Link prefetch",
    href: "https://reactrouter.com/api/components/Link#prefetch",
  },
  {
    label: "React Router — Pre-rendering",
    href: "https://reactrouter.com/how-to/pre-rendering",
  },
  {
    label: "React Router — Lazy Route Discovery",
    href: "https://reactrouter.com/explanation/lazy-route-discovery",
  },
  {
    label: "React Router — RSC (unstable)",
    href: "https://reactrouter.com/how-to/react-server-components",
  },
  {
    label: "Next.js — Caching with Cache Components",
    href: "https://nextjs.org/docs/app/getting-started/caching",
  },
  {
    label: "Next.js — CDN Caching",
    href: "https://nextjs.org/docs/app/guides/cdn-caching",
  },
] as const;
