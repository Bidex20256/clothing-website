import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ensureImage, SITE_IMAGES } from "@/lib/images";

export default async function HomePage() {
  const [featured, newArrivals, promos] = await Promise.all([
    getProducts({ sort: "popular" }),
    getProducts({ sort: "newest" }),
    getProducts(),
  ]);

  const carouselSlides = featured.slice(0, 5).map((p) => ({
    id: p.id,
    image: p.images[0],
    alt: p.name,
    name: p.name,
    price: p.displayPrice,
  }));

  const newItems = newArrivals.filter((p) => p.isNew).slice(0, 4);
  const promoItems = promos.filter((p) => p.isPromo).slice(0, 4);

  return (
    <>
      <section className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 grid md:grid-cols-2">
          <div className="relative h-[50vh] md:h-auto">
            <SafeImage
              src={SITE_IMAGES.hero.modelLeft}
              alt="Male model wearing Temir casual streetwear"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-[50vh] md:h-auto">
            <SafeImage
              src={SITE_IMAGES.hero.modelRight}
              alt="Male model wearing Temir tailored collection"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-4 text-center text-cream sm:px-6 lg:px-8">
          <p className="animate-fade-in text-sm uppercase tracking-[0.3em] opacity-90">
            Spring / Summer 2026
          </p>
          <h1 className="animate-slide-up mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            Style for Every Chapter of Life
          </h1>
          <p className="animate-slide-up mt-6 max-w-xl text-lg opacity-90" style={{ animationDelay: "0.1s" }}>
            From playful kids&apos; wear to refined adult essentials — Temir brings modern fashion to your whole family.
          </p>
          <div className="animate-slide-up mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/shop"
              className="rounded-full bg-cream px-8 py-3 text-sm font-semibold uppercase tracking-wider text-charcoal transition hover:bg-sand"
            >
              Shop Collection
            </Link>
            <Link
              href="/shop?sort=newest"
              className="rounded-full border-2 border-cream px-8 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-cream/10"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Featured Styles</h2>
          <p className="mt-2 text-slate">Handpicked pieces our community loves most</p>
        </div>
        <HeroCarousel slides={carouselSlides} />
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-sage-dark">Just In</span>
              <h2 className="mt-2 font-display text-3xl font-semibold">New Arrivals</h2>
            </div>
            <Link href="/shop?sort=newest" className="text-sm font-medium text-sage-dark hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(newItems.length > 0 ? newItems : featured.slice(0, 4)).map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                image={p.images[0]}
                price={p.displayPrice}
                originalPrice={p.isPromo ? p.price : undefined}
                isNew={p.isNew}
                isPromo={p.isPromo}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blush/40 via-sand to-sage/30 p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-lg">
              <span className="rounded-full bg-blush-dark/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-charcoal">
                Limited Time
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Season Sale — Up to 30% Off
              </h2>
              <p className="mt-4 text-slate">
                Refresh wardrobes for every age group. Selected styles at special prices while stocks last.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block rounded-full bg-charcoal px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-sage-dark"
              >
                Shop Promotions
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:max-w-md">
              {(promoItems.length > 0 ? promoItems : featured.slice(0, 2)).map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="flex items-center gap-4 rounded-xl bg-cream/80 p-4 transition hover:bg-cream"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                    <SafeImage src={ensureImage(p.images[0])} alt={p.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-sage-dark font-semibold">{formatPrice(p.displayPrice)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold">Shop by Age</h2>
          <p className="mt-2 text-center text-sand">Curated collections for every stage</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Children", age: "children", image: SITE_IMAGES.shopByAge.children, desc: "Ages 5+" },
              { label: "Teenagers", age: "teenagers", image: SITE_IMAGES.shopByAge.teenagers, desc: "Trend-forward" },
              { label: "Youths", age: "youths", image: SITE_IMAGES.shopByAge.youths, desc: "Urban & casual" },
              { label: "Adults", age: "adults", image: SITE_IMAGES.shopByAge.adults, desc: "Refined style" },
            ].map((cat) => (
              <Link
                key={cat.age}
                href={`/shop?ageGroup=${cat.age}`}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/5]">
                  <SafeImage
                    src={cat.image}
                    alt={`Temir ${cat.label} collection`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/30 transition group-hover:bg-charcoal/20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-semibold">{cat.label}</h3>
                  <p className="text-sm text-sand">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
