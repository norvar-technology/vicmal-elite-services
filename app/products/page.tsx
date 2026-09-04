import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import StructuredData from "@/components/StructuredData";
import { categories, getCategory } from "@/lib/categories";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string };
}): Promise<Metadata> {
  const category = searchParams.category ? getCategory(searchParams.category) : undefined;
  const title = category ? `${category.name} — Shop` : "Shop All Products";
  const description = category
    ? `Browse ${category.name.toLowerCase()} at wholesale and retail prices from ${SITE_NAME}. ${category.tagline}.`
    : `Browse genuine MICH PRO earbuds, chargers, powerbanks, cords and batteries at wholesale and retail prices from ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: {
      canonical: category ? `/products?category=${category.slug}` : "/products",
    },
    openGraph: { title, description, url: `${SITE_URL}/products` },
  };
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = searchParams.category;
  const products = activeCategory
    ? getProductsByCategory(activeCategory)
    : getAllProducts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/products` },
    ],
  };

  return (
    <div className="container-page py-12">
      <StructuredData data={breadcrumbSchema} />
      <div className="mb-8">
        <p className="nameplate text-xs text-circuit-400 mb-2">Shop</p>
        <h1 className="font-display text-3xl md:text-4xl text-chalk">
          {activeCategory ? getCategory(activeCategory)?.name || "Shop All" : "Shop All Products"}
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/products"
          className={`text-xs px-4 py-2 rounded-full border transition-colors focus-ring ${
            !activeCategory
              ? "bg-power-gradient text-white border-transparent"
              : "border-line/70 text-mist hover:text-circuit-300"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={`text-xs px-4 py-2 rounded-full border transition-colors focus-ring ${
              activeCategory === c.slug
                ? "bg-power-gradient text-white border-transparent"
                : "border-line/70 text-mist hover:text-circuit-300"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
