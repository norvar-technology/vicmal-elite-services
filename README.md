# Vicmal Elite Services — Website

A premium, futuristic Next.js 14 storefront for Vicmal Elite Services (laptops,
earbuds, chargers, powerbanks, cords and batteries — wholesale & retail),
based in Owerri, Imo State, Nigeria.

## What's included

- Full storefront: homepage, category filtering, product detail pages, cart,
  checkout, order-confirmation flow
- **Paystack payments** — initialize + verify run as Vercel serverless functions
  (`app/api/paystack/initialize`, `app/api/paystack/verify`). The secret key
  never reaches the browser.
- After a successful, **verified** payment, the customer is automatically
  redirected to WhatsApp with the payment reference, amount paid, time of
  payment, full item list, and their delivery details pre-filled in the message.
- A custom **WhatsApp chat widget** (bottom-right bubble) that lets visitors
  type one or more messages in a WhatsApp-style UI, then bundles everything
  into a single `wa.me` link on send.
- Every page (home, shop, category, product) has full **Open Graph / Twitter
  Card metadata**, plus Product / FAQPage / BreadcrumbList / Store JSON-LD.
- `sitemap.xml`, `robots.txt`, and a dynamic **`/llms.txt`** endpoint that
  summarizes the business and full catalog for AI assistants / answer engines.
- Simple cross-sell/upsell: the cart, checkout, and product pages suggest
  complementary categories (e.g. a laptop in the cart surfaces chargers,
  cords, and powerbanks).
- All product/category/hero/OG images are placeholder URLs pointed at
  `https://file.decklo.xzy/vicmal/...` — swap them for your real Cloudflare R2
  object keys once uploaded (same folder structure works as-is).
- Footer credit — **"Built by Norvar Technology Ltd"** — links to a prefilled
  WhatsApp chat with `09039048518`.

## 1. Install & run locally

```bash
npm install
cp .env.example .env.local   # then fill in the real values below
npm run dev
```

## 2. Environment variables

Set these in `.env.local` for local dev, and in your **Vercel Project →
Settings → Environment Variables** for production. See `.env.example` for the
full list with comments. The essentials:

| Variable | Where it's used |
|---|---|
| `PAYSTACK_SECRET_KEY` | Server-only. Paystack initialize/verify API routes. |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Not currently required by the redirect-based flow, but kept for reference/branding. |
| `NEXT_PUBLIC_SITE_URL` | OG tags, sitemap, Paystack `callback_url`. Set to your real domain before going live. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Vicmal Elite Services'** own WhatsApp number (digits only, e.g. `2348012345678`). Currently a placeholder — update this before launch. |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | Defaults to `https://file.decklo.xzy`. |
| `NEXT_PUBLIC_NORVAR_WHATSAPP_NUMBER` | Already set to `2349039048518` for the footer credit. |

## 3. Product & category data

Edit `lib/products.ts` and `lib/categories.ts` — everything (pricing, specs,
images, wholesale MOQ, stock) is plain TypeScript data, no CMS needed. Product
images should follow the pattern:

```
https://file.decklo.xzy/vicmal/products/<product-slug>/1.jpg
https://file.decklo.xzy/vicmal/products/<product-slug>/2.jpg
```

Logo: `https://file.decklo.xzy/vicmal/brand/vicmal-logo.png` (see
`lib/constants.ts` — `LOGO_URL`). Replace with your real logo once it's
uploaded to R2.

## 4. Paystack setup

1. Get your keys from the Paystack dashboard (test keys first).
2. Add `PAYSTACK_SECRET_KEY` to your environment.
3. No webhook is required for the current flow — verification happens
   synchronously on the `/checkout/success` page — but you can add a
   `/api/paystack/webhook` route later for extra reliability if you want a
   second, server-side source of truth.

## 5. Deploy to Vercel

```bash
npm i -g vercel   # if you don't have it
vercel
```

Or push this folder to a GitHub repo and import it in the Vercel dashboard.
Add the environment variables from step 2 in the Vercel project settings
before your first production deploy. No special build settings are needed —
Vercel auto-detects Next.js.

## 6. Before you go live — checklist

- [ ] Replace `NEXT_PUBLIC_WHATSAPP_NUMBER` with the real business number
- [ ] Replace `NEXT_PUBLIC_SITE_URL` with the real domain
- [ ] Upload real product/hero/category/logo images to Cloudflare R2 under
      the `vicmal/...` paths referenced in `lib/constants.ts` / `lib/products.ts`
      / `lib/categories.ts`, served from `file.decklo.xzy`
- [ ] Swap `PAYSTACK_SECRET_KEY` / public key from test to live
- [ ] Update the placeholder store address in `lib/constants.ts` (`BUSINESS`)
- [ ] Replace `public/favicon.ico` with a real favicon
