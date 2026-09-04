import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CategoryGrid from "@/components/CategoryGrid";
import PowerDivider from "@/components/PowerDivider";
import ProductGrid from "@/components/ProductGrid";
import WholesaleBanner from "@/components/WholesaleBanner";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import { getAllProducts } from "@/lib/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const featured = [...getAllProducts()]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 8);

  return (
    <>
      <Hero />
      <TrustBadges />
      <PowerDivider className="my-4" />
      <CategoryGrid />

      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="nameplate text-xs text-circuit-400 mb-2">Best sellers</p>
            <h2 className="font-display text-2xl md:text-3xl text-chalk">
              What Owerri is buying this week
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-circuit-300 hover:text-circuit-200 focus-ring"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <WholesaleBanner />
      <Testimonials />
      <FAQSection />
    </>
  );
}
