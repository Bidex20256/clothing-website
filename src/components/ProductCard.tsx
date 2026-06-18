import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { ensureImage } from "@/lib/images";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isPromo?: boolean;
};

export default function ProductCard({
  slug,
  name,
  image,
  price,
  originalPrice,
  isNew,
  isPromo,
}: ProductCardProps) {
  return (
    <Link
      href={`/shop/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <SafeImage
          src={ensureImage(image)}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {isNew && (
            <span className="rounded-full bg-sage px-2.5 py-1 text-xs font-medium text-white">
              New
            </span>
          )}
          {isPromo && (
            <span className="rounded-full bg-blush-dark px-2.5 py-1 text-xs font-medium text-white">
              Sale
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium text-charcoal transition-colors group-hover:text-sage-dark">
          {name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-charcoal">{formatPrice(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-slate line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
