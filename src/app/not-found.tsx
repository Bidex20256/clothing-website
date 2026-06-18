import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-semibold text-sage">404</h1>
      <p className="mt-4 text-lg text-slate">Page not found</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-charcoal px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-sage-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
