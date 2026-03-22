import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token is valid
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Check if user is an admin
    const adminsSnapshot = await adminFirestore
      .collection("admins")
      .where("email", "==", decodedToken.email)
      .where("active", "==", true)
      .limit(1)
      .get();

    if (adminsSnapshot.empty) {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    const { title, content, priority, date, postedBy } = await request.json();

    if (!title || !content || !priority) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create announcement document
    await adminFirestore.collection("announcements").add({
      title,
      content,
      priority,
      date: date || new Date().toISOString(),
      postedBy: postedBy || "Admin",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Announcement posted successfully" });
  } catch (error) {
    console.error("Error posting announcement:", error);
    return NextResponse.json({ error: "Failed to post announcement" }, { status: 500 });
  }
}
