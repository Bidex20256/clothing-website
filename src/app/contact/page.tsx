"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
      setMessage(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">Contact Us</h1>
        <p className="mt-4 text-slate">
          Have a question about sizing, orders, or wholesale? We&apos;d love to hear from you.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Visit</h3>
            <p className="mt-2 text-sm text-slate">12 Fashion Avenue, Lagos, Nigeria</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Reach Us</h3>
            <p className="mt-2 text-sm text-slate">hello@temir.com</p>
            <p className="text-sm text-slate">+234 800 000 0000</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl bg-white p-8 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              required
              minLength={10}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>
          {message && (
            <p className={`text-sm ${status === "error" ? "text-blush-dark" : "text-sage-dark"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-charcoal py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-sage-dark disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
