// app/api/validateTicket/route.ts
import { db } from "@/firebase/admin"; // admin SDK
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "🚫 Ticket ID missing" },
        { status: 400 }
      );
    }

    const ticketRef = db.collection("ticketPurchases").doc(ticketId);

    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ticketRef);
      if (!snap.exists) return { found: false };

      const ticket = snap.data() as any;

      // Backwards-compat: boolean flag or status field
      if (ticket.used === true || ticket.status === "used") {
        return { found: true, alreadyUsed: true, ticket };
      }

      let remaining =
        typeof ticket.remainingUses === "number" ? ticket.remainingUses : 1;
      if (remaining <= 0) return { found: true, alreadyUsed: true, ticket };

      const newRemaining = remaining - 1;
      const updates: any = { remainingUses: newRemaining };
      if (newRemaining <= 0) {
        updates.status = "used";
        updates.used = true;
        updates.usedAt = new Date();
      }

      tx.update(ticketRef, updates);

      return { found: true, alreadyUsed: false, ticket, newRemaining };
    });

    if (!result.found) {
      return NextResponse.json(
        { success: false, message: "🚫 Ticket not found" },
        { status: 404 }
      );
    }

    if (result.alreadyUsed) {
      return NextResponse.json({
        success: false,
        message: "⚠️ Ticket already used",
      });
    }

    const ticket = result.ticket || {};
    const remainingUses =
      typeof result.newRemaining === "number" ? result.newRemaining : undefined;

    return NextResponse.json({
      success: true,
      message: "✅ Ticket valid",
      buyerName: ticket.buyerName,
      tier: ticket.tier,
      remainingUses,
    });
  } catch (err) {
    console.error("validateTicket error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
