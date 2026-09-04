import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/about", "/contact", "/cart"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE_URL}/products?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
