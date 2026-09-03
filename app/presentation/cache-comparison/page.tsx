import type { ReactNode } from "react";

import { SectionPage } from "../shared/section-page";
import {
  backForwardFacts,
  cacheSources,
  clientNavigationFlow,
  externalCacheLayers,
  isrFlow,
  loaderDataLocations,
  manifestFacts,
  mutationFlow,
  prefetchModes,
  prerenderFlow,
  rscComparison,
  rscRequestFlow,
  ssrDocumentFlow,
} from "./cache-comparison-template";

interface TopicHeadingProps {
  readonly number: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

function TopicHeading({
  number,
  eyebrow,
  title,
  description,
}: TopicHeadingProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 rounded-full bg-heading px-3 py-1 font-mono text-xs font-semibold text-on-accent">
          {number}
        </span>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-muted lg:text-right">
        {description}
      </p>
    </div>
  );
}

interface FlowProps {
  readonly items: readonly {
    readonly number: string;
    readonly title: string;
    readonly description: string;
  }[];
}

function Flow({ items }: FlowProps) {
  return (
    <ol className="grid list-none gap-3 p-0 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.number} className="contents">
          <div className="relative rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="font-mono text-xs font-semibold text-accent">
              {item.number}
            </p>
            <h3 className="mt-4 font-semibold text-heading">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {item.description}
            </p>
            {index < items.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-canvas px-1.5 text-sm text-muted lg:block"
              >
                →
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

interface CodePanelProps {
  readonly label: string;
  readonly children: ReactNode;
}

function CodePanel({ label, children }: CodePanelProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-heading bg-heading shadow-sm">
      <p className="border-b border-white/15 px-5 py-3 font-mono text-xs font-semibold tracking-[0.1em] text-on-accent/60 uppercase">
        {label}
      </p>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-on-accent">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function CacheComparisonPage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Request-to-cache lifecycle
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Caching in React Router
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          Follow the data from the first SSR document through navigation,
          revalidation, pre-rendering, RSC, CDN caching, and browser history.
        </p>
      </header>

      <section className="grid gap-5" aria-labelledby="ssr-heading">
        <TopicHeading
          number="01"
          eyebrow="SSR and navigation"
          title="Two request paths, one route model"
          description="The first visit returns a document. An in-app navigation fetches route data and renders in place."
        />

        <div>
          <h3 id="ssr-heading" className="mb-4 text-lg font-semibold text-heading">
            Initial SSR document
          </h3>
          <Flow items={ssrDocumentFlow} />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-heading">
            Subsequent client navigation
          </h3>
          <Flow items={clientNavigationFlow} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
              Framework Mode default
            </p>
            <p className="mt-3 text-lg font-semibold leading-8 text-heading">
              With SSR enabled, route loaders are revalidated after every
              navigation and form submission.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              The client navigation does not re-download the HTML document;
              React Router automatically fetches server loader data and updates
              the current route tree.
            </p>
          </div>

          <div className="rounded-2xl border border-accent bg-surface-raised p-6 sm:p-7">
            <p className="font-mono text-sm font-semibold text-accent">
              shouldRevalidate(args)
            </p>
            <p className="mt-3 text-sm leading-6 text-body">
              Returning <code className="font-mono font-semibold">false</code>{" "}
              opts that route out of the next revalidation and keeps its current
              loader data. It is a freshness decision—not a new cache layer—and
              does not skip the initial document loader.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby="loader-data-heading">
        <TopicHeading
          number="02"
          eyebrow="Data ownership"
          title="Where loader data actually lives"
          description="loaderData is transient router state. Persistent reuse requires a cache outside that state."
        />

        <dl id="loader-data-heading" className="grid gap-4 lg:grid-cols-3">
          {loaderDataLocations.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <dt className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                {item.label}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-body">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-5 lg:grid-cols-[minmax(22rem,0.8fr)_minmax(0,1.2fr)]">
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
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <h3 className="font-semibold text-heading">{layer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {layer.description}
                </p>
                <p className="mt-4 font-mono text-xs leading-5 text-accent">
                  {layer.examples}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-l-heading bg-surface p-5 text-sm leading-6 text-body shadow-sm">
          Loader/action headers are not automatically forwarded to the final
          response. If the policy is derived inside a loader, return it from the
          route module <code className="font-mono font-semibold">headers</code>{" "}
          export. User-specific responses should normally use{" "}
          <code className="font-mono font-semibold">private, no-store</code>.
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby="mutation-heading">
        <TopicHeading
          number="03"
          eyebrow="Mutations"
          title="Actions trigger automatic revalidation"
          description="React Router treats the server as the source of truth and reloads page data after a successful router-managed mutation."
        />

        <ol
          id="mutation-heading"
          className="grid list-none overflow-hidden rounded-2xl border border-border bg-surface p-0 shadow-sm lg:grid-cols-5"
        >
          {mutationFlow.map((step, index) => (
            <li
              key={step}
              className="relative border-b border-border p-5 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
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

        <div className="grid gap-4 sm:grid-cols-3">
          <p className="rounded-xl bg-heading p-5 text-sm leading-6 text-on-accent">
            Applies to successful actions submitted through Form, useSubmit, or
            fetcher APIs.
          </p>
          <p className="rounded-xl border border-border bg-surface p-5 text-sm leading-6 text-body">
            shouldRevalidate can opt individual routes out, so it must be used
            carefully to avoid stale UI.
          </p>
          <p className="rounded-xl border border-border bg-surface p-5 text-sm leading-6 text-body">
            An external mutation unknown to the router needs explicit
            revalidation or another invalidation signal.
          </p>
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby="prefetch-heading">
        <TopicHeading
          number="04"
          eyebrow="Prefetch"
          title="Load route modules and data before the click"
          description="The Link prefetch strategy controls when React Router emits prefetch hints for the destination."
        />

        <div
          id="prefetch-heading"
          className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
        >
          <div className="hidden grid-cols-[0.5fr_0.8fr_1.7fr] border-b border-border bg-surface-raised text-xs font-bold tracking-[0.12em] text-muted uppercase sm:grid">
            <p className="p-4">Value</p>
            <p className="border-l border-border p-4">Trigger</p>
            <p className="border-l border-border p-4">When to use it</p>
          </div>
          <dl>
            {prefetchModes.map((mode) => (
              <div
                key={mode.value}
                className="grid gap-3 border-b border-border p-4 last:border-b-0 sm:grid-cols-[0.5fr_0.8fr_1.7fr] sm:gap-0 sm:p-0"
              >
                <dt className="font-mono text-sm font-semibold text-accent sm:p-4">
                  {mode.value}
                </dt>
                <dd className="text-sm font-semibold text-heading sm:border-l sm:border-border sm:p-4">
                  {mode.trigger}
                </dd>
                <dd className="text-sm leading-6 text-muted sm:border-l sm:border-border sm:p-4">
                  {mode.use}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <CodePanel label="Link strategy">
            {`<Link to="/products" prefetch="intent">
  Products
</Link>`}
          </CodePanel>
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h3 className="font-semibold text-heading">
              Discovery is not prefetch
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              The default <code className="font-mono">discover="render"</code>{" "}
              fetches route metadata from the manifest so the router knows what
              to load. The <code className="font-mono">prefetch</code> prop goes
              further and requests destination data and modules. Use{" "}
              <code className="font-mono">PrefetchPageLinks</code> for explicit
              programmatic page prefetching.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby="prerender-heading">
        <TopicHeading
          number="05"
          eyebrow="Pre-rendering and ISR"
          title="Build-time data is a static artifact"
          description="Pre-rendering removes runtime work for selected URLs, but the generated files do not regenerate themselves."
        />

        <div id="prerender-heading" className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {prerenderFlow.map((step) => (
              <article
                key={step.number}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <span className="font-mono text-sm font-semibold text-accent">
                  {step.number}
                </span>
                <div>
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

        <div className="rounded-2xl border border-accent bg-surface p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
                ISR-like architecture
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-heading">
                SSR origin + CDN stale-while-revalidate
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted">
                React Router has no built-in Next-style ISR store. The common
                equivalent lets a CDN serve stale output while a runtime SSR
                request regenerates the next response.
              </p>
            </div>
            <ol className="grid list-none gap-2 p-0">
              {isrFlow.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl bg-surface-raised px-4 py-3"
                >
                  <span className="font-mono text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-body">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 border-t border-border pt-5 text-sm font-semibold leading-6 text-heading">
            Important: if the origin only serves the same pre-rendered static
            file, CDN revalidation receives the same old build. Real regeneration
            needs a runtime SSR handler, a persistent application cache, a host
            adapter, or a rebuild/webhook. Keep document and .data variants on
            the same freshness policy.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface shadow-sm">
          <div className="border-b border-border p-6 sm:p-7">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Route manifest
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-heading">
              Metadata for discovery—not loader data
            </h3>
          </div>
          <dl className="grid sm:grid-cols-2">
            {manifestFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`p-6 sm:p-7 ${
                  index % 2 === 1 ? "sm:border-l sm:border-border" : ""
                } ${index > 1 ? "border-t border-border" : ""}`}
              >
                <dt className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-body">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-3 border-t border-border bg-surface-raised p-5 text-sm leading-6 text-muted sm:grid-cols-2 sm:p-6">
            <p>
              <strong className="text-heading">/products.data:</strong> loader
              payload generated by running application code.
            </p>
            <p>
              <strong className="text-heading">/__manifest:</strong> route and
              asset metadata generated by the compiler. Cache it with both{" "}
              <code className="font-mono">version</code> and{" "}
              <code className="font-mono">paths</code> in the cache key.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby="rsc-heading">
        <TopicHeading
          number="06"
          eyebrow="React Server Components"
          title="RSC changes the payload—not the cache owner"
          description="React Router RSC can use a CDN, but cacheability must be designed at the HTTP and platform layers."
        />

        <div id="rsc-heading" className="grid gap-4 lg:grid-cols-3">
          {rscRequestFlow.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <h3 className="font-semibold text-heading">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-accent bg-surface-raised p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
                Can React Router RSC be cached on a CDN?
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-heading">
                Yes—conditionally, through HTTP caching.
              </p>
            </div>
            <span className="w-fit rounded-full bg-heading px-3 py-1 font-mono text-xs font-semibold text-on-accent">
              RSC MODE: UNSTABLE
            </span>
          </div>
          <ul className="mt-6 grid list-none gap-3 p-0 lg:grid-cols-3">
            <li className="rounded-xl bg-surface p-4 text-sm leading-6 text-body">
              The response must be public and deterministic; private or
              cookie-dependent output must not enter a shared cache.
            </li>
            <li className="rounded-xl bg-surface p-4 text-sm leading-6 text-body">
              Cache keys must distinguish the HTML document, RSC payload, URL,
              and any request inputs that change the response.
            </li>
            <li className="rounded-xl bg-surface p-4 text-sm leading-6 text-body">
              React Router supplies no built-in persistent RSC cache, TTL, tag,
              or path invalidation API; the CDN/application owns them.
            </li>
          </ul>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
          <div className="min-w-[48rem]">
            <div className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-border bg-surface-raised text-xs font-bold tracking-[0.1em] text-muted uppercase">
              <p className="p-4">Criterion</p>
              <p className="border-l border-border p-4">React Router RSC</p>
              <p className="border-l border-border p-4">Next.js App Router RSC</p>
            </div>
            <dl>
              {rscComparison.map((row) => (
                <div
                  key={row.criterion}
                  className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-border last:border-b-0"
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

        <p className="rounded-xl border-l-4 border-l-accent bg-surface p-5 text-sm leading-6 text-body shadow-sm">
          In Next.js today, a CDN must respect Cache-Control and keep RSC,
          prefetch, and HTML variants separate—commonly through the{" "}
          <code className="font-mono font-semibold">_rsc</code> cache key and
          relevant request headers. Static/ISR responses are cacheable; dynamic
          responses are normally private and no-store.
        </p>
      </section>

      <section className="grid gap-5" aria-labelledby="history-heading">
        <TopicHeading
          number="07"
          eyebrow="History navigation"
          title="Back/Forward is navigation, not a guaranteed data cache"
          description="Separate React Router's same-document POP navigation from the browser's full-document back/forward cache."
        />

        <div id="history-heading" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {backForwardFacts.map((fact) => (
            <article
              key={fact.title}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <h3 className="font-semibold text-heading">{fact.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {fact.description}
              </p>
            </article>
          ))}
        </div>

        <p className="rounded-xl bg-heading p-5 text-sm font-semibold leading-6 text-on-accent sm:p-6">
          ScrollRestoration can restore scroll position for Back/Forward. It
          does not restore or persist loader data.
        </p>
      </section>

      <aside className="rounded-2xl border border-border bg-surface-raised p-6 sm:p-7">
        <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
          Sources
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-heading sm:text-2xl">
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
    </SectionPage>
  );
}
