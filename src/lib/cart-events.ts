export const CART_UPDATED_EVENT = "cart-updated";

export type CartUpdatedDetail = { count?: number };

export async function fetchCartItemCount(): Promise<number> {
  const res = await fetch("/api/cart");
  if (!res.ok) return 0;
  const data = await res.json();
  const items = (data.items ?? []) as { quantity: number }[];
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function dispatchCartUpdated(count?: number) {
  window.dispatchEvent(
    new CustomEvent<CartUpdatedDetail>(CART_UPDATED_EVENT, {
      detail: count != null ? { count } : {},
    })
  );
}

export function getCountFromCartResponse(data: {
  items?: { quantity: number }[];
}): number {
  return (data.items ?? []).reduce((sum, item) => sum + item.quantity, 0);
}
