// app/api/feedback/route.ts
import { NextResponse } from "next/server";
import { db as clientDb } from "@/firebase/config";
import { db as adminDb } from "@/firebase/admin";
import { collection, addDoc } from "firebase/firestore";

// Disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

// POST - Submit new feedback (public - uses Client SDK)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, rating, message, eventName } = body;

    // Validation
    if (!name || !email || !rating || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Save to Firebase
    const feedbackData = {
      name,
      email,
      rating: Number(rating),
      message,
      eventName: eventName || null,
      submittedAt: new Date().toISOString(),
      status: "new", // new, reviewed, archived
    };

    const docRef = await addDoc(collection(clientDb, "feedback"), feedbackData);

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
      id: docRef.id,
    });
  } catch (error: any) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}

// GET - Fetch all feedback (admin - uses Admin SDK to bypass permissions)
export async function GET(req: Request) {
  try {
    const snapshot = await adminDb
      .collection("feedback")
      .orderBy("submittedAt", "desc")
      .get();

    const feedback = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      feedback,
      count: feedback.length,
    });
  } catch (error: any) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

// DELETE - Remove feedback (admin - uses Admin SDK)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Feedback ID is required" },
        { status: 400 }
      );
    }

    await adminDb.collection("feedback").doc(id).delete();

    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { error: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}
