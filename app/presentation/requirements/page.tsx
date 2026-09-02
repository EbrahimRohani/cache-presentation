import { PlaceholderPanel } from "../shared/placeholder-panel";
import { SectionPage } from "../shared/section-page";

export default function RequirementsPage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Evaluation foundation
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Requirements Definition
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          This section will establish the requirements and evaluation criteria
          used to assess the framework options in the sections that follow.
        </p>
      </header>

      <PlaceholderPanel title="Requirements and criteria pending">
        <p className="font-mono text-sm font-semibold leading-7 text-heading sm:text-base">
          TODO: Add requirements definition and evaluation criteria
        </p>
        <p className="mt-3">
          The final content can accommodate structured requirements, comparison
          tables, diagrams, and supporting context once the evaluation inputs
          are ready.
        </p>
      </PlaceholderPanel>
    </SectionPage>
  );
}
