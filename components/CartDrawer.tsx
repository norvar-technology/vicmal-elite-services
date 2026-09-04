"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={closeCart}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-ink border-l border-line/70 flex flex-col animate-fade-up">
        <div className="flex items-center justify-between p-5 border-b border-line/60">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-circuit-400" />
            <h2 className="font-display text-lg">Your Cart</h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid place-items-center h-9 w-9 rounded-full border border-line/70 focus-ring"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-mist text-sm">Your cart is empty.</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="inline-block mt-4 text-sm text-circuit-300 hover:text-circuit-200 focus-ring"
              >
                Browse products →
              </Link>
            </div>
          )}
          {items.map(({ product, qty }) => (
            <div key={product.slug} className="flex gap-3 card rounded-xl p-3">
              <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden bg-panel">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={closeCart}
                  className="text-sm font-medium text-chalk line-clamp-1 hover:text-circuit-300 focus-ring"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-mist mt-0.5">{formatNaira(product.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setQty(product.slug, qty - 1)}
                    className="h-6 w-6 grid place-items-center rounded border border-line/70 text-mist hover:text-circuit-300 focus-ring"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-xs w-5 text-center nameplate">{qty}</span>
                  <button
                    onClick={() => setQty(product.slug, qty + 1)}
                    className="h-6 w-6 grid place-items-center rounded border border-line/70 text-mist hover:text-circuit-300 focus-ring"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => removeItem(product.slug)}
                    className="ml-auto text-mist hover:text-red-400 focus-ring"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-line/60 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-mist">Subtotal</span>
              <span className="font-display text-lg">{formatNaira(subtotal)}</span>
            </div>
            <p className="text-xs text-mist">Delivery fee calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block text-center w-full py-3 rounded-full bg-power-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity focus-ring"
            >
              Checkout Securely
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center w-full py-3 rounded-full border border-line/70 text-sm text-chalk/85 hover:border-circuit-500/60 focus-ring"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
