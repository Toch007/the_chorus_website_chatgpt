// components/SolomonTicketCTA.tsx
"use client";

import Link from "next/link";

export default function SolomonTicketCTA() {
  return (
    <div className="text-center mt-4">
      <Link
        href="https://tix.africa/the-chorus-solomon"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-full font-bold transition"
      >
        🎟️ Get Tickets Now
      </Link>
      <p className="text-sm text-gray-600 mt-2">Limited seats available. Get your tickets before they sell out!</p>
    </div>
  );
}
