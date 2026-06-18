import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCartOwner, getCartItems } from "@/lib/cart";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId, sessionId } = await getCartOwner();
  const body = await request.json();
  const quantity = z.number().int().min(1).max(99).parse(body.quantity);

  const item = await prisma.cartItem.findFirst({
    where: {
      id: params.id,
      ...(userId ? { userId } : { sessionId }),
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  await prisma.cartItem.update({
    where: { id: params.id },
    data: { quantity },
  });

  const items = await getCartItems();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return NextResponse.json({ items, total });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { userId, sessionId } = await getCartOwner();

  const item = await prisma.cartItem.findFirst({
    where: {
      id: params.id,
      ...(userId ? { userId } : { sessionId }),
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: params.id } });

  const items = await getCartItems();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return NextResponse.json({ items, total });
}
