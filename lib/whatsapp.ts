import { CustomerInfo, DeliveryInfo, OrderDraft } from "./types";
import { formatNaira, formatDateTime } from "./format";
import { SITE_URL } from "./constants";

export function buildWhatsAppLink(number: string, message: string) {
  const digits = number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryMessage(productName: string, productUrl: string) {
  return [
    `Hi Vicmal Elite Services 👋`,
    ``,
    `I'd like to ask about this product:`,
    `• ${productName}`,
    productUrl,
  ].join("\n");
}

export function buildGenericChatMessage(name: string, message: string) {
  return [
    `Hi Vicmal Elite Services, my name is ${name || "a website visitor"}.`,
    ``,
    message,
  ].join("\n");
}

export function buildOrderConfirmationMessage(
  order: OrderDraft,
  paidAt: string,
  amountPaid: number
) {
  const itemLines = order.items
    .map((i) => `• ${i.qty} x ${i.name} — ${formatNaira(i.price * i.qty)}`)
    .join("\n");

  return [
    `✅ *New Order — Payment Confirmed*`,
    ``,
    `*Reference:* ${order.reference}`,
    `*Paid at:* ${formatDateTime(paidAt)}`,
    `*Amount paid:* ${formatNaira(amountPaid)}`,
    ``,
    `*Items:*`,
    itemLines,
    ``,
    `*Subtotal:* ${formatNaira(order.subtotal)}`,
    `*Delivery fee:* ${formatNaira(order.deliveryFee)}`,
    `*Total:* ${formatNaira(order.total)}`,
    ``,
    `*Customer details:*`,
    `Name: ${order.customer.fullName}`,
    `Phone: ${order.customer.phone}`,
    `Email: ${order.customer.email}`,
    ``,
    `*Delivery details:*`,
    `Method: ${order.delivery.method === "pickup" ? "Store pickup, Owerri" : "Delivery"}`,
    order.delivery.method === "delivery"
      ? `Address: ${order.delivery.address}, ${order.delivery.city}, ${order.delivery.state}, ${order.delivery.country}`
      : "",
    order.delivery.landmark ? `Landmark: ${order.delivery.landmark}` : "",
    order.delivery.notes ? `Notes: ${order.delivery.notes}` : "",
    ``,
    `Please confirm my order. Thank you!`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildOrderDraft(
  reference: string,
  items: OrderDraft["items"],
  subtotal: number,
  deliveryFee: number,
  customer: CustomerInfo,
  delivery: DeliveryInfo
): OrderDraft {
  return {
    reference,
    createdAt: new Date().toISOString(),
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    customer,
    delivery,
  };
}

export function productUrl(slug: string) {
  return `${SITE_URL}/product/${slug}`;
}
