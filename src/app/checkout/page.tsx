"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
  } | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Nigeria",
  });

  useEffect(() => {
    async function init() {
      const [cartRes, userRes] = await Promise.all([
        fetch("/api/cart"),
        fetch("/api/auth/me"),
      ]);
      const cart = await cartRes.json();
      const userData = await userRes.json();

      setTotal(cart.total ?? 0);
      if (!userData.user) {
        setLoading(false);
        return;
      }

      setUser(userData.user);
      setForm({
        fullName: userData.user.name ?? "",
        email: userData.user.email ?? "",
        phone: userData.user.phone ?? "",
        address: userData.user.address ?? "",
        city: userData.user.city ?? "",
        state: userData.user.state ?? "",
        zip: userData.user.zip ?? "",
        country: userData.user.country ?? "Nigeria",
      });
      setLoading(false);
    }
    init();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-slate">Loading...</div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Checkout</h1>
        <p className="mt-4 text-slate">Please log in to complete your purchase.</p>
        <Link
          href="/login?redirect=/checkout"
          className="mt-6 inline-block rounded-full bg-charcoal px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold">Checkout</h1>
      <p className="mt-2 text-slate">Secure shipping — all fields required</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input
              type="tel"
              required
              minLength={10}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Street Address</label>
            <input
              required
              minLength={5}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State</label>
            <input
              required
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">ZIP / Postal Code</label>
            <input
              required
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Country</label>
            <input
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex justify-between text-lg font-semibold">
            <span>Order Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {error && <p className="text-sm text-blush-dark">{error}</p>}

        <button
          type="submit"
          disabled={submitting || total === 0}
          className="w-full rounded-xl bg-charcoal py-4 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-sage-dark disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
