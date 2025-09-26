import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateTicketPDF } from "@/lib/pdf";
import { db } from "@/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { reference, email, cart, buyerName } = await req.json();

    if (!reference || !email || !cart) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Save ticket info in Firestore
    const ticketDoc = {
      reference,
      email,
      buyerName: buyerName || "Guest",
      cart,
      createdAt: Timestamp.now(),
      emailStatus: "PENDING",
    };
    await db.collection("tickets").doc(reference).set(ticketDoc);

    // Send PDF tickets via Resend
    for (const [tier, qty] of Object.entries(cart)) {
      const quantity = Number(qty);
      for (let i = 0; i < quantity; i++) {
        const pdfBuffer = await generateTicketPDF(tier, reference, buyerName || "Guest");

        await resend.emails.send({
          from: "The Chorus Abuja <tickets@thechorusabuja.org>",
          to: email,
          subject: `Your ${tier} Ticket 🎶`,
          html: `<p>Dear ${buyerName || "Guest"},</p>
                 <p>Attached is your <strong>${tier}</strong> ticket for The Chorus Abuja event.</p>
                 <p>Reference: <strong>${reference}</strong></p>`,
          attachments: [
            {
              filename: `${tier}-ticket-${i + 1}.pdf`,
              content: pdfBuffer.toString("base64"), // ✅ correct for Resend
            },
          ],
        });
      }
    }

    await db.collection("tickets").doc(reference).update({ emailStatus: "SENT" });

    return NextResponse.json({ success: true, reference });
  } catch (err: any) {
    console.error("❌ Ticket generation error:", err);

    try {
      const body = await req.json();
      if (body.reference) {
        await db.collection("tickets").doc(body.reference).update({
          emailStatus: "FAILED",
        });
      }
    } catch {}

    return NextResponse.json(
      { error: err.message || "Ticket generation failed" },
      { status: 500 }
    );
  }
}
