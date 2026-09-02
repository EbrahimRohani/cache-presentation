import type { ReactNode } from "react";

interface PlaceholderPanelProps {
  readonly children: ReactNode;
  readonly title?: string;
}

export function PlaceholderPanel({
  children,
  title = "Content in progress",
}: PlaceholderPanelProps) {
  return (
    <section
      aria-label={title}
      className="flex min-h-56 flex-col justify-center rounded-2xl border border-dashed border-border-strong bg-surface-raised p-6 sm:p-8"
    >
      <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
        Planned content
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
        {title}
      </h2>
      <div className="mt-3 max-w-3xl text-base leading-7 text-muted sm:text-lg">
        {children}
      </div>
    </section>
  );
}
