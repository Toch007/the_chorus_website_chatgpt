import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    console.log("API: Checking member status...");
    
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");

    if (!uid) {
      console.error("API: UID not provided");
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    console.log("API: Fetching member document for UID:", uid);

    // Get member doc with timeout protection
    const getPromise = adminFirestore
      .collection("member_accounts")
      .doc(uid)
      .get();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout')), 7000)
    );

    const memberDoc = await Promise.race([getPromise, timeoutPromise]) as any;

    if (!memberDoc.exists) {
      console.log("API: Member document not found");
      return NextResponse.json({
        exists: false,
        status: null,
      });
    }

    const data = memberDoc.data();
    console.log("API: Member found with status:", data?.status);

    // Update last login time (non-blocking)
    adminFirestore.collection("member_accounts").doc(uid).update({
      lastLogin: new Date().toISOString(),
    }).catch(err => console.error("Failed to update last login:", err));

    return NextResponse.json({
      exists: true,
      status: data?.status || "pending",
      memberData: data,
    });
  } catch (error: any) {
    console.error("API: Error checking member status:", error);
    
    if (error.message === 'Firestore timeout') {
      return NextResponse.json(
        { error: "Database operation timeout. Please try again." },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to check member status", details: error.message },
      { status: 500 }
    );
  }
}
