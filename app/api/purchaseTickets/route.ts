import { NextResponse } from "next/server";
import axios from "axios";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "@/firebase/admin";
import { Resend } from "resend";
import { generateTicketPDF } from "@/lib/pdf";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { reference, buyerEmail, buyerName, cart } = await req.json();

    if (!reference || !buyerEmail || !cart) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Step 1: Verify Paystack payment
    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const verification = verifyRes.data;
    if (!verification.status || verification.data.status !== "success") {
      return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
    }

    // ✅ Step 2: Save ticket in Firestore
    const ticketDoc = {
      email: buyerEmail,
      buyerName: buyerName || "Guest",
      reference,
      cart,
      amount: verification.data.amount / 100,
      currency: verification.data.currency,
      status: "success",
      createdAt: Timestamp.now(),
    };
    await db.collection("tickets").doc(reference).set(ticketDoc);

    // ✅ Step 3: Generate & send PDF tickets via Resend
    for (const [tier, qty] of Object.entries(cart)) {
      const quantity = Number(qty);
      for (let i = 0; i < quantity; i++) {
        const pdfBuffer = await generateTicketPDF(tier, reference, buyerName || "Guest");

        await resend.emails.send({
          from: "The Chorus Abuja <tickets@thechorusabuja.org>",
          to: buyerEmail,
          subject: `Your ${tier} Ticket 🎶`,
          html: `<p>Hi ${buyerName || "Guest"},</p>
                 <p>Thanks for your purchase! Find your <strong>${tier}</strong> ticket attached.</p>
                 <p>Reference: <strong>${reference}</strong></p>`,
          attachments: [
            {
              filename: `${tier}-ticket-${i + 1}.pdf`,
              content: pdfBuffer.toString("base64"), // ✅ must be 'content'
            },
          ],
        });
      }
    }

    return NextResponse.json({ success: true, reference });
  } catch (err: any) {
    console.error("❌ Ticket purchase error:", err);
    return NextResponse.json({ error: err.message || "Purchase failed" }, { status: 500 });
  }
}
