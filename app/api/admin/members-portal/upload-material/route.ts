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

    const { title, description, category, fileUrl, fileType, uploadDate, uploadedBy } = await request.json();

    if (!title || !description || !category || !fileUrl || !fileType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create material document
    await adminFirestore.collection("rehearsal_materials").add({
      title,
      description,
      category,
      fileUrl,
      fileType,
      uploadDate: uploadDate || new Date().toISOString(),
      uploadedBy: uploadedBy || "Admin",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Material uploaded successfully" });
  } catch (error) {
    console.error("Error uploading material:", error);
    return NextResponse.json({ error: "Failed to upload material" }, { status: 500 });
  }
}
