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
      subject: `Your ${tier} Ticket — Mendelssohn's Paul 🎶`,
      text: `Dear ${buyerName || "Guest"},

Thank you for purchasing your ${tier} ticket to Mendelssohn's Paul — The Chorus Abuja 5th Anniversary Grand Concert.

Ticket Reference: ${reference}

Your ticket is attached as a PDF. Please present it at the entrance (printed or on your phone).
Diamond tickets admit 2 persons.

Event Details:
Date: Sunday, September 13, 2026
Doors Open: 4:00 PM | Concert Starts: 5:00 PM
Venue: NUC Auditorium, Muhammadu Buhari Way,
Maitama, Abuja, FCT

We look forward to sharing this special evening with you.

With warm regards,
The Chorus Abuja
info@thechorusabuja.org
`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${LOGO_URL}" alt="The Chorus Abuja" style="width: 80px; height: 80px; border-radius: 12px;" />
          </div>
          <h2 style="color: #1d4ed8; text-align: center;">🎟 Your ${tier} Ticket — Mendelssohn's Paul</h2>
          <p style="font-size: 16px;">Dear <strong>${buyerName || "Guest"}</strong>,</p>
          <p>Thank you for joining us for <strong>Mendelssohn's Paul (Paulus, Op. 36)</strong> — our 5th Anniversary Grand Concert. We are delighted to have you with us for this special milestone.</p>
          <p>Your <strong>${tier}</strong> ticket (attached as PDF) grants you entry. Please present it at the entrance — printed or on your phone.</p>
          <div style="background: #eff6ff; border-left: 4px solid #1d4ed8; padding: 14px 18px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #555;">Ticket Reference</p>
            <p style="margin: 0; font-size: 15px; font-weight: bold; color: #1d4ed8; font-family: monospace;">${reference}</p>
          </div>
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #166534;">📅 Event Details</p>
            <p style="margin: 3px 0; font-size: 14px;"><strong>Date:</strong> Sunday, September 13, 2026</p>
            <p style="margin: 3px 0; font-size: 14px;"><strong>Doors Open:</strong> 4:00 PM &nbsp;|&nbsp; <strong>Concert:</strong> 5:00 PM</p>
            <p style="margin: 3px 0; font-size: 14px;"><strong>Venue:</strong> NUC Auditorium, Muhammadu Buhari Way, Maitama, Abuja</p>
          </div>
          ${tier === "Diamond" ? "<p style='background:#fef9c3;padding:10px 14px;border-radius:6px;font-size:13px;color:#713f12;border:1px solid #fde68a;'>⭐ Your <strong>Diamond</strong> ticket admits <strong>2 persons</strong>.</p>" : ""}
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
