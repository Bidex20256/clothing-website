"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-center font-display text-3xl font-semibold">Welcome Back</h1>
      <p className="mt-2 text-center text-slate">Log in to your Temir account</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl bg-white p-8 shadow-sm">
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
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            required
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
          {loading ? "Signing in..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-sage-dark hover:underline">
          Register
        </Link>
      </p>
      <p className="mt-4 text-center text-xs text-slate">
        Demo: demo@temir.com / demo1234
      </p>
    </div>
  );
}
