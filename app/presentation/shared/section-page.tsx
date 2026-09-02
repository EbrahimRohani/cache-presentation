import type { ReactNode } from "react";

interface SectionPageProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function SectionPage({ children, className = "" }: SectionPageProps) {
  return (
    <main
      className={`mx-auto flex min-h-full w-full max-w-[90rem] flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:gap-10 lg:px-12 lg:py-14 ${className}`}
    >
      {children}
    </main>
  );
}
