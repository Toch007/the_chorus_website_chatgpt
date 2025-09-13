// app/events/solomon/page.tsx

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolomonTicketCTA from "@/components/SolomonTicketCTA";


export const metadata = {
  title: "Solomon – A Choral Experience | The Chorus Abuja",
  description: "Tickets now available! Join The Chorus Abuja in October 2025 for Solomon – a powerful choral experience at Nigerian Society of Engineers Hall, 1012, Sani Abacha Way, CBD, Abuja,.",
  openGraph: {
    title: "Solomon – A Choral Experience",
    description: "Get your tickets now for Solomon, a moving concert by The Chorus Abuja – Novermber 16 2025, Nigerian Society of Engineers Hall, 1012, Sani Abacha Way, CBD, Abuja,.",
    url: "https://thechorusabuja.com/events/solomon",  // or your production URL
    images: ["/images/solomon1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solomon – A Choral Experience",
    description: "Get your tickets now for Solomon by The Chorus Abuja. Limited seats. Nigerian Society of Engineers Hall, 1012, Sani Abacha Way, CBD, Abuja, November 16, 2025.",
    images: ["/images/solomon1.jpg"],
  },
};

export default function SolomonPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-800 px-6 py-20 max-w-4xl mx-auto">
        <Image
          src="/images/solomon1.jpg"
          alt="Solomon Concert"
          width={1000}
          height={600}
          className="rounded-xl w-full object-cover mb-6"
        />

        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Solomon – A Choral Experience
        </h1>

        <p className="text-lg mb-6">
          Tickets are now available for one of the most breathtaking performances by The Chorus Abuja. “Solomon” is a powerful, dramatic, and uplifting musical journey through the wisdom, wealth, and worship of King Solomon.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🎫 Ticket Information</h2>
        <p className="mb-4">
          Tickets are available in multiple tiers, including General Admission and VIP seating. Early-bird discounts may apply until stock runs out.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">📍 Venue</h2>
        <p className="mb-4">Nigerian Society of Engineers Hall, 1012, Sani Abacha Way, CBD, Abuja</p>

        <h2 className="text-2xl font-semibold text-blue-800 mb-2">📅 Date</h2>
        <p className="mb-6">Sunday November 16, 2025 — Exact date & time available on ticket page.</p>

        <div className="mt-10 text-center">
          <SolomonTicketCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
