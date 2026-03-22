import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ isAdmin: false }, { status: 400 });
    }

    // Check if email exists in admins collection
    const adminsSnapshot = await adminFirestore
      .collection("admins")
      .where("email", "==", email)
      .where("active", "==", true)
      .limit(1)
      .get();

    const isAdmin = !adminsSnapshot.empty;

    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Error verifying admin:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
