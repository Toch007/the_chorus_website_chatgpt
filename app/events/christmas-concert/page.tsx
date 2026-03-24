"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Snowflake,
  Star,
  Gift,
  Users,
  Heart,
  ArrowRight,
  CheckCircle2,
  Share2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ChristmasConcertPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    newsletter: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/events/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: "christmas-concert-2026",
          eventName: "Christmas Concert - December 2026",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          guests: parseInt(formData.guests),
          newsletter: formData.newsletter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }

      setIsRegistered(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Christmas Concert 2026 - The Chorus Abuja",
          text: "Join us for a magical Christmas celebration with The Chorus Abuja this December!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-red-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-br from-red-900 via-green-900 to-red-800 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/chorus.jpg"
              alt="The Chorus Abuja"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 to-green-900/90" />

          {/* Animated snowflakes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Snowflake className="absolute top-10 left-10 w-8 h-8 text-white/30 animate-pulse" />
            <Snowflake className="absolute top-20 right-20 w-6 h-6 text-white/40 animate-pulse delay-300" />
            <Snowflake className="absolute bottom-20 left-1/4 w-10 h-10 text-white/20 animate-pulse delay-700" />
            <Star className="absolute top-1/3 right-1/3 w-6 h-6 text-yellow-300/50 animate-pulse delay-500" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/30 backdrop-blur-sm border border-red-300/50 text-red-100 rounded-full font-semibold mb-6">
                <Snowflake className="w-4 h-4" />
                December 2026
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Christmas Concert
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-yellow-200 to-green-300">
                  A Seasonal Celebration
                </span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto mb-8">
                Join us for a magical evening of traditional carols, classical
                masterpieces, and joyful celebration of the Christmas season
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-6 text-lg justify-center mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-300" />
                  <span>December 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-300" />
                  <span>Time TBA</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-300" />
                  <span>Venue TBA</span>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
                >
                  <Gift className="w-5 h-5" />
                  Register Interest
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Share Event
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                <Reveal>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    A Festive Musical Celebration
                  </h2>
                  <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                      As we close out our 5th anniversary year, join The Chorus
                      Abuja for a heartwarming Christmas celebration filled with
                      the timeless music of the season.
                    </p>
                    <p>
                      Our Christmas concert will feature a carefully curated
                      program of beloved carols, sacred classics, and jubilant
                      seasonal favorites, performed with the excellence and
                      passion that has defined our five-year journey.
                    </p>
                    <p>
                      Whether you're a longtime supporter or experiencing our
                      music for the first time, this concert promises to fill
                      your heart with the joy and wonder of Christmas.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-8 p-6 bg-gradient-to-br from-red-50 to-green-50 rounded-xl border-2 border-red-200">
                    <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                      <Music className="w-6 h-6" />
                      Expected Program Highlights
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Traditional Christmas Carols</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Classical Sacred Masterpieces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Contemporary Seasonal Favorites</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Audience Sing-Along Selections</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-4">
                      <em>
                        Full program details will be announced closer to the
                        event date
                      </em>
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right Column */}
              <div>
                <Reveal delay={0.1}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Event Information
                  </h2>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="space-y-6">
                    {/* Date & Time */}
                    <div className="p-6 bg-gradient-to-r from-red-50 to-green-50 rounded-xl border border-red-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <Calendar className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Date & Time
                          </h3>
                          <p className="text-gray-700 font-medium">
                            December 2026
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            Specific date and time to be announced
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <MapPin className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">
                            Venue
                          </h3>
                          <p className="text-gray-600">
                            Location to be announced soon
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tickets */}
                    <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <Gift className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Tickets
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Ticket information will be announced. Register below
                            to be notified first!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Perfect For */}
                    <div className="p-6 bg-gradient-to-br from-red-900 to-green-900 text-white rounded-xl">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Perfect For
                      </h3>
                      <ul className="space-y-2 text-sm text-red-100">
                        <li>• Families looking for festive entertainment</li>
                        <li>
                          • Music lovers seeking classical Christmas repertoire
                        </li>
                        <li>
                          • Anyone wanting to experience the magic of the season
                        </li>
                        <li>• Corporate and church group outings</li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Why Attend Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Why You'll Love This Concert
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              <Reveal delay={0.1}>
                <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Timeless Music
                  </h3>
                  <p className="text-gray-600">
                    Experience beloved Christmas carols and sacred classics
                    performed with professional excellence
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Community Spirit
                  </h3>
                  <p className="text-gray-600">
                    Join our choir family and the Abuja community in celebrating
                    the joy of the season together
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Memorable Experience
                  </h3>
                  <p className="text-gray-600">
                    Create lasting Christmas memories with an evening of beauty,
                    joy, and musical celebration
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <Gift className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Be the First to Know
                </h2>
                <p className="text-xl text-gray-600">
                  Register your interest and receive updates as soon as we
                  announce event details
                </p>
              </div>
            </Reveal>

            {!isRegistered ? (
              <Reveal delay={0.2}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-200">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                        placeholder="+234 800 000 0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Number of Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3-5 people</option>
                        <option value="6">6+ people (group)</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              newsletter: e.target.checked,
                            })
                          }
                          className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-600">
                          I'd like to receive updates about The Chorus Abuja
                          Christmas Concert and future events
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-red-600 to-green-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Processing..." : "Register Interest"}
                    </button>
                  </form>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12 text-center border-2 border-green-200">
                  <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-xl text-gray-700 mb-6">
                    You're on the list! We'll notify you as soon as we announce
                    the Christmas concert details.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      Share with Friends
                    </button>
                    <Link
                      href="/events"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                    >
                      View Other Events
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* Other Events */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                2026 Concert Series
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Don't miss our other spectacular performances this year
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-left opacity-80">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    Concluded
                  </div>
                  <div className="text-sm font-semibold mb-2 text-purple-300">
                    March 22, 2026
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Hymn of Praise</h3>
                  <p className="text-purple-100 mb-4">
                    Mendelssohn's masterwork + Negro Spirituals
                  </p>
                  <Link
                    href="/events/hymn-of-praise/program"
                    className="flex items-center gap-2 text-sm font-medium text-purple-200 hover:text-white transition"
                  >
                    View Program <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <Link
                  href="/events/5th-anniversary"
                  className="p-6 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all text-left"
                >
                  <div className="text-sm font-semibold mb-2">
                    September 2026
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    5th Anniversary Concert
                  </h3>
                  <p className="text-amber-100 mb-4">
                    Featuring Mendelssohn's "St. Paul"
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
