import type { ComparisonFramework } from "./frameworks";

interface FrameworkPlaceholderProps {
  readonly framework: ComparisonFramework;
}

const pendingItems = [
  "TODO: Add feature evidence.",
  "TODO: Evaluate against shared criteria.",
] as const;

export function FrameworkPlaceholder({
  framework,
}: FrameworkPlaceholderProps) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
          Framework
        </p>
        <span
          aria-hidden="true"
          className="font-mono text-sm font-semibold text-muted"
        >
          {framework.position}
        </span>
      </div>

      <h3 className="mt-5 text-3xl font-semibold tracking-tight text-heading">
        {framework.name}
      </h3>
      <p className="mt-3 text-base leading-7 text-muted">
        Placeholder for researched, source-backed comparison content.
      </p>

      <ul className="mt-6 grid list-none gap-3 p-0">
        {pendingItems.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-dashed border-border-strong bg-surface-raised px-4 py-3 font-mono text-sm font-semibold leading-6 text-heading"
          >
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-border pt-4 text-sm font-semibold text-accent">
        Status: TODO — comparison content pending
      </p>
    </article>
  );
}
