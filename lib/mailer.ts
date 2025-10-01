// lib/mailer.ts
import { Resend } from "resend";
import { formatCurrency } from "./formatCurrency";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY!);

const LOGO_URL = "https://thechorusabuja.org/images/chorus-ico.jpg";

// --------------------
// 🎟 Ticket Email
// --------------------
export async function sendTicketEmail({
  to,
  buyerName,
  tier,
  reference,
  pdfBuffer,
  ticketIndex,
}: {
  to: string;
  buyerName: string;
  tier: string;
  reference: string;
  pdfBuffer: Buffer;
  ticketIndex: number;
}) {
  const from = `The Chorus Tickets <tickets@thechorusabuja.org>`;

  try {
    await resend.emails.send({
      from,
      to,
      subject: `Your ${tier} Ticket 🎶`,
      text: `Dear ${buyerName || "Guest"},

Thank you for purchasing your ${tier} ticket to Handel’s Solomon – Live Performance.

Reference: ${reference}

Your ticket is attached as a PDF. Please present it at the entrance.
Diamond tickets admit 2 persons.

Event Details:
Date: November 16, 2025
Venue: Nigerian Society of Engineers Hall,
1012, Sani Abacha Way, CBD, Abuja

The Chorus Abuja
info@thechorusabuja.org
`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${LOGO_URL}" alt="The Chorus Abuja" style="width: 80px; height: 80px; border-radius: 12px;" />
          </div>
          <h2 style="color: #1d4ed8; text-align: center;">🎟 Your ${tier} Ticket</h2>
          <p>Dear ${buyerName || "Guest"},</p>
          <p>Thank you for purchasing your <strong>${tier}</strong> ticket. Your PDF ticket is attached.</p>
          <p><strong>Reference:</strong> ${reference}</p>
          <p>Please present the attached PDF at the entrance. Diamond tickets admit 2 persons.</p>
          <hr style="margin: 20px 0;"/>
          <p style="font-size: 13px; color: #777; text-align: center;">
            The Chorus Abuja · <a href="mailto:info@thechorusabuja.org" style="color: #1d4ed8;">info@thechorusabuja.org</a>
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `${tier}-ticket-${ticketIndex}.pdf`,
          content: pdfBuffer.toString("base64"),
        },
      ],
    });

    return { success: true };
  } catch (err: any) {
    console.error("❌ sendTicketEmail error:", err);
    return { success: false, error: err.message };
  }
}

// --------------------
// 💝 Donation Email
// --------------------
export async function sendDonationEmail({
  to,
  donorName,
  amount,
  reference,
}: {
  to: string;
  donorName?: string;
  amount: number;
  reference: string;
}) {
  const from = `The Chorus Donations <donations@thechorusabuja.org>`;

  try {
    await resend.emails.send({
      from,
      to,
      subject: "Thank You for Your Donation 💝",
      text: `Dear ${donorName || "Friend"},

We sincerely appreciate your generous donation of ₦${formatCurrency(amount)} to The Chorus Abuja.

Reference: ${reference}

Your support helps us bring inspiring music to life and continue our mission.

With gratitude,  
The Chorus Abuja
info@thechorusabuja.org
`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${LOGO_URL}" alt="The Chorus Abuja" style="width: 80px; height: 80px; border-radius: 12px;" />
          </div>
          <h2 style="color: #1d4ed8;">💝 Thank You for Your Donation</h2>
          <p>Dear ${donorName || "Friend"},</p>
          <p>We sincerely appreciate your generous donation of 
          <strong>₦${formatCurrency(amount)}</strong> to The Chorus Abuja.</p>
          <p><strong>Reference:</strong> ${reference}</p>
          <p>Your support helps us bring inspiring music to life and continue our mission.</p>
          <p style="margin-top: 20px;">With gratitude,<br>The Chorus Abuja</p>
          <hr style="margin: 20px 0;"/>
          <p style="font-size: 13px; color: #777; text-align: center;">
            Need help? Contact us at 
            <a href="mailto:info@thechorusabuja.org" style="color: #1d4ed8;">info@thechorusabuja.org</a>
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (err: any) {
    console.error("❌ sendDonationEmail error:", err);
    return { success: false, error: err.message };
  }
}
