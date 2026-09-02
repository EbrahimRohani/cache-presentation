import { technologyAdoptionGroups } from "./technology-adoption-data";

// Recognizable, high-scale travel brands get a stronger visual treatment so
// the slide communicates ecosystem credibility at a glance.
const featuredProductNames = new Set([
  "Airbnb",
  "Expedia",
  "Skyscanner",
  "KAYAK",
  "Hotels.com",
  "Priceline",
  "trivago",
  "Trip.com",
  "Agoda",
  "Booking.com",
  "Orbitz",
  "Travelocity",
]);

export function TechnologyAdoptionSection() {
  return (
    <section aria-labelledby="technology-adoption-heading">
      <header className="border-b border-border pb-5">
        <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-accent uppercase">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          Adoption snapshot
        </p>
        <h2
          id="technology-adoption-heading"
          className="mt-3 text-3xl font-semibold tracking-tight text-heading sm:text-4xl"
        >
          Technology Adoption Across Major OTAs
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
          The frontend stacks detected across the benchmark sample, grouped by
          technology so the companies are easy to compare at a glance.
        </p>
      </header>

      <ul className="mt-5 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-5">
        {technologyAdoptionGroups.map((group, index) => {
          const isLead = index === 0;
          const products = [...group.products].sort(
            (a, b) =>
              Number(featuredProductNames.has(b.name)) -
              Number(featuredProductNames.has(a.name)),
          );

          return (
            <li key={group.id} className="min-w-0">
              <article
                aria-labelledby={`${group.id}-technology-heading`}
                className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-surface shadow-sm ${isLead ? "border-accent/50" : "border-border"}`}
              >
                <div
                  aria-hidden="true"
                  className={`h-1 w-full ${isLead ? "bg-accent" : "bg-progress-track"}`}
                />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3
                    id={`${group.id}-technology-heading`}
                    className="text-lg font-semibold leading-7 text-heading sm:text-xl"
                  >
                    {group.technology}
                  </h3>

                  <ul className="mt-4 flex list-none flex-wrap gap-2 border-t border-border pt-4 pl-0 text-sm leading-5 text-body">
                    {products.map((product) => (
                      <li
                        key={product.name}
                        className={`min-w-0 rounded-lg border px-2.5 py-1.5 ${featuredProductNames.has(product.name) ? "border-accent/45 bg-accent/[0.08] text-accent-strong shadow-sm" : "border-border bg-surface-raised"}`}
                      >
                        <span className={featuredProductNames.has(product.name) ? "font-semibold" : "font-medium"}>
                          {product.name}
                        </span>
                        {"detail" in product && product.detail ? (
                          <span className="ml-1 text-xs leading-4 text-muted">
                            ·
                            {" "}
                            {product.detail}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 border-l-4 border-accent/60 pl-4 text-xs leading-5 text-muted sm:text-sm">
        Point-in-time technology detection; a single product may use multiple
        frontend stacks across different routes.
      </p>
    </section>
  );
}
