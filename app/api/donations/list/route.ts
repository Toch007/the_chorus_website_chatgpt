import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";

export async function GET() {
  try {
    const snapshot = await db
      .collection("donations")
      .orderBy("createdAt", "desc")
      .get();

    const donations = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure name field exists for older donations
        name: data.name || "Anonymous",
        // Convert Firestore timestamp to ISO string for frontend
        createdAt:
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, donations });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { success: false, message: "❌ Error fetching donations" },
      { status: 500 }
    );
  }
}
