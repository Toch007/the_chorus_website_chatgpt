"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Share2,
  Heart,
  ArrowRight,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HymnOfPraisePage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Felix Mendelssohn's Hymn of Praise — The Chorus Abuja",
          text: "What a magnificent evening! The Chorus Abuja performed Mendelssohn's Hymn of Praise at First Baptist Church, Garki on March 22, 2026.",
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
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/Hymn_of_praise.jpg"
              alt="The Chorus Abuja"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-blue-900/90" />

          <div className="relative max-w-6xl mx-auto">
            <Reveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white rounded-full font-semibold mb-6">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                <span className="text-green-200 font-bold">Concluded</span>
                <span className="text-white/60">· March 22, 2026</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Felix Mendelssohn's
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                  Hymn of Praise
                </span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mb-8">
                In preparation for the Easter season, experience the complete
                work plus inspiring Negro spiritual selections
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-6 text-lg mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-300" />
                  <span>Doors: 4:00 PM | Concert: 5:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  <span>First Baptist Church, Garki, Abuja</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-300" />
                  <span className="font-bold text-green-300">FREE ENTRY</span>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <Link
                  href="/events/hymn-of-praise/program"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl"
                >
                  <Music className="w-5 h-5" />
                  View Concert Program
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/events/paul"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
                >
                  Our Next Concert →
                </Link>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - About */}
              <div>
                <Reveal>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    About This Concert
                  </h2>
                  <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                      Join The Chorus Abuja for a spiritually uplifting
                      performance of Felix Mendelssohn's masterwork,{" "}
                      <strong>Hymn of Praise (Lobgesang)</strong>, as we prepare
                      our hearts for the Easter season.
                    </p>
                    <p>
                      This magnificent cantata-symphony combines the power of
                      orchestral music with the beauty of choral singing,
                      celebrating faith, hope, and redemption through
                      Mendelssohn's inspirational composition.
                    </p>
                    <p>
                      The evening will also feature a special selection of{" "}
                      <strong>Negro Spirituals</strong>, adding depth and
                      cultural richness to this sacred music experience.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                      <Music className="w-6 h-6" />
                      Program Repertoire
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>
                          <strong>Felix Mendelssohn:</strong> Hymn of Praise
                          (Complete)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>Selected Negro Spirituals</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* Right Column - Venue & Logistics */}
              <div>
                <Reveal delay={0.1}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Event Information
                  </h2>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="space-y-6">
                    {/* Date & Time */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Date & Time
                          </h3>
                          <p className="text-gray-700">
                            Saturday, March 22, 2026
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            Doors open: 4:00 PM
                            <br />
                            Concert starts: 5:00 PM
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">
                            Venue
                          </h3>
                          <p className="text-gray-700 font-medium mb-2">
                            First Baptist Church, Garki
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Plot 668, Port-Harcourt Crescent,
                            <br />
                            Off Gimbiya Street, Area 11,
                            <br />
                            Garki, Abuja
                          </p>
                          <a
                            href="https://maps.google.com/?q=First+Baptist+Church+Garki+Abuja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium mt-3 text-sm"
                          >
                            Get Directions
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Admission */}
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Heart className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Admission
                          </h3>
                          <p className="text-2xl font-bold text-green-600 mb-2">
                            FREE ENTRY
                          </p>
                          <p className="text-gray-600 text-sm">
                            No tickets required. All are welcome to attend this
                            sacred music experience.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Theme */}
                    <div className="p-6 bg-purple-900 text-white rounded-xl">
                      <h3 className="font-bold mb-2">Concert Theme</h3>
                      <p className="text-purple-100">
                        In preparation for the Easter season - A celebration of
                        faith, hope, and renewal
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Thank You Section */}
        <section
          id="register"
          className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white"
        >
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-12 text-center border-2 border-purple-200 shadow-lg">
                <CheckCircle2 className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You for an Unforgettable Evening!
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  What a beautiful night of worship and music on March 22nd at First Baptist Church, Garki.
                  Thank you to every audience member, volunteer, and supporter who made the Hymn of Praise a truly special occasion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/events/hymn-of-praise/program"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
                  >
                    <Music className="w-5 h-5" />
                    Revisit the Program
                  </Link>
                  <Link
                    href="/events/paul"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all"
                  >
                    Our Next Concert
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/support/donate"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Heart className="w-5 h-5 text-red-500" />
                    Support Us
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* More Events */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What's Next
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our 2026 concert series continues with two more unforgettable performances.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="/events/paul"
                  className="p-6 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all text-left"
                >
                  <div className="text-sm font-semibold mb-2">September 13, 2026</div>
                  <h3 className="text-2xl font-bold mb-2">
                    5th Anniversary Concert
                  </h3>
                  <p className="text-amber-100 mb-4">
                    Mendelssohn's Paul (Paulus, Op. 36) — NUC Auditorium, Maitama
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    Get Tickets <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-left">
                  <div className="text-sm font-semibold mb-2 text-blue-300">
                    December 2026
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Christmas Concert</h3>
                  <p className="text-gray-300 mb-4">Details coming soon</p>
                  <div className="text-sm font-medium text-gray-400">
                    Stay tuned for announcements
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
