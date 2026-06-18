import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCartOwner, getCartItems } from "@/lib/cart";
import { ensureGuestSessionId, getCurrentUser } from "@/lib/auth";

export async function GET() {
  const items = await getCartItems();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return NextResponse.json({ items, total });
}

const addSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).max(99).default(1),
  size: z.string(),
  color: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = addSchema.parse(body);

    const user = await getCurrentUser();
    const userId = user?.id ?? null;
    const sessionId = userId ? null : ensureGuestSessionId();

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existing = await prisma.cartItem.findFirst({
      where: {
        productId: data.productId,
        size: data.size,
        color: data.color,
        ...(userId ? { userId } : { sessionId }),
      },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + data.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          productId: data.productId,
          quantity: data.quantity,
          size: data.size,
          color: data.color,
          userId: userId ?? undefined,
          sessionId: sessionId ?? undefined,
        },
      });
    }

    await prisma.product.update({
      where: { id: data.productId },
      data: { popularity: { increment: 1 } },
    });

    const items = await getCartItems();
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return NextResponse.json({ items, total });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
