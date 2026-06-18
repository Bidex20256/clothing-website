import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import SafeImage from "@/components/SafeImage";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ensureImage } from "@/lib/images";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const ageLabel =
    product.ageGroup.charAt(0).toUpperCase() + product.ageGroup.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-slate">
        <Link href="/shop" className="hover:text-sage-dark">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
            <SafeImage
              src={ensureImage(product.images[0])}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1, 5).map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-sand">
                  <SafeImage
                    src={ensureImage(img)}
                    alt={`${product.name} view ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex gap-2">
            {product.isNew && (
              <span className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-white">New</span>
            )}
            {product.isPromo && (
              <span className="rounded-full bg-blush-dark px-3 py-1 text-xs font-medium text-white">Sale</span>
            )}
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium capitalize">
              {ageLabel}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm capitalize text-slate">{product.category}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatPrice(product.displayPrice)}</span>
            {product.isPromo && product.promoPrice && (
              <span className="text-lg text-slate line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-slate">{product.description}</p>

          <div className="mt-10 border-t border-sand pt-10">
            <AddToCartButton
              productId={product.id}
              sizes={product.sizes}
              colors={product.colors}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
