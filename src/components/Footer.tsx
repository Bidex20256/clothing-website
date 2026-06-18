"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
      setMessage("You're subscribed! Welcome to Temir.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Subscription failed");
    }
  }

  return (
    <footer className="border-t border-sand bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold">
              Temir
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Modern clothing for every generation. Style that grows with your family.
            </p>
            <div className="mt-6 flex gap-4">
              {[
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Facebook", href: "https://facebook.com" },
                { label: "Twitter", href: "https://twitter.com" },
                { label: "Pinterest", href: "https://pinterest.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate/30 p-2 transition-colors hover:bg-sage"
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.3" />
                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-sand">
              <li><Link href="/shop?ageGroup=children" className="hover:text-cream">Children</Link></li>
              <li><Link href="/shop?ageGroup=teenagers" className="hover:text-cream">Teenagers</Link></li>
              <li><Link href="/shop?ageGroup=youths" className="hover:text-cream">Youths</Link></li>
              <li><Link href="/shop?ageGroup=adults" className="hover:text-cream">Adults</Link></li>
              <li><Link href="/shop?sort=newest" className="hover:text-cream">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-sand">
              <li>12 Fashion Avenue, Lagos</li>
              <li>
                <a href="mailto:hello@temir.com" className="hover:text-cream">hello@temir.com</a>
              </li>
              <li>
                <a href="tel:+2348000000000" className="hover:text-cream">+234 800 000 0000</a>
              </li>
              <li>Mon – Sat: 9am – 7pm</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h3>
            <p className="mt-4 text-sm text-sand">
              Get style tips, new arrivals, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletter} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-lg border border-slate/40 bg-charcoal px-3 py-2 text-sm text-cream placeholder:text-slate focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg bg-sage px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-dark disabled:opacity-50"
              >
                Join
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-xs ${status === "error" ? "text-blush" : "text-sage"}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate/30 pt-8 text-xs text-slate sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Temir. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-cream">About</Link>
            <Link href="/contact" className="hover:text-cream">Contact</Link>
            <Link href="/blog" className="hover:text-cream">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
