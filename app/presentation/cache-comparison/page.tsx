import type { ReactNode } from "react";

import { SectionPage } from "../shared/section-page";
import {
  backForwardFacts,
  cacheMapNodes,
  cacheSources,
  clientNavigationFlow,
  executiveTakeaways,
  externalCacheLayers,
  freshnessNotes,
  heroSignals,
  isrFlow,
  loaderDataLocations,
  manifestFacts,
  mutationFlow,
  prefetchModes,
  prerenderFlow,
  rscComparison,
  rscCdnRules,
  rscRequestFlow,
  ssrDocumentFlow,
} from "./cache-comparison-template";

const cacheMapNodeTones = [
  "border-cyan-200/40 bg-cyan-300/10 text-cyan-50",
  "border-emerald-200/50 bg-emerald-300/15 text-emerald-50",
  "border-amber-200/50 bg-amber-300/15 text-amber-50",
  "border-fuchsia-200/40 bg-fuchsia-300/10 text-fuchsia-50",
] as const;

interface TopicHeadingProps {
  readonly headingId: string;
  readonly number: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

function TopicHeading({
  headingId,
  number,
  eyebrow,
  title,
  description,
}: TopicHeadingProps) {
  return (
    <div className="grid gap-4 border-b border-border pb-5 lg:grid-cols-[auto_minmax(0,0.8fr)_minmax(18rem,0.7fr)] lg:items-end">
      <span className="w-fit rounded-lg bg-heading px-3 py-1 font-mono text-xs font-semibold text-on-accent">
        {number}
      </span>
      <div>
        <p className="text-xs font-bold text-accent uppercase">{eyebrow}</p>
        <h2
          id={headingId}
          className="mt-2 max-w-3xl text-2xl font-semibold text-heading sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-muted lg:text-right">
        {description}
      </p>
    </div>
  );
}

interface FlowProps {
  readonly title: string;
  readonly caption: string;
  readonly items: readonly {
    readonly number: string;
    readonly title: string;
    readonly description: string;
  }[];
  readonly variant: "cyan" | "emerald";
}

function FlowLane({ title, caption, items, variant }: FlowProps) {
  const accent =
    variant === "cyan"
      ? "border-cyan-500 bg-cyan-50 text-cyan-800"
      : "border-emerald-500 bg-emerald-50 text-emerald-800";

  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-heading">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{caption}</p>
        </div>
        <span
          className={`w-fit rounded-md border px-2.5 py-1 font-mono text-xs font-semibold ${accent}`}
        >
          {items.length} steps
        </span>
      </div>
      <ol className="mt-5 grid list-none gap-3 p-0">
        {items.map((item, index) => (
          <li key={item.number} className="grid grid-cols-[auto_1fr] gap-3">
            <div className="flex flex-col items-center">
              <span className="rounded-md bg-heading px-2 py-1 font-mono text-xs font-semibold text-on-accent">
                {item.number}
              </span>
              {index < items.length - 1 ? (
                <span className="my-1 h-full w-px min-h-8 bg-border" />
              ) : null}
            </div>
            <div className="min-w-0 pb-4">
              <h4 className="font-semibold text-heading">{item.title}</h4>
              <p className="mt-1 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

interface CodePanelProps {
  readonly label: string;
  readonly children: ReactNode;
}

function CodePanel({ label, children }: CodePanelProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#15243a] bg-[#0c1728] shadow-sm">
      <p className="border-b border-white/10 px-5 py-3 font-mono text-xs font-semibold text-cyan-100/75 uppercase">
        {label}
      </p>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-50">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function HeroCacheMap() {
  return (
    <div className="rounded-lg border border-white/15 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur sm:p-5">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold text-cyan-100/70 uppercase">
            Request-to-cache map
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            Who owns freshness?
          </h2>
        </div>
        <span className="rounded-md bg-emerald-300 px-2.5 py-1 font-mono text-xs font-bold text-[#102033]">
          SSR ON
        </span>
      </div>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-4">
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-6 right-6 hidden h-px bg-white/20 sm:block"
        />
        {cacheMapNodes.map((node, index) => {
          const tone = cacheMapNodeTones[index] ?? cacheMapNodeTones[0];

          return (
            <div
              key={node.title}
              className={`relative min-w-0 rounded-lg border p-4 ${tone}`}
            >
              <p className="font-mono text-xs font-semibold opacity-80">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-7 text-lg font-semibold text-white sm:mt-10">
                {node.title}
              </h3>
              <p className="mt-2 text-sm leading-5 text-white/70">
                {node.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-black/15 p-3">
          <p className="font-mono text-xs font-semibold text-cyan-100">
            document
          </p>
          <p className="mt-1 text-sm text-white/70">HTML + hydration data</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/15 p-3">
          <p className="font-mono text-xs font-semibold text-emerald-100">
            navigation
          </p>
          <p className="mt-1 text-sm text-white/70">route data, no full HTML</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/15 p-3">
          <p className="font-mono text-xs font-semibold text-amber-100">
            mutation
          </p>
          <p className="mt-1 text-sm text-white/70">action, then revalidate</p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0d1726] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0d1726_0%,#123554_42%,#0f766e_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:42px_42px]"
      />

      <div className="mx-auto grid w-full max-w-[90rem] gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(32rem,1.08fr)] lg:items-center">
        <div className="min-w-0">
          <p className="text-sm font-bold text-cyan-100 uppercase">
            Cache comparison
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            React Router caching, without the fog.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl sm:leading-9">
            The router keeps navigation fresh. Durable reuse comes from the
            layers around it: HTTP policy, CDN behavior, server-side caches, and
            explicit browser storage.
          </p>

          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            {heroSignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-lg border border-white/10 bg-white/[0.07] p-4"
              >
                <dt className="text-xs font-semibold text-cyan-100/80 uppercase">
                  {signal.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-white">
                  {signal.value}
                </dd>
                <dd className="mt-1 text-sm leading-6 text-slate-200">
                  {signal.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroCacheMap />
      </div>
    </section>
  );
}

function ExecutiveRead() {
  return (
    <section className="grid gap-5" aria-labelledby="executive-read-heading">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch">
        <div className="rounded-lg bg-heading p-6 text-on-accent shadow-sm sm:p-7">
          <p className="text-xs font-bold text-cyan-100 uppercase">
            Manager takeaway
          </p>
          <h2
            id="executive-read-heading"
            className="mt-3 text-3xl font-semibold text-white"
          >
            loaderData is fast state, not a cache strategy.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-200">
            Treat React Router as the orchestration layer. Put persistence,
            TTLs, shared reuse, and invalidation in the layer that can guarantee
            them.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {executiveTakeaways.map((takeaway) => (
            <article
              key={takeaway.title}
              className="rounded-lg border border-border bg-surface p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-heading">
                {takeaway.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {takeaway.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RequestLanes() {
  return (
    <section className="grid gap-5" aria-labelledby="request-lanes-heading">
      <TopicHeading
        headingId="request-lanes-heading"
        number="01"
        eyebrow="SSR and navigation"
        title="Two request lanes, one route model"
        description="The first visit returns a document. Client navigation fetches route data and renders in place."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <FlowLane
          title="Initial SSR document"
          caption="The server resolves the route branch before the browser becomes interactive."
          items={ssrDocumentFlow}
          variant="cyan"
        />
        <FlowLane
          title="Subsequent client navigation"
          caption="The app stays mounted while the router fetches the next route's data."
          items={clientNavigationFlow}
          variant="emerald"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)]">
        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold text-accent uppercase">
            Framework Mode default
          </p>
          <p className="mt-3 text-xl font-semibold leading-8 text-heading">
            With SSR enabled, route loaders revalidate after every navigation
            and form submission.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Client navigation avoids another full HTML document, but it still
            asks the server for fresh loader data and commits the new route
            state.
          </p>
        </div>

        <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 shadow-sm sm:p-6">
          <p className="font-mono text-sm font-semibold text-amber-900">
            shouldRevalidate(args)
          </p>
          <p className="mt-3 text-sm leading-6 text-amber-950">
            Returning <code className="font-mono font-semibold">false</code>{" "}
            keeps current loader data for that route. It is a freshness decision,
            not a new cache layer, and it does not skip the initial document
            loader.
          </p>
        </div>
      </div>
    </section>
  );
}

function CacheOwnership() {
  return (
    <section className="grid gap-5" aria-labelledby="cache-ownership-heading">
      <TopicHeading
        headingId="cache-ownership-heading"
        number="02"
        eyebrow="Data ownership"
        title="Put each cache in the layer that can police it"
        description="loaderData is transient router state. Persistent reuse requires a cache outside that state."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="grid gap-3">
          {loaderDataLocations.map((item, index) => (
            <article
              key={item.label}
              className="grid gap-3 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-[auto_1fr] sm:items-start"
            >
              <span className="w-fit rounded-md bg-[#e9f7ef] px-2 py-1 font-mono text-xs font-semibold text-emerald-800">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-heading">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.value}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-4">
          <CodePanel label="Public response policy">
            {`export function headers() {
  return {
    "Cache-Control":
      "public, max-age=60, s-maxage=3600, " +
      "stale-while-revalidate=86400",
  };
}`}
          </CodePanel>

          <div className="grid gap-3 sm:grid-cols-3">
            {externalCacheLayers.map((layer) => (
              <article
                key={layer.title}
                className="rounded-lg border border-border bg-surface p-4 shadow-sm"
              >
                <h3 className="font-semibold text-heading">{layer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {layer.description}
                </p>
                <p className="mt-4 break-words font-mono text-xs leading-5 text-accent">
                  {layer.examples}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <p className="rounded-lg border-l-4 border-l-heading bg-surface p-5 text-sm leading-6 text-body shadow-sm">
        Loader/action headers are not automatically forwarded to the final
        response. If policy is derived inside a loader, return it from the route
        module <code className="font-mono font-semibold">headers</code> export.
        User-specific responses should normally use{" "}
        <code className="font-mono font-semibold">private, no-store</code>.
      </p>
    </section>
  );
}

function FreshnessEngine() {
  return (
    <section className="grid gap-5" aria-labelledby="freshness-heading">
      <TopicHeading
        headingId="freshness-heading"
        number="03"
        eyebrow="Freshness machinery"
        title="Mutations, revalidation, and prefetch are one story"
        description="React Router keeps the UI synchronized by reloading page data after router-managed writes and by letting likely destinations warm up early."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
        <div className="rounded-lg border border-border bg-surface shadow-sm">
          <div className="border-b border-border p-5 sm:p-6">
            <p className="text-xs font-bold text-accent uppercase">
              Action lifecycle
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-heading">
              A write completes, then the page data catches up.
            </h3>
          </div>
          <ol className="grid list-none p-0 lg:grid-cols-5">
            {mutationFlow.map((step, index) => (
              <li
                key={step}
                className="min-w-0 border-b border-border p-5 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <p className="font-mono text-xs font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm font-semibold leading-6 text-heading">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-3">
          {freshnessNotes.map((note, index) => (
            <p
              key={note}
              className={`rounded-lg p-4 text-sm leading-6 shadow-sm ${
                index === 0
                  ? "bg-heading font-semibold text-on-accent"
                  : "border border-border bg-surface text-body"
              }`}
            >
              {note}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)]">
        <CodePanel label="Link strategy">
          {`<Link to="/products" prefetch="intent">
  Products
</Link>`}
        </CodePanel>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {prefetchModes.map((mode) => (
            <article
              key={mode.value}
              className="rounded-lg border border-border bg-surface p-4 shadow-sm"
            >
              <p className="font-mono text-sm font-semibold text-accent">
                {mode.value}
              </p>
              <h3 className="mt-3 font-semibold text-heading">
                {mode.trigger}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{mode.use}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="rounded-lg border border-cyan-200 bg-cyan-50 p-5 text-sm leading-6 text-cyan-950 shadow-sm">
        Discovery is not prefetch:{" "}
        <code className="font-mono font-semibold">discover="render"</code>{" "}
        fetches route metadata from the manifest;{" "}
        <code className="font-mono font-semibold">prefetch</code> requests
        destination data and modules.
      </p>
    </section>
  );
}

function StaticAndEdge() {
  return (
    <section className="grid gap-5" aria-labelledby="static-edge-heading">
      <TopicHeading
        headingId="static-edge-heading"
        number="04"
        eyebrow="Static output and edge cache"
        title="Pre-rendering is an artifact; ISR needs an origin"
        description="React Router can emit static documents and data payloads, but regeneration requires runtime infrastructure."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="grid gap-4">
          {prerenderFlow.map((step) => (
            <article
              key={step.number}
              className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm"
            >
              <span className="font-mono text-sm font-semibold text-accent">
                {step.number}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-heading">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <CodePanel label="react-router.config.ts">
          {`export default {
  ssr: true,
  async prerender({ getStaticPaths }) {
    const slugs = await getProductSlugs();
    return [
      ...getStaticPaths(),
      ...slugs.map((slug) => \`/products/\${slug}\`),
    ];
  },
};`}
        </CodePanel>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <div className="rounded-lg border border-emerald-300 bg-[#f1fbf6] p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold text-emerald-800 uppercase">
            ISR-like architecture
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-heading">
            SSR origin + CDN stale-while-revalidate
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted">
            React Router has no built-in Next-style ISR store. The usual
            equivalent lets a CDN serve stale output while a runtime SSR request
            prepares the next response.
          </p>
        </div>

        <ol className="grid list-none gap-2 p-0">
          {isrFlow.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-sm"
            >
              <span className="font-mono text-xs font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-6 text-body">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="rounded-lg bg-heading p-5 text-sm font-semibold leading-6 text-on-accent shadow-sm">
        Important: if the origin only serves the same pre-rendered static file,
        CDN revalidation receives the same old build. Real regeneration needs a
        runtime SSR handler, persistent application cache, host adapter, or
        rebuild/webhook.
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(18rem,0.65fr)_minmax(0,1.35fr)]">
        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <p className="text-xs font-bold text-accent uppercase">
            Route manifest
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-heading">
            Metadata for discovery, not loader data
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted">
            Keep document, data, and manifest variants on deliberate freshness
            policies.
          </p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2">
          {manifestFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-lg border border-border bg-surface p-5 shadow-sm"
            >
              <dt className="text-xs font-bold text-accent uppercase">
                {fact.label}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-body">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function RscComparison() {
  return (
    <section className="grid gap-5" aria-labelledby="rsc-heading">
      <TopicHeading
        headingId="rsc-heading"
        number="05"
        eyebrow="React Server Components"
        title="RSC changes the payload, not the cache owner"
        description="React Router RSC can use a CDN, but cacheability must be designed at the HTTP and platform layers."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {rscRequestFlow.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-border bg-surface p-5 shadow-sm"
          >
            <h3 className="font-semibold text-heading">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-fuchsia-200 bg-[#fff7fb] p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-fuchsia-800 uppercase">
              Can React Router RSC be cached on a CDN?
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-heading">
              Yes, conditionally, through HTTP caching.
            </h3>
          </div>
          <span className="w-fit rounded-md bg-heading px-3 py-1 font-mono text-xs font-semibold text-on-accent">
            RSC MODE: UNSTABLE
          </span>
        </div>
        <ul className="mt-6 grid list-none gap-3 p-0 lg:grid-cols-3">
          {rscCdnRules.map((rule) => (
            <li
              key={rule}
              className="rounded-lg border border-fuchsia-100 bg-white p-4 text-sm leading-6 text-body shadow-sm"
            >
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
        <div className="min-w-[48rem]">
          <div className="grid grid-cols-[0.68fr_1fr_1fr] border-b border-border bg-surface-raised text-xs font-bold text-muted uppercase">
            <p className="p-4">Criterion</p>
            <p className="border-l border-border p-4">React Router RSC</p>
            <p className="border-l border-border p-4">
              Next.js App Router RSC
            </p>
          </div>
          <dl>
            {rscComparison.map((row) => (
              <div
                key={row.criterion}
                className="grid grid-cols-[0.68fr_1fr_1fr] border-b border-border last:border-b-0"
              >
                <dt className="p-4 text-sm font-semibold leading-6 text-heading">
                  {row.criterion}
                </dt>
                <dd className="border-l border-border p-4 text-sm leading-6 text-body">
                  {row.reactRouter}
                </dd>
                <dd className="border-l border-border p-4 text-sm leading-6 text-body">
                  {row.nextJs}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="rounded-lg border-l-4 border-l-accent bg-surface p-5 text-sm leading-6 text-body shadow-sm">
        In Next.js today, a CDN must respect Cache-Control and keep RSC,
        prefetch, and HTML variants separate, commonly through the{" "}
        <code className="font-mono font-semibold">_rsc</code> cache key and
        relevant request headers. Static/ISR responses are cacheable; dynamic
        responses are normally private and no-store.
      </p>
    </section>
  );
}

function HistoryAndSources() {
  return (
    <>
      <section className="grid gap-5" aria-labelledby="history-heading">
        <TopicHeading
          headingId="history-heading"
          number="06"
          eyebrow="History navigation"
          title="Back/Forward is navigation, not a guaranteed data cache"
          description="Separate React Router's same-document POP navigation from the browser's full-document back/forward cache."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {backForwardFacts.map((fact) => (
            <article
              key={fact.title}
              className="rounded-lg border border-border bg-surface p-5 shadow-sm"
            >
              <h3 className="font-semibold text-heading">{fact.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {fact.description}
              </p>
            </article>
          ))}
        </div>

        <p className="rounded-lg bg-heading p-5 text-sm font-semibold leading-6 text-on-accent shadow-sm sm:p-6">
          ScrollRestoration can restore scroll position for Back/Forward. It
          does not restore or persist loader data.
        </p>
      </section>

      <aside className="rounded-lg border border-border bg-surface-raised p-6 shadow-sm sm:p-7">
        <p className="text-xs font-bold text-accent uppercase">Sources</p>
        <h2 className="mt-2 text-xl font-semibold text-heading sm:text-2xl">
          Version-matched framework documentation
        </h2>
        <ul className="mt-5 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {cacheSources.map((source) => (
            <li key={source.href}>
              <a
                className="text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:text-accent-strong"
                href={source.href}
                rel="noreferrer"
                target="_blank"
              >
                {source.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default function CacheComparisonPage() {
  return (
    <SectionPage className="!max-w-none !gap-9 !px-0 !py-0 lg:!gap-11">
      <Hero />

      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-9 px-5 pb-8 sm:px-8 sm:pb-10 lg:gap-11 lg:px-12 lg:pb-14">
        <ExecutiveRead />
        <RequestLanes />
        <CacheOwnership />
        <FreshnessEngine />
        <StaticAndEdge />
        <RscComparison />
        <HistoryAndSources />
      </div>
    </SectionPage>
  );
}
