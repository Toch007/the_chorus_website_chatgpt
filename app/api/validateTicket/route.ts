// app/api/validateTicket/route.ts
import { db } from "@/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ticketId } = await req.json();

    const ticketRef = doc(db, "ticketPurchases", ticketId);
    const snapshot = await getDoc(ticketRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ status: "error", message: "🚫 Ticket not found" });
    }

    const ticket = snapshot.data();

    if (ticket.used) {
      return NextResponse.json({ status: "error", message: "⚠️ Ticket already used" });
    }

    await updateDoc(ticketRef, { used: true, usedAt: new Date() });

    return NextResponse.json({ status: "success", message: "✅ Ticket valid", ticket });
  } catch (err) {
    console.error("validateTicket error:", err);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
