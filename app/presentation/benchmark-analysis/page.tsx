import { SectionPage } from "../shared/section-page";
import { BenchmarkTopicPlaceholder } from "./benchmark-topic-placeholder";
import { benchmarkTopics } from "./benchmark-topics";

export default function BenchmarkAnalysisPage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Evidence workspace
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Benchmark &amp; Demo Analysis
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          A structured outline for verified measurements, observations, and
          diagrams once the benchmark runs and demo analysis are complete.
        </p>
      </header>

      <section aria-labelledby="analysis-topics-heading">
        <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Analysis plan
            </p>
            <h2
              id="analysis-topics-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-heading sm:text-3xl"
            >
              Benchmark topics
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted sm:text-right">
            Results and conclusions remain pending until supporting evidence is
            available.
          </p>
        </div>

        <ol className="mt-5 grid list-none gap-5 p-0 lg:grid-cols-2">
          {benchmarkTopics.map((topic) => (
            <li key={topic.id} className="min-w-0">
              <BenchmarkTopicPlaceholder topic={topic} />
            </li>
          ))}
        </ol>
      </section>
    </SectionPage>
  );
}
