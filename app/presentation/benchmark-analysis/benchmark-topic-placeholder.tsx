import type { BenchmarkTopic } from "./benchmark-topics";

interface BenchmarkTopicPlaceholderProps {
  readonly topic: BenchmarkTopic;
}

export function BenchmarkTopicPlaceholder({
  topic,
}: BenchmarkTopicPlaceholderProps) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
          Benchmark topic
        </p>
        <span
          aria-hidden="true"
          className="font-mono text-sm font-semibold text-muted"
        >
          {topic.position}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
        {topic.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-muted">
        {topic.description}
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-border-strong bg-surface-raised p-5">
        <p className="text-xs font-bold tracking-[0.12em] text-heading uppercase">
          Result &amp; analysis
        </p>
        <p className="mt-3 font-mono text-sm font-semibold leading-6 text-heading">
          {topic.todo}
        </p>
      </div>

      <p className="mt-auto border-t border-border pt-5 text-sm font-semibold text-accent">
        Status: TODO — evidence not yet added
      </p>
    </article>
  );
}
