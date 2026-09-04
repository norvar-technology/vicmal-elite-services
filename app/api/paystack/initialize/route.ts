import { NextRequest, NextResponse } from "next/server";
import { initializeTransaction } from "@/lib/paystack";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, customerName, customerPhone, orderSummary, deliveryAddress } = body;

    if (!email || !amount || amount <= 0) {
      return NextResponse.json(
        { status: false, message: "Missing or invalid email/amount." },
        { status: 400 }
      );
    }

    const origin = req.nextUrl.origin;
    const reference = `VES-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    const data = await initializeTransaction({
      email,
      amountNaira: amount,
      reference,
      callbackUrl: `${origin}/checkout/success`,
      metadata: {
        customer_name: customerName || "",
        customer_phone: customerPhone || "",
        order_summary: orderSummary || "",
        delivery_address: deliveryAddress || "",
        custom_fields: [
          { display_name: "Customer", variable_name: "customer_name", value: customerName || "" },
          { display_name: "Phone", variable_name: "customer_phone", value: customerPhone || "" },
        ],
      },
    });

    return NextResponse.json({ status: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, message: err?.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
