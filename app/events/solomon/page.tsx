// app/events/solomon/page.tsx
"use client";

import TicketStore, { Ticket } from "@/components/TicketStore";
import { motion } from "framer-motion";

const solomonTickets: Ticket[] = [
  { name: "Bronze", price: 10000, perks: [], color: "bg-amber-500" },
  { name: "Silver", price: 30000, perks: [], color: "bg-slate-400" },
  { name: "Gold", price: 50000, perks: [], color: "bg-yellow-400" },
  { name: "Diamond", price: 100000, perks: ["🎟 Admits 2 Persons"], color: "bg-blue-600" },
];


export default function SolomonEventPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Full-viewport background with 'parallax-like' fixed behavior */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover bg-fixed"
        style={{ backgroundImage: "url('/images/solomon-1.jpg')" }}
        aria-hidden
      />

      {/* dark overlay */}
      <div className="absolute inset-0 -z-5 bg-black/60" />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold mb-3"
        >
          Handel’s <span className="text-yellow-300">Solomon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="max-w-2xl text-lg md:text-xl mb-8 text-gray-100"
        >
          A dramatized musical performance by <strong>The Chorus Abuja</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="w-full max-w-6xl"
        >
          {/* TicketStore is a reusable component; tickets are provided here only */}
          <div className="px-4 py-8 rounded-2xl">
            <TicketStore tickets={solomonTickets as Ticket[]} />
          </div>
        </motion.div>

        <div className="mt-8 text-gray-200 text-sm">
          📅 <strong>Date:</strong> November 16, 2025 &nbsp;•&nbsp; 📍 <strong>Venue:</strong> Nigerian Society of Engineers Hall, 1012, Sani Abacha Way, CBD, Abuja
        </div>
      </div>
    </main>
  );
}
