import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryGrid() {
  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="nameplate text-xs text-circuit-400 mb-2">Shop by category</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-chalk">
            Everything that keeps your devices running
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={`group relative rounded-xl overflow-hidden border border-line/60 focus-ring ${
              i === 0 ? "col-span-2 md:col-span-1 md:row-span-2 aspect-[4/5]" : "aspect-square"
            }`}
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/95 via-void/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-5">
              <p className="font-display font-bold text-lg md:text-xl text-white">{c.name}</p>
              <p className="text-xs text-white/70 mt-1 hidden sm:block">{c.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
