"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchCatalog, SearchResult } from "@/lib/search";

const MAX_LIVE_RESULTS = 6;

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Autofocus the input whenever the overlay opens
  useEffect(() => {
    if (open) {
      setQuery("");
      // slight delay so the element is mounted before we focus it
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const results = searchCatalog(query).slice(0, MAX_LIVE_RESULTS);

  function goToResult(href: string) {
    router.push(href);
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-void/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-w-2xl mx-auto mt-24 md:mt-32 px-4">
        <div className="card rounded-xl border border-line/70 overflow-hidden">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3 border-b border-line/60">
            <Search size={18} className="text-mist shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search earbuds, chargers, powerbanks…"
              className="flex-1 bg-transparent outline-none text-sm text-chalk placeholder:text-mist"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="text-mist hover:text-chalk focus-ring"
            >
              <X size={18} />
            </button>
          </form>

          {query.trim() && (
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-sm text-mist px-4 py-8 text-center">
                  No matches for &ldquo;{query}&rdquo;. Try a category like
                  &ldquo;earbuds&rdquo; or a product name.
                </p>
              ) : (
                <ul>
                  {results.map((r) => (
                    <li key={`${r.type}-${r.slug}`}>
                      <button
                        onClick={() => goToResult(r.href)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-panel2 transition-colors focus-ring"
                      >
                        <div className="relative h-11 w-11 shrink-0 rounded-md overflow-hidden bg-panel2">
                          <Image src={r.image} alt="" fill sizes="44px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-chalk line-clamp-1">{r.title}</p>
                          <p className="text-xs text-mist line-clamp-1">{r.subtitle}</p>
                        </div>
                        <span className="nameplate text-[9px] text-circuit-400 shrink-0">
                          {r.type === "category" ? "Category" : "Product"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={onClose}
                className="block text-center text-sm text-circuit-300 hover:text-circuit-200 py-3 border-t border-line/60 focus-ring"
              >
                See all results for &ldquo;{query}&rdquo;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
