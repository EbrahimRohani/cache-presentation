export const comparisonFrameworks = [
  {
    id: "next-js",
    name: "Next.js",
    position: "01",
  },
  {
    id: "react-router",
    name: "React Router",
    position: "02",
  },
] as const;

export type ComparisonFramework = (typeof comparisonFrameworks)[number];
