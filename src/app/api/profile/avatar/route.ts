import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import {
  deleteProfileImage,
  removeOldProfileFiles,
  saveProfileImage,
} from "@/lib/profile-image";
import { USER_PUBLIC_SELECT } from "@/lib/user";

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImage: true },
    });

    await removeOldProfileFiles(userId);
    const profileImage = await saveProfileImage(userId, file);

    if (user?.profileImage && user.profileImage !== profileImage) {
      await deleteProfileImage(user.profileImage);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { profileImage },
      select: USER_PUBLIC_SELECT,
    });

    return NextResponse.json({ user: updated, message: "Profile photo updated" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
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

  if (user?.profileImage) {
    await deleteProfileImage(user.profileImage);
  }
  await removeOldProfileFiles(userId);

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { profileImage: null },
    select: USER_PUBLIC_SELECT,
  });

  return NextResponse.json({ user: updated, message: "Profile photo removed" });
}
