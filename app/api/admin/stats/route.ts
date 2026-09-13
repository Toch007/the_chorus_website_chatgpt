import { NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { verifyAdminRequest } from "@/lib/verifyAdminRequest";

// Disable caching for real-time stats
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const auth = await verifyAdminRequest(req);
  if (auth instanceof NextResponse) return auth;

  try {
    // Fetch all collections in parallel. Count-only collections use
    // .count().get() (aggregation query) instead of .get() so we're not
    // billed for every document — critical for join_* collections which
    // can accumulate thousands of spam submissions.
    const [
      membersCount,
      eventsSnap,
      subscribersSnap,
      choirCount,
      volunteerCount,
      mediaCount,
      techCount,
      blogPostsCount,
      donationsCount,
      partnersCount,
    ] = await Promise.all([
      db.collection("members").count().get(),
      db.collection("events").get(),
      db.collection("newsletterSubscribers").get(),
      db.collection("join_choir").count().get(),
      db.collection("join_volunteer").count().get(),
      db.collection("join_media").count().get(),
      db.collection("join_tech").count().get(),
      db.collection("posts").count().get(),
      db.collection("donations").count().get(),
      db.collection("partners").count().get(),
    ]);

    // Calculate recent events (this month)
    const currentMonth = new Date().toISOString().slice(0, 7);
    const recentEvents = eventsSnap.docs.filter((doc) => {
      const eventDate = doc.data().date;
      return eventDate && eventDate.startsWith(currentMonth);
    }).length;

    // Count only active (subscribed) newsletter subscribers
    const activeSubscribers = subscribersSnap.docs.filter((doc) => {
      const status = doc.data().status;
      return !status || status === "subscribed"; // Include old subscribers without status field
    }).length;

    const stats = {
      totalMembers: membersCount.data().count,
      totalEvents: eventsSnap.size,
      newsletterSubscribers: activeSubscribers,
      pendingApplications:
        choirCount.data().count +
        volunteerCount.data().count +
        mediaCount.data().count +
        techCount.data().count,
      recentEvents,
      blogPosts: blogPostsCount.data().count,
      totalDonations: donationsCount.data().count,
      totalPartners: partnersCount.data().count,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: "❌ Error fetching dashboard stats" },
      { status: 500 },
    );
  }
}
