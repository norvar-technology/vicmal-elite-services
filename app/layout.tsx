import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import StructuredData from "@/components/StructuredData";
import {
  BUSINESS,
  OG_DEFAULT_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: BUSINESS.description,
  keywords: [
    "MICH PRO accessories Nigeria",
    "wholesale phone accessories Owerri",
    "MICH PRO powerbanks Owerri",
    "earbuds Nigeria",
    "chargers wholesale Nigeria",
    "powerbanks Nigeria",
    "Vicmal Elite Services",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: BUSINESS.description,
    images: [{ url: OG_DEFAULT_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: BUSINESS.description,
    images: [OG_DEFAULT_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE_NAME,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BUSINESS.addressLine1}, ${BUSINESS.addressLine2}`,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.postalCode,
      addressCountry: "NG",
    },
    openingHours: "Mo-Sa 08:00-19:00",
    priceRange: "₦₦",
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <StructuredData data={orgSchema} />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
