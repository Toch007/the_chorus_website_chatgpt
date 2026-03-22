import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    console.log("API: Starting member account creation...");
    
    const body = await request.json();
    const { uid, fullName, email, voicePart, phone } = body;

    console.log("API: Received data:", { uid, email, voicePart });

    if (!uid || !fullName || !email || !voicePart || !phone) {
      console.error("API: Missing required fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create member account document in Firestore with timeout protection
    console.log("API: Creating Firestore document...");
    
    const createPromise = adminFirestore.collection("member_accounts").doc(uid).set({
      uid,
      fullName,
      email,
      voicePart,
      phone,
      status: "pending", // pending, approved, rejected, inactive
      joinDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      lastLogin: null,
      attendanceRate: 0,
      role: "member", // member, admin
    });

    // Add timeout to Firestore operation
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout')), 7000)
    );

    await Promise.race([createPromise, timeoutPromise]);
    
    console.log("API: Member account created successfully");

    return NextResponse.json({
      success: true,
      message: "Member account created successfully",
    });
  } catch (error: any) {
    console.error("API: Error creating member account:", error);
    
    if (error.message === 'Firestore timeout') {
      return NextResponse.json(
        { error: "Database operation timeout. Please try again." },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create member account", details: error.message },
      { status: 500 }
    );
  }
}
