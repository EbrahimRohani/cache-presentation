import { SectionPage } from "../shared/section-page";
import { CandidatePlaceholder } from "./candidate-placeholder";
import { frameworkCandidates } from "./candidates";

export default function FrameworkDiscoveryPage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Candidate landscape
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Framework Discovery
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          This section will introduce each framework candidate and capture the
          discovery findings needed for the later evaluation.
        </p>
      </header>

      <ul className="grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
        {frameworkCandidates.map((candidate, index) => (
          <CandidatePlaceholder
            key={candidate.id}
            candidate={candidate}
            position={index + 1}
          />
        ))}
      </ul>
    </SectionPage>
  );
}
