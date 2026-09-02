export interface PresentationSection {
  readonly id: string;
  readonly title: string;
  readonly path: `/${string}`;
}

export const presentationSections = [
  {
    id: "requirements",
    title: "Requirements Definition",
    path: "/requirements",
  },
  {
    id: "framework-discovery",
    title: "Framework Discovery",
    path: "/framework-discovery",
  },
  {
    id: "ecosystem-credibility",
    title: "Ecosystem & Credibility",
    path: "/ecosystem-credibility",
  },
  {
    id: "feature-comparison",
    title: "Feature Comparison",
    path: "/feature-comparison",
  },
  {
    id: "benchmark-analysis",
    title: "Benchmark & Demo Analysis",
    path: "/benchmark-analysis",
  },
  {
    id: "developer-experience",
    title: "Developer Experience",
    path: "/developer-experience",
  },
  {
    id: "conclusion",
    title: "Conclusion",
    path: "/conclusion",
  },
] as const satisfies readonly PresentationSection[];
