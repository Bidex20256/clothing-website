"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-center font-display text-3xl font-semibold">Create Account</h1>
      <p className="mt-2 text-center text-slate">Join the Temir family</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl bg-white p-8 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium">Full Name</label>
          <input
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password (min. 8 characters)</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-sand px-4 py-3 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
        {error && <p className="text-sm text-blush-dark">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-charcoal py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-sage-dark disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-sage-dark hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
