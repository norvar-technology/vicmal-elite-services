import { NextResponse } from "next/server";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/constants";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { formatNaira } from "@/lib/format";

export const revalidate = 3600;

export async function GET() {
  const products = getAllProducts();

  const categoryLines = categories
    .map((c) => `- ${c.name}: ${c.tagline} (${SITE_URL}/products?category=${c.slug})`)
    .join("\n");

  const productLines = products
    .map(
      (p) =>
        `- ${p.name} — ${formatNaira(p.price)}${
          p.wholesalePrice ? ` (wholesale ${formatNaira(p.wholesalePrice)} at ${p.wholesaleMoq}+ units)` : ""
        } — ${SITE_URL}/product/${p.slug}`
    )
    .join("\n");

  const body = `# ${SITE_NAME}

> ${BUSINESS.description}

${SITE_NAME} is the exclusive MICH PRO wholesale and retail outlet for earbuds,
chargers, powerbanks, cords and batteries, based in ${BUSINESS.city}, ${BUSINESS.state}, ${BUSINESS.country}.
We ship nationwide within Nigeria and offer store pickup locally. Checkout is
secured by Paystack (cards, bank transfer, USSD). Retail and wholesale pricing
(with minimum order quantities) is listed on every product page.

## Contact
- Address: ${BUSINESS.addressLine1}, ${BUSINESS.addressLine2}, ${BUSINESS.city}, ${BUSINESS.state}, ${BUSINESS.country}
- Phone / WhatsApp: ${BUSINESS.phoneDisplay}
- Email: ${BUSINESS.email}
- Hours: ${BUSINESS.openingHours}
- Website: ${SITE_URL}

## Categories
${categoryLines}

## Products
${productLines}

## Policies
- All products are quality-checked before shipping and carry a 3–12 month warranty depending on category.
- Wholesale pricing is available on every product at the listed minimum order quantity (MOQ).
- Payments are processed and verified through Paystack before an order is confirmed.
- Customers can reach the team directly via WhatsApp from any product page or the site-wide chat button.

## Key pages
- Shop all products: ${SITE_URL}/products
- About: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact
`;

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
