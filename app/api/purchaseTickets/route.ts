// app/api/purchaseTickets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { issueTickets } from "@/lib/tickets";

export async function POST(req: NextRequest) {
  try {
    const { reference, email, cart, buyerName } = await req.json();

    if (!reference || !email || !cart) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await issueTickets({
      reference,
      buyerName,
      buyerEmail: email,
      cart,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("❌ purchaseTickets API error:", err);
    const message =
      err instanceof Error ? err.message : "Ticket issuing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
