"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function ShareButton({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 h-11 px-4 rounded-full border border-line/70 text-sm text-chalk/85 hover:border-circuit-500/60 hover:text-circuit-300 transition-colors focus-ring"
      aria-label="Share this product"
    >
      {copied ? <Check size={16} className="text-circuit-400" /> : <Share2 size={16} />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
