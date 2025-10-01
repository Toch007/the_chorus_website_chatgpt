import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email notification to admin
    const adminEmailResult = await resend.emails.send({
      from: "The Chorus Contact Form <noreply@thechorusabuja.com>",
      to: ["info@thechorusabuja.org"], // Replace with actual admin email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
            <p>This email was sent from the contact form on The Chorus Abuja website.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "The Chorus Abuja <noreply@thechorusabuja.com>",
      to: [email],
      subject: "Thank you for contacting The Chorus Abuja",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background-color: #1e40af; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">The Chorus Abuja</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for reaching out!</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">
              Dear ${name},
            </p>
            
            <p style="color: #475569; line-height: 1.6;">
              Thank you for contacting The Chorus Abuja! We have received your message and will get back to you within 24 hours.
            </p>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="color: #64748b; font-style: italic;">"${message.substring(0, 100)}${message.length > 100 ? "..." : ""}"</p>
            </div>
            
            <p style="color: #475569; line-height: 1.6;">
              In the meantime, feel free to explore our website to learn more about our upcoming events, join our choir family, or support our mission.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://thechorusabuja.com" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visit Our Website
              </a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              Best regards,<br>
              <strong>The Chorus Abuja Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
            <p>Follow us on social media for updates and announcements!</p>
            <p>© 2024 The Chorus Abuja. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    // Log results for debugging (remove in production)
    console.log("Admin email result:", adminEmailResult);
    console.log("User email result:", userEmailResult);

    return NextResponse.json(
      {
        message: "Message sent successfully",
        adminEmailId: adminEmailResult.data?.id,
        userEmailId: userEmailResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
