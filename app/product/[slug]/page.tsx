import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import ProductGrid from "@/components/ProductGrid";
import StructuredData from "@/components/StructuredData";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };

  const title = product.name;
  const description = product.shortDescription;
  const url = `${SITE_URL}/product/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: product.images[0], width: 1200, height: 1200, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const category = getCategory(product.category);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "NGN",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/products` },
      category && {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${SITE_URL}/products?category=${category.slug}`,
      },
      { "@type": "ListItem", position: 4, name: product.name, item: `${SITE_URL}/product/${product.slug}` },
    ].filter(Boolean),
  };

  return (
    <div className="container-page py-10">
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-mist mb-8 flex-wrap">
        <Link href="/" className="hover:text-circuit-300 focus-ring">Home</Link>
        <ChevronRight size={12} />
        <Link href="/products" className="hover:text-circuit-300 focus-ring">Shop</Link>
        {category && (
          <>
            <ChevronRight size={12} />
            <Link href={`/products?category=${category.slug}`} className="hover:text-circuit-300 focus-ring">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight size={12} />
        <span className="text-chalk/80 line-clamp-1">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-20">
          <p className="nameplate text-xs text-circuit-400 mb-2">Complete your order</p>
          <h2 className="font-display text-2xl md:text-3xl text-chalk mb-8">
            Frequently bought together
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
