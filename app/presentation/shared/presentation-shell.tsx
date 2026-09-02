import { useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { presentationSections } from "../registry";
import { getPresentationNavigation } from "./presentation-navigation";
import { usePresentationKeyboardNavigation } from "./use-presentation-keyboard-navigation";

interface PresentationShellProps {
  readonly children: ReactNode;
}

export function PresentationShell({ children }: PresentationShellProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const navigation = getPresentationNavigation(pathname);

  usePresentationKeyboardNavigation({
    previous: navigation?.previous ?? null,
    next: navigation?.next ?? null,
  });

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  if (!navigation) {
    return <>{children}</>;
  }

  const { current, currentIndex, previous, next, total } = navigation;
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flex h-dvh min-h-[32rem] flex-col overflow-hidden bg-canvas text-body">
      <header className="shrink-0 border-b border-border bg-surface/95 px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
              Stack evaluation
            </p>
            <h1 className="truncate text-base font-semibold text-heading sm:text-lg">
              {current.title}
            </h1>
          </div>
          <p
            className="shrink-0 font-mono text-sm font-semibold tabular-nums text-muted"
            aria-label={`Section ${currentIndex + 1} of ${total}`}
          >
            {currentIndex + 1} / {total}
          </p>
        </div>
      </header>

      <div
        ref={contentRef}
        id="presentation-content"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {children}
      </div>

      <footer className="shrink-0 border-t border-border bg-surface px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[100rem] gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="flex min-w-0 items-center gap-2">
            {previous ? (
              <Link
                to={previous.path}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border-strong bg-surface-raised px-3 py-2 text-sm font-semibold text-heading transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={`Previous section: ${previous.title}`}
              >
                <span aria-hidden="true">←</span>
                <span>Previous</span>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-disabled"
              >
                <span aria-hidden="true">←</span>
                <span>Previous</span>
              </button>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-2 sm:w-72">
            <label htmlFor="presentation-section" className="sr-only">
              Jump to section
            </label>
            <select
              id="presentation-section"
              value={current.path}
              onChange={(event) => navigate(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                }
              }}
              className="min-h-10 w-full rounded-lg border border-border-strong bg-surface-raised px-3 py-2 text-sm font-semibold text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {presentationSections.map((section, index) => (
                <option key={section.id} value={section.path}>
                  {index + 1}. {section.title}
                </option>
              ))}
            </select>
            <div
              role="progressbar"
              aria-label="Presentation progress"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={currentIndex + 1}
              className="h-1.5 overflow-hidden rounded-full bg-progress-track"
            >
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-end gap-2">
            {next ? (
              <Link
                to={next.path}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={`Next section: ${next.title}`}
              >
                <span>Next</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 rounded-lg bg-disabled-surface px-3 py-2 text-sm font-semibold text-disabled"
              >
                <span>Next</span>
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
