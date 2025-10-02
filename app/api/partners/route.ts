import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";

export async function GET() {
  try {
    const snapshot = await db
      .collection("partners")
      .orderBy("createdAt", "desc")
      .get();

    const partners = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore timestamp to ISO string for frontend
        createdAt:
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, partners });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { success: false, message: "❌ Error fetching partners" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, logo, website } = await req.json();

    if (!name || !logo) {
      return NextResponse.json(
        { error: "Name and logo are required" },
        { status: 400 }
      );
    }

    // Save partner to Firestore
    const docRef = await db.collection("partners").add({
      name,
      logo,
      website: website || "",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Partner added successfully",
    });
  } catch (error) {
    console.error("❌ Partners route error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Partner ID is required" },
        { status: 400 }
      );
    }

    await db.collection("partners").doc(id).delete();

    return NextResponse.json({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete partner error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
