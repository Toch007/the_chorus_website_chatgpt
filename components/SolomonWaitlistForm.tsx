"use client";

import Link from "next/link";

export default function SolomonWaitlistForm() {
  return (
    <div className="text-center mt-4">
      <Link
        href="https://tickets.thechorusabuja.com" // 🔁 Replace with your real ticket URL
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-3 rounded-full font-bold transition"
      >
        🎟️ Get Tickets Now
      </Link>
      <p className="text-sm text-gray-600 mt-2">Limited seats available. Book early!</p>
    </div>
  );
}
