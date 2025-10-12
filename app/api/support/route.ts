import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { name, email, message, purpose, selectedTier } = await req.json();

    // Determine the recipient email based on the purpose
    let recipientEmail = "info@thechorusabuja.org"; // default

    if (purpose.toLowerCase().includes("sponsor")) {
      recipientEmail = "sponsorship@thechorusabuja.org";
    } else if (purpose.toLowerCase().includes("partner")) {
      recipientEmail = "partnerships@thechorusabuja.org";
    }

    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New ${purpose} Inquiry</h1>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e40af; margin-top: 0; font-size: 20px;">Contact Details</h2>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Name:</strong>
              <div style="color: #6b7280; font-size: 16px; margin-top: 5px;">${name}</div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Email:</strong>
              <div style="color: #6b7280; font-size: 16px; margin-top: 5px;">
                <a href="mailto:${email}" style="color: #1e40af; text-decoration: none;">${email}</a>
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Inquiry Type:</strong>
              <div style="color: #6b7280; font-size: 16px; margin-top: 5px;">${purpose}</div>
            </div>
            
            ${
              selectedTier
                ? `
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Selected Package:</strong>
              <div style="color: #6b7280; font-size: 16px; margin-top: 5px; background: #dbeafe; padding: 8px 12px; border-radius: 6px; border-left: 3px solid #1e40af;">
                <strong>${selectedTier}</strong>
              </div>
            </div>
            `
                : ""
            }
            
            <div>
              <strong style="color: #374151;">Message:</strong>
              <div style="color: #6b7280; font-size: 16px; margin-top: 10px; line-height: 1.6; background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #1e40af;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
            <p>This inquiry was submitted through The Chorus Abuja website.</p>
          </div>
        </div>
      </div>
    `;

    // Send email using Resend
    await resend.emails.send({
      from: "The Chorus Abuja <noreply@thechorusabuja.org>",
      to: recipientEmail,
      replyTo: email,
      subject: `New ${purpose} Inquiry from ${name}`,
      html: htmlContent,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
