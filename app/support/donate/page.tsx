"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main content stretches */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-20 space-y-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Support Through Giving
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Thank you for choosing to support The Chorus Abuja. Your donation empowers
          voices and builds communities.
        </p>

        {/* Online donation buttons */}
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

        {/* Bank transfer option */}
        <div className="mt-12 p-6 border rounded-lg bg-gray-50 text-gray-800 shadow">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Bank Transfer
          </h2>
          <p className="mb-2">You can also support us directly via bank transfer:</p>
          <div className="font-medium">
            <p>Account Name: <span className="font-bold">The Chorus Ensemble and Music Society</span></p>
            <p>Account Number: <span className="font-bold">1229281261</span></p>
            <p>Bank Name: <span className="font-bold">Zenith Bank</span></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
