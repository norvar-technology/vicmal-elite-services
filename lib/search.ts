import { products } from "./products";
import { categories } from "./categories";

export interface SearchResult {
  type: "product" | "category";
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

/**
 * Simple, dependency-free search across the product and category catalog.
 * Case-insensitive substring match against name/brand/sku/description for
 * products, and name/tagline for categories. Categories are surfaced first
 * (they're broader), then products, each roughly ranked by whether the
 * query matches the start of the title (a stronger signal than a match
 * buried in the middle of a description).
 */
export function searchCatalog(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const categoryResults: SearchResult[] = categories
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
    )
    .map((c) => ({
      type: "category",
      slug: c.slug,
      title: c.name,
      subtitle: c.tagline,
      image: c.image,
      href: `/products?category=${c.slug}`,
    }));

  const productResults: SearchResult[] = products
    .filter((p) => {
      const haystack = [
        p.name,
        p.brand,
        p.sku,
        p.shortDescription,
        p.category,
        ...p.description,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .map((p) => ({
      type: "product",
      slug: p.slug,
      title: p.name,
      subtitle: p.shortDescription,
      image: p.images[0],
      href: `/product/${p.slug}`,
    }));

  function rank(r: SearchResult) {
    return r.title.toLowerCase().startsWith(q) ? 0 : 1;
  }

  categoryResults.sort((a, b) => rank(a) - rank(b));
  productResults.sort((a, b) => rank(a) - rank(b));

  return [...categoryResults, ...productResults];
}
