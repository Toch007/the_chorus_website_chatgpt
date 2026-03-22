// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    // Check if email already exists in Firebase
    const subscribersRef = collection(db, "newsletterSubscribers");
    const q = query(subscribersRef, where("email", "==", email.toLowerCase()));
    const existingSubscribers = await getDocs(q);

    if (!existingSubscribers.empty) {
      const subscriber = existingSubscribers.docs[0];
      const subscriberData = subscriber.data();

      // If already subscribed
      if (subscriberData.status === "subscribed") {
        return NextResponse.json(
          { error: "This email is already subscribed to our newsletter" },
          { status: 400 }
        );
      }

      // If unsubscribed, resubscribe them
      if (subscriberData.status === "unsubscribed") {
        await updateDoc(doc(db, "newsletterSubscribers", subscriber.id), {
          status: "subscribed",
          resubscribedAt: new Date().toISOString(),
        });

        // Send welcome back email
        try {
          await resend.emails.send({
            from: "The Chorus Abuja <newsletter@thechorusabuja.org>",
            to: [email],
            subject: "Welcome Back to The Chorus Newsletter!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1e40af;">Welcome Back!</h2>
                <p>We're thrilled to have you back in our community. You'll now receive updates about our upcoming concerts, events, and exclusive content.</p>
                <p>Thank you for your continued support!</p>
                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                  If you wish to unsubscribe, <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}">click here</a>.
                </p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send welcome back email:", emailError);
        }

        return NextResponse.json({ message: "Successfully resubscribed!" });
      }
    }

    // New subscriber - add to Firebase
    await addDoc(collection(db, "newsletterSubscribers"), {
      email: email.toLowerCase(),
      status: "subscribed",
      subscribedAt: new Date().toISOString(),
    });

    // Send welcome email via Resend
    try {
      await resend.emails.send({
        from: "The Chorus Abuja <newsletter@thechorusabuja.org>",
        to: [email],
        subject: "Welcome to The Chorus Abuja Newsletter!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Welcome to The Chorus!</h2>
            <p>Thank you for subscribing to our newsletter. You'll receive updates about our concerts, events, and exclusive behind-the-scenes content.</p>
            <p>We're excited to have you as part of our community!</p>
            <p style="margin-top: 20px;">Stay tuned for amazing performances!</p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              You can unsubscribe at any time by <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}">clicking here</a>.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({ message: "Successfully subscribed" });
  } catch (error: any) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
