export const benchmarkTopics = [
  {
    id: "navigation-performance",
    position: "01",
    title: "Navigation Performance",
    description:
      "Space for documented navigation scenarios, verified measurements, and analysis of the observed behavior.",
    todo: "TODO: Add verified navigation performance results and analysis.",
  },
  {
    id: "bundle-size",
    position: "02",
    title: "Bundle Size",
    description:
      "Space for comparable build artifacts, measurement context, and a source-backed interpretation.",
    todo: "TODO: Add verified bundle size results and analysis.",
  },
  {
    id: "load-testing-resource-usage",
    position: "03",
    title: "Load Testing & Resource Usage",
    description:
      "Space for reproducible load scenarios, captured resource observations, and their implications.",
    todo: "TODO: Add verified load testing and resource usage results and analysis.",
  },
  {
    id: "build-performance",
    position: "04",
    title: "Build Performance",
    description:
      "Space for documented build conditions, observed behavior, and evidence-based analysis.",
    todo: "TODO: Add verified build performance results and analysis.",
  },
  {
    id: "caching-strategy",
    position: "05",
    title: "Caching Strategy",
    description:
      "Space for cache behavior diagrams, validated observations, and tradeoff analysis.",
    todo: "TODO: Add verified caching strategy results and analysis.",
  },
  {
    id: "ota-rendering-strategies",
    position: "06",
    title: "OTA Rendering Strategies",
    description:
      "Space for rendering flow diagrams, demo observations, and supported conclusions.",
    todo: "TODO: Add verified OTA rendering strategy results and analysis.",
  },
] as const;

export type BenchmarkTopic = (typeof benchmarkTopics)[number];
