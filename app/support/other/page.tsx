"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SupportForm from "@/components/SupportForm";

export default function OtherSupportPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-12 text-center">
        <Reveal>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Other Ways to Support</h1>
        </Reveal>

        <Reveal>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Whether you're a volunteer, service provider, or just have something unique to offer, we'd love to connect.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10">
            <SupportForm purpose="Alternative Support" />
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
