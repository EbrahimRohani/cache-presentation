import { redirect } from "react-router";

import { presentationSections } from "./registry";

export function loader() {
  return redirect(presentationSections[0].path);
}
