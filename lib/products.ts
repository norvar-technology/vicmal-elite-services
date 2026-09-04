import { Product } from "./types";
import { MEDIA_BASE_URL } from "./constants";

function img(slug: string, n: number) {
  return `${MEDIA_BASE_URL}/vicmal/products/${slug}-${n}.jpg`;
}

export const products: Product[] = [
  // ---------------- EARBUDS ----------------
  {
    id: "p-eb-04",
    slug: "vicmal-michpro-b20-tws-earbuds",
    name: "MICH PRO B20 TWS Earbuds with Digital Display",
    brand: "MICH PRO",
    category: "earbuds",
    price: 13000, // PLACEHOLDER — set real retail price
    wholesalePrice: 11000, // PLACEHOLDER — set real wholesale price
    wholesaleMoq: 100, // PLACEHOLDER — set real MOQ
    shortDescription:
      "Semi-in-ear TWS earbuds with ENC call noise cancellation, BT5.4 low latency, and a digital charge display on the case.",
    description: [
      "The B20 pairs ENC call noise cancellation with a low-latency BT5.4 connection, so voice calls stay clear and audio stays in sync during video and gaming.",
      "A digital display on the charging case shows exact remaining battery at a glance, and touch controls handle playback without reaching for your phone.",
    ],
    specs: [
      { label: "Fit", value: "Semi-in-ear, sweatproof" },
      { label: "Noise cancellation", value: "ENC call noise cancellation" },
      { label: "Connectivity", value: "Bluetooth 5.4, low latency" },
      { label: "Battery", value: "Up to 40 hours with case" },
      { label: "Controls", value: "Touch control" },
      { label: "Display", value: "Digital charge % on case" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-michpro-b20-tws-earbuds", 1), img("vicmal-michpro-b20-tws-earbuds", 2)],
    rating: 4.5, // PLACEHOLDER
    reviewCount: 20, // PLACEHOLDER
    stock: 1000, // PLACEHOLDER
    sku: "B20",
    relatedSlugs: ["vicmal-usb-c-braided-cord-1m", "vicmal-20w-fast-charger"],
  },
  {
    id: "p-eb-05",
    slug: "vicmal-michpro-corebuds-x",
    name: "MICH PRO CoreBuds X Sleek Lightweight Earbuds",
    brand: "MICH PRO",
    category: "earbuds",
    price: 14000, // PLACEHOLDER
    wholesalePrice: 11000, // PLACEHOLDER
    wholesaleMoq: 100, // PLACEHOLDER
    shortDescription:
      "Sleek, lightweight earbuds with a seamless fit and 2-in-1 super fast charging, in a compact rounded case.",
    description: [
      "CoreBuds X focuses on fit and everyday comfort — a lightweight build designed to sit securely without fatigue over long wear.",
      "2-in-1 super fast charging tops up both the case and buds quickly, so short charging windows still get you through the day.",
    ],
    specs: [
      { label: "Fit", value: "Lightweight, seamless in-ear" },
      { label: "Charging", value: "2-in-1 super fast charge" },
      { label: "Certification", value: "Original Exclusive Certification" },
      { label: "Colors available", value: "Gold, Black, White" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-michpro-corebuds-x", 1), img("vicmal-michpro-corebuds-x", 1)],
    rating: 4.9, // PLACEHOLDER
    reviewCount: 15, // PLACEHOLDER
    stock: 2000, // PLACEHOLDER
    sku: "ER-60",
    relatedSlugs: ["vicmal-usb-c-braided-cord-1m", "vicmal-20w-fast-charger"],
  },
  {
    id: "p-eb-06",
    slug: "vicmal-michpro-soundgo-mp88",
    name: "MICH PRO SoundGo MP88 ENC Earbuds",
    brand: "MICH PRO",
    category: "earbuds",
    price: 12500, // PLACEHOLDER
    wholesalePrice: 10500, // PLACEHOLDER
    wholesaleMoq: 100, // PLACEHOLDER
    shortDescription:
      "Hi-Fi earbuds in a round, keychain-style case with a digital display, BT5.5, ENC, and DT9.0 directional sound.",
    description: [
      "SoundGo MP88 runs on a Bluetooth 5.5 chip with Hi-Res gold standard sound and DT9.0 directional audio processing, tuned for clarity across the frequency range.",
      "The round case includes a built-in loop strap for keychain carry, a digital LED battery display, and ships with a Type-C charging cable.",
    ],
    specs: [
      { label: "Connectivity", value: "Bluetooth 5.5 chip" },
      { label: "Noise cancellation", value: "ENC + digital noise reduction" },
      { label: "Sound", value: "Hi-Res Gold Standard, DT9.0 directional sound" },
      { label: "Display", value: "Digital LED battery indicator" },
      { label: "Included", value: "Type-C charging cable, carry strap" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-michpro-soundgo-mp88", 1), img("vicmal-michpro-soundgo-mp88", 1)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 35, // PLACEHOLDER
    stock: 1000, // PLACEHOLDER
    sku: "MP88",
    relatedSlugs: ["vicmal-usb-c-braided-cord-1m", "vicmal-20w-fast-charger"],
  },
  {
    id: "p-eb-07",
    slug: "vicmal-michpro-er58-dual-earbuds-set",
    name: "MICH PRO ER-58 360° Rotatable Dual Earbuds Set",
    brand: "MICH PRO",
    category: "earbuds",
    price: 16000, // PLACEHOLDER
    wholesalePrice: 12000, // PLACEHOLDER
    wholesaleMoq: 100, // PLACEHOLDER
    shortDescription:
      "A 2-in-1 set pairing open-ear clip buds with standard in-ear buds in one case, for switching styles by activity.",
    description: [
      "ER-58 ships with two distinct earbud styles in one case: 360° rotatable open-ear clips for workouts and situational awareness, and standard in-ear buds for focused listening.",
      "2-in-1 super fast charging keeps both pairs topped up together, so there's no juggling separate chargers.",
    ],
    specs: [
      { label: "Set contents", value: "Open-ear clip buds + in-ear buds" },
      { label: "Design", value: "360° rotatable ear clip" },
      { label: "Charging", value: "2-in-1 super fast charge" },
      { label: "Certification", value: "Original Exclusive Certification" },
      { label: "Colors available", value: "Black, White, Beige" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-michpro-er58-dual-earbuds-set", 1), img("vicmal-michpro-er58-dual-earbuds-set", 1)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 25, // PLACEHOLDER
    stock: 3000, // PLACEHOLDER
    sku: "ER-58",
    relatedSlugs: ["vicmal-usb-c-braided-cord-1m", "vicmal-20w-fast-charger"],
  },
  {
    id: "p-eb-08",
    slug: "vicmal-michpro-boompods-er97",
    name: "MICH PRO BoomPods ER-97 Bold Bass Earbuds",
    brand: "MICH PRO",
    category: "earbuds",
    price: 12000, // PLACEHOLDER
    wholesalePrice: 10000, // PLACEHOLDER
    wholesaleMoq: 100, // PLACEHOLDER
    shortDescription:
      "Hi-Fi bass-tuned earbuds with a bold, chunky fit, long play time, and a stable connection.",
    description: [
      "BoomPods are tuned for bass-forward listening — powerful, crisp sound built for music over call clarity, with a stable connection that holds through movement.",
      "Long play time on a single charge means fewer mid-day top-ups.",
    ],
    specs: [
      { label: "Sound", value: "Hi-Fi, bass-forward tuning" },
      { label: "Connection", value: "Stable long-range Bluetooth" },
      { label: "Battery", value: "Long play time" },
      { label: "Certification", value: "Certified & Trusted Cells" },
      { label: "Colors available", value: "Navy Blue, White, Black" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-michpro-boompods-er97", 1), img("vicmal-michpro-boompods-er97", 1)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 0, // PLACEHOLDER
    stock: 500, // PLACEHOLDER
    sku: "ER-97",
    relatedSlugs: ["vicmal-usb-c-braided-cord-1m", "vicmal-20w-fast-charger"],
  },
  {
    id: "p-eb-09",
    slug: "vicmal-michpro-dualbuds-combo-pro-er55",
    name: "MICH PRO DualBuds Combo Pro ER-55",
    brand: "MICH PRO",
    category: "earbuds",
    price: 15000, // PLACEHOLDER
    wholesalePrice: 11000, // PLACEHOLDER
    wholesaleMoq: 100, // PLACEHOLDER
    shortDescription:
      "A premium 2-in-1 open-ear clip and in-ear earbuds set with a digital display case and super fast charging.",
    description: [
      "DualBuds Combo Pro ships both an open-ear clip pair and an in-ear pair in a single case, so you can switch styles depending on the activity.",
      "The case adds a digital display showing exact charge level, alongside super fast charging support.",
    ],
    specs: [
      { label: "Set contents", value: "Open-ear clip buds + in-ear buds" },
      { label: "Display", value: "Digital charge % display on case" },
      { label: "Charging", value: "Super fast charge" },
      { label: "Certification", value: "Original Exclusive Certification" },
      { label: "Colors available", value: "Silver, Purple, Rose Gold" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-michpro-dualbuds-combo-pro-er55", 1), img("vicmal-michpro-dualbuds-combo-pro-er55", 1)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 7, // PLACEHOLDER
    stock: 1000, // PLACEHOLDER
    sku: "ER-55",
    relatedSlugs: ["vicmal-usb-c-braided-cord-1m", "vicmal-20w-fast-charger"],
  },

  // ---------------- CHARGERS ----------------
  {
    id: "p-ch-05",
    slug: "vicmal-michpro-super-45w-charger",
    name: "MICH PRO SUPER 45W Dual-Port Charger (PD20W + QC3.0)",
    brand: "MICH PRO",
    category: "chargers",
    price: 8000,
    wholesalePrice: 7000,
    wholesaleMoq: 100,
    shortDescription:
      "A 45W total-output dual-port wall charger — USB-C PD 20W and USB-A QC 3.0 — with a bundled charging cable.",
    description: [
      "The SUPER charger splits 45W across a USB-C PD 20W port and a USB-A QC 3.0 port, so two devices can fast-charge from one socket at once.",
      "Ships with a matching charging cable and MICH PRO's multiple circuit protection — overcharge, overdischarge, and short-circuit safety built in.",
    ],
    specs: [
      { label: "Output", value: "45W total (USB-C PD 20W + USB-A QC 3.0)" },
      { label: "Input", value: "100–240V, UK 3-pin plug" },
      { label: "Protection", value: "Overcharge, overdischarge, short-circuit" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-michpro-super-45w-charger", 1), img("vicmal-michpro-super-45w-charger", 1)],
    rating: 4.7,
    reviewCount: 168,
    stock: 84,
    sku: "HP301C",
    relatedSlugs: ["vicmal-usb-c-braided-cord-2m"],
  },
  {
    id: "p-ch-06",
    slug: "vicmal-michpro-mp810-40w-charger",
    name: "MICH PRO MP810 40W Fast Charger with Digital Display Cable",
    brand: "MICH PRO",
    category: "chargers",
    price: 7500,
    wholesalePrice: 6500,
    wholesaleMoq: 100,
    shortDescription:
      "A 40W PD+QC 3.0 charger bundled with a smart cable that shows real-time charging wattage on a digital display.",
    description: [
      "MP810 combines PD and QC 3.0 fast-charging protocols for up to 40W output, built around a high-tech chipset for stable, efficient power delivery.",
      "The bundled cable has a built-in digital display showing the exact wattage being drawn in real time — useful for confirming a device is actually fast-charging.",
    ],
    specs: [
      { label: "Output", value: "40W max, PD + QC 3.0" },
      { label: "Included cable", value: "Lightning cable with digital wattage display" },
      { label: "Input", value: "100–240V, UK 3-pin plug" },
      { label: "Warranty", value: "365 days, MICH PRO" }, // ASSUMED — matches rest of MICH PRO line, not directly visible on this render
    ],
    images: [img("vicmal-michpro-mp810-40w-charger", 1), img("vicmal-michpro-mp810-40w-charger", 1)],
    rating: 4.8,
    reviewCount: 91,
    stock: 56,
    sku: "MP810",
    relatedSlugs: ["vicmal-michpro-iphone-lightning-cord"],
  },
  {
    id: "p-ch-07",
    slug: "vicmal-michpro-mp702-35w-charger",
    name: "MICH PRO MP702 C to Lightning 35W Power Adapter",
    brand: "MICH PRO",
    category: "chargers",
    price: 7000,
    wholesalePrice: 6000,
    wholesaleMoq: 100,
    shortDescription:
      "A 35W USB-C PD power adapter with smart quick charge, bundled with a C-to-Lightning cable for iPhone.",
    description: [
      "MP702 delivers up to 35W through a single USB-C PD port with smart quick-charge negotiation, so connected devices draw exactly the power they need.",
      "Comes bundled with a MICH PRO C-to-Lightning cable, ready to fast-charge compatible iPhones out of the box.",
    ],
    specs: [
      { label: "Output", value: "35W max, USB-C PD, Smart Quick Charge" },
      { label: "Included cable", value: "USB-C to Lightning" },
      { label: "Input", value: "100–240V, UK 3-pin plug" },
      { label: "Warranty", value: "365 days, MICH PRO" }, // ASSUMED
    ],
    images: [img("vicmal-michpro-mp702-35w-charger", 1)],
    rating: 4.6,
    reviewCount: 74,
    stock: 63,
    sku: "MP702",
    relatedSlugs: ["vicmal-michpro-iphone-lightning-cord"],
  },
  {
    id: "p-ch-08",
    slug: "vicmal-michpro-mp420-33w-charger",
    name: "MICH PRO MP-420 C to Lightning 33W Power Adapter",
    brand: "MICH PRO",
    category: "chargers",
    price: 6500,
    wholesalePrice: 5500,
    wholesaleMoq: 100,
    shortDescription:
      "A 33W USB-C PD power adapter with smart quick charge, bundled with a 1000mm C-to-Lightning cable.",
    description: [
      "MP-420 delivers up to 33W through a single USB-C PD port with smart quick-charge negotiation.",
      "Comes bundled with a full-length 1-metre MICH PRO C-to-Lightning cable, giving more reach than the shorter cables typically bundled with wall chargers.",
    ],
    specs: [
      { label: "Output", value: "33W maximum power, USB-C PD, Smart Quick Charge" },
      { label: "Included cable", value: "USB-C to Lightning, 1000mm (1m)" },
      { label: "Input", value: "100–240V, UK 3-pin plug" },
      { label: "Warranty", value: "365 days, MICH PRO" }, // ASSUMED
    ],
    images: [img("vicmal-michpro-mp420-33w-charger", 1)],
    rating: 4.5,
    reviewCount: 58,
    stock: 700,
    sku: "MP-420",
    relatedSlugs: ["vicmal-michpro-iphone-lightning-cord"],
  },
  {
    id: "p-ch-09",
    slug: "vicmal-michpro-20w-charger",
    name: "MICH PRO 20W USB-C Fast Charger",
    brand: "MICH PRO",
    category: "chargers",
    price: 5500,
    wholesalePrice: 4500,
    wholesaleMoq: 100,
    shortDescription: "A compact 20W USB-C wall charger for everyday fast phone and earbuds-case charging.",
    description: [
      "Fast-charges most modern phones to around 50% in roughly 30 minutes — small enough to keep permanently in a bag or by a bedside socket.",
    ],
    specs: [
      { label: "Output", value: "20W USB-C PD" }, // ASSUMED — no reference photo for this specific unit
      { label: "Input", value: "100–240V" },
      { label: "Warranty", value: "365 days, MICH PRO" }, // ASSUMED
    ],
    images: [img("vicmal-michpro-20w-charger", 1)],
    rating: 4.5,
    reviewCount: 203,
    stock: 1400,
    sku: "MP-20W",
    relatedSlugs: ["vicmal-michpro-iphone-lightning-cord"],
  },

  // ---------------- POWERBANKS ----------------
  {
    id: "p-pb-05",
    slug: "vicmal-power-pack-50000mah",
    name: "MICH PRO Power Pack 50,000mAh Foldable PD Powerbank",
    brand: "MICH PRO",
    category: "powerbanks",
    price: 35000, // PLACEHOLDER — set real retail price
    wholesalePrice: 30000, // PLACEHOLDER — set real wholesale price
    wholesaleMoq: 100, // PLACEHOLDER — set real MOQ
    shortDescription:
      "A 50,000mAh powerbank with a built-in foldable PD cable and carry strap — no separate cable to lose.",
    description: [
      "The Power Pack folds its own PD charging cable into the housing, so it's always attached and never left behind. A built-in carry strap makes it easy to sling onto a bag.",
      "The digital display shows exact remaining charge, and the glossy clamshell body opens to reveal the fold-out cable when needed.",
    ],
    specs: [
      { label: "Capacity", value: "50,000mAh" },
      { label: "Cable", value: "Built-in foldable PD cable (~500mm)" },
      { label: "Fast charging", value: "PD + QC 3.0" },
      { label: "Display", value: "Digital % readout" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-power-pack-50000mah", 2), img("vicmal-power-pack-50000mah", 1)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 5, // PLACEHOLDER
    stock: 300, // PLACEHOLDER
    sku: "IFAST-052",
    relatedSlugs: ["vicmal-usb-c-braided-cord-2m"],
  },
  {
    id: "p-pb-06",
    slug: "vicmal-power-major-30000mah",
    name: "MICH PRO Power Major 30,000mAh Fast Powerbank",
    brand: "MICH PRO",
    category: "powerbanks",
    price: 25000, // PLACEHOLDER — set real retail price
    wholesalePrice: 23000, // PLACEHOLDER — set real wholesale price
    wholesaleMoq: 100, // PLACEHOLDER — set real MOQ
    shortDescription:
      "A 30,000mAh powerbank with iFast Technology and a detachable 500mm PD cable rated up to 60W.",
    description: [
      "Power Major uses MICH PRO's iFast Technology for quicker top-ups on both the powerbank itself and the device charging from it.",
      "The PD cable detaches, so it can be swapped or replaced independently of the powerbank body. A digital display shows remaining charge at a glance.",
    ],
    specs: [
      { label: "Capacity", value: "30,000mAh" },
      { label: "Cable", value: "Detachable 500mm PD cable, 60W max" },
      { label: "Technology", value: "iFast Technology" },
      { label: "Display", value: "Digital % readout" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-power-major-30000mah", 1), img("vicmal-power-major-30000mah", 2)],
    rating: 4.9, // PLACEHOLDER
    reviewCount: 10, // PLACEHOLDER
    stock: 500, // PLACEHOLDER
    sku: "IFAST-032",
    relatedSlugs: ["vicmal-usb-c-braided-cord-2m"],
  },
  {
    id: "p-pb-07",
    slug: "vicmal-mp055-64w-powerbank-50000mah",
    name: "MICH PRO High Capacity Power Bank 50,000mAh, 64W",
    brand: "MICH PRO",
    category: "powerbanks",
    price: 35000, // PLACEHOLDER — set real retail price
    wholesalePrice: 30000, // PLACEHOLDER — set real wholesale price
    wholesaleMoq: 100, // PLACEHOLDER — set real MOQ
    shortDescription:
      "A 50,000mAh, 64W powerbank with three output ports, a portable lanyard, and a bundled 4-cable set.",
    description: [
      "Rated for 64W total output across three ports, the MP055 has enough headroom to charge a phone and two accessories at once, or fast-charge a single higher-draw device.",
      "Ships with a portable lanyard for hands-free carry and a 4-cable bundle covering the common connector types.",
    ],
    specs: [
      { label: "Capacity", value: "50,000mAh" },
      { label: "Output", value: "64W total, 3 ports" },
      { label: "Included", value: "Portable lanyard, 4-cable bundle" },
      { label: "Display", value: "Digital % readout" },
      { label: "Warranty", value: "365 days, MICH PRO" },
    ],
    images: [img("vicmal-mp055-64w-powerbank-50000mah", 1), img("vicmal-mp055-64w-powerbank-50000mah", 2)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 5, // PLACEHOLDER
    stock: 500, // PLACEHOLDER
    sku: "MP055",
    relatedSlugs: ["vicmal-usb-c-braided-cord-2m"],
  },

  // ---------------- CORDS ----------------
  {
    id: "p-cd-04",
    slug: "vicmal-michpro-iphone-lightning-cord",
    name: "MICH PRO USB-C to Lightning Charging Cord",
    brand: "MICH PRO",
    category: "cords",
    price: 1500,
    wholesalePrice: 1000, // wholesale at 100+ pieces — confirm this isn't meant to read ₦100
    wholesaleMoq: 100,
    shortDescription:
      "A USB-C to Lightning charging cord for iPhone, compatible with any USB-C wall charger or powerbank.",
    description: [
      "Pairs with any USB-C PD charger or powerbank to charge Lightning-port iPhones, without needing a separate iPhone-specific adapter.",
    ],
    specs: [
      { label: "Length", value: "1 metre" }, // ASSUMED — confirm actual length
      { label: "Compatibility", value: "Lightning-port iPhones" },
      { label: "Warranty", value: "365 days, MICH PRO" }, // ASSUMED to match other MICH PRO items
    ],
    images: [img("vicmal-michpro-iphone-lightning-cord", 1)],
    rating: 4.5, // PLACEHOLDER
    reviewCount: 20, // PLACEHOLDER
    stock: 1000, // PLACEHOLDER
    sku: "MP-CD-IPH",
    relatedSlugs: ["vicmal-20w-fast-charger"],
  },
  {
    id: "p-cd-05",
    slug: "vicmal-michpro-type-c-cord",
    name: "MICH PRO USB-C to USB-C Charging Cord",
    brand: "MICH PRO",
    category: "cords",
    price: 1500,
    wholesalePrice: 1000,
    wholesaleMoq: 100,
    shortDescription:
      "A USB-C to USB-C charging cord for phones, earbuds cases, and other USB-C accessories.",
    description: [
      "The everyday cord for USB-C devices — pairs with any USB-C PD charger or powerbank for charging and basic data transfer.",
    ],
    specs: [
      { label: "Length", value: "1 metre" }, // ASSUMED
      { label: "Connector", value: "USB-C to USB-C" },
      { label: "Warranty", value: "365 days, MICH PRO" }, // ASSUMED
    ],
    images: [img("vicmal-michpro-type-c-cord", 1)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 50, // PLACEHOLDER
    stock: 4000, // PLACEHOLDER
    sku: "MP-CD-TYC",
    relatedSlugs: ["vicmal-20w-fast-charger"],
  },
  {
    id: "p-cd-06",
    slug: "vicmal-michpro-usb-cord",
    name: "MICH PRO USB to Micro-USB Charging Cord",
    brand: "MICH PRO",
    category: "cords",
    price: 1200,
    wholesalePrice: 800,
    wholesaleMoq: 100,
    shortDescription:
      "A standard USB-A to Micro-USB charging cord for older and budget phones and accessories.",
    description: [
      "The reliable everyday cord for Micro-USB devices — phones, basic accessories, and anything still on the older charging standard.",
    ],
    specs: [
      { label: "Length", value: "1 metre" }, // ASSUMED
      { label: "Connector", value: "USB-A to Micro-USB" }, // ASSUMED — confirm this is what "USB cord" means
      { label: "Warranty", value: "365 days, MICH PRO" }, // ASSUMED
    ],
    images: [img("vicmal-michpro-usb-cord", 1)],
    rating: 5.0, // PLACEHOLDER
    reviewCount: 10, // PLACEHOLDER
    stock: 500, // PLACEHOLDER
    sku: "MP-CD-USB",
    relatedSlugs: ["vicmal-20w-fast-charger"],
  },

  // ---------------- BATTERIES ----------------
  {
    id: "p-bt-03",
    slug: "vicmal-michpro-battery-iphone-12-series",
    name: "MICH PRO Replacement Battery — iPhone 12 Series",
    brand: "MICH PRO",
    category: "batteries",
    price: 25000,
    shortDescription:
      "A MICH PRO extra-capacity replacement battery for iPhone 12 series devices, fitted or shipped with a fitting guide.",
    description: [
      "Bring an aging iPhone 12 series device back to a full day of runtime with a fresh MICH PRO cell, built on iFast Extra capacity technology.",
      "Fitting is available in-store in Owerri, or the battery ships with a guide for self-installation. Confirm your exact model (mini / standard / Pro / Pro Max) before ordering, as capacity and fit vary within the series.",
    ],
    specs: [
      { label: "Compatibility", value: "iPhone 12 series — confirm exact model (mini/standard/Pro/Pro Max)" },
      { label: "Chemistry", value: "Rechargeable Li-ion Polymer, iFast Extra mAh technology" },
      { label: "Model code", value: "TBD — confirm with supplier" },
      { label: "Certification", value: "CE certified" },
      { label: "Fitting", value: "In-store fitting available in Owerri" },
      { label: "Warranty", value: "TBD — confirm terms with supplier" },
    ],
    images: [img("vicmal-michpro-battery-iphone-12-series", 1)],
    rating: 4.4, // ILLUSTRATIVE — not real review data
    reviewCount: 47, // ILLUSTRATIVE — not real review data
    stock: 30, // PLACEHOLDER
    sku: "MP-BT-IP12", // PLACEHOLDER pending real model code
    relatedSlugs: ["vicmal-michpro-super-45w-charger"],
  },
  {
    id: "p-bt-04",
    slug: "vicmal-michpro-battery-iphone-13-series",
    name: "MICH PRO Replacement Battery — iPhone 13 Series",
    brand: "MICH PRO",
    category: "batteries",
    price: 27000,
    shortDescription:
      "A MICH PRO extra-capacity replacement battery for iPhone 13 series devices, fitted or shipped with a fitting guide.",
    description: [
      "Bring an aging iPhone 13 series device back to a full day of runtime with a fresh MICH PRO cell, built on iFast Extra capacity technology.",
      "Fitting is available in-store in Owerri, or the battery ships with a guide for self-installation. Confirm your exact model (mini / standard / Pro / Pro Max) before ordering, as capacity and fit vary within the series.",
    ],
    specs: [
      { label: "Compatibility", value: "iPhone 13 series — confirm exact model (mini/standard/Pro/Pro Max)" },
      { label: "Chemistry", value: "Rechargeable Li-ion Polymer, iFast Extra mAh technology" },
      { label: "Model code", value: "TBD — confirm with supplier" },
      { label: "Certification", value: "CE certified" },
      { label: "Fitting", value: "In-store fitting available in Owerri" },
      { label: "Warranty", value: "TBD — confirm terms with supplier" },
    ],
    images: [img("vicmal-michpro-battery-iphone-13-series", 1)],
    rating: 4.5, // ILLUSTRATIVE
    reviewCount: 39, // ILLUSTRATIVE
    stock: 28, // PLACEHOLDER
    sku: "MP-BT-IP13", // PLACEHOLDER
    relatedSlugs: ["vicmal-michpro-super-45w-charger"],
  },
  {
    id: "p-bt-05",
    slug: "vicmal-michpro-battery-iphone-14-series",
    name: "MICH PRO Replacement Battery — iPhone 14 Series",
    brand: "MICH PRO",
    category: "batteries",
    price: 30000,
    shortDescription:
      "A MICH PRO extra-capacity replacement battery for iPhone 14 series devices, fitted or shipped with a fitting guide.",
    description: [
      "Bring an aging iPhone 14 series device back to a full day of runtime with a fresh MICH PRO cell, built on iFast Extra capacity technology.",
      "Fitting is available in-store in Owerri, or the battery ships with a guide for self-installation. Confirm your exact model (standard / Plus / Pro / Pro Max) before ordering, as capacity and fit vary within the series.",
    ],
    specs: [
      { label: "Compatibility", value: "iPhone 14 series — confirm exact model (standard/Plus/Pro/Pro Max)" },
      { label: "Chemistry", value: "Rechargeable Li-ion Polymer, iFast Extra mAh technology" },
      { label: "Model code", value: "TBD — confirm with supplier" },
      { label: "Certification", value: "CE certified" },
      { label: "Fitting", value: "In-store fitting available in Owerri" },
      { label: "Warranty", value: "TBD — confirm terms with supplier" },
    ],
    images: [img("vicmal-michpro-battery-iphone-14-series", 1)],
    rating: 4.6, // ILLUSTRATIVE
    reviewCount: 52, // ILLUSTRATIVE
    stock: 25, // PLACEHOLDER
    sku: "MP-BT-IP14", // PLACEHOLDER
    relatedSlugs: ["vicmal-michpro-super-45w-charger"],
  },
  {
    id: "p-bt-06",
    slug: "vicmal-michpro-battery-iphone-15-series",
    name: "MICH PRO Replacement Battery — iPhone 15 Series",
    brand: "MICH PRO",
    category: "batteries",
    price: 32000,
    shortDescription:
      "A MICH PRO extra-capacity replacement battery for iPhone 15 series devices, fitted or shipped with a fitting guide.",
    description: [
      "Bring an aging iPhone 15 series device back to a full day of runtime with a fresh MICH PRO cell, built on iFast Extra capacity technology.",
      "Fitting is available in-store in Owerri, or the battery ships with a guide for self-installation. Confirm your exact model (standard / Plus / Pro / Pro Max) before ordering, as capacity and fit vary within the series.",
    ],
    specs: [
      { label: "Compatibility", value: "iPhone 15 series — confirm exact model (standard/Plus/Pro/Pro Max)" },
      { label: "Chemistry", value: "Rechargeable Li-ion Polymer, iFast Extra mAh technology" },
      { label: "Model code", value: "TBD — confirm with supplier" },
      { label: "Certification", value: "CE certified" },
      { label: "Fitting", value: "In-store fitting available in Owerri" },
      { label: "Warranty", value: "TBD — confirm terms with supplier" },
    ],
    images: [img("vicmal-michpro-battery-iphone-15-series", 1)],
    rating: 4.6, // ILLUSTRATIVE
    reviewCount: 33, // ILLUSTRATIVE
    stock: 22, // PLACEHOLDER
    sku: "MP-BT-IP15", // PLACEHOLDER
    relatedSlugs: ["vicmal-michpro-super-45w-charger"],
  },
  {
    id: "p-bt-07",
    slug: "vicmal-michpro-battery-iphone-16-series",
    name: "MICH PRO Replacement Battery — iPhone 16 Series",
    brand: "MICH PRO",
    category: "batteries",
    price: 34000,
    shortDescription:
      "A MICH PRO extra-capacity replacement battery for iPhone 16 series devices, fitted or shipped with a fitting guide.",
    description: [
      "Bring an aging iPhone 16 series device back to a full day of runtime with a fresh MICH PRO cell, built on iFast Extra capacity technology.",
      "Fitting is available in-store in Owerri, or the battery ships with a guide for self-installation. Confirm your exact model (standard / Plus / Pro / Pro Max) before ordering, as capacity and fit vary within the series.",
    ],
    specs: [
      { label: "Compatibility", value: "iPhone 16 series — confirm exact model (standard/Plus/Pro/Pro Max)" },
      { label: "Chemistry", value: "Rechargeable Li-ion Polymer, iFast Extra mAh technology" },
      { label: "Model code", value: "TBD — confirm with supplier" },
      { label: "Certification", value: "CE certified" },
      { label: "Fitting", value: "In-store fitting available in Owerri" },
      { label: "Warranty", value: "TBD — confirm terms with supplier" },
    ],
    images: [img("vicmal-michpro-battery-iphone-16-series", 1)],
    rating: 4.7, // ILLUSTRATIVE
    reviewCount: 21, // ILLUSTRATIVE
    stock: 18, // PLACEHOLDER
    sku: "MP-BT-IP16", // PLACEHOLDER
    relatedSlugs: ["vicmal-michpro-super-45w-charger"],
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4) {
  const bySlug = (product.relatedSlugs || [])
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as Product[];
  if (bySlug.length >= limit) return bySlug.slice(0, limit);
  const fallback = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  );
  const combined = [...bySlug];
  for (const p of fallback) {
    if (combined.length >= limit) break;
    if (!combined.find((c) => c.slug === p.slug)) combined.push(p);
  }
  return combined.slice(0, limit);
}

export function getUpsellForCategories(categoriesInCart: string[], excludeSlugs: string[], limit = 4) {
  // Cross-category upsell map: what pairs well with what's already in the cart
  const map: Record<string, string[]> = {
    earbuds: ["chargers", "cords"],
    chargers: ["cords"],
    powerbanks: ["cords"],
    cords: ["chargers"],
    batteries: ["chargers"],
  };
  const targetCategories = new Set<string>();
  categoriesInCart.forEach((c) => (map[c] || []).forEach((t) => targetCategories.add(t)));
  const pool = products.filter(
    (p) => targetCategories.has(p.category) && !excludeSlugs.includes(p.slug)
  );
  const sorted = pool.sort((a, b) => b.rating - a.rating);
  return sorted.slice(0, limit);
}
