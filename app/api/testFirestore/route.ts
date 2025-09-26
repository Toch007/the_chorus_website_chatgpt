import { NextResponse } from "next/server";
import { db } from "@/firebase/admin"; // Firestore from admin SDK

export async function GET() {
  try {
    const docRef = db.collection("test").doc("ping");
    await docRef.set({ timestamp: new Date().toISOString() });

    const doc = await docRef.get();
    return NextResponse.json({ success: true, data: doc.data() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
