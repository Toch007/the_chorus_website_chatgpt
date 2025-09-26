// app/api/verifyPayment/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const { reference, email, cart, totalAmount } = await req.json();

    // ✅ Verify with Paystack
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return NextResponse.json({ success: false, error: "Payment not verified" }, { status: 400 });
    }

    // ✅ Save purchase to Firestore
    const docRef = await addDoc(collection(db, "ticketPurchases"), {
      email,
      cart,
      totalAmount,
      reference,
      status: "paid",
      createdAt: serverTimestamp(),
    });

    const ticketId = docRef.id;

    // ✅ Generate QR Code (as Base64)
    const qrCodeData = await QRCode.toDataURL(
      JSON.stringify({
        ticketId,
        email,
        event: "Solomon – A Choral Experience",
        date: "2025-11-16",
      })
    );

    // ✅ Send confirmation email with QR Code
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "🎟️ Your Solomon Concert Ticket",
        html: `
          <h2>Thank you for your purchase!</h2>
          <p>You’ve successfully booked <strong>${Object.entries(cart)
            .map(([k, v]) => `${v} x ${k}`)
            .join(", ")}</strong> for <strong>Solomon – A Choral Experience</strong>.</p>
          <p><strong>Total Paid:</strong> ₦${totalAmount.toLocaleString()}</p>
          <p>📅 Date: November 16, 2025</p>
          <p>📍 Venue: Nigerian Society of Engineers Hall, Abuja</p>
          <br/>
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
          <p>Please show this QR code at the entrance for validation:</p>
          <br/>
          <img src="${qrCodeData}" alt="Ticket QR Code" />
          <br/>
          <p>Ref: ${reference}</p>
        `,
      }),
    });

    return NextResponse.json({ success: true, ticketId });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
