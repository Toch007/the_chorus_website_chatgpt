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

        const upcoming = allEvents
          .filter((event) => event.status === "upcoming")
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        const past = allEvents
          .filter((event) => event.status === "past")
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

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
        {/* Enhanced Hero section with Background Image */}
        <section className="relative pt-24 pb-16 px-4 overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/solomon-concert2.jpeg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-purple-900/85 to-blue-900/90"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto text-center space-y-8">
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                Our Concerts & Events
              </h1>
            </Reveal>

            <UpcomingBanner />

            <Reveal delay={0.2}>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Discover our unforgettable performances, community events, and
                inspiring choral journeys. Each performance is a celebration of
                musical excellence and community spirit.
              </p>
            </Reveal>

            {/* Event Statistics */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow hover:bg-white/30">
                  <Calendar className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">
                    {upcomingEvents.length}
                  </div>
                  <div className="text-sm text-blue-100">Upcoming Events</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow hover:bg-white/30">
                  <Music className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">
                    {pastEvents.length}
                  </div>
                  <div className="text-sm text-blue-100">Past Performances</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow hover:bg-white/30">
                  <Users className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-blue-100">Audience Reached</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow hover:bg-white/30">
                  <Ticket className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">7+</div>
                  <div className="text-sm text-blue-100">Major Works</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Featured Upcoming Event - Paul Concert */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-12">
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  ✨ 5th Anniversary
                </div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  <Ticket size={16} /> Featured Concert
                </div>
              </div>
              <h2 className="text-4xl font-bold text-blue-800 mb-2">
                Our Grand Anniversary Concert
              </h2>
              <p className="text-gray-600 text-lg">
                Celebrating 5 years of choral excellence with Mendelssohn's{" "}
                <em>Paul</em>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Link href="/events/paul">
              <div className="group bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden hover:-translate-y-3 cursor-pointer">
                <div
                  className="relative h-80 md:h-96 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/paul.jpeg')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                          🎼 Upcoming
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm opacity-90">
                          Sun. 13th Sept 2026
                        </div>
                        <div className="text-white text-sm opacity-90">
                          4PM Doors | 5PM Start
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                        Mendelssohn's
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                          Paul
                        </span>
                      </h3>
                      <p className="text-xl text-blue-100 max-w-2xl">
                        An Apostolic Journey in Music • Full Oratorio Experience
                        with Orchestra
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">When</p>
                        <p className="font-bold text-blue-800">
                          September 13, 2026
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Where</p>
                        <p className="font-bold text-blue-800">
                          NUC Auditorium, Maitama
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ticket className="w-6 h-6 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-600">Tickets</p>
                        <p className="font-bold text-yellow-600">
                          ₦10k - ₦100k
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Experience the transformative spiritual odyssey of the
                    Apostle Paul through Felix Mendelssohn's towering oratorio.
                    A spectacular musical event featuring The Chorus Abuja with
                    full orchestral accompaniment. Four premium ticket tiers
                    available with exclusive meet-and-greet opportunities.
                  </p>

                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-bold group-hover:from-blue-700 group-hover:to-blue-800 transition-all text-center">
                      View Full Details →
                    </div>
                    <div className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold group-hover:bg-yellow-300 transition-all text-center">
                      Get Tickets
                    </div>{" "}
                    <Link
                      href="/events/5th-anniversary"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-yellow-600 transition-all text-center"
                    >
                      🎂 Anniversary Page
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
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
