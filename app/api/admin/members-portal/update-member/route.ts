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

    const { uid, status } = await request.json();

    if (!uid || !status) {
      return NextResponse.json({ error: "Missing uid or status" }, { status: 400 });
    }

    // Update member status
    await adminFirestore.collection("member_accounts").doc(uid).update({
      status,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Member status updated" });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}
