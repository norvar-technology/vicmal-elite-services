"use client";

import { CartProvider } from "@/context/CartContext";
import WhatsAppWidget from "./WhatsAppWidget";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <WhatsAppWidget />
    </CartProvider>
  );
}
