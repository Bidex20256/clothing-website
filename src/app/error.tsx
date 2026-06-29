"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-4 max-w-md text-slate">
        The page could not load. Try refreshing or return to the homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-charcoal px-6 py-3 text-sm font-semibold"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
