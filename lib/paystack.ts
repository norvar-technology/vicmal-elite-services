const PAYSTACK_BASE_URL = "https://api.paystack.co";

function getSecretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error(
      "PAYSTACK_SECRET_KEY is not set. Add it to your environment variables (see .env.example)."
    );
  }
  return key;
}

export interface InitializeParams {
  email: string;
  amountNaira: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, unknown>;
}

export async function initializeTransaction(params: InitializeParams) {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: Math.round(params.amountNaira * 100), // kobo
      currency: "NGN",
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Failed to initialize Paystack transaction");
  }
  return data.data as {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function verifyTransaction(reference: string) {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${getSecretKey()}` },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Failed to verify Paystack transaction");
  }
  return data.data as {
    status: string; // "success" | "failed" | "abandoned"
    reference: string;
    amount: number; // kobo
    paid_at: string;
    customer: { email: string };
    metadata: Record<string, unknown>;
  };
}
