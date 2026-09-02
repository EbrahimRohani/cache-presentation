import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const meta: Route.MetaFunction = () => [
  { title: "Stack Evaluation Presentation" },
  {
    name: "description",
    content: "A structured comparison of full-stack framework options.",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-bold tracking-[0.14em] text-accent uppercase">
        Presentation error
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-heading">
        {message}
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted">{details}</p>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto rounded-xl border border-border bg-surface p-4 text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
