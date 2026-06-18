"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import ProfileAvatar from "@/components/ProfileAvatar";

type User = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  profileImage?: string | null;
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        setUser(data.user);
        if (data.user) setForm(data.user);
        setLoading(false);
      });
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }
    setUser(data.user);
    setForm(data.user);
    setEditing(false);
    setMessage("Profile updated successfully");
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    await fetch("/api/profile", { method: "DELETE" });
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  function handleAvatarUpdated(profileImage: string | null) {
    if (!user) return;
    const updated = { ...user, profileImage };
    setUser(updated);
    setForm(updated);
    setMessage(profileImage ? "Profile photo updated" : "Profile photo removed");
    setError("");
  }

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-20 text-center text-slate">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">My Account</h1>
        <p className="mt-4 text-slate">Sign in to manage your profile and orders.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/login" className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream">
            Log In
          </Link>
          <Link href="/register" className="rounded-full border border-charcoal px-6 py-3 text-sm font-semibold">
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl font-semibold">My Account</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium text-slate hover:text-blush-dark"
        >
          Log Out
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-sage-dark">{message}</p>}
      {error && <p className="mt-4 text-sm text-blush-dark">{error}</p>}

      <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
        <ProfileAvatar
          name={user.name}
          profileImage={user.profileImage}
          onUpdated={handleAvatarUpdated}
        />

        {!editing ? (
          <>
            <dl className="mt-8 space-y-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate">Name</dt>
                <dd className="mt-1">{user.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate">Email</dt>
                <dd className="mt-1">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate">Phone</dt>
                <dd className="mt-1">{user.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate">Address</dt>
                <dd className="mt-1">
                  {user.address
                    ? `${user.address}, ${user.city}, ${user.state} ${user.zip}, ${user.country}`
                    : "—"}
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded-lg bg-charcoal px-6 py-2 text-sm font-medium text-cream hover:bg-sage-dark"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg border border-blush-dark px-6 py-2 text-sm font-medium text-blush-dark hover:bg-blush/20"
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                required
                value={form.name ?? ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-sand px-4 py-2 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <input
                value={form.phone ?? ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-sand px-4 py-2 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <input
                value={form.address ?? ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-lg border border-sand px-4 py-2 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">City</label>
                <input
                  value={form.city ?? ""}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-lg border border-sand px-4 py-2 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">State</label>
                <input
                  value={form.state ?? ""}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full rounded-lg border border-sand px-4 py-2 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">ZIP</label>
                <input
                  value={form.zip ?? ""}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="w-full rounded-lg border border-sand px-4 py-2 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Country</label>
                <input
                  value={form.country ?? ""}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full rounded-lg border border-sand px-4 py-2 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="rounded-lg bg-charcoal px-6 py-2 text-sm font-medium text-cream">
                Save
              </button>
              <button
                type="button"
                onClick={() => { setEditing(false); setForm(user); }}
                className="rounded-lg border border-sand px-6 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
