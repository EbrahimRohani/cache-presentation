export interface FrameworkCandidate {
  readonly id: string;
  readonly name: string;
  readonly todo: string;
}

export const frameworkCandidates = [
  {
    id: "tanstack-start",
    name: "TanStack Start",
    todo: "TODO: Add TanStack Start discovery findings",
  },
  {
    id: "react-router",
    name: "React Router",
    todo: "TODO: Add React Router discovery findings",
  },
  {
    id: "next-js",
    name: "Next.js",
    todo: "TODO: Add Next.js discovery findings",
  },
  {
    id: "solid-start",
    name: "SolidStart",
    todo: "TODO: Add SolidStart discovery findings",
  },
  {
    id: "other-candidates",
    name: "Other Candidates",
    todo: "TODO: Add discovery findings for other candidates",
  },
] as const satisfies readonly FrameworkCandidate[];
