"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Loader2,
} from "lucide-react";

type RSVP = {
  id: string;
  eventId: string;
  eventName: string;
  name: string;
  email: string;
  phone?: string;
  guests: number;
  newsletter: boolean;
  timestamp: string;
  status: string;
};

type EventStats = {
  eventId: string;
  eventName: string;
  totalRSVPs: number;
  totalGuests: number;
  newsletterSignups: number;
};

export default function AdminEventRSVPsPage() {
  useAuthRedirect();

  const [events] = useState([
    { id: "hymn-of-praise-2026", name: "Hymn of Praise - March 22, 2026" },
    {
      id: "5th-anniversary-2026",
      name: "5th Anniversary Concert - September 2026",
    },
    { id: "christmas-concert-2026", name: "Christmas Concert - December 2026" },
  ]);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<EventStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRSVP, setExpandedRSVP] = useState<string | null>(null);

  // Fetch statistics for all events
  useEffect(() => {
    const fetchStats = async () => {
      const statsData: EventStats[] = [];

      for (const event of events) {
        try {
          const response = await fetch(`/api/events/rsvp?eventId=${event.id}`);
          if (response.ok) {
            const data = await response.json();
            const rsvpList = data.rsvps || [];

            statsData.push({
              eventId: event.id,
              eventName: event.name,
              totalRSVPs: rsvpList.length,
              totalGuests: rsvpList.reduce(
                (sum: number, r: RSVP) => sum + (r.guests || 1),
                0,
              ),
              newsletterSignups: rsvpList.filter((r: RSVP) => r.newsletter)
                .length,
            });
          }
        } catch (err) {
          console.error(`Failed to fetch stats for ${event.id}:`, err);
        }
      }

      setStats(statsData);
    };

    fetchStats();
  }, [events]);

  // Fetch RSVPs for selected event
  useEffect(() => {
    if (!selectedEvent) {
      setRsvps([]);
      return;
    }

    const fetchRSVPs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/events/rsvp?eventId=${selectedEvent}`,
        );
        if (response.ok) {
          const data = await response.json();
          setRsvps(data.rsvps || []);
        }
      } catch (err) {
        console.error("Failed to fetch RSVPs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, [selectedEvent]);

  const filteredRSVPs = rsvps.filter(
    (rsvp) =>
      rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const exportToCSV = () => {
    if (rsvps.length === 0) return;

    const headers = ["Name", "Email", "Phone", "Guests", "Newsletter", "Date"];
    const rows = rsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email,
      rsvp.phone || "",
      rsvp.guests || 1,
      rsvp.newsletter ? "Yes" : "No",
      new Date(rsvp.timestamp).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvps-${selectedEvent}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Event RSVPs Dashboard
            </h1>
            <p className="text-gray-600">
              View and manage registrations for all upcoming concerts
            </p>
          </div>

          {/* Statistics Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {events.map((event) => {
              const eventStats = stats.find((s) => s.eventId === event.id);
              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all cursor-pointer ${
                    selectedEvent === event.id
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                    {selectedEvent === event.id && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">RSVPs</span>
                      <span className="font-bold text-blue-600">
                        {eventStats?.totalRSVPs || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Guests</span>
                      <span className="font-bold text-gray-900">
                        {eventStats?.totalGuests || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Newsletter</span>
                      <span className="font-bold text-green-600">
                        {eventStats?.newsletterSignups || 0}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RSVP Details Section */}
          {selectedEvent && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {events.find((e) => e.id === selectedEvent)?.name}
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={exportToCSV}
                    disabled={rsvps.length === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* RSVP List */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : filteredRSVPs.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    {searchTerm
                      ? "No RSVPs match your search"
                      : "No RSVPs yet for this event"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRSVPs.map((rsvp) => (
                    <div
                      key={rsvp.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-all"
                    >
                      <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        onClick={() =>
                          setExpandedRSVP(
                            expandedRSVP === rsvp.id ? null : rsvp.id,
                          )
                        }
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">
                              {rsvp.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {rsvp.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {rsvp.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-700">
                              {rsvp.guests || 1}{" "}
                              {rsvp.guests === 1 ? "guest" : "guests"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(rsvp.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {expandedRSVP === rsvp.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 ml-4" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 ml-4" />
                        )}
                      </div>

                      {expandedRSVP === rsvp.id && (
                        <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                          <div className="grid md:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Email
                                </div>
                                <a
                                  href={`mailto:${rsvp.email}`}
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  {rsvp.email}
                                </a>
                              </div>
                            </div>
                            {rsvp.phone && (
                              <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Phone
                                  </div>
                                  <a
                                    href={`tel:${rsvp.phone}`}
                                    className="text-sm text-blue-600 hover:underline"
                                  >
                                    {rsvp.phone}
                                  </a>
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Number of Guests
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {rsvp.guests || 1}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Registration Date
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {new Date(rsvp.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          {rsvp.newsletter && (
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Subscribed to newsletter
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              {!loading && filteredRSVPs.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Showing {filteredRSVPs.length} of {rsvps.length} RSVPs
                    </span>
                    <span className="font-medium text-gray-900">
                      Total guests:{" "}
                      {filteredRSVPs.reduce(
                        (sum, r) => sum + (r.guests || 1),
                        0,
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {!selectedEvent && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Select an Event
              </h3>
              <p className="text-gray-600">
                Click on an event card above to view its RSVPs and details
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
