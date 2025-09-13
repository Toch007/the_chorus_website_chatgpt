"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DonatePage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Support Through Giving</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Thank you for choosing to support The Chorus Abuja. Your donation empowers voices and builds communities.
        </p>

        <div className="flex justify-center gap-6 flex-wrap mt-8">
          <a
            href="https://paystack.com/pay/thechorusdonate"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Donate with Paystack
          </a>
          <a
            href="https://flutterwave.com/pay/thechorusdonate"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
          >
            Donate with Flutterwave
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
