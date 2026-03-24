"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Music,
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

        {/* Hymn of Praise — Concluded */}
        <Reveal direction="up" delay={0.4}>
          <div className="mb-10 rounded-2xl overflow-hidden border border-purple-200 bg-white shadow-md">
            <div className="grid md:grid-cols-3 gap-0">
              <div className="relative h-48 md:h-auto">
                <Image
                  src="/images/Hymn_of_praise.jpg"
                  alt="Hymn of Praise Concert"
                  fill
                  className="object-cover grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-purple-900/40" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 text-purple-800 rounded-full font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    Concluded
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 p-6 flex flex-col justify-center text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">March 22, 2026 · First Baptist Church, Garki</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mendelssohn's Hymn of Praise</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Thank you to everyone who joined us for a magnificent evening of Mendelssohn's <em>Lobgesang</em> and Negro Spirituals. What a beautiful night of music and worship.
                </p>
                <Link
                  href="/events/hymn-of-praise/program"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-purple-100 text-purple-800 font-semibold rounded-lg hover:bg-purple-200 transition-all w-fit text-sm"
                >
                  <Music className="w-4 h-4" />
                  View Concert Program
                  <ArrowRight className="w-4 h-4" />
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
                  Mendelssohn's Paul (Paulus)
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
