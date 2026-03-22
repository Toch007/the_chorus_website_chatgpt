"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Music,
  Clock,
  MapPin,
  Snowflake,
} from "lucide-react";

export default function Events() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20" id="events">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal direction="down" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Upcoming Performances
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="text-lg text-gray-700 mb-10">
            Stay inspired. Join us at our next concert, outreach, or festival
            appearance.
          </p>
        </Reveal>

        {/* March Concert - Hymn of Praise */}
        <Reveal direction="up" delay={0.4}>
          <div className="mb-12 bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/images/Hymn_of_praise.jpg"
                  alt="Hymn of Praise Concert"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/90 backdrop-blur-sm rounded-full font-bold text-white text-sm">
                    <Calendar className="w-4 h-4" />
                    March 22, 2026
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-10 text-left flex flex-col justify-center text-white">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Music className="w-6 h-6 text-purple-300" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-purple-200">
                    Easter Preparation
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Hymn of Praise
                </h3>
                <p className="text-lg text-purple-100 mb-4 leading-relaxed">
                  Experience Mendelssohn's magnificent "Lobgesang" plus selected
                  Negro Spirituals. A spiritually uplifting evening preparing
                  our hearts for Easter.
                </p>
                <div className="space-y-2 text-sm text-purple-200 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Doors: 4:00 PM | Concert: 5:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>First Baptist Church, Garki, Abuja</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full font-semibold text-green-300 mt-2">
                    ✓ FREE ENTRY
                  </div>
                </div>
                <Link
                  href="/events/hymn-of-praise"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all w-fit shadow-lg hover:shadow-xl"
                >
                  RSVP Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* September - 5th Anniversary Concert */}
        <Reveal direction="up" delay={0.5}>
          <div className="mb-12 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/images/chorus.jpg"
                  alt="5th Anniversary Celebration"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full font-bold text-amber-600 text-sm">
                    <Sparkles className="w-4 h-4" />
                    September 2026
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-10 text-left flex flex-col justify-center text-white">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    5th Anniversary Concert
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Mendelssohn's "St. Paul"
                </h3>
                <p className="text-lg text-amber-50 mb-6 leading-relaxed">
                  Join us for a spectacular anniversary celebration featuring
                  Mendelssohn's powerful oratorio. Five years of harmony,
                  excellence, and community culminate in this unforgettable
                  performance.
                </p>
                <div className="flex items-center gap-2 text-amber-100 mb-6">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">
                    September 2026 • Details coming soon
                  </span>
                </div>
                <Link
                  href="/events/5th-anniversary"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition-all w-fit shadow-lg hover:shadow-xl"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* December Christmas Concert */}
        <Reveal direction="up" delay={0.6}>
          <div className="mb-12 bg-gradient-to-br from-red-900 via-green-900 to-red-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/images/chorus.jpg"
                  alt="Christmas Concert"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full font-bold text-white text-sm">
                    <Snowflake className="w-4 h-4" />
                    December 2026
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-10 text-left flex flex-col justify-center text-white">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Snowflake className="w-6 h-6 text-red-300" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-red-200">
                    Seasonal Celebration
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Christmas Concert
                </h3>
                <p className="text-lg text-red-100 mb-4 leading-relaxed">
                  Close out our 5th anniversary year with a magical evening of
                  Christmas carols, classical masterpieces, and joyful
                  celebration of the season.
                </p>
                <div className="space-y-2 text-sm text-red-200 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>December 2026 • Date TBA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Venue to be announced</span>
                  </div>
                </div>
                <Link
                  href="/events/christmas-concert"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all w-fit shadow-lg hover:shadow-xl"
                >
                  Register Interest
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.7}>
          <Link
            href="/events"
            className="inline-block bg-blue-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 active:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transform transition-all duration-300"
          >
            📅 See All Events
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
