// Delivery fee tiers, in NGN.
export const DELIVERY_FEE_NIGERIA_STANDARD = 2500; // any Nigerian state other than Lagos/Abuja
export const DELIVERY_FEE_NIGERIA_LAGOS_ABUJA = 5000; // Lagos or Abuja specifically
export const DELIVERY_FEE_GHANA = 20000; // flat international rate

export type DeliveryCountry = "Nigeria" | "Ghana";

// Matches Lagos/Abuja against free-text state input. Extend this list if
// customers type variants that slip through (e.g. "Ikeja", "FCT Abuja").
const LAGOS_ABUJA_MATCHERS = ["lagos", "abuja", "fct", "federal capital"];

export function isLagosOrAbuja(state: string): boolean {
  const s = state.trim().toLowerCase();
  return LAGOS_ABUJA_MATCHERS.some((m) => s.includes(m));
}

// Returns the destination-based fee only — does not apply pickup (always 0)
// or any free-shipping threshold. The caller composes those on top.
export function calculateDeliveryFee(
  country: DeliveryCountry,
  state: string
): number {
  if (country === "Ghana") return DELIVERY_FEE_GHANA;
  return isLagosOrAbuja(state)
    ? DELIVERY_FEE_NIGERIA_LAGOS_ABUJA
    : DELIVERY_FEE_NIGERIA_STANDARD;
}