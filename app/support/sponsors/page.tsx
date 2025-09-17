"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SupportForm from "@/components/SupportForm";

export default function SponsorsPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-20 space-y-16 text-center">
        {/* Hero */}
        <Reveal>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Become a Sponsor
          </h1>
        </Reveal>
        <Reveal>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Join us in nurturing musical excellence while gaining visibility for
            your brand. Sponsoring The Chorus Abuja is a meaningful way to
            invest in culture, talent, and impact.
          </p>
        </Reveal>

        {/* Why Sponsor */}
        <Reveal>
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-800">
              Why Partner With Us?
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The Chorus Abuja is more than just a choir — we are a community
              that inspires, educates, and uplifts through music. By partnering
              with us, your brand aligns with excellence, creativity, and social
              impact, while reaching a wide audience at our concerts, workshops,
              and digital platforms.
            </p>
          </section>
        </Reveal>

        {/* Sponsorship Benefits */}
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Sponsorship Benefits
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 border rounded-lg shadow bg-white">
                <h3 className="text-lg font-bold text-blue-700 mb-2">
                  Brand Visibility
                </h3>
                <p className="text-gray-600">
                  Showcase your brand to diverse audiences at concerts,
                  festivals, and across our digital platforms.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow bg-white">
                <h3 className="text-lg font-bold text-blue-700 mb-2">
                  Community Impact
                </h3>
                <p className="text-gray-600">
                  Support local talent and youth development while enhancing
                  your corporate social responsibility (CSR) profile.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow bg-white">
                <h3 className="text-lg font-bold text-blue-700 mb-2">
                  Exclusive Access
                </h3>
                <p className="text-gray-600">
                  Receive VIP invitations, backstage access, and networking
                  opportunities with influential leaders.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Sponsorship Tiers */}
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Partnership Opportunities
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 border rounded-lg shadow bg-gray-50">
                <h3 className="text-xl font-bold text-blue-700">Bronze</h3>
                <p className="text-gray-600 mt-2">
                  Logo on event programs and website.  
                  2 complimentary concert tickets.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow bg-yellow-50">
                <h3 className="text-xl font-bold text-yellow-700">Silver</h3>
                <p className="text-gray-600 mt-2">
                  Logo on banners, programs, and website.  
                  4 complimentary tickets and social media mention.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow bg-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Gold</h3>
                <p className="text-gray-600 mt-2">
                  Premium logo placement on all platforms.  
                  6 tickets, social media features, and stage mentions.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Call to Action + Form */}
        <Reveal>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Ready to Join Us?
            </h2>
            <p className="text-gray-700 mb-6">
              Fill out the sponsorship form below and our team will reach out to
              explore the best partnership package for your brand.
            </p>
            <SupportForm purpose="Sponsorship" />
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
