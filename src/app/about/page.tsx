import SafeImage from "@/components/SafeImage";
import { SITE_IMAGES } from "@/lib/images";

export const metadata = {
  title: "About",
  description: "Learn about Temir — modern clothing crafted for children, teenagers, youths, and adults.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">About Temir</h1>
          <p className="mt-6 leading-relaxed text-slate">
            Temir was founded on a simple belief: great style should feel accessible at every age.
            From playful pieces for five-year-olds to refined essentials for adults, we design
            clothing that moves with real life — school days, weekend adventures, and everything in between.
          </p>
          <p className="mt-4 leading-relaxed text-slate">
            Our collections blend soft, family-friendly colors with contemporary silhouettes.
            Every garment is chosen for comfort, durability, and the kind of quality you can feel
            from the first wear.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
          <SafeImage
            src={SITE_IMAGES.about}
            alt="Temir brand story — modern fashion retail space"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-20 grid gap-8 sm:grid-cols-3">
        {[
          { title: "Quality First", desc: "Premium fabrics and thoughtful construction in every piece." },
          { title: "For All Ages", desc: "Dedicated lines for children, teens, youths, and adults." },
          { title: "Sustainable Mindset", desc: "Responsible sourcing and designs built to last beyond trends." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h3 className="font-display text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-slate">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
