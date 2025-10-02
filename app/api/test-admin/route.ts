import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminStorage } from "@/lib/firebase-admin";

export async function GET() {
  try {
    // Test Firebase Admin authentication
    console.log("Testing Firebase Admin setup...");

    // Test storage access
    const bucket = adminStorage.bucket();
    console.log("Storage bucket name:", bucket.name);

    // Test auth (just check if it's initialized)
    const app = adminAuth.app;
    console.log("Auth app project ID:", app.options.projectId);

    return NextResponse.json({
      success: true,
      message: "Firebase Admin SDK is properly configured",
      projectId: app.options.projectId,
      storageBucket: bucket.name,
    });
  } catch (error) {
    console.error("Firebase Admin test failed:", error);
    return NextResponse.json(
      {
        error: "Firebase Admin setup failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
