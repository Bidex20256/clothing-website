"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AGE_GROUPS, CATEGORIES } from "@/lib/format";

export default function ShopFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all" || !value) next.delete(key);
    else next.set(key, value);
    router.push(`/shop?${next.toString()}`);
  }

  return (
    <aside className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-semibold uppercase tracking-wider">
          Age Group
        </label>
        <select
          value={params.get("ageGroup") ?? "all"}
          onChange={(e) => update("ageGroup", e.target.value)}
          className="w-full rounded-lg border border-sand px-3 py-2 text-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        >
          {AGE_GROUPS.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold uppercase tracking-wider">
          Category
        </label>
        <select
          value={params.get("category") ?? "all"}
          onChange={(e) => update("category", e.target.value)}
          className="w-full rounded-lg border border-sand px-3 py-2 text-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold uppercase tracking-wider">
          Sort By
        </label>
        <select
          value={params.get("sort") ?? "popular"}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full rounded-lg border border-sand px-3 py-2 text-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        >
          <option value="popular">Popularity</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold uppercase tracking-wider">
          Max Price (₦)
        </label>
        <input
          type="number"
          placeholder="e.g. 20000"
          defaultValue={params.get("maxPrice") ?? ""}
          onBlur={(e) => update("maxPrice", e.target.value)}
          className="w-full rounded-lg border border-sand px-3 py-2 text-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
        />
      </div>
    </aside>
  );
}
