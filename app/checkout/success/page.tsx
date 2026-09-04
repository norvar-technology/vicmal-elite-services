"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, MessageCircle, XCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira, formatDateTime } from "@/lib/format";
import { buildOrderConfirmationMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { OrderDraft } from "@/lib/types";

const ORDER_DRAFT_PREFIX = "vicmal_order_";

type Status = "verifying" | "success" | "failed" | "error";

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-24 max-w-lg mx-auto text-center">
          <Loader2 size={40} className="mx-auto text-circuit-400 animate-spin mb-5" />
          <h1 className="font-display text-2xl text-chalk mb-2">Loading…</h1>
        </div>
      }
    >
      <CheckoutSuccessInner />
    </Suspense>
  );
}

function CheckoutSuccessInner() {
  const searchParams = useSearchParams();
  const { clear } = useCart();
  const [status, setStatus] = useState<Status>("verifying");
  const [message, setMessage] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [countdown, setCountdown] = useState(5);

  // Guards against React re-invoking this effect (Strict Mode double-invoke,
  // or any other re-fire) and running verify() — and its destructive
  // localStorage.removeItem/clear() side effects — more than once per mount.
  // Without this, a second invocation reads a localStorage draft that the
  // first invocation already deleted, silently falling back to a flattened
  // single-item summary with no delivery fee.
  const hasVerifiedRef = useRef(false);

  const reference = searchParams.get("reference") || searchParams.get("trxref");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      setMessage("No payment reference was found in the URL.");
      return;
    }
    if (hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;

    const ref = reference;

    async function verify() {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(ref)}`);
        const json = await res.json();

        if (!json.status) {
          throw new Error(json.message || "Verification request failed.");
        }

        const data = json.data;

        if (data.status !== "success") {
          setStatus("failed");
          setMessage(
            "Your payment was not completed. If money left your account, please contact us on WhatsApp with your reference."
          );
          return;
        }

        // Try to recover the full order draft saved right before redirecting to Paystack.
        // Wrapped in its own try/catch, separate from the verification call above: a
        // corrupted or missing localStorage entry should never turn a *confirmed,
        // successful* payment into a "we couldn't confirm this payment" screen for the
        // customer — at worst it should just mean a thinner WhatsApp message.
        let draft: OrderDraft | null = null;
        try {
          const raw = localStorage.getItem(`${ORDER_DRAFT_PREFIX}${ref}`);
          if (raw) draft = JSON.parse(raw);
        } catch {
          draft = null;
        }

        if (!draft?.items?.length) {
          // Loud on purpose: this is exactly the condition that previously produced a
          // WhatsApp message with no real line items and a ₦0 delivery fee. If this
          // fires again, check the console for `reference` and dig into why the draft
          // was missing at this point.
          console.warn(
            "No order draft found in localStorage — WhatsApp message will fall back to Paystack metadata only",
            { reference: ref }
          );
        }

        const amountPaidNaira = data.amount / 100;
        const paidAt = data.paid_at || new Date().toISOString();

        let finalDraft: OrderDraft;
        if (draft) {
          finalDraft = draft;
        } else {
          // Fallback: reconstruct a minimal order from Paystack metadata if localStorage was unavailable
          const meta = (data.metadata || {}) as Record<string, string>;
          finalDraft = {
            reference: ref,
            createdAt: paidAt,
            items: [
              {
                name: meta.order_summary || "Order items (see summary)",
                slug: "order",
                qty: 1,
                price: amountPaidNaira,
              },
            ],
            subtotal: amountPaidNaira,
            deliveryFee: 0,
            total: amountPaidNaira,
            customer: {
              fullName: meta.customer_name || "",
              email: data.customer?.email || "",
              phone: meta.customer_phone || "",
            },
            delivery: {
              address: meta.delivery_address || "",
              city: "",
              state: "",
              country: "Nigeria",
              method: "delivery",
            },
          };
        }

        const waMessage = buildOrderConfirmationMessage(finalDraft, paidAt, amountPaidNaira);
        const link = buildWhatsAppLink(WHATSAPP_NUMBER, waMessage);
        setWhatsappLink(link);
        setStatus("success");

        // Safe to do unconditionally now that hasVerifiedRef guarantees this
        // function body only ever runs once.
        try {
          localStorage.removeItem(`${ORDER_DRAFT_PREFIX}${ref}`);
        } catch {
          // ignore
        }
        clear();
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.message || "We could not verify your payment. Please contact support.");
      }
    }

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  // Auto-redirect to WhatsApp a few seconds after success. Split into its own
  // effect (rather than a bare setInterval inside verify()) so it properly
  // cancels the pending tick via the cleanup function if the customer
  // navigates away mid-countdown, instead of leaking a timer that keeps
  // firing setState calls after the component has unmounted.
  useEffect(() => {
    if (status !== "success" || !whatsappLink) return;
    if (countdown <= 0) {
      window.location.href = whatsappLink;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, whatsappLink, countdown]);

  return (
    <div className="container-page py-24 max-w-lg mx-auto text-center">
      {status === "verifying" && (
        <>
          <Loader2 size={40} className="mx-auto text-circuit-400 animate-spin mb-5" />
          <h1 className="font-display text-2xl text-chalk mb-2">Verifying your payment…</h1>
          <p className="text-mist text-sm">
            Please don't close this page — this only takes a moment.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle2 size={48} className="mx-auto text-circuit-400 mb-5" />
          <h1 className="font-display text-2xl text-chalk mb-2">Payment confirmed 🎉</h1>
          <p className="text-mist text-sm mb-1">
            Reference: <span className="nameplate text-chalk/80">{reference}</span>
          </p>
          <p className="text-mist text-sm mb-8">
            Redirecting you to WhatsApp in {countdown}s to confirm your order details with our team…
          </p>
          <a
            href={whatsappLink}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-[#0b141a] text-sm font-semibold hover:opacity-90 transition-opacity focus-ring"
          >
            <MessageCircle size={16} /> Continue to WhatsApp now
          </a>
        </>
      )}

      {status === "failed" && (
        <>
          <XCircle size={48} className="mx-auto text-red-400 mb-5" />
          <h1 className="font-display text-2xl text-chalk mb-2">Payment not completed</h1>
          <p className="text-mist text-sm mb-8">{message}</p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-power-gradient text-white text-sm font-medium hover:opacity-90 focus-ring"
          >
            Try again
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle size={48} className="mx-auto text-red-400 mb-5" />
          <h1 className="font-display text-2xl text-chalk mb-2">Something went wrong</h1>
          <p className="text-mist text-sm mb-8">{message}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-power-gradient text-white text-sm font-medium hover:opacity-90 focus-ring"
          >
            Contact support
          </Link>
        </>
      )}
    </div>
  );
}