import { NextRequest, NextResponse } from "next/server";
import { adminStorage, adminAuth } from "@/lib/firebase-admin";
// import { ImageProcessor } from "@/lib/imageProcessor"; // Temporarily disabled for deployment

interface UploadResponse {
  success: boolean;
  url: string;
  fileName: string;
  path: string;
  size: number;
  originalSize?: number;
  optimized?: boolean;
  variants?: {
    [key: string]: {
      url: string;
      path: string;
      size: number;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      console.log("Authenticated user:", decodedToken.email);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";
    const optimize = formData.get("optimize") === "true";
    const createVariants = formData.get("createVariants") === "true";
    const quality = parseInt(formData.get("quality") as string) || 85;
    const maxWidth = parseInt(formData.get("maxWidth") as string) || undefined;
    const maxHeight =
      parseInt(formData.get("maxHeight") as string) || undefined;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalSize = buffer.length;

    // Generate base filename components
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();

    const bucket = adminStorage.bucket();
    let finalBuffer = buffer;
    let finalContentType = file.type;
    let finalSize = originalSize;
    let isOptimized = false;

    // Image processing temporarily disabled for deployment compatibility
    // const isImage = file.type.startsWith("image/");
    // Image optimization will be re-enabled once deployment compatibility is resolved

    // Main file upload
    const extension = isOptimized ? "webp" : file.name.split(".").pop();
    const mainFileName = `${folder}/${timestamp}-${randomId}-${cleanName}.${extension}`;
    const mainFileUpload = bucket.file(mainFileName);

    await mainFileUpload.save(finalBuffer, {
      metadata: {
        contentType: finalContentType,
        metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
          optimized: isOptimized.toString(),
          originalSize: originalSize.toString(),
        },
      },
    });

    await mainFileUpload.makePublic();
    const mainPublicUrl = `https://storage.googleapis.com/${bucket.name}/${mainFileName}`;

    const response: UploadResponse = {
      success: true,
      url: mainPublicUrl,
      fileName: file.name,
      path: mainFileName,
      size: finalSize,
      originalSize: originalSize,
      optimized: isOptimized,
    };

    // Image variants creation temporarily disabled for deployment compatibility

    return NextResponse.json(response);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        { error: "File path required" },
        { status: 400 }
      );
    }

    // Delete from Firebase Storage using Admin SDK
    const bucket = adminStorage.bucket();
    await bucket.file(filePath).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        error: "Delete failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to list files
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "";

    // List files in folder
    const bucket = adminStorage.bucket();
    const [files] = await bucket.getFiles({
      prefix: folder,
      delimiter: "/",
    });

    const fileList = await Promise.all(
      files.map(async (file) => {
        const [metadata] = await file.getMetadata();
        return {
          name: file.name.split("/").pop(),
          fullPath: file.name,
          downloadURL: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
          size:
            typeof metadata.size === "string"
              ? parseInt(metadata.size)
              : metadata.size,
          contentType: metadata.contentType,
          timeCreated: metadata.timeCreated,
        };
      })
    );

    return NextResponse.json({ files: fileList });
  } catch (error) {
    console.error("List files error:", error);
    return NextResponse.json(
      {
        error: "Failed to list files",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
