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
} from "../cache-comparison/cache-comparison-template";

const deckTags = ["SSR", "Navigation", "Revalidation", "RSC", "CDN", "History"];
const totalFrames = 15;

function deckFrame(current: number) {
  return `${String(current).padStart(2, "0")} / ${totalFrames}`;
}

const cachePolicyCode = `export function headers() {
  return {
    "Cache-Control":
      "public, max-age=60, s-maxage=3600, " +
      "stale-while-revalidate=86400",
  };
}`;

const prerenderCode = `export default {
  ssr: true,
  async prerender({ getStaticPaths }) {
    const slugs = await getProductSlugs();
    return [
      ...getStaticPaths(),
      ...slugs.map((slug) => \`/products/\${slug}\`),
    ];
  },
};`;

interface SlideProps {
  readonly frame: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly note?: string;
  readonly footer?: string;
  readonly children: ReactNode;
}

function Slide({ frame, eyebrow, title, note, footer, children }: SlideProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#162235] bg-[#080d15] px-5 py-8 text-slate-100 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(45,212,191,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,.08)_1px,transparent_1px)] [background-size:5rem_5rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_0%,rgba(20,184,166,.18),transparent_30%),linear-gradient(90deg,rgba(8,13,21,.2),rgba(8,13,21,.88))]"
      />

      <div className="mx-auto flex min-h-[34rem] w-full max-w-[90rem] flex-col">
        <header className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="flex min-w-0 items-center gap-3">
            <span className="rounded-md border border-cyan-400/35 bg-cyan-400/15 px-3 py-1 font-mono text-xs font-semibold text-cyan-200">
              {frame.slice(0, 2)}
            </span>
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {eyebrow}
            </p>
          </div>
          <p className="font-mono text-xs font-semibold text-slate-600 uppercase">
            Cache Comparison
          </p>
        </header>

        <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)] lg:items-start">
          <div className="min-w-0">
            <h1 className="max-w-5xl text-4xl font-semibold text-slate-50 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>
          {note ? (
            <p className="max-w-md text-sm leading-6 text-slate-500 lg:pt-5 lg:text-right">
              {note}
            </p>
          ) : null}
        </div>

        <div className="mt-8">{children}</div>

        <footer className="mt-8 grid gap-3 border-t border-slate-800 pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="font-mono text-xs font-semibold text-slate-600">
            {footer ?? "Request-to-cache lifecycle"}
          </p>
          <p className="font-mono text-xs font-semibold text-slate-600">
            {frame}
          </p>
        </footer>
      </div>
    </section>
  );
}

interface FlowCardsProps {
  readonly items: readonly {
    readonly number: string;
    readonly title: string;
    readonly description: string;
  }[];
}

