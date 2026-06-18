import { prisma } from "./db";
import { ensureImages } from "./images";

export type ProductFilters = {
  ageGroup?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "popular" | "price-asc" | "price-desc" | "newest";
  search?: string;
};

export function parseJsonArray(value: string): string[] {
  try {
    return JSON.parse(value) as string[];
  } catch {
    return [];
  }
}

export async function getProducts(filters: ProductFilters = {}) {
  const where: Record<string, unknown> = {};

  if (filters.ageGroup && filters.ageGroup !== "all") {
    where.ageGroup = filters.ageGroup;
  }
  if (filters.category && filters.category !== "all") {
    where.category = filters.category;
  }
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { description: { contains: filters.search } },
    ];
  }

  let orderBy: Record<string, string> = { popularity: "desc" };
  if (filters.sort === "price-asc") orderBy = { price: "asc" };
  if (filters.sort === "price-desc") orderBy = { price: "desc" };
  if (filters.sort === "newest") orderBy = { createdAt: "desc" };

  const products = await prisma.product.findMany({ where, orderBy });

  let filtered = products;
  if (filters.minPrice != null) {
    filtered = filtered.filter((p) => {
      const price = p.isPromo && p.promoPrice ? p.promoPrice : p.price;
      return price >= filters.minPrice!;
    });
  }
  if (filters.maxPrice != null) {
    filtered = filtered.filter((p) => {
      const price = p.isPromo && p.promoPrice ? p.promoPrice : p.price;
      return price <= filters.maxPrice!;
    });
  }

  return filtered.map((p) => ({
    ...p,
    images: ensureImages(parseJsonArray(p.images)),
    sizes: parseJsonArray(p.sizes),
    colors: parseJsonArray(p.colors),
    displayPrice: p.isPromo && p.promoPrice ? p.promoPrice : p.price,
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return null;

  return {
    ...product,
    images: ensureImages(parseJsonArray(product.images)),
    sizes: parseJsonArray(product.sizes),
    colors: parseJsonArray(product.colors),
    displayPrice:
      product.isPromo && product.promoPrice ? product.promoPrice : product.price,
  };
}
