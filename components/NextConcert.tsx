"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountdownTimer from "@/components/CountdownTimer";
import { Calendar, MapPin, Music, Ticket } from "lucide-react";

const CONCERT_DATE = "2026-09-13T17:00:00";

const tiers = [
  {
    name: "Bronze",
    price: "₦10,000",
    color: "from-amber-700 to-amber-900",
    border: "border-amber-600",
    text: "text-amber-300",
    badge: "bg-amber-700",
  },
  {
    name: "Silver",
    price: "₦25,000",
    color: "from-gray-500 to-gray-700",
    border: "border-gray-400",
    text: "text-gray-300",
    badge: "bg-gray-500",
  },
  {
    name: "Gold",
    price: "₦50,000",
    color: "from-yellow-500 to-yellow-700",
    border: "border-yellow-400",
    text: "text-yellow-300",
    badge: "bg-yellow-600",
    featured: true,
  },
  {
    name: "Diamond",
    price: "₦100,000",
    color: "from-blue-600 to-blue-900",
    border: "border-blue-400",
    text: "text-blue-300",
    badge: "bg-blue-700",
  },
];

export default function NextConcert() {
  return (
    <section
      id="next-concert"
      className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <Reveal direction="down" delay={0.1}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
              5th Anniversary Concert
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Mendelssohn&apos;s{" "}
              <span className="text-amber-400 italic">Paul</span>
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              An extraordinary evening celebrating five years of choral
              excellence with Mendelssohn&apos;s monumental oratorio,{" "}
              <em>Paulus (Op. 36)</em>.
            </p>
          </div>
        </Reveal>

        {/* Event details + image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <Reveal direction="left" delay={0.2}>
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-blue-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Calendar className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Date
                  </div>
                  <div className="font-semibold text-lg">
                    Saturday, September 13, 2026
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-blue-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Venue
                  </div>
                  <div className="font-semibold">NUC Auditorium</div>
                  <div className="text-sm text-gray-400">
                    Muhammadu Buhari Way, Maitama, Abuja
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-blue-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Music className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Programme
                  </div>
                  <div className="font-semibold">
                    Mendelssohn&apos;s Paulus, Op. 36
                  </div>
                  <div className="text-sm text-gray-400">
                    Plus special musical interludes
                  </div>
                </div>
              </div>

              <Link
                href="/events/paul"
                className="inline-flex items-center gap-2 mt-2 text-amber-400 hover:text-amber-300 font-medium transition"
              >
                Full concert details →
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50 border border-white/10 aspect-[4/3]">
              <Image
                src="/images/paul.jpeg"
                alt="Mendelssohn's Paul — The Chorus Abuja 5th Anniversary"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs text-gray-300 uppercase tracking-wide mb-1">
                  Next Concert
                </div>
                <div className="text-white font-bold text-lg">
                  Mendelssohn&apos;s Paul
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Countdown */}
        <Reveal direction="up" delay={0.3}>
          <div className="text-center mb-14">
            <div className="text-sm text-gray-400 uppercase tracking-widest mb-4">
              Concert begins in
            </div>
            <CountdownTimer targetDate={CONCERT_DATE} />
          </div>
        </Reveal>

        {/* Ticket tiers */}
        <Reveal direction="up" delay={0.4}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              <Ticket className="inline w-6 h-6 text-amber-400 mr-2 -mt-1" />
              Choose Your Ticket
            </h3>
            <p className="text-gray-400 text-sm">
              Secure your seat today — limited availability per tier
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {tiers.map((tier) => (
              <Link
                key={tier.name}
                href="/events/paul/tickets"
                className={`relative rounded-xl border ${tier.border} bg-gradient-to-b ${tier.color} p-5 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="text-lg font-bold text-white mb-1">
                  {tier.name}
                </div>
                <div className={`text-xl font-extrabold ${tier.text} mb-2`}>
                  {tier.price}
                </div>
                <div className="text-xs text-white/70 group-hover:text-white transition">
                  Book now →
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/events/paul/tickets"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:scale-105 transition-all duration-300 text-lg"
            >
              🎟 Buy Tickets Now
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
