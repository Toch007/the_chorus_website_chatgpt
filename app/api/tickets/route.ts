// app/api/admin/tickets/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = db.collection("tickets").orderBy("createdAt", "desc");
    if (status) {
      query = query.where("emailStatus", "==", status);
    }

    const snapshot = await query.get();
    const tickets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ tickets });
  } catch (err) {
    console.error("Error fetching tickets:", err);
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { ticketId } = await req.json();
    if (!ticketId) {
      return NextResponse.json({ error: "ticketId required" }, { status: 400 });
    }

    // Grab ticket doc
    const ref = db.collection("tickets").doc(ticketId);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const ticket = snap.data();

    // 🔁 Re-trigger email sending via /api/generateTicket
    const resendRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generateTicket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ticket?.email,
        reference: ticket?.reference,
        cart: ticket?.cart,
      }),
    });

    if (!resendRes.ok) {
      return NextResponse.json({ success: false, error: "Resend failed" }, { status: 500 });
    }

    // Update Firestore status
    await ref.update({ emailStatus: "SENT" });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Retry error:", err);
    return NextResponse.json({ error: "Retry failed" }, { status: 500 });
  }
}
