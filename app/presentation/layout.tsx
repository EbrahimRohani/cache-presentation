import { Outlet } from "react-router";

import { PresentationShell } from "./shared/presentation-shell";

export default function PresentationLayout() {
  return (
    <PresentationShell>
      <Outlet />
    </PresentationShell>
  );
}
