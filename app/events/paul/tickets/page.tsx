"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TicketStore from "@/components/TicketStore";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { shouldShowThankYouPage } from "@/config/paul";

const tickets = [
  { name: "Bronze", price: 10000, perks: [], color: "bg-amber-700" },
  { name: "Silver", price: 25000, perks: [], color: "bg-gray-500" },
  { name: "Gold", price: 50000, perks: [], color: "bg-yellow-600" },
  { name: "Diamond", price: 100000, perks: [], color: "bg-blue-700" },
];

export default function PaulTicketsPage() {
  const router = useRouter();

  // Stop ticket sales after the concert and redirect to the thank-you page
  useEffect(() => {
    if (shouldShowThankYouPage()) {
      router.replace("/events/paul/thank-you");
    }
  }, [router]);

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      {/* Background image — subtle, blurred */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/paul.jpeg"
          alt="Mendelssohn's Paul"
          fill
          className="object-cover opacity-10 blur-sm scale-105"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/90" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href="/events/paul"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to concert details
        </Link>

        {/* Header card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 text-center mb-8 backdrop-blur-sm">
          <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
            5th Anniversary Concert · Tickets
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Mendelssohn&apos;s{" "}
            <span className="text-amber-400 italic">Paul</span>
          </h1>

          {/* Event summary bar */}
          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              Saturday, September 13, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Doors 4 PM · Concert 5 PM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              NUC Auditorium, Maitama, Abuja
            </span>
          </div>

          <p className="mt-3 text-gray-400 text-sm">
            Each ticket admits 1 person.
          </p>
        </div>

        {/* Ticket Store */}
        <TicketStore tickets={tickets} />

        {/* Footer note */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Need help? Contact us at{" "}
          <a
            href="mailto:info@thechorusabuja.org"
            className="text-amber-400 hover:underline"
          >
            info@thechorusabuja.org
          </a>
        </p>
      </div>
    </main>
  );
}
