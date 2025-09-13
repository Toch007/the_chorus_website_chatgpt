// components/admin/EventList.tsx

"use client";

import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [pastEvents, setPastEvents] = useState<EventType[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const fetchEvents: () => Promise<void> = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, "events"));
        const allEvents = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as EventType[];

        const upcoming = allEvents.filter((event) => event.status === "upcoming");
        const past = allEvents.filter((event) => event.status === "past");

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (err) {
        console.error("Error fetching events:", err);
        toast.error("Failed to load events.");
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "events", id));
      toast.success("Event deleted");
      setUpcomingEvents((prev) => prev.filter((e) => e.id !== id));
      setPastEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const renderEvents = (title: string, eventsList: EventType[]) => (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsList.map((event: EventType) => (
          <div key={event.id} className="bg-blue-50 rounded-xl shadow-md p-6">
            <Image
              src={event.image}
              alt={event.title}
              width={600}
              height={400}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Date: {event.date}</p>
            <p className="text-sm text-gray-600 mb-4">Location: {event.location}</p>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/admin/events/edit/${event.id}`)}
                className="bg-yellow-500 text-white px-4 py-1 rounded text-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedEvent(event)}
                className="bg-blue-800 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
              >
                View
              </button>
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
        <section className="bg-gradient-to-r from-white to-blue-50 text-center py-16 px-4">
          <h1 className="text-5xl font-bold text-blue-900">Our Concerts & Events</h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Discover our unforgettable performances, community events, and inspiring choral journeys.
          </p>

          {/* ✅ Always show Add Event button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push("/admin/events/new")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm"
            >
              + Add New Event
            </button>
          </div>
        </section>

        {renderEvents("Upcoming Events", upcomingEvents)}
        {renderEvents("Past Events", pastEvents)}

        {isClient && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg mx-auto relative shadow-lg">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-2 right-4 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">{selectedEvent.title}</h2>
              <p className="text-sm text-gray-600 mb-1">Date: {selectedEvent.date}</p>
              <p className="text-sm text-gray-600 mb-4">Location: {selectedEvent.location}</p>
              <p className="text-gray-700 whitespace-pre-line">{selectedEvent.details}</p>
            </div>
          </div>
        )}

        <section
          className="relative bg-fixed bg-cover bg-center h-96 text-white flex items-center justify-center"
          style={{ backgroundImage: 'url("/images/solomon.jpg")' }}
        >
          <div className="bg-black/50 p-8 rounded-xl">
            <h2 className="text-4xl font-bold">Solomon – Coming October 2025</h2>
            <p className="mt-2">Stay tuned for one of our biggest events of the year.</p>
          </div>
        </section>

        <section className="bg-blue-900 text-white text-center py-12">
          <h3 className="text-2xl font-bold mb-2">Stay Tuned for More Events</h3>
          <p className="mb-6">Subscribe or join us to receive updates on upcoming performances and recitals.</p>
          <a
            href="/join"
            className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition"
          >
            Join Our Community
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
