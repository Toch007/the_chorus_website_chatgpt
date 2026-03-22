"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Music, Heart, Clock, MapPin, Ticket } from "lucide-react";
import TicketStore from "@/components/TicketStore";

export default function PaulEventPage() {
  const tickets = [
    { name: "Bronze", price: 10000, perks: [], color: "bg-amber-700" },
    { name: "Silver", price: 25000, perks: [], color: "bg-gray-500" },
    { name: "Gold", price: 50000, perks: [], color: "bg-yellow-600" },
    { name: "Diamond", price: 100000, perks: [], color: "bg-blue-700" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Full-viewport background with flier image */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover bg-fixed"
        style={{ backgroundImage: "url('/images/Paul.jpeg')" }}
        aria-hidden
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center text-white">
        {/* Main Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl z-10"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg">
              ✨ 5th Anniversary Grand Concert
            </span>
            <Link
              href="/events/5th-anniversary"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white/20 transition-all"
            >
              🎂 Anniversary Page →
            </Link>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            Mendelssohn's Paul
          </h1>

          <p className="text-2xl md:text-3xl text-blue-100 font-semibold mb-4">
            An Apostolic Journey in Music
          </p>

          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 text-gray-100 leading-relaxed">
            Experience the transformative spiritual odyssey of the Apostle Paul
            through Felix Mendelssohn's towering oratorio. Celebrating{" "}
            <strong className="text-amber-300">
              5 years of The Chorus Abuja
            </strong>{" "}
            at its finest.
          </p>
        </motion.div>

        {/* Event Details Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 grid md:grid-cols-3 gap-6 w-full max-w-3xl"
        >
          <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/50 rounded-lg p-4">
            <Clock className="inline mr-2 mb-1" size={24} />
            <div className="font-semibold text-blue-100">
              September 13, 2026
            </div>
            <div className="text-sm text-gray-300">4PM Doors | 5PM Start</div>
          </div>

          <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/50 rounded-lg p-4">
            <MapPin className="inline mr-2 mb-1" size={24} />
            <div className="font-semibold text-purple-100">Maitama, Abuja</div>
            <div className="text-sm text-gray-300">
              National University Commission
            </div>
          </div>

          <div className="bg-pink-500/20 backdrop-blur-sm border border-pink-400/50 rounded-lg p-4">
            <Ticket className="inline mr-2 mb-1" size={24} />
            <div className="font-semibold text-pink-100">Tickets Available</div>
            <div className="text-sm text-gray-300">4 Premium Tiers</div>
          </div>
        </motion.div>

        {/* About the Performance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-4xl bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-10 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-8 text-center">
            🎭 About This Masterpiece
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-gray-100">
            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                <Zap size={28} /> The Story
              </h3>
              <p className="leading-relaxed mb-4">
                Felix Mendelssohn's monumental oratorio depicts the spiritual
                transformation of Saul, the persecutor of Christians, into Paul,
                the Apostle. This epic narrative spans dramatic conversion,
                divine calling, and unwavering faith.
              </p>
              <p className="leading-relaxed text-gray-300">
                From Damascus to Rome, witness the theological and emotional
                journey of one of Christianity's most influential figures
                through Mendelssohn's soaring melodies, powerful choruses, and
                deeply moving arias.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                <Music size={28} /> What to Expect
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-2xl">🎼</span>
                  <div>
                    <p className="font-medium text-blue-100">Epic Chorales</p>
                    <p className="text-sm text-gray-400">
                      Grand choruses and fugues
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-2xl">🎭</span>
                  <div>
                    <p className="font-medium text-blue-100">Dramatic Arias</p>
                    <p className="text-sm text-gray-400">
                      Emotionally powerful solos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-2xl">🏛️</span>
                  <div>
                    <p className="font-medium text-blue-100">Full Orchestra</p>
                    <p className="text-sm text-gray-400">
                      Complete symphonic accompaniment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-2xl">✨</span>
                  <div>
                    <p className="font-medium text-blue-100">Spiritual Depth</p>
                    <p className="text-sm text-gray-400">
                      A transformative experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/30">
            <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
              <Music size={20} /> Performance Details
            </h4>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>
                • <strong>Duration:</strong> Approximately 2.5-3 hours with
                intermission
              </li>
              <li>
                • <strong>Language:</strong> Performed in English with dramatic
                presentation
              </li>
              <li>
                • <strong>Format:</strong> Full choir, soloists, and orchestral
                accompaniment
              </li>
              <li>
                • <strong>Attire:</strong> Smart casual to formal (premium
                cultural experience)
              </li>
              <li>
                • <strong>Age Recommendation:</strong> Suitable for ages 12+
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Ticket Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-5xl mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
            🎫 Secure Your Seat
          </h2>
          <p className="text-center text-gray-200 mb-10 text-lg">
            Choose your ticket tier for Mendelssohn's <em>Paul</em> — 5th
            Anniversary Concert
          </p>

          <TicketStore tickets={tickets} />
        </motion.div>

        {/* Why Choose The Chorus Abuja */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-full max-w-5xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-400/20 rounded-2xl p-10 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-200 mb-10 text-center flex items-center justify-center gap-3">
            <Heart size={32} /> Why The Chorus Abuja?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-indigo-200 mb-3">
                5 Years of Excellence
              </h3>
              <p className="text-gray-300">
                Consistently delivering world-class performances with musical
                precision and emotional depth across Abuja's finest venues.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-indigo-200 mb-3">
                Dramatic Storytelling
              </h3>
              <p className="text-gray-300">
                We bring sacred music to life through authentic interpretation
                and compelling presentation that moves audiences profoundly.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-indigo-200 mb-3">
                Cultural Bridge
              </h3>
              <p className="text-gray-300">
                Our unique blend of African sensibilities with European
                classical traditions creates unforgettable musical moments.
              </p>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-yellow-400/40">
            <h4 className="text-xl font-semibold text-yellow-300 mb-4 text-center">
              💬 Audience Testimonials
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <blockquote className="italic text-gray-200 border-l-4 border-yellow-400 pl-4">
                "Absolutely transcendent. The way The Chorus brought
                Mendelssohn's vision to life was breathtaking. A truly
                transformative experience."
                <cite className="block mt-3 text-yellow-300 font-medium">
                  — Archbishop Peter Badejo, Hymn of Praise Attendee
                </cite>
              </blockquote>
              <blockquote className="italic text-gray-200 border-l-4 border-yellow-400 pl-4">
                "I've attended classical performances around the world, and this
                matched any of them. Simply magnificent."
                <cite className="block mt-3 text-yellow-300 font-medium">
                  — Dr. Chioma Okafor, Music Critic
                </cite>
              </blockquote>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mb-12 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 backdrop-blur-sm border border-yellow-400/50 rounded-2xl p-10 text-center max-w-3xl"
        >
          <h3 className="text-3xl font-bold text-yellow-300 mb-4">
            🎯 Don't Miss This Historic Performance
          </h3>
          <p className="text-gray-200 mb-6 leading-relaxed text-lg">
            Join hundreds of music enthusiasts, faith seekers, and cultural
            connoisseurs for an evening that transcends ordinary concert
            experiences. Secure your ticket today before capacity is reached.
          </p>

          <div className="mt-8 text-gray-300 space-y-2">
            <p className="text-sm">📞 For Inquiries & Bulk Orders:</p>
            <div className="text-base font-semibold text-yellow-300">
              📱 Contact The Chorus Abuja Team
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-sm space-y-2">
          <p>
            📅 <strong>September 13, 2026</strong> | ⏰{" "}
            <strong>4PM Doors, 5PM Start</strong>
          </p>
          <p>
            📍{" "}
            <strong>
              National University Commission Auditorium, Maitama, Abuja
            </strong>
          </p>
          <p className="pt-4 border-t border-gray-600">
            Presented by{" "}
            <strong className="text-blue-300">The Chorus Abuja</strong> • A
            celebration of sacred music and artistic excellence
          </p>
        </div>
      </div>
    </main>
  );
}
