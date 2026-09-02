import { SectionPage } from "../shared/section-page";
import { TechnologyAdoptionSection } from "./components/technology-adoption/technology-adoption-section";

const researchTracks = [
  {
    number: "01",
    title: "OTA Adoption: React Router vs Next.js App Router",
    description:
      "A future evidence review of real-world OTA adoption across the two router ecosystems.",
    accentClassName: "border-l-accent",
  },
  {
    number: "02",
    title: "Next.js Pages Router vs App Router",
    description:
      "A future comparison of the credibility signals surrounding Next.js's two routing models.",
    accentClassName: "border-l-heading",
  },
] as const;

const placeholderItems = [
  {
    label: "Evidence",
    text: "TODO: Add verified sources and adoption evidence.",
  },
  {
    label: "Examples",
    text: "TODO: Add researched examples with supporting context.",
  },
  {
    label: "Explanation",
    text: "TODO: Explain what the verified findings mean for this evaluation.",
  },
] as const;

export default function EcosystemCredibilityPage() {
  return (
    <SectionPage>
      <header className="max-w-5xl">
        <p className="text-sm font-bold tracking-[0.16em] text-accent uppercase">
          Research checkpoint
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Ecosystem &amp; Credibility
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-body sm:text-xl sm:leading-9">
          Two focused research tracks and an adoption snapshot establish the
          ecosystem signals and supporting evidence needed before any conclusions
          are drawn.
        </p>
      </header>

      <ol className="grid list-none gap-5 p-0 lg:grid-cols-2">
        {researchTracks.map((track) => (
          <li
            key={track.number}
            className={`flex min-w-0 flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:min-h-[30rem] ${track.accentClassName} border-l-4`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
                Research track
              </p>
              <span
                aria-hidden="true"
                className="font-mono text-sm font-semibold text-muted"
              >
                {track.number}
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
              {track.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {track.description}
            </p>

            <ul className="mt-7 grid list-none gap-3 p-0 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {placeholderItems.map((item) => (
                <li
                  key={item.label}
                  className="rounded-xl border border-dashed border-border-strong bg-surface-raised p-4"
                >
                  <p className="text-xs font-bold tracking-[0.12em] text-heading uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-auto border-t border-border pt-5 text-sm font-semibold text-accent">
              Status: TODO — research not yet added
            </p>
          </li>
        ))}
      </ol>

      <TechnologyAdoptionSection />
    </SectionPage>
  );
}
