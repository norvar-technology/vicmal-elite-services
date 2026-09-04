"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Star, Zap, MessageCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { formatNaira } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { buildProductInquiryMessage, buildWhatsAppLink, productUrl } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import ShareButton from "./ShareButton";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const inquiryLink = buildWhatsAppLink(
    WHATSAPP_NUMBER,
    buildProductInquiryMessage(product.name, productUrl(product.slug))
  );

  function handleAddToCart() {
    addItem(product.slug, qty);
  }

  function handleBuyNow() {
    addItem(product.slug, qty);
    router.push("/checkout");
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square chamfer card overflow-hidden">
          {product.badge && (
            <span className="absolute top-4 left-4 z-10 nameplate text-[10px] px-2.5 py-1 rounded-full bg-power-gradient text-white">
              {product.badge}
            </span>
          )}
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border-2 transition-colors focus-ring ${
                  activeImage === i ? "border-circuit-400" : "border-transparent"
                }`}
                aria-label={`Show image ${i + 1}`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="nameplate text-xs text-circuit-400 mb-2">{product.sku}</p>
        <h1 className="font-display text-2xl md:text-3xl text-chalk leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-2 mt-3 text-sm text-mist">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.round(product.rating)
                    ? "fill-signal-500 text-signal-500"
                    : "text-line"
                }
              />
            ))}
          </div>
          <span>
            {product.rating} ({product.reviewCount} reviews)
          </span>
          <span className="text-line">·</span>
          <span className={product.stock > 0 ? "text-circuit-300" : "text-red-400"}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        <div className="flex items-end gap-3 mt-6">
          <p className="font-display text-3xl text-chalk">{formatNaira(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-mist line-through mb-1">{formatNaira(product.compareAtPrice)}</p>
          )}
        </div>

        {product.wholesalePrice && (
          <div className="mt-3 inline-flex items-center gap-2 nameplate text-[11px] text-signal-400 border border-signal-500/30 bg-signal-500/5 rounded-full px-3 py-1.5">
            <Zap size={12} />
            {formatNaira(product.wholesalePrice)} each at {product.wholesaleMoq}+ units (wholesale)
          </div>
        )}

        <p className="text-mist mt-6 leading-relaxed">{product.shortDescription}</p>

        <div className="flex items-center gap-4 mt-8">
          <div className="flex items-center border border-line/70 rounded-full">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-11 w-11 grid place-items-center text-mist hover:text-circuit-300 focus-ring"
              aria-label="Decrease quantity"
            >
              <Minus size={15} />
            </button>
            <span className="w-8 text-center nameplate text-sm">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-11 w-11 grid place-items-center text-mist hover:text-circuit-300 focus-ring"
              aria-label="Increase quantity"
            >
              <Plus size={15} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-line/70 text-sm text-chalk hover:border-circuit-500/60 hover:text-circuit-300 transition-colors focus-ring disabled:opacity-40"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 h-12 rounded-full bg-power-gradient text-white text-sm font-medium hover:opacity-90 transition-opacity focus-ring disabled:opacity-40"
          >
            Buy Now
          </button>
          <ShareButton
            title={product.name}
            text={product.shortDescription}
            url={productUrl(product.slug)}
          />
        </div>

        <a
          href={inquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm text-circuit-300 hover:text-circuit-200 focus-ring"
        >
          <MessageCircle size={16} /> Ask about this product on WhatsApp
        </a>

        <div className="power-divider my-8" aria-hidden="true" />

        <div>
          <h2 className="nameplate text-xs text-circuit-400 mb-4">Description</h2>
          <div className="space-y-3">
            {product.description.map((p, i) => (
              <p key={i} className="text-sm text-mist leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="nameplate text-xs text-circuit-400 mb-4">Specifications</h2>
          <dl className="divide-y divide-line/50 border-t border-b border-line/50">
            {product.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-2 gap-4 py-3 text-sm">
                <dt className="text-mist">{s.label}</dt>
                <dd className="text-chalk/90">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
