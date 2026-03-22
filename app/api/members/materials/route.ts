import { NextRequest, NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const materialsSnapshot = await adminFirestore
      .collection("rehearsal_materials")
      .orderBy("uploadDate", "desc")
      .get();

    const materials = materialsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      materials,
    });
  } catch (error: any) {
    console.error("Error fetching materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
}
