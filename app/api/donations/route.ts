// app/api/donations/route.ts
import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { sendDonationEmail } from "@/lib/mailer";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export async function POST(req: Request) {
  try {
    const { amount, email } = await req.json();

    if (!amount || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const reference = `DON-${Date.now()}`;

    // Save donation to Firestore
    await db.collection("donations").add({
      amount,
      email,
      reference,
      createdAt: new Date(),
    });

    // Send thank-you email
    await sendDonationEmail({
      to: email,
      amount,
      reference,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Donation route error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
