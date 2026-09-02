import { SectionPage } from "../shared/section-page";
import { ImplementationComparisonPlaceholder } from "./implementation-comparison-placeholder";

export default function DeveloperExperiencePage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Developer workflow
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Developer Experience
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          A neutral workspace for examining implementation approaches once
          verified examples and their supporting context are ready.
        </p>
      </header>

      <ImplementationComparisonPlaceholder />
    </SectionPage>
  );
}
