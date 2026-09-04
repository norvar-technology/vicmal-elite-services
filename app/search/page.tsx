import type { Metadata } from "next";
import Link from "next/link";
import { searchCatalog } from "@/lib/search";
import { SITE_NAME } from "@/lib/constants";
import ProductGrid from "@/components/ProductGrid";
import { getProductBySlug } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Promise<Metadata> {
  const q = searchParams.q || "";
  return {
    title: q ? `Search results for "${q}"` : "Search",
    description: `Search results for "${q}" on ${SITE_NAME}.`,
    robots: { index: false, follow: true },
  };
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim();
  const results = q ? searchCatalog(q) : [];

  const categoryMatches = results
    .filter((r) => r.type === "category")
    .map((r) => getCategory(r.slug))
    .filter(Boolean);

  const productMatches = results
    .filter((r) => r.type === "product")
    .map((r) => getProductBySlug(r.slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  return (
    <div className="container-page py-12">
      <p className="nameplate text-xs text-circuit-400 mb-2">Search</p>
      <h1 className="font-display text-2xl md:text-3xl text-chalk mb-2">
        {q ? `Results for "${q}"` : "Search Vicmal Elite Services"}
      </h1>
      <p className="text-mist text-sm mb-10">
        {q
          ? `${results.length} match${results.length === 1 ? "" : "es"} found`
          : "Try a product name, brand, or category like \"earbuds\" or \"charger\"."}
      </p>

      {q && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-mist mb-4">
            No matches for &ldquo;{q}&rdquo;. Try a broader term or browse by category.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-power-gradient text-white text-sm font-medium hover:opacity-90 focus-ring"
          >
            Browse All Products
          </Link>
        </div>
      )}

      {categoryMatches.length > 0 && (
        <div className="mb-12">
          <h2 className="nameplate text-xs text-mist mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categoryMatches.map((c) => (
              <Link
                key={c!.slug}
                href={`/products?category=${c!.slug}`}
                className="px-4 py-2 rounded-full border border-line/70 text-sm text-chalk/85 hover:border-circuit-500/60 hover:text-circuit-300 focus-ring"
              >
                {c!.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {productMatches.length > 0 && (
        <div>
          <h2 className="nameplate text-xs text-mist mb-4">Products</h2>
          <ProductGrid products={productMatches} />
        </div>
      )}
    </div>
  );
}
