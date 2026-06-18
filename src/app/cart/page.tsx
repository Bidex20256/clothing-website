"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { ensureImage } from "@/lib/images";
import { useCallback, useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import {
  CART_UPDATED_EVENT,
  dispatchCartUpdated,
  getCountFromCartResponse,
} from "@/lib/cart-events";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setItems(data.items ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCart();
    window.addEventListener(CART_UPDATED_EVENT, fetchCart);
    return () => window.removeEventListener(CART_UPDATED_EVENT, fetchCart);
  }, [fetchCart]);

  async function updateQuantity(id: string, quantity: number) {
    const res = await fetch(`/api/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    setItems(data.items);
    setTotal(data.total);
    dispatchCartUpdated(getCountFromCartResponse(data));
  }

  async function removeItem(id: string) {
    const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
    const data = await res.json();
    setItems(data.items);
    setTotal(data.total);
    dispatchCartUpdated(getCountFromCartResponse(data));
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-slate">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-lg text-slate">Your cart is empty</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-charcoal px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-sage-dark"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm sm:gap-6 sm:p-6"
              >
                <Link href={`/shop/${item.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-32 sm:w-28">
                  <SafeImage src={ensureImage(item.image)} alt={item.name} fill className="object-cover" sizes="112px" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/shop/${item.slug}`} className="font-medium hover:text-sage-dark">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-slate">
                      {item.size} · {item.color}
                    </p>
                    <p className="mt-2 font-semibold">{formatPrice(item.price)}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-sand">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-sand/50"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-sand/50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-blush-dark hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-4 flex justify-between border-b border-sand pb-4">
              <span className="text-slate">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="mt-4 flex justify-between">
              <span className="text-slate">Shipping</span>
              <span className="text-sm text-sage-dark">Calculated at checkout</span>
            </div>
            <div className="mt-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-xl bg-charcoal py-4 text-center text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-sage-dark"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
