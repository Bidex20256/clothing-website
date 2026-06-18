import Link from "next/link";
import CartClearNotifier from "@/components/CartClearNotifier";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <CartClearNotifier />
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
        <svg className="h-8 w-8 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold">Thank You!</h1>
      <p className="mt-4 text-slate">
        Your order has been placed successfully.
        {searchParams.order && (
          <span className="mt-2 block font-medium text-charcoal">
            Order ID: {searchParams.order}
          </span>
        )}
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full bg-charcoal px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-sage-dark"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
