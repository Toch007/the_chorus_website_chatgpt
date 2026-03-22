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

    // Parse JSON with error handling
    let event;
    try {
      event = JSON.parse(body);
    } catch (parseError) {
      console.error("❌ JSON parsing error:", parseError);
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (event.event === "charge.success") {
      const { reference, metadata, customer } = event.data;

      // Parse cart with error handling
      let cart = {};
      if (metadata?.cart) {
        try {
          cart = JSON.parse(metadata.cart);
        } catch (cartParseError) {
          console.error("❌ Cart parsing error:", cartParseError);
          // Continue with empty cart rather than failing the entire webhook
        }
      }

      await issueTickets({
        reference,
        buyerEmail: customer.email,
        buyerName: metadata?.buyerName || "Guest",
        cart,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
