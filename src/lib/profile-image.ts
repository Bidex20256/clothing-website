import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "profiles");
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

export async function saveProfileImage(userId: string, file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, or WebP images are allowed");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image must be smaller than 2MB");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = ALLOWED_TYPES.get(file.type)!;
  const filename = `${userId}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filepath, buffer);

  return `/uploads/profiles/${filename}`;
}

export async function deleteProfileImage(imageUrl: string | null | undefined) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/profiles/")) return;

  const filepath = path.join(process.cwd(), "public", imageUrl);
  try {
    await unlink(filepath);
  } catch {
    // file may already be gone
  }
}

export async function removeOldProfileFiles(userId: string) {
  const extensions = [".jpg", ".png", ".webp"];
  await Promise.all(
    extensions.map((ext) =>
      deleteProfileImage(`/uploads/profiles/${userId}${ext}`)
    )
  );
}
