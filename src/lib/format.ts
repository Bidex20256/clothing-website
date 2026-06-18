export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

export const AGE_GROUPS = [
  { value: "all", label: "All Ages" },
  { value: "children", label: "Children (5+)" },
  { value: "teenagers", label: "Teenagers" },
  { value: "youths", label: "Youths" },
  { value: "adults", label: "Adults" },
] as const;

export const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "dresses", label: "Dresses" },
  { value: "outerwear", label: "Outerwear" },
  { value: "accessories", label: "Accessories" },
] as const;
