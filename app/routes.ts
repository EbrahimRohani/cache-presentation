import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

import { presentationSections } from "./presentation/registry";

export default [
  layout("presentation/layout.tsx", [
    index("presentation/index.tsx"),
    ...presentationSections.map(({ id, path }) =>
      route(path.slice(1), `presentation/${id}/page.tsx`),
    ),
  ]),
] satisfies RouteConfig;
