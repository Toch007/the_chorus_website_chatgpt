// app/api/test-application/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    // Sample test application
    const testApplication = {
      fullName: "Test User",
      email: "test@example.com",
      phone: "+2348012345678",
      dob: "1995-05-15",
      gender: "Female",
      address: "123 Test Street, Abuja",
      voicePart: "Soprano",
      readsMusic: "yes",
      choirExperience: "I have experience singing in church choir for 2 years.",
      instrument: "Piano (basic level)",
      preferredDays: ["Tuesday", "Saturday"],
      heardAboutUs: "Website",
      availableForRehearsals: true,
      willingToPerform: true,
      photoConsent: true,
      declaration: true,
      submittedAt: serverTimestamp(),
    };

    // Add to choir applications collection
    const docRef = await addDoc(collection(db, "join_choir"), testApplication);

    return NextResponse.json({
      success: true,
      message: "Test application created successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error creating test application:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create test application",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "POST to this endpoint to create a test application",
  });
}
