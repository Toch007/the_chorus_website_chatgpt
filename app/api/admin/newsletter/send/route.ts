// app/api/admin/newsletter/send/route.ts
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    // Verify admin authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    try {
      await adminAuth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { subject, htmlContent, testMode, testEmail } = await req.json();

    if (!subject || !htmlContent) {
      return NextResponse.json(
        { error: "Subject and content are required" },
        { status: 400 }
      );
    }

    // Test mode - send to test email only
    if (testMode && testEmail) {
      try {
        console.log("Sending test email to:", testEmail);
        console.log("Subject:", subject);

        const testResult = await resend.emails.send({
          from: "The Chorus Abuja <newsletter@thechorusabuja.org>",
          to: [testEmail],
          subject: `[TEST] ${subject}`,
          html: htmlContent,
        });

        console.log("Resend response:", testResult);

        if (testResult.error) {
          console.error("Resend error:", testResult.error);
          return NextResponse.json(
            {
              success: false,
              error: testResult.error.message || "Failed to send test email",
            },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          testMode: true,
          messageId: testResult.data?.id,
          message: `Test email sent to ${testEmail}`,
        });
      } catch (error: any) {
        console.error("Test email error:", error);
        return NextResponse.json(
          {
            success: false,
            error: error.message || "Failed to send test email",
          },
          { status: 500 }
        );
      }
    }

    // Production mode - get all subscribers from Firebase using Admin SDK
    const { db } = await import("@/firebase/admin");

    const subscribersSnap = await db.collection("newsletterSubscribers").get(); // Filter for active subscribers only
    const subscribers = subscribersSnap.docs
      .filter((doc) => {
        const status = doc.data().status;
        return !status || status === "subscribed";
      })
      .map((doc) => doc.data().email);

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: "No subscribers found" },
        { status: 400 }
      );
    }

    // Send emails in batches to avoid rate limits
    const BATCH_SIZE = 100;
    const batches = [];

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);
      batches.push(batch);
    }

    let sentCount = 0;
    const errors = [];

    // Add unsubscribe footer to HTML content
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://thechorusabuja.com";
    const unsubscribeFooter = `
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center;">
        <p>You're receiving this email because you subscribed to The Chorus Abuja newsletter.</p>
        <p style="margin-top: 10px;">
          <a href="${baseUrl}/unsubscribe?email={{recipient_email}}" style="color: #3b82f6; text-decoration: none;">Unsubscribe</a>
          | <a href="${baseUrl}" style="color: #3b82f6; text-decoration: none;">Visit our website</a>
        </p>
      </div>
    `;

    const emailContent = htmlContent + unsubscribeFooter;

    for (const batch of batches) {
      try {
        // Send individual emails to each subscriber (required for personalized unsubscribe links)
        for (const subscriberEmail of batch) {
          const personalizedContent = emailContent.replace(
            /\{\{recipient_email\}\}/g,
            encodeURIComponent(subscriberEmail)
          );

          await resend.emails.send({
            from: "The Chorus Abuja <newsletter@thechorusabuja.org>",
            to: [subscriberEmail],
            subject: subject,
            html: personalizedContent,
          });
          sentCount++;
        }
      } catch (error: any) {
        errors.push({
          batch: batch.length,
          error: error.message,
        });
      }

      // Small delay between batches to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalSubscribers: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Newsletter send error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send newsletter" },
      { status: 500 }
    );
  }
}
