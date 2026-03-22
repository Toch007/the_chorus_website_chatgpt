import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { cart, name, email } = await req.json();

    if (!cart || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const createdTickets: any[] = [];

    for (const [tier, qty] of Object.entries(cart)) {
      for (let i = 0; i < (qty as number); i++) {
        const ticketId = uuidv4();
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}`;

        await addDoc(collection(db, "tickets"), {
          ticketId,
          tier,
          buyerName: name,
          buyerEmail: email,
          status: "unused",
          qrCodeUrl,
          createdAt: new Date(),
        });

        createdTickets.push({ ticketId, tier, qrCodeUrl });
      }
    }

    return NextResponse.json({ success: true, tickets: createdTickets });
  } catch (err) {
    console.error("Test purchase error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
