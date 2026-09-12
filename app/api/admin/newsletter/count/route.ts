// app/api/admin/newsletter/count/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { verifyAdminRequest } from "@/lib/verifyAdminRequest";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const auth = await verifyAdminRequest(req);
  if (auth instanceof NextResponse) return auth;

  try {

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
