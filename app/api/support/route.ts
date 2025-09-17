import { NextResponse } from "next/server";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, purpose } = await req.json();

    // 1. Configure transporter
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER, // your SMTP username
        pass: process.env.SMTP_PASS, // your SMTP password
      },
    });

    // 2. Define mail options
    const mailOptions: SendMailOptions = {
      from: `"${name}" <${email}>`, // sender info
      to: "info@thechorusabuja.org", // your official mailbox
      subject: `New ${purpose} Support Inquiry`,
      text: message,
      html: `
        <h2>New Support Request: ${purpose}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

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
