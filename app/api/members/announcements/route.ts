import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const announcementsSnapshot = await adminFirestore
      .collection("announcements")
      .orderBy("date", "desc")
      .get();

    const announcements = announcementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      announcements,
    });
  } catch (error: any) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}
