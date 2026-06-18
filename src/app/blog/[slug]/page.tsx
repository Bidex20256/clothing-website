import Link from "next/link";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { prisma } from "@/lib/db";
import { ensureImage } from "@/lib/images";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm text-sage-dark hover:underline">
        ← Back to Blog
      </Link>
      <time className="mt-6 block text-sm text-slate">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h1 className="mt-2 font-display text-4xl font-semibold">{post.title}</h1>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-sand">
        <SafeImage
          src={ensureImage(post.image)}
          alt={post.title}
          fill
          sizes="768px"
          className="object-cover"
          priority
        />
      </div>
      <p className="mt-8 text-lg leading-relaxed text-slate">{post.excerpt}</p>
      <div className="prose prose-lg mt-8 max-w-none leading-relaxed text-charcoal">
        {post.content.split("\n").map((para, i) => (
          <p key={i} className="mb-4">{para}</p>
        ))}
      </div>
    </article>
  );
}
