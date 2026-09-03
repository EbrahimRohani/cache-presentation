export interface PresentationSection {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly path: `/${string}`;
}

export const presentationSections = [
  {
    id: "requirements",
    number: "1",
    title: "Requirements Definition",
    path: "/requirements",
  },
  {
    id: "framework-discovery",
    number: "2",
    title: "Framework Discovery",
    path: "/framework-discovery",
  },
  {
    id: "ecosystem-credibility",
    number: "3",
    title: "Ecosystem & Credibility",
    path: "/ecosystem-credibility",
  },
  {
    id: "feature-comparison",
    number: "4",
    title: "Feature Comparison",
    path: "/feature-comparison",
  },
  {
    id: "cache-comparison",
    number: "5",
    title: "Cache Comparison",
    path: "/cache-comparison",
  },
  {
    id: "cache-comparison-2",
    number: "5.1",
    title: "Cache Comparison",
    path: "/cache-comparison-2",
  },
  {
    id: "benchmark-analysis",
    number: "6",
    title: "Benchmark & Demo Analysis",
    path: "/benchmark-analysis",
  },
  {
    id: "developer-experience",
    number: "7",
    title: "Developer Experience",
    path: "/developer-experience",
  },
  {
    id: "conclusion",
    number: "8",
    title: "Conclusion",
    path: "/conclusion",
  },
] as const satisfies readonly PresentationSection[];
