import { PlaceholderPanel } from "../shared/placeholder-panel";
import type { FrameworkCandidate } from "./candidates";

interface CandidatePlaceholderProps {
  readonly candidate: FrameworkCandidate;
  readonly position: number;
}

export function CandidatePlaceholder({
  candidate,
  position,
}: CandidatePlaceholderProps) {
  return (
    <li className="min-w-0">
      <PlaceholderPanel title={candidate.name}>
        <p className="font-mono text-sm font-semibold leading-7 text-heading sm:text-base">
          {candidate.todo}
        </p>
        <p className="mt-3">
          Candidate {String(position).padStart(2, "0")} is awaiting researched
          content.
        </p>
      </PlaceholderPanel>
    </li>
  );
}
