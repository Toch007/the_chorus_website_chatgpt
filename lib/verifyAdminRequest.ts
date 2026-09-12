import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebase-admin";

// Verifies the request's Bearer token belongs to an active admin.
// Returns the admin's email on success, or a ready-to-return NextResponse on failure.
export async function verifyAdminRequest(
  req: Request,
): Promise<{ email: string } | NextResponse> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  let email: string | undefined;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    email = decoded.email;
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!email) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const adminsSnapshot = await adminFirestore
    .collection("admins")
    .where("email", "==", email)
    .where("active", "==", true)
    .limit(1)
    .get();

  if (adminsSnapshot.empty) {
    return NextResponse.json(
      { error: "Forbidden - Admin access required" },
      { status: 403 },
    );
  }

  return { email };
}
