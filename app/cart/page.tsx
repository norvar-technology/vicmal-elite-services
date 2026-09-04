"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/format";
import UpsellStrip from "@/components/UpsellStrip";

export default function CartPage() {
  const { items, setQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-mist mb-4" />
        <h1 className="font-display text-2xl text-chalk mb-2">Your cart is empty</h1>
        <p className="text-mist mb-6">Add a few products and they'll show up here.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-power-gradient text-white text-sm font-medium hover:opacity-90 focus-ring"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-chalk mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.slug} className="card rounded-xl p-4 flex gap-4">
              <div className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-panel2">
                <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <Link
                  href={`/product/${product.slug}`}
                  className="text-sm font-medium text-chalk hover:text-circuit-300 line-clamp-2 focus-ring"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-mist mt-1">{formatNaira(product.price)} each</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-line/70 rounded-full">
                    <button
                      onClick={() => setQty(product.slug, qty - 1)}
                      className="h-8 w-8 grid place-items-center text-mist hover:text-circuit-300 focus-ring"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-6 text-center text-xs nameplate">{qty}</span>
                    <button
                      onClick={() => setQty(product.slug, qty + 1)}
                      className="h-8 w-8 grid place-items-center text-mist hover:text-circuit-300 focus-ring"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-display text-base text-chalk">
                      {formatNaira(product.price * qty)}
                    </p>
                    <button
                      onClick={() => removeItem(product.slug)}
                      className="text-mist hover:text-red-400 focus-ring"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <UpsellStrip />
        </div>

        <div className="card rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-display text-lg text-chalk mb-4">Order Summary</h2>
          <div className="flex items-center justify-between text-sm text-mist mb-2">
            <span>Subtotal</span>
            <span className="text-chalk">{formatNaira(subtotal)}</span>
          </div>
          <p className="text-xs text-mist mb-4">Delivery fee is calculated at checkout.</p>
          <div className="power-divider mb-4" aria-hidden="true" />
          <Link
            href="/checkout"
            className="block text-center w-full py-3.5 rounded-full bg-power-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity focus-ring"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/products"
            className="block text-center w-full py-3.5 mt-3 rounded-full border border-line/70 text-sm text-chalk/85 hover:border-circuit-500/60 focus-ring"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
