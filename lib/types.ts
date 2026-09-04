export type CategorySlug =
  | "earbuds"
  | "chargers"
  | "powerbanks"
  | "cords"
  | "batteries";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number; // NGN, retail unit price
  wholesalePrice?: number; // NGN, price per unit at wholesale MOQ
  wholesaleMoq?: number; // minimum order quantity for wholesale price
  compareAtPrice?: number; // for showing a discount strike-through
  shortDescription: string;
  description: string[];
  specs: ProductSpec[];
  images: string[];
  badge?: "New" | "Best Seller" | "Wholesale Favorite" | "Limited Stock";
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  relatedSlugs?: string[];
}

export interface CartLine {
  slug: string;
  qty: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface DeliveryInfo {
  address: string;
  city: string;
  state: string;
  country: "Nigeria" | "Ghana";
  landmark?: string;
  notes?: string;
  method: "delivery" | "pickup";
}

export interface OrderDraft {
  reference: string;
  createdAt: string;
  items: {
    name: string;
    slug: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  delivery: DeliveryInfo;
}
