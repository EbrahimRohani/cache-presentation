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
  readonly subtitle?: string;
  readonly note?: string;
  readonly footer: string;
  readonly children: ReactNode;
}

function Slide({ frame, eyebrow, title, subtitle, note, footer, children }: SlideProps) {
  return (
    <section className="relative isolate min-h-[34rem] overflow-hidden border-b-[7px] border-[#51515a] bg-[#070c13] px-5 py-8 text-[#f4f6fb] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(75,88,108,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(75,88,108,.16)_1px,transparent_1px)] [background-size:5.35rem_5.35rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(199,45,143,.13),transparent_30%),linear-gradient(180deg,rgba(7,12,19,0)_0%,rgba(7,12,19,.9)_43%,rgba(211,72,151,.78)_100%)]"
      />

      <div className="mx-auto flex min-h-[30rem] w-full max-w-[92rem] flex-col">
        <header className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="flex min-w-0 items-center gap-3">
            <span className="rounded-md border border-cyan-300/25 bg-cyan-300/16 px-2.5 py-1 font-mono text-xs font-bold text-cyan-300">
              {frame.slice(0, 2)}
            </span>
            <p className="font-mono text-xs font-semibold tracking-[0.42em] text-slate-500 uppercase">
              {eyebrow}
            </p>
          </div>
          <p className="font-mono text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Cache Comparison
          </p>
        </header>

        <div className="mt-10 grid flex-1 gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(20rem,0.38fr)] lg:items-start">
          <div className="min-w-0">
            <h1 className="max-w-5xl text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-4 max-w-3xl text-xl leading-8 text-slate-300">
                {subtitle}
              </p>
            ) : null}
          </div>
          {note ? (
            <p className="max-w-sm text-sm leading-6 text-slate-500 lg:pt-12 lg:text-right">
              {note}
            </p>
          ) : null}
        </div>

        <div className="mt-8">{children}</div>

        <footer className="mt-8 grid gap-3 pt-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="font-mono text-xs font-semibold text-slate-500">
            {footer}
          </p>
          <p className="font-mono text-xs font-semibold text-slate-500">
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
    <ol className="grid list-none gap-5 p-0 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.number} className="relative min-w-0">
          <div className="min-h-full rounded-lg border border-white/7 bg-[#171722]/93 p-5 shadow-2xl shadow-black/25">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-cyan-300 px-1.5 py-0.5 font-mono text-[0.65rem] font-bold text-[#051015]">
                {item.number}
              </span>
              <span className="h-px flex-1 bg-slate-600/45" />
            </div>
            <h3 className="mt-5 text-xl font-semibold leading-7 text-slate-50">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {item.description}
            </p>
          </div>
          {index < items.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute top-1/2 right-[-1.35rem] hidden h-px w-7 bg-fuchsia-400/45 lg:block"
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
    <div className="overflow-hidden rounded-lg border border-white/8 bg-[#04060b] shadow-2xl shadow-black/30">
      <div className="flex items-center gap-2 border-b border-white/7 px-5 py-4">
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
        <span className="h-2 w-2 rounded-full bg-slate-600" />
        <p className="ml-4 font-mono text-xs font-semibold tracking-[0.18em] text-slate-500">
          {label}
        </p>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface NeonCardProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly tone?: "default" | "cyan" | "pink";
}

function NeonCard({ eyebrow, title, children, tone = "default" }: NeonCardProps) {
  const toneClass =
    tone === "cyan"
      ? "border-cyan-300/25 bg-cyan-950/35"
      : tone === "pink"
        ? "border-fuchsia-300/18 bg-fuchsia-950/20"
        : "border-white/7 bg-[#171722]/93";

  return (
    <article className={`rounded-lg border p-5 shadow-2xl shadow-black/20 ${toneClass}`}>
      {eyebrow ? (
        <p className="font-mono text-xs font-semibold tracking-[0.42em] text-slate-500 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-2 text-xl font-semibold leading-7 text-slate-50">
        {title}
      </h3>
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
          className="rounded-md border border-white/7 bg-slate-900/65 px-3 py-1 font-mono text-xs font-semibold text-slate-500"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function HeroSlide() {
  return (
    <section className="relative isolate min-h-[34rem] overflow-hidden border-b-[7px] border-[#51515a] bg-[#070c13] px-5 py-8 text-[#f4f6fb] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(75,88,108,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(75,88,108,.16)_1px,transparent_1px)] [background-size:5.35rem_5.35rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(199,45,143,.13),transparent_30%),linear-gradient(180deg,rgba(7,12,19,0)_0%,rgba(7,12,19,.96)_58%,rgba(211,72,151,.26)_100%)]"
      />

      <div className="mx-auto flex min-h-[30rem] w-full max-w-[92rem] flex-col">
        <header className="flex items-start justify-between gap-6">
          <p className="font-mono text-xs font-semibold tracking-[0.42em] text-cyan-300 uppercase">
            Cache comparison
          </p>
          <p className="font-mono text-xs font-semibold text-slate-500">
            Cache Comparison
          </p>
        </header>

        <div className="my-auto py-12">
          <p className="font-mono text-sm font-semibold tracking-[0.42em] text-slate-500 uppercase">
            Request-to-cache lifecycle
          </p>
          <h1 className="mt-5 max-w-6xl text-5xl font-semibold leading-tight text-slate-50 sm:text-6xl lg:text-7xl">
            React Router caching, without the fog.
          </h1>
          <p className="mt-8 max-w-4xl text-xl leading-8 text-slate-300 sm:text-2xl sm:leading-10">
            The router keeps navigation fresh. Durable reuse comes from the
            layers around it: HTTP policy, CDN behavior, server-side caches, and
            explicit browser storage.
          </p>
        </div>

        <footer className="grid gap-3 pt-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <TagList tags={deckTags} />
          <p className="font-mono text-xs font-semibold text-slate-500">
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
        <NeonCard title="What this means in practice" tone="cyan">
          React Router keeps navigation fresh, but durable caching belongs to
          explicit infrastructure around the router.
        </NeonCard>
        <div className="grid gap-4 lg:grid-cols-3">
          {executiveTakeaways.map((takeaway) => (
            <NeonCard key={takeaway.title} title={takeaway.title}>
              {takeaway.body}
            </NeonCard>
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
          <div className="relative grid gap-5 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-8 right-8 hidden h-px bg-fuchsia-400/45 lg:block"
            />
            {cacheMapNodes.map((node, index) => (
              <NeonCard key={node.title} eyebrow={String(index + 1).padStart(2, "0")} title={node.title}>
                {node.detail}
              </NeonCard>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <NeonCard title="document">HTML + hydration data</NeonCard>
            <NeonCard title="navigation">route data, no full HTML</NeonCard>
            <NeonCard title="mutation">action, then revalidate</NeonCard>
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {heroSignals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4 shadow-2xl shadow-black/20"
            >
              <dt className="font-mono text-xs font-semibold tracking-[0.24em] text-cyan-300 uppercase">
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
        subtitle="Initial SSR document"
        note="The first visit returns a document. Client navigation fetches route data and renders in place."
        footer="Path A - cold document"
      >
        <NeonCard title="Initial SSR document" tone="pink">
          The server resolves the route branch before the browser becomes
          interactive.
        </NeonCard>
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
        <NeonCard title="Two request lanes, one route model" tone="pink">
          The first visit returns a document. Client navigation fetches route
          data and renders in place.
        </NeonCard>
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
      eyebrow="03 Framework Mode default"
      title="Mutations, revalidation, and prefetch are one story"
      note="React Router keeps the UI synchronized by reloading page data after router-managed writes and by letting likely destinations warm up early."
      footer="Freshness and cache"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <NeonCard eyebrow="Framework Mode default" title="Automatic freshness">
          <p className="font-semibold text-slate-100">
            With SSR enabled, route loaders are revalidated after every
            navigation and form submission.
          </p>
          <p className="mt-3">
            Client navigation avoids another full HTML document, but it still
            asks the server for fresh loader data and commits the new route
            state.
          </p>
        </NeonCard>

        <NeonCard eyebrow="shouldRevalidate(args)" title="A freshness escape hatch" tone="cyan">
          Returning <code className="font-mono text-cyan-300">false</code>{" "}
          keeps current loader data for that route. It is a freshness decision,
          not a new cache layer, and it does not skip the initial document
          loader.
        </NeonCard>
      </div>

      <div className="mt-5 border-b border-white/7 pb-4">
        <p className="font-mono text-xs font-semibold tracking-[0.42em] text-cyan-300 uppercase">
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
            className="rounded-lg border border-white/7 bg-[#171722]/93 p-4 shadow-xl shadow-black/20"
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
            className={`rounded-lg border p-4 text-sm leading-6 shadow-xl shadow-black/20 ${
              index === 0
                ? "border-cyan-300/25 bg-cyan-300/10 text-slate-100"
                : "border-white/7 bg-[#171722]/93 text-slate-400"
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
      subtitle="Where loader data actually lives"
      note="loaderData is transient router state. Persistent reuse requires a cache outside that state."
      footer="Transient by design"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {loaderDataLocations.map((item) => (
          <NeonCard key={item.label} eyebrow={item.label} title={item.label}>
            {item.value}
          </NeonCard>
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
            <NeonCard key={layer.title} eyebrow={layer.title} title={layer.title}>
              <p>{layer.description}</p>
              <div className="mt-4">
                <TagList tags={layer.examples.split(" · ")} />
              </div>
            </NeonCard>
          ))}
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-5 text-sm leading-6 text-slate-300 shadow-xl shadow-black/20">
        Loader/action headers are not automatically forwarded to the final
        response. If the policy is derived inside a loader, return it from the
        route module <code className="font-mono text-cyan-300">headers</code>{" "}
        export. User-specific responses should normally use{" "}
        <code className="font-mono text-cyan-300">private, no-store</code>.
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
            <NeonCard key={mode.value} eyebrow={mode.value} title={mode.trigger}>
              {mode.use}
            </NeonCard>
          ))}
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-white/7 bg-[#171722]/93 p-5 text-sm leading-6 text-slate-400 shadow-xl shadow-black/20">
        Discovery is not prefetch:{" "}
        <code className="font-mono text-cyan-300">discover="render"</code>{" "}
        fetches route metadata from the manifest;{" "}
        <code className="font-mono text-cyan-300">prefetch</code> requests
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
            <NeonCard key={step.number} eyebrow={step.number} title={step.title}>
              {step.description}
            </NeonCard>
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
      title="SSR origin plus CDN stale-while-revalidate"
      note="React Router has no built-in Next-style ISR store."
      footer="ISR-like architecture"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <NeonCard title="ISR-like architecture" tone="cyan">
          React Router has no built-in Next-style ISR store. The usual
          equivalent lets a CDN serve stale output while a runtime SSR request
          prepares the next response.
        </NeonCard>
        <ol className="grid list-none gap-3 p-0">
          {isrFlow.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-white/7 bg-[#171722]/93 p-4 shadow-xl shadow-black/20"
            >
              <span className="font-mono text-xs font-semibold text-cyan-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-6 text-slate-300">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-5 rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/12 p-5 text-sm font-semibold leading-6 text-fuchsia-50 shadow-xl shadow-black/20">
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
            className="rounded-lg border border-white/7 bg-[#171722]/93 p-5 shadow-xl shadow-black/20"
          >
            <dt className="font-mono text-xs font-semibold tracking-[0.24em] text-cyan-300 uppercase">
              {fact.label}
            </dt>
            <dd className="mt-3 text-sm leading-6 text-slate-400">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <NeonCard title="Freshness policy">
          Keep document, data, and manifest variants on deliberate freshness
          policies.
        </NeonCard>
        <NeonCard title="/products.data">
          loader payload generated by running application code.
        </NeonCard>
        <NeonCard title="/__manifest">
          route and asset metadata generated by the compiler. Cache it with both{" "}
          <code className="font-mono text-cyan-300">version</code> and{" "}
          <code className="font-mono text-cyan-300">paths</code> in the cache
          key.
        </NeonCard>
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
          <NeonCard key={item.title} title={item.title}>
            {item.description}
          </NeonCard>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-5 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.24em] text-cyan-300 uppercase">
              Can React Router RSC be cached on a CDN?
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-50">
              Yes, conditionally, through HTTP caching.
            </h3>
          </div>
          <span className="w-fit rounded-md bg-cyan-300 px-3 py-1 font-mono text-xs font-bold text-[#051015]">
            RSC MODE: UNSTABLE
          </span>
        </div>
        <ul className="mt-5 grid list-none gap-3 p-0 lg:grid-cols-3">
          {rscCdnRules.map((rule) => (
            <li
              key={rule}
              className="rounded-lg border border-white/7 bg-[#171722]/93 p-4 text-sm leading-6 text-slate-300"
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
      <div className="overflow-x-auto rounded-lg border border-white/7 bg-[#171722]/93 shadow-xl shadow-black/20">
        <div className="min-w-[52rem]">
          <div className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-white/7 bg-[#080a11]/82 font-mono text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            <p className="p-4">Criterion</p>
            <p className="border-l border-white/7 p-4">React Router RSC</p>
            <p className="border-l border-white/7 p-4">
              Next.js App Router RSC
            </p>
          </div>
          <dl>
            {rscComparison.map((row) => (
              <div
                key={row.criterion}
                className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-white/7 last:border-b-0"
              >
                <dt className="p-4 text-sm font-semibold leading-6 text-slate-100">
                  {row.criterion}
                </dt>
                <dd className="border-l border-white/7 p-4 text-sm leading-6 text-slate-400">
                  {row.reactRouter}
                </dd>
                <dd className="border-l border-white/7 p-4 text-sm leading-6 text-slate-400">
                  {row.nextJs}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-white/7 bg-[#171722]/93 p-5 text-sm leading-6 text-slate-400 shadow-xl shadow-black/20">
        In Next.js today, a CDN must respect Cache-Control and keep RSC,
        prefetch, and HTML variants separate, commonly through the{" "}
        <code className="font-mono text-cyan-300">_rsc</code> cache key and
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
          <NeonCard key={fact.title} title={fact.title}>
            {fact.description}
          </NeonCard>
        ))}
      </div>

      <p className="mt-5 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-5 text-sm font-semibold leading-6 text-slate-100 shadow-xl shadow-black/20">
        ScrollRestoration can restore scroll position for Back/Forward. It does
        not restore or persist loader data.
      </p>

      <aside className="mt-5 rounded-lg border border-white/7 bg-[#171722]/93 p-5 shadow-xl shadow-black/20">
        <p className="font-mono text-xs font-semibold tracking-[0.24em] text-cyan-300 uppercase">
          Sources
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-50">
          Version-matched framework documentation
        </h2>
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
