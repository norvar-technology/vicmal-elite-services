import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { MEDIA_BASE_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[86vh] flex items-end">
      {/* Full-bleed background photograph */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${MEDIA_BASE_URL}/vicmal/hero-image.jpg)` }}
        role="img"
        aria-label="MICH PRO earbuds, chargers, powerbanks and cables from Vicmal Elite Services"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/10 to-transparent" />

      {/* Floating wholesale tab, EcoFlow-style */}
      <Link
        href="/products"
        className="hidden md:flex flex-col items-center justify-center absolute right-0 top-40 w-14 py-6 bg-circuit-500 text-void nameplate text-[11px] gap-2 hover:bg-circuit-400 transition-colors focus-ring"
        style={{ writingMode: "vertical-rl" }}
      >
        Wholesale Pricing
      </Link>

      <div className="container-page relative pb-16 md:pb-24 pt-40">
        <span className="inline-flex items-center gap-2 nameplate text-[11px] text-circuit-300 border border-circuit-700/60 bg-void/60 rounded-full px-3 py-1.5 mb-6">
          <ShieldCheck size={13} /> Genuine devices · Owerri, Nigeria
        </span>
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-white max-w-3xl">
          Power for every device you carry.
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
          Earbuds, chargers, powerbanks, cords and batteries — genuine MICH PRO
          stock, tested before it ships, wholesale and retail from Owerri.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-circuit-500 text-void text-sm font-bold hover:bg-circuit-400 transition-colors focus-ring"
          >
            Shop Now <ArrowRight size={16} />
          </Link>
          <Link
            href="/products?category=powerbanks"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/30 text-sm font-medium text-white hover:border-circuit-400 hover:text-circuit-300 transition-colors focus-ring"
          >
            Shop Powerbanks
          </Link>
        </div>

        <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dd className="font-display font-bold text-2xl text-white">5</dd>
            <dt className="text-xs text-white/60 mt-1">Core categories</dt>
          </div>
          <div>
            <dd className="font-display font-bold text-2xl text-white">6–12mo</dd>
            <dt className="text-xs text-white/60 mt-1">Warranty coverage</dt>
          </div>
          <div>
            <dd className="font-display font-bold text-2xl text-white">36</dd>
            <dt className="text-xs text-white/60 mt-1">States we ship to</dt>
          </div>
        </dl>
      </div>
    </section>
  );
}
