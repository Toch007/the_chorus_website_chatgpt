// lib/tickets.ts
import { db } from "@/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";
import { generateTicketPDF } from "./pdf";
import { sendTicketEmail } from "./mailer";

async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(`⚠️ Attempt ${attempt} failed:`, err);
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
  throw lastError;
}

export async function issueTickets({
  reference,
  buyerName,
  buyerEmail,
  cart,
}: {
  reference: string;
  buyerName: string;
  buyerEmail: string;
  cart: Record<string, number>;
}) {
  if (!reference || !buyerEmail || !cart) {
    throw new Error("Missing fields for issuing tickets");
  }

  for (const [tier, qty] of Object.entries(cart)) {
    const quantity = Number(qty);

    for (let i = 0; i < quantity; i++) {
      // Unique ticket ID
      const ticketId = `${reference}-${tier}-${i + 1}`;

      // Save ticket document in Firestore
      await db
        .collection("ticketPurchases")
        .doc(ticketId)
        .set({
          ticketId,
          reference,
          buyerName: buyerName || "Guest",
          buyerEmail,
          tier,
          status: "unused",
          remainingUses: tier === "Diamond" ? 2 : 1, // Diamond admits 2
          createdAt: Timestamp.now(),
        });

      // Generate PDF for this ticket
      const pdfBuffer = await generateTicketPDF(tier, ticketId, buyerName);

      // Email ticket with retries
      const result = await retry(
        () =>
          sendTicketEmail({
            to: buyerEmail,
            buyerName,
            tier,
            reference: ticketId,
            pdfBuffer,
            ticketIndex: i + 1,
          }),
        3,
        1500,
      );

      if (!(result as { success: boolean }).success) {
        throw new Error("Email sending failed");
      }
    }
  }

  return { success: true };
}
