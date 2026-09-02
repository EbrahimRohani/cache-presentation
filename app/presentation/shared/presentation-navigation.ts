import {
  presentationSections,
  type PresentationSection,
} from "../registry";

export interface PresentationNavigation {
  readonly current: PresentationSection;
  readonly currentIndex: number;
  readonly previous: PresentationSection | null;
  readonly next: PresentationSection | null;
  readonly total: number;
}

function normalizePathname(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "");
}

export function getPresentationNavigation(
  pathname: string,
): PresentationNavigation | null {
  const normalizedPathname = normalizePathname(pathname);
  const currentIndex = presentationSections.findIndex(
    ({ path }) => path === normalizedPathname,
  );

  if (currentIndex === -1) {
    return null;
  }

  return {
    current: presentationSections[currentIndex],
    currentIndex,
    previous: presentationSections[currentIndex - 1] ?? null,
    next: presentationSections[currentIndex + 1] ?? null,
    total: presentationSections.length,
  };
}
