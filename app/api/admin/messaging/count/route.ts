// app/api/admin/messaging/count/route.ts
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { db } from "@/firebase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    // Verify admin authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    try {
      await adminAuth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const group = searchParams.get("group");

    let count = 0;

    switch (group) {
      case "newsletter":
        const subscribersSnap = await db
          .collection("newsletterSubscribers")
          .get();
        count = subscribersSnap.docs.filter((doc) => {
          const status = doc.data().status;
          return !status || status === "subscribed";
        }).length;
        break;

      case "members":
        const membersSnap = await db.collection("members").get();
        count = membersSnap.size;
        break;

      case "choir":
        const choirSnap = await db.collection("join_choir").get();
        count = choirSnap.size;
        break;

      case "volunteer":
        const volunteerSnap = await db.collection("join_volunteer").get();
        count = volunteerSnap.size;
        break;

      case "media":
        const mediaSnap = await db.collection("join_media").get();
        count = mediaSnap.size;
        break;

      case "tech":
        const techSnap = await db.collection("join_tech").get();
        count = techSnap.size;
        break;

      default:
        count = 0;
    }

    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error("Error counting recipients:", error);
    return NextResponse.json(
      { error: error.message || "Failed to count recipients" },
      { status: 500 }
    );
  }
}
