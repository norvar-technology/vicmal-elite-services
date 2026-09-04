import { BadgeCheck, Package, ShieldCheck, Truck } from "lucide-react";

const BADGES = [
  { icon: BadgeCheck, label: "100% Genuine Stock" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: Package, label: "Wholesale Pricing" },
  { icon: ShieldCheck, label: "Secure Paystack Checkout" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-line/60 bg-ink">
      <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-line/60">
        {BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 py-5 px-4 justify-center text-center">
            <Icon size={16} className="text-circuit-400 shrink-0" />
            <span className="text-xs md:text-sm font-medium text-chalk/85">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
