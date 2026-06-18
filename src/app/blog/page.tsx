import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { prisma } from "@/lib/db";
import { ensureImage } from "@/lib/images";

export const metadata = {
  title: "Blog",
  description: "Fashion tips, styling guides, and Temir brand updates.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold">Temir Journal</h1>
      <p className="mt-2 text-slate">Fashion tips, styling guides, and brand updates</p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative aspect-[16/10] bg-sand">
                <SafeImage
                  src={ensureImage(post.image)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <time className="text-xs text-slate">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-display text-xl font-semibold group-hover:text-sage-dark">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate">{post.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-medium text-sage-dark">
                  Read more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
