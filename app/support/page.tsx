"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-20 space-y-16">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Join Us in Making a Difference
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Music inspires, heals, and brings people together. Your support helps us
            continue to perform, mentor, and impact lives through music.
          </p>
        </section>

        {/* Support Options */}
        <section className="grid md:grid-cols-3 gap-8">
          {/* Donate Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <Image
              src="/images/donate-icon.png"
              alt="Donate"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">Make a Donation</h2>
            <p className="text-gray-600 mb-4">
              Support our mission with a one-time or recurring donation. Every amount counts.
            </p>
            <Link
              href="/support/donate"
              className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Donate Now
            </Link>
          </div>

          {/* Sponsor Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <Image
              src="/images/sponsor-icon.png"
              alt="Sponsor"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">Become a Sponsor</h2>
            <p className="text-gray-600 mb-4">
              Partner with us as a sponsor and gain visibility while supporting musical excellence.
            </p>
            <Link
              href="/support/sponsors"
              className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Sponsor Us
            </Link>
          </div>

          {/* Partner Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <Image
              src="/images/partner-icon.png"
              alt="Partner"
              width={64}
              height={64}
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">Partner With Us</h2>
            <p className="text-gray-600 mb-4">
              Collaborate with us for community outreach, media projects, and more.
            </p>
            <Link
              href="/support/partners"
              className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Let’s Talk
            </Link>
          </div>
        </section>

        {/* Additional Impact Section */}
        <section className="text-center py-16 bg-blue-50 rounded-lg">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Every Voice Matters. So Does Every Gift.
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Your generosity helps fund rehearsals, musical instruments, community concerts,
            scholarships, and outreach programs. Be part of a legacy of harmony and impact.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
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
            <Link
              href="/support/donate"
              className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
            >
              More Options
            </Link>
          </div>
        </section>

        {/* Looking to Support Differently */}
        <section className="text-center bg-gray-100 rounded-lg p-10">
          <h2 className="text-2xl font-bold mb-4">Looking to Support Differently?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Whether you're a volunteer, service provider, or just want to help, we’d love to hear from you.
          </p>
          <Link
            href="/support/other"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Reach Out
          </Link>
        </section>

        {/* Thank You Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Thank You for Supporting the Chorus Abuja 🎶
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your involvement empowers voices, builds community, and celebrates the transformative power of music.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
