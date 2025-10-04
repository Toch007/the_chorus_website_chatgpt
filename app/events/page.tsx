"use client";

import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Reveal from "@/components/Reveal";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import UpcomingBanner from "@/components/UpcomingBanner";
import Link from "next/link";
import { Calendar, MapPin, Music, Users, Clock, Ticket } from "lucide-react";

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

        const upcoming = allEvents.filter(
          (event) => event.status === "upcoming"
        );
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
    <section className="px-6 py-16 max-w-6xl mx-auto">
      <Reveal>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-blue-800">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {title.includes("Upcoming")
              ? "Don't miss these exciting upcoming performances and events"
              : "Relive the magic of our memorable past performances"}
          </p>
        </div>
      </Reveal>

      {eventsList.length === 0 ? (
        <Reveal>
          <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <Music className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {title.includes("Upcoming") ? "Stay Tuned" : "More Events Coming"}
            </h3>
            <p className="text-gray-600">
              {title.includes("Upcoming")
                ? "New events will be announced soon!"
                : "Check back for our event history"}
            </p>
          </div>
        </Reveal>
      ) : (
        <div
          className={`grid gap-8 ${
            eventsList.length === 1
              ? "grid-cols-1 justify-items-center max-w-md mx-auto"
              : eventsList.length === 2
                ? "grid-cols-1 sm:grid-cols-2 justify-items-center max-w-4xl mx-auto"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {eventsList.map((event, index) => (
            <Reveal key={event.id} delay={index * 0.1}>
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <div className="relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {event.ticketed && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      🎟️ Ticketed
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-blue-800 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {event.location}
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex gap-3 flex-wrap pt-4">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-md"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      View Details
                    </button>

                    {event.ticketed && event.ticketUrl && (
                      <Link
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-md"
                      >
                        <Ticket className="w-4 h-4 mr-1" />
                        Buy Tickets
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <>
      <Header />
      <main className="bg-white text-gray-800">
        {/* Enhanced Hero section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6">
                Our Concerts & Events
              </h1>
            </Reveal>

            <UpcomingBanner />

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Discover our unforgettable performances, community events, and
                inspiring choral journeys. Each performance is a celebration of
                musical excellence and community spirit.
              </p>
            </Reveal>

            {/* Event Statistics */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">
                    {upcomingEvents.length}
                  </div>
                  <div className="text-sm text-gray-600">Upcoming Events</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Music className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">
                    {pastEvents.length}
                  </div>
                  <div className="text-sm text-gray-600">Past Performances</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">500+</div>
                  <div className="text-sm text-gray-600">Audience Reached</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Ticket className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">7+</div>
                  <div className="text-sm text-gray-600">Major Works</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {renderEvents("Upcoming Events", upcomingEvents)}
        {renderEvents("Past Events", pastEvents)}

        {/* Enhanced Event Modal */}
        {isClient && selectedEvent && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-600 hover:text-gray-900 transition-all z-10"
              >
                ✕
              </button>

              <div className="relative">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                {selectedEvent.ticketed && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full font-bold shadow-lg">
                    🎟️ Ticketed Event
                  </div>
                )}
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    {selectedEvent.title}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Date</div>
                        <div className="font-semibold text-blue-800">
                          {selectedEvent.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="text-sm text-gray-600">Location</div>
                        <div className="font-semibold text-blue-800">
                          {selectedEvent.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"></div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    Event Details
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedEvent.details || selectedEvent.description}
                  </p>
                </div>

                {selectedEvent.ticketed && selectedEvent.ticketUrl && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                    <div className="text-center">
                      <h4 className="font-bold text-blue-800 mb-2">
                        Get Your Tickets Now!
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Secure your spot for this amazing performance
                      </p>
                      <Link
                        href={selectedEvent.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
                      >
                        <Ticket className="w-5 h-5 mr-2" />
                        Buy Tickets
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Solomon CTA */}
        <Reveal>
          <section
            className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white mx-4 md:mx-8 rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundImage: 'url("/images/solomon1.jpg")' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
            <div className="relative z-10 bg-black/40 backdrop-blur-sm p-10 rounded-2xl text-center max-w-3xl border border-white/20">
              <Ticket className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Solomon – A Choral Experience
              </h2>
              <p className="text-xl mb-2 text-yellow-200">
                Sunday, 16 November 2025
              </p>
              <p className="text-lg mb-6 text-gray-200">
                Limited tickets available for this extraordinary performance!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/events/solomon"
                  className="inline-flex items-center bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Learn More
                </Link>
                <Link
                  href="/events/solomon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-bold hover:bg-yellow-400 hover:text-blue-900 transition-all"
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Buy Tickets
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Enhanced Closing Section */}
        <Reveal>
          <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Stay Connected with The Chorus
                </h3>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                  Subscribe or join us to receive updates on upcoming
                  performances, exclusive behind-the-scenes content, and be the
                  first to know about new events and recitals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/join"
                  className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Our Community
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Get Updates
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
