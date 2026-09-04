"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/format";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/constants";
import { calculateDeliveryFee } from "@/lib/delivery";
import { CustomerInfo, DeliveryInfo } from "@/lib/types";
import UpsellStrip from "@/components/UpsellStrip";

const ORDER_DRAFT_PREFIX = "vicmal_order_";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    landmark: "",
    notes: "",
    method: "delivery",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deliveryFee = useMemo(() => {
    if (delivery.method === "pickup") return 0;

    const baseFee = calculateDeliveryFee(delivery.country, delivery.state);

    // Free-shipping perk only applies within Nigeria — a ₦150k order
    // shouldn't also waive the ₦20,000 Ghana rate by default. Remove the
    // `delivery.country === "Nigeria" &&` clause below if you want the
    // threshold to zero out Ghana orders too.
    if (delivery.country === "Nigeria" && subtotal >= FREE_DELIVERY_THRESHOLD) {
      return 0;
    }

    return baseFee;
  }, [delivery.method, delivery.country, delivery.state, subtotal]);

  const total = subtotal + deliveryFee;

  const canSubmit =
    items.length > 0 &&
    customer.fullName.trim() &&
    customer.email.trim() &&
    customer.phone.trim() &&
    (delivery.method === "pickup" ||
      (delivery.address.trim() && delivery.city.trim() && delivery.state.trim()));

  async function handlePay() {
    if (!canSubmit) {
      setError("Please fill in your name, email, phone, and delivery address.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const orderSummary = items
        .map((i) => `${i.qty}x ${i.product.name}`)
        .join(", ");

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customer.email,
          amount: total,
          customerName: customer.fullName,
          customerPhone: customer.phone,
          orderSummary,
          deliveryAddress:
            delivery.method === "pickup"
              ? "Store pickup, Owerri"
              : `${delivery.address}, ${delivery.city}, ${delivery.state}, ${delivery.country}`,
        }),
      });
      const json = await res.json();

      if (!json.status) {
        throw new Error(json.message || "Could not start payment.");
      }

      const reference: string = json.data.reference;

      const draft = {
        reference,
        createdAt: new Date().toISOString(),
        items: items.map((i) => ({
          name: i.product.name,
          slug: i.product.slug,
          qty: i.qty,
          price: i.product.price,
        })),
        subtotal,
        deliveryFee,
        total,
        customer,
        delivery,
      };
      localStorage.setItem(`${ORDER_DRAFT_PREFIX}${reference}`, JSON.stringify(draft));

      window.location.href = json.data.authorization_url;
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-2xl text-chalk mb-2">Your cart is empty</h1>
        <p className="text-mist mb-6">Add products before checking out.</p>
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
      <h1 className="font-display text-3xl text-chalk mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="card rounded-xl p-6">
            <h2 className="font-display text-lg text-chalk mb-4">Contact Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" required>
                <input
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="input"
                  placeholder="Chidera Okafor"
                />
              </Field>
              <Field label="Phone number" required>
                <input
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="input"
                  placeholder="080X XXX XXXX"
                />
              </Field>
              <Field label="Email address" required className="sm:col-span-2">
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
            </div>
          </div>

          <div className="card rounded-xl p-6">
            <h2 className="font-display text-lg text-chalk mb-4">Delivery</h2>

            <Field label="Country" required className="mb-5">
              <select
                value={delivery.country}
                onChange={(e) => {
                  const country = e.target.value as "Nigeria" | "Ghana";
                  setDelivery({
                    ...delivery,
                    country,
                    // Pickup only makes sense for local Owerri customers —
                    // force delivery method if a Ghana address is selected.
                    method: country === "Ghana" ? "delivery" : delivery.method,
                  });
                }}
                className="input"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
              </select>
            </Field>

            <div className="flex gap-3 mb-5">
              <button
                onClick={() => setDelivery({ ...delivery, method: "delivery" })}
                className={`flex-1 py-3 rounded-full text-sm border transition-colors focus-ring ${
                  delivery.method === "delivery"
                    ? "bg-power-gradient text-white border-transparent"
                    : "border-line/70 text-mist"
                }`}
              >
                Delivery
              </button>
              {delivery.country === "Nigeria" && (
                <button
                  onClick={() => setDelivery({ ...delivery, method: "pickup" })}
                  className={`flex-1 py-3 rounded-full text-sm border transition-colors focus-ring ${
                    delivery.method === "pickup"
                      ? "bg-power-gradient text-white border-transparent"
                      : "border-line/70 text-mist"
                  }`}
                >
                  Store Pickup (Owerri)
                </button>
              )}
            </div>

            {delivery.method === "delivery" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Delivery address" required className="sm:col-span-2">
                  <input
                    value={delivery.address}
                    onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                    className="input"
                    placeholder="Street address"
                  />
                </Field>
                <Field label="City" required>
                  <input
                    value={delivery.city}
                    onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                    className="input"
                    placeholder={delivery.country === "Ghana" ? "Accra" : "Owerri"}
                  />
                </Field>
                <Field label="State / Region" required>
                  <input
                    value={delivery.state}
                    onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}
                    className="input"
                    placeholder={delivery.country === "Ghana" ? "Greater Accra" : "Imo State"}
                  />
                </Field>
                <Field label="Landmark (optional)">
                  <input
                    value={delivery.landmark}
                    onChange={(e) => setDelivery({ ...delivery, landmark: e.target.value })}
                    className="input"
                    placeholder="Near..."
                  />
                </Field>
                <Field label="Delivery notes (optional)">
                  <input
                    value={delivery.notes}
                    onChange={(e) => setDelivery({ ...delivery, notes: e.target.value })}
                    className="input"
                    placeholder="Gate code, preferred time, etc."
                  />
                </Field>
              </div>
            )}
            {delivery.method === "pickup" && (
              <p className="text-sm text-mist">
                Pick up from our Owerri location once your order is confirmed. We'll share the
                exact address on WhatsApp after payment.
              </p>
            )}
          </div>

          <UpsellStrip />
        </div>

        <div className="card rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-display text-lg text-chalk mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
            {items.map(({ product, qty }) => (
              <div key={product.slug} className="flex gap-3">
                <div className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden bg-panel2">
                  <Image src={product.images[0]} alt={product.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-chalk/90 line-clamp-1">{product.name}</p>
                  <p className="text-xs text-mist">
                    {qty} x {formatNaira(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="power-divider mb-4" aria-hidden="true" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-mist">
              <span>Subtotal</span>
              <span className="text-chalk">{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-mist">
              <span>Delivery</span>
              <span className="text-chalk">
                {deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between font-display text-lg text-chalk pt-2 border-t border-line/50">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>

          {error && <p className="text-xs text-red-400 mt-4">{error}</p>}

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full mt-6 py-3.5 rounded-full bg-power-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity focus-ring disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Starting payment...
              </>
            ) : (
              `Pay ${formatNaira(total)} with Paystack`
            )}
          </button>
          <p className="flex items-center gap-1.5 text-[11px] text-mist mt-3 justify-center">
            <ShieldCheck size={12} /> Secured by Paystack
          </p>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid #232b3d;
          border-radius: 0.75rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #edeff5;
          outline: none;
        }
        .input:focus {
          border-color: #4fc3ff;
        }
        .input::placeholder {
          color: #5b6478;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs text-mist mb-1.5">
        {label} {required && <span className="text-circuit-400">*</span>}
      </span>
      {children}
    </label>
  );
}