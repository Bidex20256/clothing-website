"use client";

import { useState } from "react";
import { dispatchCartUpdated, getCountFromCartResponse } from "@/lib/cart-events";

type Props = {
  productId: string;
  sizes: string[];
  colors: string[];
};

export default function AddToCartButton({ productId, sizes, colors }: Props) {
  const [size, setSize] = useState(sizes[0] ?? "");
  const [color, setColor] = useState(colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAdd() {
    if (!size || !color) {
      setMessage("Please select size and color");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, size, color, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("Added to cart!");
      dispatchCartUpdated(getCountFromCartResponse(data));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to add");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  size === s
                    ? "border-sage bg-sage text-white"
                    : "border-sand hover:border-sage"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  color === c
                    ? "border-sage bg-sage text-white"
                    : "border-sand hover:border-sage"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Quantity</label>
        <div className="inline-flex items-center rounded-lg border border-sand">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 hover:bg-sand/50"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-4 py-2 hover:bg-sand/50"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={loading}
        className="w-full rounded-xl bg-charcoal py-4 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-sage-dark disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {message && (
        <p className={`text-center text-sm ${message.includes("Added") ? "text-sage-dark" : "text-blush-dark"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
