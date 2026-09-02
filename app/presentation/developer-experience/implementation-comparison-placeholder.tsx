const comparisonSlots = [
  {
    id: "implementation-a",
    label: "Comparison input A",
  },
  {
    id: "implementation-b",
    label: "Comparison input B",
  },
] as const;

export function ImplementationComparisonPlaceholder() {
  return (
    <section aria-labelledby="implementation-comparison-heading">
      <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
            Planned analysis
          </p>
          <h2
            id="implementation-comparison-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-heading sm:text-3xl"
          >
            Implementation Comparison
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted sm:text-right">
          Code examples, implementation notes, and analysis are pending.
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {comparisonSlots.map((slot, index) => (
          <article
            key={slot.id}
            aria-labelledby={`${slot.id}-heading`}
            className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
          >
            <header className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4 sm:px-6">
              <h3
                id={`${slot.id}-heading`}
                className="text-sm font-semibold text-heading"
              >
                {slot.label}
              </h3>
              <span
                aria-hidden="true"
                className="font-mono text-xs font-semibold text-muted"
              >
                0{index + 1}
              </span>
            </header>

            <div className="flex min-h-64 flex-col justify-between gap-8 p-5 sm:p-6">
              <div>
                <p className="text-xs font-bold tracking-[0.12em] text-accent uppercase">
                  Code example pending
                </p>
                <p className="mt-3 font-mono text-sm leading-7 text-heading">
                  TODO: Add a verified implementation example.
                </p>
              </div>
              <p className="border-t border-dashed border-border-strong pt-4 text-sm leading-6 text-muted">
                Supporting implementation notes will accompany this example.
              </p>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-5 rounded-2xl border border-dashed border-border-strong bg-surface-raised p-6 sm:p-8">
        <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
          Supporting explanation
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-heading sm:text-2xl">
          Analysis pending
        </h3>
        <p className="mt-3 max-w-4xl text-base leading-7 text-muted">
          TODO: Add sourced context that explains the implementation examples
          without drawing unsupported conclusions.
        </p>
      </aside>
    </section>
  );
}
