import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";

export async function GET() {
  try {
    // Fetch all collections in parallel
    const [
      membersSnap,
      eventsSnap,
      subscribersSnap,
      choirAppsSnap,
      volunteerAppsSnap,
      mediaAppsSnap,
      techAppsSnap,
      blogSnap,
      donationsSnap,
      partnersSnap,
    ] = await Promise.all([
      db.collection("members").get(),
      db.collection("events").get(),
      db.collection("newsletterSubscribers").get(),
      db.collection("join_choir").get(),
      db.collection("join_volunteer").get(),
      db.collection("join_media").get(),
      db.collection("join_tech").get(),
      db.collection("posts").get(),
      db.collection("donations").get(),
      db.collection("partners").get(),
    ]);

    // Calculate recent events (this month)
    const currentMonth = new Date().toISOString().slice(0, 7);
    const recentEvents = eventsSnap.docs.filter((doc) => {
      const eventDate = doc.data().date;
      return eventDate && eventDate.startsWith(currentMonth);
    }).length;

    const stats = {
      totalMembers: membersSnap.size,
      totalEvents: eventsSnap.size,
      newsletterSubscribers: subscribersSnap.size,
      pendingApplications:
        choirAppsSnap.size +
        volunteerAppsSnap.size +
        mediaAppsSnap.size +
        techAppsSnap.size,
      recentEvents,
      blogPosts: blogSnap.size,
      totalDonations: donationsSnap.size,
      totalPartners: partnersSnap.size,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: "❌ Error fetching dashboard stats" },
      { status: 500 }
    );
  }
}
