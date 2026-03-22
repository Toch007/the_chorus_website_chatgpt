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
  Sparkles,
  Users,
  Heart,
  Award,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FifthAnniversaryPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
          eventId: "5th-anniversary-2026",
          eventName: "5th Anniversary Concert - September 2026",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
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

  const milestones = [
    {
      year: "2021",
      title: "The Beginning",
      description:
        "The Chorus Abuja was founded with a vision to bring classical choral excellence to Abuja",
      icon: Music,
      image: "/images/Creation concert.jpg",
    },
    {
      year: "2022",
      title: "Growing Stronger",
      description:
        "Second major concert and expansion of our member base and audience",
      icon: Users,
      image: "/images/gallery7.jpeg",
    },
    {
      year: "2023",
      title: "Major Milestones",
      description:
        "Performed at prestigious venues and gained recognition across Abuja",
      icon: Award,
      image: "/images/Resurrection2.jpeg",
    },
    {
      year: "2024",
      title: "Community Impact",
      description: "Launched member portal and expanded our outreach programs",
      icon: Heart,
      image: "/images/support.jpg",
    },
    {
      year: "2025",
      title: "Excellence Continues",
      description:
        "Celebrating 5 years with 60+ members and 2000+ audience members reached",
      icon: Sparkles,
      image: "/images/solomon-concert1.jpeg",
    },
  ];

  const highlights = [
    { number: "10+", label: "Concerts Performed", icon: Music },
    { number: "60+", label: "Active Members", icon: Users },
    { number: "2000+", label: "Audience Reached", icon: Heart },
    { number: "5", label: "Years of Excellence", icon: Award },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full font-semibold mb-6 shadow-lg">
                <Sparkles className="w-5 h-5" />
                Special Milestone Celebration
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Celebrating{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
                  5 Years
                </span>
                <br />
                of Musical Excellence
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
                Join us as we commemorate five incredible years of harmony,
                community, and unforgettable performances that have touched
                hearts across Abuja.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="#register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-full hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Calendar className="w-5 h-5" />
                  Register for Anniversary Event
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#timeline"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-50 transition-all border-2 border-amber-200 shadow-md"
                >
                  See Our Journey
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                5 Years by the Numbers
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full mb-4">
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">
                      {highlight.number}
                    </div>
                    <div className="text-gray-700 font-medium">
                      {highlight.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section
          id="timeline"
          className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Our 5-Year Journey
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                From humble beginnings to becoming Abuja's premier classical
                choir
              </p>
            </Reveal>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div
                    className={`flex flex-col md:flex-row gap-8 items-center ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl group">
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-100 rounded-full">
                        <milestone.icon className="w-5 h-5 text-amber-600" />
                        <span className="text-2xl font-bold text-amber-600">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Anniversary Event Details */}
        <section className="py-16 px-4 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Join Our Anniversary Celebration
              </h2>
              <p className="text-xl md:text-2xl mb-6 text-amber-50">
                An unforgettable evening featuring Mendelssohn's <em>Paul</em>
              </p>
              <p className="text-lg mb-12 text-amber-100">
                A monumental oratorio celebrating five years of musical
                excellence in Abuja
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Reveal delay={0.1}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Calendar className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-sm text-amber-100 mb-2">Date</div>
                  <div className="text-2xl font-bold">
                    Sunday, 13th September 2026
                  </div>
                  <div className="text-sm text-amber-200 mt-1">
                    Mark your calendar!
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Clock className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-sm text-amber-100 mb-2">Time</div>
                  <div className="text-2xl font-bold">5:00 PM</div>
                  <div className="text-sm text-amber-200 mt-1">
                    Doors open 4:00 PM
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-sm text-amber-100 mb-2">Venue</div>
                  <div className="text-2xl font-bold">NUC Auditorium</div>
                  <div className="text-sm text-amber-200 mt-1">
                    Maitama, Abuja
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-4">
                <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
                  <Music className="w-6 h-6" />
                  Featured Masterwork
                </h3>
                <p className="text-xl font-semibold mb-2">
                  Felix Mendelssohn's <em>Paul</em> (Paulus, Op. 36)
                </p>
                <p className="text-amber-100 text-sm">
                  A powerful oratorio depicting the life and conversion of the
                  Apostle Paul, performed with full choir and orchestra.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 mb-6">
                <MapPin className="w-5 h-5 text-amber-200" />
                <span className="text-amber-50 font-medium">
                  National University Commission Auditorium, Maitama, Abuja
                </span>
              </div>
              <p className="text-lg text-amber-100 mb-6">
                Tickets:{" "}
                <strong className="text-white">₦10,000 – ₦100,000</strong>{" "}
                &bull; Four premium tiers available
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/events/paul"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  🎟️ Book Tickets
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/20 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Register Interest
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Register Your Interest
                </h2>
                <p className="text-xl text-gray-600 mb-2">
                  Be the first to receive ticket links and anniversary event
                  updates
                </p>
                <p className="text-sm text-gray-500">
                  📅 Sunday, September 13, 2026 &bull; NUC Auditorium, Maitama,
                  Abuja &bull; Doors 4PM | Concert 5PM
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="+234 800 000 0000"
                      />
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
                          className="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        />
                        <span className="text-sm text-gray-600">
                          I'd like to receive updates about The Chorus Abuja
                          anniversary event and future performances
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Your interest has been registered. We'll be in touch soon
                    with event details!
                  </p>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                  >
                    View Other Events
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Star className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Help Us Continue the Legacy
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Support The Chorus Abuja as we embark on the next five years of
                excellence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-all"
                >
                  <Users className="w-5 h-5" />
                  Join Our Choir
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all"
                >
                  <Heart className="w-5 h-5" />
                  Support Us
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
