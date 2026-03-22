import { NextRequest, NextResponse } from "next/server";
import { db as adminDb } from "@/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, eventName, name, email, phone, guests, newsletter } = body;

    // Validate required fields
    if (!eventId || !eventName || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Create RSVP document
    const rsvpData = {
      eventId,
      eventName,
      name,
      email,
      phone: phone || "",
      guests: guests || 1,
      newsletter: newsletter || false,
      timestamp: new Date().toISOString(),
      status: "confirmed",
    };

    // Save to Firestore
    const docRef = await adminDb.collection("event_rsvps").add(rsvpData);

    // If user opted in for newsletter, add to newsletter collection
    if (newsletter) {
      try {
        await adminDb.collection("newsletter").add({
          email,
          name,
          subscribedAt: new Date().toISOString(),
          source: `event-rsvp-${eventId}`,
          status: "active",
        });
      } catch (err) {
        // Newsletter subscription failure shouldn't block the RSVP
        console.error("Newsletter subscription failed:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "RSVP confirmed successfully",
        rsvpId: docRef.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing RSVP:", error);
    return NextResponse.json(
      { error: "Failed to process RSVP. Please try again." },
      { status: 500 },
    );
  }
}

// GET endpoint to retrieve RSVPs for an event (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 },
      );
    }

    const snapshot = await adminDb
      .collection("event_rsvps")
      .where("eventId", "==", eventId)
      .orderBy("timestamp", "desc")
      .get();

    const rsvps = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        success: true,
        count: rsvps.length,
        rsvps,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 },
    );
  }
}
