// app/api/unsubscribe/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Find subscriber in Firebase
    const subscribersRef = collection(db, "newsletterSubscribers");
    const q = query(subscribersRef, where("email", "==", email.toLowerCase()));
    const existingSubscribers = await getDocs(q);

    if (existingSubscribers.empty) {
      return NextResponse.json(
        { error: "Email not found in our subscriber list" },
        { status: 404 }
      );
    }

    // Update status to unsubscribed
    const subscriber = existingSubscribers.docs[0];
    await updateDoc(doc(db, "newsletterSubscribers", subscriber.id), {
      status: "unsubscribed",
      unsubscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
    });
  } catch (error: any) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again." },
      { status: 500 }
    );
  }
}

// GET method for unsubscribe links in emails
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter required" },
        { status: 400 }
      );
    }

    // Find and unsubscribe
    const subscribersRef = collection(db, "newsletterSubscribers");
    const q = query(subscribersRef, where("email", "==", email.toLowerCase()));
    const existingSubscribers = await getDocs(q);

    if (existingSubscribers.empty) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const subscriber = existingSubscribers.docs[0];
    await updateDoc(doc(db, "newsletterSubscribers", subscriber.id), {
      status: "unsubscribed",
      unsubscribedAt: new Date().toISOString(),
    });

    // Redirect to unsubscribe confirmation page
    return NextResponse.redirect(new URL("/unsubscribe?success=true", req.url));
  } catch (error: any) {
    console.error("Unsubscribe error:", error);
    return NextResponse.redirect(
      new URL("/unsubscribe?success=false", req.url)
    );
  }
}
