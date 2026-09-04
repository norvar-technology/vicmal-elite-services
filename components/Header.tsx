"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import { LOGO_URL, SITE_NAME } from "@/lib/constants";
import { categories } from "@/lib/categories";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

const NAV_LINKS = [
  { href: "/products", label: "Shop All" },
  { href: "/products?category=earbuds", label: "Earbuds" },
  { href: "/products?category=chargers", label: "Chargers" },
  { href: "/products?category=powerbanks", label: "Powerbanks" },
  { href: "/products?category=cords", label: "Cords" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <>
      {/* Promo bar — bold, solid, message-led (not a soft utility strip) */}
      <div className="bg-black text-white">
        <div className="container-page flex items-center justify-between h-10 text-xs">
          <Link href="/products" className="flex items-center gap-1.5 font-medium hover:text-circuit-300 transition-colors">
            Free delivery in Owerri on every order this week
            <ArrowRight size={12} />
          </Link>
          <span className="hidden sm:block text-white/50 nameplate text-[10px]">
            Genuine Stock · 6–12mo Warranty · Wholesale Pricing
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-void/95 backdrop-blur-sm border-b border-line/70">
        <div className="container-page flex items-center justify-between h-16 md:h-[72px]">
          <Link href="/" className="flex items-center focus-ring shrink-0">
            <Image
              src={LOGO_URL}
              alt={SITE_NAME}
              width={180}
              height={42}
              priority
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-chalk/80 hover:text-circuit-300 transition-colors focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="grid place-items-center h-10 w-10 rounded-full border border-line/70 text-mist hover:text-circuit-300 hover:border-circuit-500/60 transition-colors focus-ring"
            >
              <Search size={18} />
            </button>
            <button
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
              className="relative grid place-items-center h-10 w-10 rounded-full border border-line/70 text-mist hover:text-circuit-300 hover:border-circuit-500/60 transition-colors focus-ring"
            >
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-circuit-500 text-[10px] font-bold text-void grid place-items-center">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid place-items-center h-10 w-10 rounded-full border border-line/70 text-mist focus-ring"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>


      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-xs bg-ink border-l border-line/70 p-6 flex flex-col gap-1 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <span className="nameplate text-xs text-mist">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid place-items-center h-9 w-9 rounded-full border border-line/70 focus-ring"
              >
                <X size={16} />
              </button>
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-line/50 text-chalk/90 focus-ring"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <p className="nameplate text-[11px] text-mist mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products?category=${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs px-3 py-1.5 rounded-full border border-line/70 text-mist hover:text-circuit-300"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
