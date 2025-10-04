// app/api/create-test-applications/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const results = [];

    // Test Choir Application
    const choirApplication = {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@test.com",
      phone: "+2348012345678",
      dob: "1995-05-15",
      gender: "Female",
      address: "123 Music Street, Abuja",
      voicePart: "Soprano",
      readsMusic: "yes",
      choirExperience:
        "I have sung in church choir for 3 years and love contemporary gospel music.",
      instrument: "Piano (intermediate level)",
      preferredDays: ["Tuesday", "Saturday"],
      heardAboutUs: "Friend recommendation",
      availableForRehearsals: true,
      willingToPerform: true,
      photoConsent: true,
      declaration: true,
      submittedAt: serverTimestamp(),
    };

    const choirRef = await addDoc(
      collection(db, "join_choir"),
      choirApplication
    );
    results.push({ type: "choir", id: choirRef.id, status: "success" });

    // Test Volunteer Application
    const volunteerApplication = {
      fullName: "Michael Okafor",
      age: 28,
      gender: "Male",
      phone: "+2348087654321",
      email: "michael.okafor@test.com",
      area: "Event Coordination",
      availability: "Weekends and evenings",
      experience:
        "I have organized community events and love helping with logistics.",
      commitment: true,
      emergencyContact: "Sister - 08098765432",
      declaration: true,
      submittedAt: serverTimestamp(),
    };

    const volunteerRef = await addDoc(
      collection(db, "join_volunteer"),
      volunteerApplication
    );
    results.push({ type: "volunteer", id: volunteerRef.id, status: "success" });

    // Test Media Application
    const mediaApplication = {
      fullName: "Emily Chen",
      email: "emily.chen@test.com",
      phone: "+2348098765432",
      age: "26",
      occupation: "Freelance Photographer",
      address: "456 Creative Hub, Abuja",
      mediaSkills: ["Photography", "Video Editing"],
      experience:
        "Professional photographer for 4 years specializing in events.",
      equipment: "DSLR camera, editing software, lighting equipment",
      portfolio: "instagram.com/emily_shoots",
      availability: "Flexible, including weekends",
      willingToTravel: true,
      photoConsent: true,
      declaration: true,
      submittedAt: serverTimestamp(),
    };

    const mediaRef = await addDoc(
      collection(db, "join_media"),
      mediaApplication
    );
    results.push({ type: "media", id: mediaRef.id, status: "success" });

    // Test Tech Application
    const techApplication = {
      fullName: "David Adebayo",
      email: "david.adebayo@test.com",
      phone: "+2348076543210",
      age: "30",
      occupation: "Sound Engineer",
      address: "789 Tech Valley, Abuja",
      techSkills: ["Sound Engineering", "Audio Mixing"],
      experience: "8 years in live sound production for concerts and events.",
      equipment: "Mixing console, microphones, audio interfaces",
      certifications: "Audio Engineering Certificate",
      availability: "Weekends and selected weekdays",
      willingToTravel: true,
      photoConsent: true,
      declaration: true,
      submittedAt: serverTimestamp(),
    };

    const techRef = await addDoc(collection(db, "join_tech"), techApplication);
    results.push({ type: "tech", id: techRef.id, status: "success" });

    return NextResponse.json({
      success: true,
      message: "Test applications created successfully",
      results: results,
    });
  } catch (error) {
    console.error("Error creating test applications:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create test applications",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message:
      "POST to this endpoint to create test applications for all categories",
  });
}
