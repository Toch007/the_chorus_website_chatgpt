// components/admin/EventList.tsx

"use client";

import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import UpcomingBanner from "@/components/UpcomingBanner";
import Link from "next/link";

// ✅ Define event type
type EventType = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  details: string;
  status: "upcoming" | "past";
  ticketed?: boolean;
  ticketUrl?: string; // 🔑 new: store ticket link
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [pastEvents, setPastEvents] = useState<EventType[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, "events"));
        const allEvents = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EventType[];

        const upcoming = allEvents.filter((event) => event.status === "upcoming");
        const past = allEvents.filter((event) => event.status === "past");

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const renderEvents = (title: string, eventsList: EventType[]) => (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsList.map((event) => (
          <div key={event.id} className="bg-blue-50 rounded-xl shadow-md p-6">
            <Image
              src={event.image}
              alt={event.title}
              width={600}
              height={400}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />

            {/* Title + Ticketed badge */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-blue-800">
                {event.title}
              </h3>
              {event.ticketed && (
                <span className="bg-yellow-300 text-blue-900 text-xs px-2 py-1 rounded-full font-bold ml-2">
                  🎟️ Ticketed
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-1">Date: {event.date}</p>
            <p className="text-sm text-gray-600 mb-4">
              Location: {event.location}
            </p>
            <p className="text-gray-700 mb-4">{event.description}</p>

            {/* Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedEvent(event)}
                className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
              >
                View Details
              </button>

              {event.ticketed && event.ticketUrl && (
                <Link
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-4 py-2 rounded-full text-sm font-bold transition"
                >
                  Buy Tickets
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Header />
      <main className="bg-white text-gray-800">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-white to-blue-50 text-center pt-24 px-4">
          <h1 className="text-5xl font-bold text-blue-900">
            Our Concerts & Events
          </h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Discover our unforgettable performances, community events, and
            inspiring choral journeys.
          </p>
        </section>

        {renderEvents("Upcoming Events", upcomingEvents)}
        {renderEvents("Past Events", pastEvents)}

        {/* Event modal */}
        {isClient && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg mx-auto relative shadow-lg">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-2 right-4 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Date: {selectedEvent.date}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Location: {selectedEvent.location}
              </p>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedEvent.details}
              </p>

              {selectedEvent.ticketed && selectedEvent.ticketUrl && (
                <Link
                  href={selectedEvent.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-full font-bold text-center transition"
                >
                  🎟️ Buy Tickets
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Highlight Solomon CTA */}
        <section
          className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
          style={{ backgroundImage: 'url("/images/solomon.jpg")' }}
        >
          <div className="bg-black/60 p-8 rounded-xl text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-2">
              🎟️ Solomon – A Choral Experience
            </h2>
            <p className="text-lg mb-4">
              Sunday, 16 November 2025 · Limited tickets available!
            </p>
            <Link
              href="https://tix.africa/the-chorus-solomon"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-full font-bold transition"
            >
              Learn More / Buy Tickets
            </Link>
          </div>
        </section>

        {/* Closing section */}
        <section className="bg-blue-900 text-white text-center py-12">
          <h3 className="text-2xl font-bold mb-2">Stay Tuned for More Events</h3>
          <p className="mb-6">
            Subscribe or join us to receive updates on upcoming performances and
            recitals.
          </p>
          <a
            href="/join"
            className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition"
          >
            Join Our Community
          </a>
        </section>
      </main>
      <UpcomingBanner />
      <Footer />
    </>
  );
}
