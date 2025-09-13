"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { Users, HeartHandshake, Camera, Music } from "lucide-react";

const joinOptions = [
  {
    icon: <Music className="w-8 h-8 text-blue-700" />,
    title: "Join the Choir",
    description: "Use your voice to inspire, uplift, and minister through music."
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-blue-700" />,
    title: "Volunteer",
    description: "Offer your time and energy to support our events and outreach."
  },
  {
    icon: <Camera className="w-8 h-8 text-blue-700" />,
    title: "Media & Creatives",
    description: "Help us capture and share our moments through photo, video, and design."
  },
  {
    icon: <Users className="w-8 h-8 text-blue-700" />,
    title: "Tech & Logistics",
    description: "Assist with sound, staging, transport, and technical setup."
  }
];

export default function JoinPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-12 text-center">
        <Reveal>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Join The Chorus</h1>
        </Reveal>

        <Reveal>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Become a part of something bigger. Lend your voice, your skill, or your time — and help us bring light, joy, and music to the world.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-2 gap-8 mt-10 text-left">
            {joinOptions.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                {item.icon}
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Ready to be part of the journey?</h2>
            <p className="text-gray-700 mb-6">
              Click the button below to fill out our interest form and we'll be in touch shortly.
            </p>
            <a
              href="https://forms.gle/Cv6icG5f6vLG7BhMA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Sign Up Now
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-24 text-left space-y-8">
            <h2 className="text-2xl font-bold text-blue-900 text-center">What Members Are Saying</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <blockquote className="border-l-4 pl-4 italic text-gray-700">
                “Joining The Chorus gave me a second family. I’ve grown spiritually and musically.”
                <footer className="mt-2 text-sm text-blue-700">– Joy, Alto</footer>
              </blockquote>
              <blockquote className="border-l-4 pl-4 italic text-gray-700">
                “I love the energy, the passion, and the sense of purpose here. It’s powerful.”
                <footer className="mt-2 text-sm text-blue-700">– Sam, Volunteer</footer>
              </blockquote>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-24 max-w-3xl mx-auto text-left space-y-6">
            <h2 className="text-2xl font-bold text-blue-900 text-center">Frequently Asked Questions</h2>
            <div>
              <h3 className="font-semibold text-blue-800">Who can join?</h3>
              <p className="text-sm text-gray-700">Anyone with a passion for music, service, or creativity is welcome!</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">When are rehearsals?</h3>
              <p className="text-sm text-gray-700">Rehearsals usually hold on weekends — you'll get exact details after signing up.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">Do I need musical experience?</h3>
              <p className="text-sm text-gray-700">Not at all. We’ll guide and train you — just come with a willing heart.</p>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
