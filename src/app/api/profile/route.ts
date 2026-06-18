import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { destroySession, getCurrentUser, getSessionUserId } from "@/lib/auth";
import { deleteProfileImage, removeOldProfileFiles } from "@/lib/profile-image";
import { USER_PUBLIC_SELECT } from "@/lib/user";

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user });
}

export async function PUT(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = updateSchema.parse(body);

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: USER_PUBLIC_SELECT,
    });

    return NextResponse.json({ user });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileImage: true },
  });

  if (user?.profileImage) await deleteProfileImage(user.profileImage);
  await removeOldProfileFiles(userId);

  await prisma.user.delete({ where: { id: userId } });
  await destroySession();
  return NextResponse.json({ success: true });
}
