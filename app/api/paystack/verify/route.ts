import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/paystack";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json(
      { status: false, message: "Missing reference." },
      { status: 400 }
    );
  }

  try {
    const data = await verifyTransaction(reference);
    return NextResponse.json({ status: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, message: err?.message || "Verification failed." },
      { status: 500 }
    );
  }
}
