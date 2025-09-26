import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import QRCode from "qrcode";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { buyerName, buyerEmail, cart }: { buyerName: string; buyerEmail: string; cart: Record<string, number> } =
      await req.json();

    if (!buyerName || !buyerEmail || !cart) {
      return NextResponse.json({ error: "Missing buyer info or cart" }, { status: 400 });
    }

    const ticketsCreated: any[] = [];

    // Generate one ticket per quantity
    for (const [tier, qty] of Object.entries(cart)) {
      for (let i = 0; i < qty; i++) {
        const ticketId = `${tier}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const qrData = { ticketId, tier, buyerName, buyerEmail };
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(qrData));

        const docRef = await addDoc(collection(db, "tickets"), {
          ticketId,
          tier,
          buyerName,
          buyerEmail,
          qrCodeUrl,
          status: "unused",
          createdAt: Timestamp.now(),
        });

        ticketsCreated.push({ ticketId, tier, qrCodeUrl });
      }
    }

    // Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email body
    const htmlTickets = ticketsCreated
      .map(
        (t) =>
          `<p><strong>Tier:</strong> ${t.tier}<br/><img src="${t.qrCodeUrl}" alt="QR Code" style="max-width:200px;"/></p>`
      )
      .join("<hr/>");

    await transporter.sendMail({
      from: `"The Chorus Abuja" <${process.env.SMTP_USER}>`,
      to: buyerEmail,
      subject: "Your Solomon Concert Tickets 🎟️",
      html: `<h2>Hi ${buyerName},</h2><p>Thank you for purchasing tickets. Here are your tickets:</p>${htmlTickets}`,
    });

    return NextResponse.json({ success: true, tickets: ticketsCreated });
  } catch (err: any) {
    console.error("Ticket creation error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
