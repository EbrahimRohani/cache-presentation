import { SectionPage } from "../shared/section-page";
import { FrameworkPlaceholder } from "./framework-placeholder";
import { comparisonFrameworks } from "./frameworks";

export default function FeatureComparisonPage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Side-by-side evaluation
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Feature Comparison
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          A neutral workspace for comparing both frameworks against the same
          criteria once the evaluation inputs and supporting evidence are
          ready.
        </p>
      </header>

      <section aria-labelledby="frameworks-heading">
        <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Comparison candidates
            </p>
            <h2
              id="frameworks-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-heading sm:text-3xl"
            >
              Equal starting point
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted sm:text-right">
            No criteria, evidence, scores, or conclusions have been added.
          </p>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {comparisonFrameworks.map((framework) => (
            <FrameworkPlaceholder key={framework.id} framework={framework} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="criteria-heading"
        className="rounded-2xl border border-dashed border-border-strong bg-surface-raised p-6 sm:p-8"
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Future comparison area
            </p>
            <h2
              id="criteria-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-heading sm:text-3xl"
            >
              Shared criteria pending
            </h2>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-sm font-semibold leading-7 text-heading sm:text-base">
              TODO: Define comparison criteria and add verified feature
              evidence for both frameworks.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              This space can hold a comparison table or grouped feature
              analysis without changing the presentation shell.
            </p>
          </div>
        </div>
      </section>
    </SectionPage>
  );
}
