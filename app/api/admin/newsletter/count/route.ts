// app/api/admin/newsletter/count/route.ts
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

    // Count active subscribers using Admin SDK
    const subscribersSnap = await db.collection("newsletterSubscribers").get();

    const activeSubscribers = subscribersSnap.docs.filter((doc) => {
      const status = doc.data().status;
      return !status || status === "subscribed";
    }).length;

    return NextResponse.json({
      success: true,
      count: activeSubscribers,
      total: subscribersSnap.size,
    });
  } catch (error: any) {
    console.error("Error counting subscribers:", error);
    return NextResponse.json(
      { error: error.message || "Failed to count subscribers" },
      { status: 500 }
    );
  }
}
