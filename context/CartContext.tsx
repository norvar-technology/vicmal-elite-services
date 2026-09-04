"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartLine, Product } from "@/lib/types";
import { getProductBySlug } from "@/lib/products";

const STORAGE_KEY = "vicmal_cart_v1";

interface CartContextValue {
  lines: CartLine[];
  items: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage may be unavailable; fail silently
    }
  }, [lines, hydrated]);

  const addItem = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { slug, qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = getProductBySlug(l.slug);
          return product ? { product, qty: l.qty } : null;
        })
        .filter(Boolean) as { product: Product; qty: number }[],
    [lines]
  );

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.product.price * i.qty, 0),
    [items]
  );

  const value: CartContextValue = {
    lines,
    items,
    count,
    subtotal,
    addItem,
    removeItem,
    setQty,
    clear,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
