// app/api/paystack/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { issueTickets } from "@/lib/tickets";

export async function POST(req: Request) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY!;
    const body = await req.text(); // raw body required for signature verification

    // Verify signature
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
    const signature = req.headers.get("x-paystack-signature");
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { reference, metadata, customer } = event.data;

      await issueTickets({
        reference,
        buyerEmail: customer.email,
        buyerName: metadata?.buyerName || "Guest",
        cart: metadata?.cart ? JSON.parse(metadata.cart) : {},
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
