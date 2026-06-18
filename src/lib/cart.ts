import { prisma } from "./db";
import { getCurrentUser, getGuestSessionId } from "./auth";
import { ensureImage, ensureImages } from "./images";
import { parseJsonArray } from "./products";

export async function getCartOwner() {
  const user = await getCurrentUser();
  if (user) return { userId: user.id, sessionId: null as string | null };
  return { userId: null, sessionId: getGuestSessionId() };
}

export async function getCartItems() {
  const { userId, sessionId } = await getCartOwner();

  const items = await prisma.cartItem.findMany({
    where: userId ? { userId } : { sessionId: sessionId! },
    include: { product: true },
    orderBy: { id: "asc" },
  });

  return items.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    slug: item.product.slug,
    image: ensureImage(ensureImages(parseJsonArray(item.product.images))[0]),
    price: item.product.isPromo && item.product.promoPrice
      ? item.product.promoPrice
      : item.product.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    maxStock: 99,
  }));
}

export async function getCartCount() {
  const items = await getCartItems();
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
