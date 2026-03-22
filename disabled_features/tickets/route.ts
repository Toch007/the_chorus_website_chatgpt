// app/api/admin/tickets/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    // Query the correct collection name
    let query = db.collection("ticketPurchases").orderBy("createdAt", "desc");
    if (status) {
      query = query.where("emailStatus", "==", status);
    }

    const snapshot = await query.get();
    const tickets = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Map the ticket purchase fields to expected admin interface fields
        eventName: "Solomon Concert", // Default event name since tickets don't store this
        purchaserName: data.buyerName || "Unknown",
        email: data.buyerEmail || "",
        emailStatus: data.emailStatus || "SUCCESS", // Default to SUCCESS if not specified
        createdAt:
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        // Keep original fields
        tier: data.tier,
        status: data.status,
        reference: data.reference,
      };
    });

    return NextResponse.json({ tickets });
  } catch (err) {
    console.error("Error fetching tickets:", err);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { ticketId } = await req.json();
    if (!ticketId) {
      return NextResponse.json({ error: "ticketId required" }, { status: 400 });
    }

    // Grab ticket doc from correct collection
    const ref = db.collection("ticketPurchases").doc(ticketId);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const ticket = snap.data();

    // For retry, we need to re-send the email using the ticket library
    try {
      // Import and use the ticket generation functions
      const { generateTicketPDF } = await import("@/lib/pdf");
      const { sendTicketEmail } = await import("@/lib/mailer");

      // Generate PDF for this ticket
      const pdfBuffer = await generateTicketPDF(
        ticket?.tier || "Standard",
        ticketId,
        ticket?.buyerName || "Guest"
      );

      // Re-send email
      const result = await sendTicketEmail({
        to: ticket?.buyerEmail || "",
        buyerName: ticket?.buyerName || "Guest",
        tier: ticket?.tier || "Standard",
        reference: ticketId,
        pdfBuffer,
        ticketIndex: 1,
      });

      if (result.success) {
        // Update Firestore status to SUCCESS
        await ref.update({ emailStatus: "SUCCESS" });
        return NextResponse.json({ success: true });
      } else {
        // Update Firestore status to FAILED
        await ref.update({ emailStatus: "FAILED" });
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }
    } catch (emailError) {
      console.error("Email resend error:", emailError);
      // Update Firestore status to FAILED
      await ref.update({ emailStatus: "FAILED" });
      return NextResponse.json(
        { success: false, error: "Email resend failed" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Retry error:", err);
    return NextResponse.json({ error: "Retry failed" }, { status: 500 });
  }
}
