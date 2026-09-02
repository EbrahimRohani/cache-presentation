import { SectionPage } from "../shared/section-page";

const conclusionTopics = [
  {
    id: "trade-off-summary",
    eyebrow: "Synthesis pending",
    title: "Trade-off Summary",
    todo: "TODO: Summarize the verified trade-offs from the completed evaluation.",
    note: "Evidence, constraints, and decision rationale will be added here once the research is complete.",
  },
  {
    id: "final-recommendation",
    eyebrow: "Decision pending",
    title: "Final Recommendation",
    todo: "TODO: Add the final recommendation and its supporting rationale.",
    note: "No framework has been selected. This space is reserved for the evidence-backed decision.",
  },
] as const;

export default function ConclusionPage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Closing decision
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Conclusion
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          A concise closing structure for synthesizing verified trade-offs and
          recording a final recommendation after the evaluation is complete.
        </p>
      </header>

      <section aria-labelledby="decision-areas-heading">
        <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Decision areas
            </p>
            <h2
              id="decision-areas-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-heading sm:text-3xl"
            >
              Awaiting completed research
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted sm:text-right">
            No trade-offs, rationale, or framework recommendation have been
            decided.
          </p>
        </div>

        <ol className="mt-5 grid list-none gap-5 p-0 lg:grid-cols-2">
          {conclusionTopics.map((topic, index) => (
            <li key={topic.id} className="min-w-0">
              <article
                aria-labelledby={`${topic.id}-heading`}
                className="flex h-full min-h-72 flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
                    {topic.eyebrow}
                  </p>
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm font-semibold text-muted"
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3
                  id={`${topic.id}-heading`}
                  className="mt-5 text-2xl font-semibold tracking-tight text-heading sm:text-3xl"
                >
                  {topic.title}
                </h3>

                <div className="mt-6 rounded-xl border border-dashed border-border-strong bg-surface-raised p-5">
                  <p className="font-mono text-sm font-semibold leading-7 text-heading sm:text-base">
                    {topic.todo}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {topic.note}
                  </p>
                </div>

                <p className="mt-auto border-t border-border pt-5 text-sm font-semibold text-accent">
                  Status: TODO — conclusion not yet determined
                </p>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </SectionPage>
  );
}
