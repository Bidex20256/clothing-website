"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

type ProfileAvatarProps = {
  name: string;
  profileImage?: string | null;
  onUpdated: (profileImage: string | null) => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProfileAvatar({ name, profileImage, onUpdated }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [cacheBust, setCacheBust] = useState(0);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onUpdated(data.user.profileImage);
      setCacheBust(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!profileImage) return;
    if (!confirm("Remove your profile photo?")) return;

    setError("");
    setUploading(true);

    try {
      const res = await fetch("/api/profile/avatar", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onUpdated(null);
      setCacheBust(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Remove failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center border-b border-sand pb-8">
      <div className="relative">
        <div className="relative h-28 w-28 overflow-hidden rounded-full bg-sand ring-4 ring-white shadow-md">
          {profileImage ? (
            <Image
              src={cacheBust ? `${profileImage}?t=${cacheBust}` : profileImage}
              alt={`${name}'s profile`}
              fill
              className="object-cover"
              sizes="112px"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-sage/20 font-display text-2xl font-semibold text-sage-dark">
              {getInitials(name)}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-cream shadow transition hover:bg-sage-dark disabled:opacity-50"
          aria-label="Upload profile photo"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="mt-4 text-sm font-medium text-charcoal">
        {uploading ? "Uploading..." : "Profile Photo"}
      </p>
      <p className="mt-1 text-xs text-slate">JPG, PNG or WebP · Max 2MB</p>

      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-sm font-medium text-sage-dark hover:underline disabled:opacity-50"
        >
          {profileImage ? "Change photo" : "Upload photo"}
        </button>
        {profileImage && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="text-sm font-medium text-blush-dark hover:underline disabled:opacity-50"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-xs text-blush-dark">{error}</p>}
    </div>
  );
}
