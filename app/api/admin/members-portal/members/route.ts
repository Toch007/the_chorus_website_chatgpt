import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
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

    // Fetch all member accounts
    const membersSnapshot = await adminFirestore.collection("member_accounts").orderBy("joinDate", "desc").get();
    
    const members = membersSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}
