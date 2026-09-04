"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getUpsellForCategories } from "@/lib/products";
import { formatNaira } from "@/lib/format";

export default function UpsellStrip({ title = "Complete your order" }: { title?: string }) {
  const { items, addItem } = useCart();

  if (items.length === 0) return null;

  const categoriesInCart = Array.from(new Set(items.map((i) => i.product.category)));
  const excludeSlugs = items.map((i) => i.product.slug);
  const suggestions = getUpsellForCategories(categoriesInCart, excludeSlugs, 4);

  if (suggestions.length === 0) return null;

  return (
    <div className="card rounded-xl p-5">
      <p className="nameplate text-xs text-circuit-400 mb-4">{title}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {suggestions.map((p) => (
          <div key={p.slug} className="text-center">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-panel2 mb-2">
              <Image src={p.images[0]} alt={p.name} fill sizes="120px" className="object-cover" />
            </div>
            <p className="text-xs text-chalk/90 line-clamp-2 leading-snug">{p.name}</p>
            <p className="text-xs text-mist mt-1">{formatNaira(p.price)}</p>
            <button
              onClick={() => addItem(p.slug, 1)}
              className="inline-flex items-center gap-1 mt-2 text-[11px] px-2.5 py-1 rounded-full border border-circuit-500/50 text-circuit-300 hover:bg-circuit-500/10 focus-ring"
            >
              <Plus size={11} /> Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
