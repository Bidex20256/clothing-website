import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import { getProducts, ProductFilters } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Browse Temir clothing for children, teenagers, youths, and adults. Filter by age, category, and price.",
};

type SearchParams = {
  ageGroup?: string;
  category?: string;
  sort?: string;
  maxPrice?: string;
  minPrice?: string;
  search?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters: ProductFilters = {
    ageGroup: searchParams.ageGroup,
    category: searchParams.category,
    sort: (searchParams.sort as ProductFilters["sort"]) ?? "popular",
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    search: searchParams.search,
  };

  const products = await getProducts(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-semibold">Shop</h1>
        <p className="mt-2 text-slate">
          {products.length} {products.length === 1 ? "item" : "items"} found
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-sand" />}>
          <ShopFilters />
        </Suspense>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center">
            <p className="text-lg font-medium">No products match your filters</p>
            <p className="mt-2 text-slate">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                image={p.images[0]}
                price={p.displayPrice}
                originalPrice={p.isPromo ? p.price : undefined}
                isNew={p.isNew}
                isPromo={p.isPromo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
