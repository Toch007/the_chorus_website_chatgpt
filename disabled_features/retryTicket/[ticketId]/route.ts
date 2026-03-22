import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { Resend } from "resend";
import { generateTicketPDF } from "@/lib/pdf";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;

    const docRef = db.collection("tickets").doc(ticketId);
    const ticketSnap = await docRef.get();

    if (!ticketSnap.exists) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const { email, purchaserName, eventName, tier } = ticketSnap.data()!;

    // ✅ Generate PDF using the existing pdf-lib function
    const pdfBuffer = await generateTicketPDF(
      tier || "General", // fallback to "General" if no tier
      ticketId,
      purchaserName || "Guest"
    );

    // ✅ Resend the email
    const result = await resend.emails.send({
      from: "tickets@thechorusabuja.org",
      to: email,
      subject: `Your Ticket for ${eventName} (Retry)`,
      html: `<p>Hi ${purchaserName},</p>
             <p>We are resending your ticket as requested. Please find it attached.</p>`,
      attachments: [
        {
          filename: `${eventName}_ticket.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    // ✅ Update Firestore
    await docRef.update({
      emailStatus: result?.data?.id ? "SENT" : "FAILED",
      emailMessageId: result?.data?.id || null,
      retriedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      retried: true,
      emailStatus: result?.data?.id ? "SENT" : "FAILED",
    });
  } catch (error: any) {
    console.error("Error retrying ticket:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retry ticket" },
      { status: 500 }
    );
  }
}
