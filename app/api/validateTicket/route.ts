import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ success: false, message: "❌ Invalid request – no ticketId" }, { status: 400 });
    }

    const docRef = doc(db, "ticketPurchases", ticketId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ success: false, message: "🚫 Ticket not found" }, { status: 404 });
    }

    const ticketData = docSnap.data();

    if (ticketData.status === "used") {
      return NextResponse.json({ success: false, message: "⚠️ Ticket already used" }, { status: 409 });
    }

    await updateDoc(docRef, { status: "used" });
    return NextResponse.json({ success: true, message: "✅ Valid Ticket – Access Granted" });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json({ success: false, message: "❌ Error validating ticket" }, { status: 500 });
  }
}
