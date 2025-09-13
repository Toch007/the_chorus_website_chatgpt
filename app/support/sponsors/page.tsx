"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SupportForm from "@/components/SupportForm";

export default function SponsorsPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-12 text-center">
        <Reveal>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Become a Sponsor</h1>
        </Reveal>

        <Reveal>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Join us in nurturing musical excellence while gaining visibility for your brand.
            Sponsoring The Chorus Abuja is a meaningful way to invest in culture, talent, and impact.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10">
            <SupportForm purpose="Sponsorship" />
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
