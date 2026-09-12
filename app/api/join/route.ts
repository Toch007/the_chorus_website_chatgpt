// app/api/join/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { resend } from "@/lib/resend";
import { emailTemplates } from "@/lib/emailTemplates";
import {
  isHoneypotTripped,
  isSubmittedTooFast,
  isRateLimited,
  getClientIp,
} from "@/lib/antiSpam";

const COLLECTIONS: Record<string, string> = {
  choir: "join_choir",
  volunteer: "join_volunteer",
  media: "join_media",
  tech: "join_tech",
};

export async function POST(req: Request) {
  try {
    const { formType, data, honeypot, formLoadedAt } = await req.json();

    const collectionName = COLLECTIONS[formType];
    if (!collectionName || !data?.email || !data?.fullName) {
      return NextResponse.json(
        { success: false, error: "Invalid submission" },
        { status: 400 },
      );
    }

    // Bots: pretend success without writing anything, so they don't adapt.
    if (isHoneypotTripped(honeypot) || isSubmittedTooFast(formLoadedAt)) {
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(req);
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submissions from this network. Please try again later.",
        },
        { status: 429 },
      );
    }

    await db.collection(collectionName).add({
      ...data,
      submittedAt: new Date(),
    });

    // Best-effort auto-reply; a failure here shouldn't fail the submission.
    try {
      const template = emailTemplates[formType];
      const html = template.getHtml(data.fullName, {
        voicePart: data.voicePart,
        skills: data.mediaSkills || data.techSkills,
      });
      await resend.emails.send({
        from: "The Chorus Abuja <tickets@thechorusabuja.org>",
        to: data.email,
        subject: template.subject,
        html,
      });
    } catch (emailError) {
      console.error("Auto-reply email failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Join submission error:", err);
    return NextResponse.json(
      { success: false, error: "Submission failed" },
      { status: 500 },
    );
  }
}
