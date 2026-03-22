// app/api/purchaseTickets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { issueTickets } from "@/lib/tickets";

export async function POST(req: NextRequest) {
  try {
    const { reference, email, cart, buyerName } = await req.json();

    if (!reference || !email || !cart) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Call centralized ticket issuing function
    await issueTickets({
      reference,
      buyerName,
      buyerEmail: email,
      cart,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ purchaseTickets API error:", err);
    return NextResponse.json(
      { error: err.message || "Ticket issuing failed" },
      { status: 500 }
    );
  }
}
