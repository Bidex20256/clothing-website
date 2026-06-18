import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getCartItems } from "@/lib/cart";

const shippingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(3),
  country: z.string().min(2),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Please log in to complete checkout" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const shipping = shippingSchema.parse(body);
    const items = await getCartItems();

    if (items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
    }

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        items: JSON.stringify(items),
        shipping: JSON.stringify(shipping),
        total,
        status: "confirmed",
      },
    });

    await prisma.cartItem.deleteMany({ where: { userId: user.id } });

    return NextResponse.json({
      orderId: order.id,
      total,
      message: "Order placed successfully",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
