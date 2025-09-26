import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import QRCode from "qrcode";
import { Resend } from "resend";
import { Readable } from "stream";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(
  req: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const ticketId = params.ticketId;

    const docRef = db.collection("tickets").doc(ticketId);
    const ticketSnap = await docRef.get();

    if (!ticketSnap.exists) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const { email, purchaserName, eventName } = ticketSnap.data()!;

    // ✅ Regenerate QR Code
    const qrCode = await QRCode.toDataURL(ticketId);

    // ✅ Generate PDF again
    const pdfkit = await import("pdfkit");
    const getStream = (await import("get-stream")).default;
    const doc = new pdfkit.default();

    doc.fontSize(20).text(`${eventName} Ticket`, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${purchaserName}`);
    doc.text(`Email: ${email}`);
    doc.text(`Ticket ID: ${ticketId}`);
    doc.moveDown();
    doc.image(Buffer.from(qrCode.split(",")[1], "base64"), {
      fit: [150, 150],
      align: "center",
      valign: "center",
    });

    const stream = doc as unknown as Readable;
    const pdfBuffer = await getStream.buffer(stream);

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
