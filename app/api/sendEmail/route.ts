// app/api/sendEmail/route.ts
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "The Chorus Abuja <tickets@thechorusabuja.org>",
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resend Email Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Email failed" }, { status: 500 });
  }
}
