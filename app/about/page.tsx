import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, MapPin, ShieldCheck, Truck } from "lucide-react";
import { BUSINESS, MEDIA_BASE_URL, SITE_NAME, SITE_URL } from "@/lib/constants";
import StructuredData from "@/components/StructuredData";
import PowerDivider from "@/components/PowerDivider";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME}, the exclusive MICH PRO wholesale and retail outlet for earbuds, chargers, powerbanks, cords and batteries based in Owerri, Imo State, Nigeria.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description: BUSINESS.description,
    url: `${SITE_URL}/about`,
  },
};

const VALUES = [
  {
    icon: BadgeCheck,
    title: "Genuine, tested stock",
    body: "Every earbud, charger, powerbank and accessory is checked before it leaves our store — no refurbished units passed off as new.",
  },
  {
    icon: Truck,
    title: "Owerri-based, nationwide reach",
    body: "We dispatch from Owerri, Imo State, with local pickup for nearby customers and delivery across Nigeria.",
  },
  {
    icon: ShieldCheck,
    title: "Real warranty support",
    body: "Warranty periods are stated clearly on every product page, and our team is reachable on WhatsApp for support.",
  },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "Store",
      name: SITE_NAME,
      description: BUSINESS.description,
    },
  };

  return (
    <div className="container-page py-14">
      <StructuredData data={aboutSchema} />
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <p className="nameplate text-xs text-circuit-400 mb-2">About Us</p>
          <h1 className="font-display text-3xl md:text-4xl text-chalk leading-tight">
            Based in Owerri, for people who rely on their devices
          </h1>
          <p className="text-mist mt-5 leading-relaxed">
            {BUSINESS.description} We started as a small retail counter and grew into a
            trusted supplier for shop owners and everyday customers across southeastern
            Nigeria — because we tested every unit ourselves before it ever reached a
            customer.
          </p>
          <p className="text-mist mt-4 leading-relaxed">
            Today we stock genuine MICH PRO earbuds, chargers, powerbanks, cords and batteries at
            both wholesale and retail prices, with a checkout that's as fast and secure as
            the devices we sell.
          </p>
        </div>
        <div className="relative chamfer card p-3">
          <div className="relative aspect-[4/3] chamfer overflow-hidden">
            <Image
              src={`${MEDIA_BASE_URL}/vicmal/about/vicmal-elite-store-image.jpg`}
              alt={`${SITE_NAME} store in Owerri, Imo State`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <PowerDivider className="mb-14" />

      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {VALUES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card rounded-xl p-6">
            <div className="h-10 w-10 rounded-full bg-circuit-600/15 grid place-items-center text-circuit-300 mb-4">
              <Icon size={18} />
            </div>
            <h2 className="text-sm font-medium text-chalk mb-2">{title}</h2>
            <p className="text-sm text-mist leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-circuit-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-chalk">Visit our store</p>
            <p className="text-sm text-mist mt-1">
              {BUSINESS.addressLine1}, {BUSINESS.addressLine2}, {BUSINESS.city}, {BUSINESS.state}
            </p>
            <p className="text-sm text-mist mt-1">{BUSINESS.openingHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
