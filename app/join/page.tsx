"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import {
  Users,
  HeartHandshake,
  Camera,
  Music,
  Quote,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import ParallaxBridge from "@/components/ParallaxBridge";

const joinOptions = [
  {
    icon: <Music className="w-10 h-10 text-blue-700" />,
    title: "Join the Choir",
    description:
      "Use your voice to inspire, uplift, and minister through music.",
    link: "/join/choir",
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-blue-700" />,
    title: "Volunteer",
    description:
      "Offer your time and energy to support our events and outreach.",
    link: "/join/volunteer",
  },
  {
    icon: <Camera className="w-10 h-10 text-blue-700" />,
    title: "Media & Creatives",
    description:
      "Help us capture and share our moments through photo, video, and design.",
    link: "/join/media",
  },
  {
    icon: <Users className="w-10 h-10 text-blue-700" />,
    title: "Tech & Logistics",
    description:
      "Assist with sound, staging, transport, and technical setup.",
    link: "/join/tech",
  },
];

const faqs = [
  {
    q: "Who can join?",
    a: "Anyone with a passion for music, service, or creativity is welcome!",
  },
  {
    q: "When are rehearsals?",
    a: "Rehearsals usually hold on weekends — you'll get exact details after signing up.",
  },
  {
    q: "Do I need musical experience?",
    a: "Not at all. We’ll guide and train you — just come with a willing heart.",
  },
];

export default function JoinPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-20 space-y-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-md p-12 text-center">
          <Reveal>
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              Join The Chorus
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Become a part of something bigger. Lend your voice, your skill, or
              your time — and help us bring light, joy, and music to the world.
            </p>
          </Reveal>
        </section>
        <ParallaxBridge
                      image="/images/gallery1.jpg"
                      heading="A Perfect Harmony"
                      subtext="Music, Excellence, Community and Creativity."
                    />

        {/* Join Options */}
        <Reveal>
          <section>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
              Ways to Get Involved
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {joinOptions.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition transform text-center block"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
        {/* Testimonials */}
        <Reveal>
          <section>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
              What Members Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl shadow">
                <Quote className="w-6 h-6 text-blue-700 mb-2" />
                <p className="italic text-gray-700">
                  “Joining The Chorus gave me a second family. I’ve grown
                  spiritually and musically.”
                </p>
                <footer className="mt-4 text-sm font-medium text-blue-700">
                  – Joy, Alto
                </footer>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl shadow">
                <Quote className="w-6 h-6 text-blue-700 mb-2" />
                <p className="italic text-gray-700">
                  “I love the energy, the passion, and the sense of purpose here.
                  It’s powerful.”
                </p>
                <footer className="mt-4 text-sm font-medium text-blue-700">
                  – Sam, Volunteer
                </footer>
              </div>
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === idx ? null : idx)
                    }
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium hover:bg-blue-50 transition"
                  >
                    {faq.q}
                    <ChevronDown
                      className={`w-5 h-5 transform transition ${
                        openFAQ === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFAQ === idx && (
                    <div className="px-4 py-3 text-sm text-gray-700 bg-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