function FlowCards({ items }: FlowCardsProps) {
  return (
    <ol className="grid list-none gap-4 p-0 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.number} className="relative min-w-0">
          <div className="min-h-full rounded-lg border border-slate-800 bg-slate-900/72 p-5 shadow-xl shadow-black/15">
            <p className="rounded-md bg-cyan-400 px-2 py-1 font-mono text-xs font-bold text-slate-950">
              {item.number}
            </p>
            <h3 className="mt-5 text-lg font-semibold text-slate-50">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {item.description}
            </p>
          </div>
          {index < items.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute top-1/2 right-[-1.1rem] hidden h-px w-5 bg-cyan-400/45 lg:block"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

interface CodeWindowProps {
  readonly label: string;
  readonly code: string;
}

function CodeWindow({ label, code }: CodeWindowProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#05080e] shadow-2xl shadow-black/25">
      <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-md bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-md bg-cyan-400" />
        <span className="h-2.5 w-2.5 rounded-md bg-slate-700" />
        <p className="ml-4 font-mono text-xs font-semibold text-slate-500">
          {label}
        </p>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface DarkCardProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly tone?: "default" | "cyan" | "solid";
}

function DarkCard({ eyebrow, title, children, tone = "default" }: DarkCardProps) {
  const toneClass =
    tone === "cyan"
      ? "border-cyan-500/35 bg-cyan-950/45"
      : tone === "solid"
        ? "border-cyan-400/25 bg-cyan-400/12"
        : "border-slate-800 bg-slate-900/72";

  return (
    <article className={`rounded-lg border p-5 shadow-xl shadow-black/15 ${toneClass}`}>
      {eyebrow ? (
        <p className="font-mono text-xs font-semibold text-slate-500 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-2 text-xl font-semibold text-slate-50">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-slate-400">{children}</div>
    </article>
  );
}

function TagList({ tags }: { readonly tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-slate-700 bg-slate-900/75 px-3 py-1 font-mono text-xs font-semibold text-slate-500"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function HeroSlide() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#162235] bg-[#080d15] px-5 py-8 text-slate-100 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(45,212,191,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,.08)_1px,transparent_1px)] [background-size:5rem_5rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_0%,rgba(20,184,166,.22),transparent_30%),radial-gradient(circle_at_90%_100%,rgba(124,58,237,.12),transparent_26%)]"
      />

      <div className="mx-auto flex min-h-[34rem] w-full max-w-[90rem] flex-col">
        <header className="flex items-start justify-between gap-6">
          <p className="text-sm font-semibold text-cyan-300 uppercase">
            Cache comparison
          </p>
          <p className="font-mono text-xs font-semibold text-slate-600">
            Cache Comparison
          </p>
        </header>

        <div className="my-auto py-12">
          <p className="font-mono text-sm font-semibold text-slate-600 uppercase">
            Request-to-cache lifecycle
          </p>
          <h1 className="mt-5 max-w-6xl text-5xl font-semibold text-slate-50 sm:text-6xl lg:text-7xl">
            React Router caching, without the fog.
          </h1>
          <p className="mt-8 max-w-4xl text-xl leading-8 text-slate-400 sm:text-2xl sm:leading-10">
            The router keeps navigation fresh. Durable reuse comes from the
            layers around it: HTTP policy, CDN behavior, server-side caches, and
            explicit browser storage.
          </p>
        </div>

        <footer className="grid gap-3 border-t border-slate-800 pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <TagList tags={deckTags} />
          <p className="font-mono text-xs font-semibold text-slate-600">
            {deckFrame(1)}
          </p>
        </footer>
      </div>
    </section>
  );
}

function ExecutiveReadSlide() {
  return (
    <Slide
      frame={deckFrame(2)}
      eyebrow="00 Manager takeaway"
      title="loaderData is fast state, not a cache strategy."
      note="Treat React Router as the orchestration layer. Put persistence, TTLs, shared reuse, and invalidation in the layer that can guarantee them."
      footer="Freshness first"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <DarkCard title="What this means in practice" tone="solid">
          React Router keeps navigation fresh, but durable caching belongs to
          explicit infrastructure around the router.
        </DarkCard>

        <div className="grid gap-4 lg:grid-cols-3">
          {executiveTakeaways.map((takeaway) => (
            <DarkCard key={takeaway.title} title={takeaway.title}>
              {takeaway.body}
            </DarkCard>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function CacheMapSlide() {
  return (
    <Slide
      frame={deckFrame(3)}
      eyebrow="00 Request-to-cache map"
      title="Who owns freshness?"
      note="The router keeps navigation fresh. Durable reuse comes from the layers around it: HTTP policy, CDN behavior, server-side caches, and explicit browser storage."
      footer="Default cache signals"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <div className="grid gap-5">
          <div className="relative grid gap-4 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-8 right-8 hidden h-px bg-cyan-400/35 lg:block"
            />
            {cacheMapNodes.map((node, index) => (
              <article
                key={node.title}
                className="relative min-w-0 rounded-lg border border-slate-800 bg-slate-900/72 p-5 shadow-xl shadow-black/15"
              >
                <p className="font-mono text-xs font-semibold text-cyan-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-xl font-semibold text-slate-50">
                  {node.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {node.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <DarkCard title="document">
              HTML + hydration data
            </DarkCard>
            <DarkCard title="navigation">
              route data, no full HTML
            </DarkCard>
            <DarkCard title="mutation">
              action, then revalidate
            </DarkCard>
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {heroSignals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-lg border border-cyan-400/25 bg-cyan-400/10 p-4"
            >
              <dt className="font-mono text-xs font-semibold text-cyan-300 uppercase">
                {signal.label}
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-50">
                {signal.value}
              </dd>
              <dd className="mt-1 text-sm leading-6 text-slate-400">
                {signal.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Slide>
  );
}

function RequestSlides() {
  return (
    <>
      <Slide
        frame={deckFrame(4)}
        eyebrow="01 SSR and navigation"
        title="Two request lanes, one route model"
        note="The first visit returns a document. Client navigation fetches route data and renders in place."
        footer="Path A - cold document"
      >
        <DarkCard title="Initial SSR document" tone="solid">
          The server resolves the route branch before the browser becomes
          interactive.
        </DarkCard>
        <div className="mt-5">
        <FlowCards items={ssrDocumentFlow} />
        </div>
      </Slide>

      <Slide
        frame={deckFrame(5)}
        eyebrow="02 SSR and navigation"
        title="Subsequent client navigation"
        note="The app stays mounted while the router fetches the next route's data."
        footer="Path B - warm route"
      >
        <DarkCard title="Two request lanes, one route model" tone="solid">
          The first visit returns a document. Client navigation fetches route
          data and renders in place.
        </DarkCard>
        <div className="mt-5">
        <FlowCards items={clientNavigationFlow} />
        </div>
      </Slide>
    </>
  );
}

function RevalidationSlide() {
  return (
    <Slide
      frame={deckFrame(6)}
      eyebrow="03 Freshness machinery"
      title="Mutations, revalidation, and prefetch are one story"
      note="React Router keeps the UI synchronized by reloading page data after router-managed writes and by letting likely destinations warm up early."
      footer="Freshness and cache"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <DarkCard eyebrow="Framework Mode default" title="Automatic freshness">
          <p className="text-slate-200">
            With SSR enabled, route loaders revalidate after every navigation
            and form submission.
          </p>
          <p className="mt-3">
            Client navigation avoids another full HTML document, but it still
            asks the server for fresh loader data and commits the new route
            state.
          </p>
        </DarkCard>

        <DarkCard
          eyebrow="shouldRevalidate(args)"
          title="A freshness escape hatch"
          tone="cyan"
        >
          Returning <code className="font-mono text-cyan-200">false</code>{" "}
          keeps current loader data for that route. It is a freshness decision,
          not a new cache layer, and it does not skip the initial document
          loader.
        </DarkCard>
      </div>

      <div className="mt-5 border-b border-slate-800 pb-4">
        <p className="font-mono text-xs font-semibold text-cyan-300 uppercase">
          Action lifecycle
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-50">
          A write completes, then the page data catches up.
        </h3>
      </div>
      <ol className="mt-5 grid list-none gap-3 p-0 lg:grid-cols-5">
        {mutationFlow.map((step, index) => (
          <li
            key={step}
            className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"
          >
            <p className="font-mono text-xs font-semibold text-cyan-300">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">
              {step}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {freshnessNotes.map((note, index) => (
          <p
            key={note}
            className={`rounded-lg border p-4 text-sm leading-6 ${
              index === 0
                ? "border-cyan-400/35 bg-cyan-400/12 text-slate-100"
                : "border-slate-800 bg-slate-900/72 text-slate-400"
            }`}
          >
            {note}
          </p>
        ))}
      </div>
    </Slide>
  );
}

function LoaderDataSlide() {
  return (
    <Slide
      frame={deckFrame(7)}
      eyebrow="04 Data ownership"
      title="Put each cache in the layer that can police it"
      note="loaderData is transient router state. Persistent reuse requires a cache outside that state."
      footer="Transient by design"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {loaderDataLocations.map((item) => (
          <DarkCard key={item.label} eyebrow={item.label} title={item.label}>
            {item.value}
          </DarkCard>
        ))}
      </div>
    </Slide>
  );
}

function PublicPolicySlide() {
  return (
    <Slide
      frame={deckFrame(8)}
      eyebrow="05 Where caching really happens"
      title="Public response policy"
      note="Persistent reuse requires a cache outside router state."
      footer="Three real cache layers"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <CodeWindow label="headers.ts" code={cachePolicyCode} />

        <div className="grid gap-4">
          {externalCacheLayers.map((layer) => (
            <DarkCard key={layer.title} eyebrow={layer.title} title={layer.title}>
              <p>{layer.description}</p>
              <p className="sr-only">{layer.examples}</p>
              <TagList tags={layer.examples.split(" · ")} />
            </DarkCard>
          ))}
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-cyan-400/25 bg-cyan-400/10 p-5 text-sm leading-6 text-slate-300">
        Loader/action headers are not automatically forwarded to the final
        response. If policy is derived inside a loader, return it from the
        route module <code className="font-mono text-cyan-200">headers</code>{" "}
        export. User-specific responses should normally use{" "}
        <code className="font-mono text-cyan-200">private, no-store</code>.
      </p>
    </Slide>
  );
}

function PrefetchSlide() {
  return (
    <Slide
      frame={deckFrame(9)}
      eyebrow="06 Prefetch"
      title="Load route modules and data before the click"
      note="The Link prefetch strategy controls when React Router emits prefetch hints for the destination."
      footer="Intent before bandwidth"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(22rem,0.7fr)_minmax(0,1.3fr)]">
        <CodeWindow
          label="Link strategy"
          code={`<Link to="/products" prefetch="intent">
  Products
</Link>`}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {prefetchModes.map((mode) => (
            <DarkCard key={mode.value} eyebrow={mode.value} title={mode.trigger}>
              {mode.use}
            </DarkCard>
          ))}
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-slate-800 bg-slate-900/72 p-5 text-sm leading-6 text-slate-400">
        Discovery is not prefetch:{" "}
        <code className="font-mono text-cyan-200">discover="render"</code>{" "}
        fetches route metadata from the manifest;{" "}
        <code className="font-mono text-cyan-200">prefetch</code> requests
        destination data and modules.
      </p>
    </Slide>
  );
}

function PrerenderSlide() {
  return (
    <Slide
      frame={deckFrame(10)}
      eyebrow="07 Static output and edge cache"
      title="Pre-rendering is an artifact; ISR needs an origin"
      note="React Router can emit static documents and data payloads, but regeneration requires runtime infrastructure."
      footer="Static at build time"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="grid gap-4">
          {prerenderFlow.map((step) => (
            <DarkCard key={step.number} eyebrow={step.number} title={step.title}>
              {step.description}
            </DarkCard>
          ))}
        </div>
        <CodeWindow label="react-router.config.ts" code={prerenderCode} />
      </div>
    </Slide>
  );
}

function IsrSlide() {
  return (
    <Slide
      frame={deckFrame(11)}
      eyebrow="08 Pre-rendering and ISR"
      title="SSR origin + CDN stale-while-revalidate"
      note="React Router has no built-in Next-style ISR store."
      footer="ISR-like architecture"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <DarkCard title="ISR-like architecture" tone="solid">
          React Router has no built-in Next-style ISR store. The usual
          equivalent lets a CDN serve stale output while a runtime SSR request
          prepares the next response.
        </DarkCard>
        <ol className="grid list-none gap-3 p-0">
          {isrFlow.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-slate-800 bg-slate-900/72 p-4"
            >
              <span className="font-mono text-xs font-semibold text-cyan-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-6 text-slate-300">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-5 rounded-lg border border-amber-300/25 bg-amber-300/10 p-5 text-sm font-semibold leading-6 text-amber-100">
        Important: if the origin only serves the same pre-rendered static file,
        CDN revalidation receives the same old build. Real regeneration needs a
        runtime SSR handler, persistent application cache, host adapter, or
        rebuild/webhook.
      </p>
    </Slide>
  );
}

function ManifestSlide() {
  return (
    <Slide
      frame={deckFrame(12)}
      eyebrow="09 Route manifest"
      title="Metadata for discovery, not loader data"
      note="Keep document, data, and manifest variants on deliberate freshness policies."
      footer="Manifest variants"
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        {manifestFacts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-slate-800 bg-slate-900/72 p-5"
          >
            <dt className="font-mono text-xs font-semibold text-cyan-300 uppercase">
              {fact.label}
            </dt>
            <dd className="mt-3 text-sm leading-6 text-slate-400">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <DarkCard title="Freshness policy">
          Keep document, data, and manifest variants on deliberate freshness
          policies.
        </DarkCard>
        <DarkCard title="/products.data">
          loader payload generated by running application code.
        </DarkCard>
        <DarkCard title="/__manifest">
          route and asset metadata generated by the compiler. Cache it with both{" "}
          <code className="font-mono text-cyan-200">version</code> and{" "}
          <code className="font-mono text-cyan-200">paths</code> in the cache
          key.
        </DarkCard>
      </div>
    </Slide>
  );
}

function RscSlide() {
  return (
    <Slide
      frame={deckFrame(13)}
      eyebrow="10 React Server Components"
      title="RSC changes the payload, not the cache owner"
      note="React Router RSC can use a CDN, but cacheability must be designed at the HTTP and platform layers."
      footer="RSC mode: unstable"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {rscRequestFlow.map((item) => (
          <DarkCard key={item.title} title={item.title}>
            {item.description}
          </DarkCard>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold text-cyan-300 uppercase">
              Can React Router RSC be cached on a CDN?
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-50">
              Yes, conditionally, through HTTP caching.
            </h3>
          </div>
          <span className="w-fit rounded-md bg-cyan-400 px-3 py-1 font-mono text-xs font-bold text-slate-950">
            RSC MODE: UNSTABLE
          </span>
        </div>
        <ul className="mt-5 grid list-none gap-3 p-0 lg:grid-cols-3">
          {rscCdnRules.map((rule) => (
            <li
              key={rule}
              className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300"
            >
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}

function RscTableSlide() {
  return (
    <Slide
      frame={deckFrame(14)}
      eyebrow="11 React Router RSC vs Next.js App Router RSC"
      title="The cache primitive gap"
      note="React Router is lower-level. Next.js has more framework-managed output cache semantics."
      footer="Framework-managed vs platform-managed"
    >
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/72">
        <div className="min-w-[52rem]">
          <div className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-slate-800 bg-slate-950/70 font-mono text-xs font-semibold text-slate-500 uppercase">
            <p className="p-4">Criterion</p>
            <p className="border-l border-slate-800 p-4">React Router RSC</p>
            <p className="border-l border-slate-800 p-4">
              Next.js App Router RSC
            </p>
          </div>
          <dl>
            {rscComparison.map((row) => (
              <div
                key={row.criterion}
                className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-slate-800 last:border-b-0"
              >
                <dt className="p-4 text-sm font-semibold leading-6 text-slate-100">
                  {row.criterion}
                </dt>
                <dd className="border-l border-slate-800 p-4 text-sm leading-6 text-slate-400">
                  {row.reactRouter}
                </dd>
                <dd className="border-l border-slate-800 p-4 text-sm leading-6 text-slate-400">
                  {row.nextJs}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-slate-800 bg-slate-900/72 p-5 text-sm leading-6 text-slate-400">
        In Next.js today, a CDN must respect Cache-Control and keep RSC,
        prefetch, and HTML variants separate, commonly through the{" "}
        <code className="font-mono text-cyan-200">_rsc</code> cache key and
        relevant request headers. Static/ISR responses are cacheable; dynamic
        responses are normally private and no-store.
      </p>
    </Slide>
  );
}

function HistoryAndSourcesSlide() {
  return (
    <Slide
      frame={deckFrame(15)}
      eyebrow="12 History navigation"
      title="Back/Forward is navigation, not a guaranteed data cache"
      note="Separate React Router's same-document POP navigation from the browser's full-document back/forward cache."
      footer="Version-matched framework documentation"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {backForwardFacts.map((fact) => (
          <DarkCard key={fact.title} title={fact.title}>
            {fact.description}
          </DarkCard>
        ))}
      </div>

      <p className="mt-5 rounded-lg border border-cyan-400/25 bg-cyan-400/10 p-5 text-sm font-semibold leading-6 text-slate-100">
        ScrollRestoration can restore scroll position for Back/Forward. It does
        not restore or persist loader data.
      </p>

      <aside className="mt-5 rounded-lg border border-slate-800 bg-slate-900/72 p-5">
        <p className="font-mono text-xs font-semibold text-cyan-300 uppercase">
          Sources
        </p>
        <ul className="mt-4 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {cacheSources.map((source) => (
            <li key={source.href}>
              <a
                className="text-sm font-semibold text-cyan-300 underline decoration-cyan-300/25 underline-offset-4 hover:text-cyan-100"
                href={source.href}
                rel="noreferrer"
                target="_blank"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </Slide>
  );
}

export default function CacheComparisonPage() {
  return (
    <SectionPage className="!max-w-none !gap-0 !px-0 !py-0">
      <HeroSlide />
      <ExecutiveReadSlide />
      <CacheMapSlide />
      <RequestSlides />
      <RevalidationSlide />
      <LoaderDataSlide />
      <PublicPolicySlide />
      <PrefetchSlide />
      <PrerenderSlide />
      <IsrSlide />
      <ManifestSlide />
      <RscSlide />
      <RscTableSlide />
      <HistoryAndSourcesSlide />
    </SectionPage>
  );
}
