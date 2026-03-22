// app/api/admin/messaging/send/route.ts
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { adminAuth } from "@/lib/firebase-admin";
import { db } from "@/firebase/admin";

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

    const {
      from,
      recipientGroup,
      customEmails,
      singleEmail,
      subject,
      content,
      isHtml,
    } = await req.json();

    if (!from || !subject || !content) {
      return NextResponse.json(
        { error: "From, subject, and content are required" },
        { status: 400 }
      );
    }

    let recipients: string[] = [];

    // Get recipients based on group
    if (recipientGroup === "single") {
      if (!singleEmail) {
        return NextResponse.json(
          { error: "Single email is required" },
          { status: 400 }
        );
      }
      recipients = [singleEmail];
    } else if (recipientGroup === "custom") {
      if (!customEmails) {
        return NextResponse.json(
          { error: "Custom emails are required" },
          { status: 400 }
        );
      }
      recipients = customEmails
        .split(",")
        .map((email: string) => email.trim())
        .filter((email: string) => email.includes("@"));
    } else {
      // Fetch from database
      let snapshot;

      switch (recipientGroup) {
        case "newsletter":
          snapshot = await db.collection("newsletterSubscribers").get();
          recipients = snapshot.docs
            .filter((doc) => {
              const status = doc.data().status;
              return !status || status === "subscribed";
            })
            .map((doc) => doc.data().email);
          break;

        case "members":
          snapshot = await db.collection("members").get();
          recipients = snapshot.docs.map((doc) => doc.data().email);
          break;

        case "choir":
          snapshot = await db.collection("join_choir").get();
          recipients = snapshot.docs.map((doc) => doc.data().email);
          break;

        case "volunteer":
          snapshot = await db.collection("join_volunteer").get();
          recipients = snapshot.docs.map((doc) => doc.data().email);
          break;

        case "media":
          snapshot = await db.collection("join_media").get();
          recipients = snapshot.docs.map((doc) => doc.data().email);
          break;

        case "tech":
          snapshot = await db.collection("join_tech").get();
          recipients = snapshot.docs.map((doc) => doc.data().email);
          break;

        default:
          return NextResponse.json(
            { error: "Invalid recipient group" },
            { status: 400 }
          );
      }
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients found" },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = isHtml
      ? content
      : `<p>${content.replace(/\n/g, "<br>")}</p>`;

    // Send emails in batches
    const BATCH_SIZE = 100;
    let sentCount = 0;
    const errors: any[] = [];

    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const batch = recipients.slice(i, i + BATCH_SIZE);

      try {
        for (const recipientEmail of batch) {
          // Add unsubscribe footer for newsletter group
          let finalContent = emailContent;
          if (recipientGroup === "newsletter") {
            const baseUrl =
              process.env.NEXT_PUBLIC_BASE_URL || "https://thechorusabuja.com";
            const unsubscribeFooter = `
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center;">
                <p>You're receiving this email because you subscribed to The Chorus Abuja newsletter.</p>
                <p style="margin-top: 10px;">
                  <a href="${baseUrl}/unsubscribe?email=${encodeURIComponent(recipientEmail)}" style="color: #3b82f6; text-decoration: none;">Unsubscribe</a>
                </p>
              </div>
            `;
            finalContent = emailContent + unsubscribeFooter;
          }

          await resend.emails.send({
            from: `The Chorus Abuja <${from}>`,
            to: [recipientEmail],
            subject: subject,
            html: finalContent,
          });
          sentCount++;
        }
      } catch (error: any) {
        errors.push({
          batch: batch.length,
          error: error.message,
        });
      }

      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalRecipients: recipients.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Messaging send error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send emails" },
      { status: 500 }
    );
  }
}
