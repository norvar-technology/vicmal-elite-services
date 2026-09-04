import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, LOGO_URL, NORVAR_WHATSAPP_NUMBER, SITE_NAME } from "@/lib/constants";
import { categories } from "@/lib/categories";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const norvarLink = buildWhatsAppLink(
    NORVAR_WHATSAPP_NUMBER,
    "Hi Norvar Technology, I found your work through the Vicmal Elite Services website and I'd like to talk about building something similar."
  );

  return (
    <footer className="border-t border-line/60 bg-ink mt-24">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Image src={LOGO_URL} alt={SITE_NAME} width={160} height={38} className="h-8 w-auto mb-4" />
          <p className="text-sm text-mist leading-relaxed">{BUSINESS.description}</p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="#"
              aria-label="Vicmal Elite Services on Instagram"
              className="h-9 w-9 grid place-items-center rounded-full border border-line/70 text-mist hover:text-circuit-300 hover:border-circuit-500/60 focus-ring"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              aria-label="Vicmal Elite Services on Facebook"
              className="h-9 w-9 grid place-items-center rounded-full border border-line/70 text-mist hover:text-circuit-300 hover:border-circuit-500/60 focus-ring"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="nameplate text-xs text-circuit-300 mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm text-mist">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className="hover:text-chalk focus-ring">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="nameplate text-xs text-circuit-300 mb-4">Company</p>
          <ul className="space-y-2.5 text-sm text-mist">
            <li>
              <Link href="/about" className="hover:text-chalk focus-ring">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-chalk focus-ring">Contact</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-chalk focus-ring">Wholesale Pricing</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="nameplate text-xs text-circuit-300 mb-4">Visit / Contact</p>
          <ul className="space-y-3 text-sm text-mist">
            <li className="flex gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5 text-circuit-400" />
              <span>
                {BUSINESS.addressLine1}, {BUSINESS.addressLine2}, {BUSINESS.city}, {BUSINESS.state}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="shrink-0 mt-0.5 text-circuit-400" />
              <span>{BUSINESS.phoneDisplay}</span>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="shrink-0 mt-0.5 text-circuit-400" />
              <span>{BUSINESS.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="power-divider" aria-hidden="true" />

      <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mist">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        <p>
          Built by{" "}
          <a
            href={norvarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-circuit-300 hover:text-circuit-200 underline underline-offset-2 focus-ring"
          >
            Norvar Technology Ltd
          </a>
        </p>
      </div>
    </footer>
  );
}
