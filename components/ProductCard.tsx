"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { formatNaira } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const discountPct = product.compareAtPrice
    ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <div className="group relative card rounded-xl flex flex-col overflow-hidden hover:border-circuit-500/60 transition-colors">
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {discountPct && (
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-signal-500 text-void">
            -{discountPct}%
          </span>
        )}
        {product.badge && (
          <span className="nameplate text-[9px] px-2 py-1 rounded bg-circuit-500 text-void">
            {product.badge}
          </span>
        )}
      </div>
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square bg-panel2 overflow-hidden focus-ring"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <p className="nameplate text-[10px] text-mist mb-1">{product.sku}</p>
        <Link
          href={`/product/${product.slug}`}
          className="text-sm font-medium text-chalk line-clamp-2 hover:text-circuit-300 focus-ring"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mt-2 text-xs text-mist">
          <Star size={12} className="fill-signal-500 text-signal-500" />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="font-display font-bold text-lg text-chalk">{formatNaira(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-mist line-through">
                {formatNaira(product.compareAtPrice)}
              </p>
            )}
          </div>
          <button
            onClick={() => addItem(product.slug, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-circuit-500 text-void hover:bg-circuit-400 transition-colors focus-ring"
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
