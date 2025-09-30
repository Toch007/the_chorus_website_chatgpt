import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function GET() {
  try {
    const donationsRef = collection(db, "donations");
    const q = query(donationsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const donations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, donations });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { success: false, message: "❌ Error fetching donations" },
      { status: 500 }
    );
  }
}
