"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";

export default function LoudAwfulThunderLyricsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link
              href="/events/hymn-of-praise/program"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-semibold"
            >
              <ArrowLeft size={20} />
              Back to Program
            </Link>

            {/* Header */}
            <Reveal>
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  Loud As The Awful Thunder
                </h1>
                <p className="text-xl text-gray-600">
                  <Music className="inline mr-2" size={24} />
                  Tenor Solo
                </p>
                <p className="text-lg text-amber-700 font-semibold">
                  Composer: George Frideric Handel
                </p>
              </div>
            </Reveal>

            {/* Context */}
            <Reveal delay={0.1}>
              <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2">
                  About This Aria
                </h3>
                <p className="text-amber-900">
                  A powerful tenor solo that demands great vocal control and
                  dramatic presence. The music mirrors the intensity of the
                  text, with dramatic leaps and powerful phrases that showcase
                  the strength and beauty of the tenor voice.
                </p>
              </div>
            </Reveal>

            {/* Lyrics */}
            <Reveal delay={0.2}>
              <div className="bg-white border-2 border-purple-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Lyrics
                </h2>

                <div className="space-y-6 text-gray-800 leading-relaxed">
                  <div className="space-y-2">
                    <p>Loud as the awful thunder's roar,</p>
                    <p>Swelling o'er the distant shore,</p>
                    <p>Let the mighty sound resound</p>
                    <p>Through all the nations round about,</p>
                    <p>Till darkness flees and terror's out,</p>
                    <p>And hope and joy prevail around.</p>
                  </div>

                  <div className="space-y-2">
                    <p>So let thy sovereign power declare,</p>
                    <p>How mighty is thy name so rare,</p>
                    <p>Let all creation join the song,</p>
                    <p>To thee belongs all power and might,</p>
                    <p>Let darkness yield unto thy light,</p>
                    <p>And righting all that hath been wrong.</p>
                  </div>

                  <div className="space-y-2">
                    <p>Loud as the awful thunder's roar,</p>
                    <p>Swelling o'er the distant shore,</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Notes */}
            <Reveal delay={0.3}>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">
                  Performance Tips
                </h3>
                <ul className="text-blue-900 space-y-2">
                  <li>
                    • <strong>Tempo:</strong> Allegro maestoso (Stately and
                    powerful)
                  </li>
                  <li>
                    • <strong>Key:</strong> D major
                  </li>
                  <li>
                    • <strong>Vocal Demand:</strong> Requires strong high notes
                    and brilliant tone
                  </li>
                  <li>
                    • <strong>Character:</strong> Majestic, powerful, and
                    authoritative
                  </li>
                  <li>
                    • <strong>Dynamics:</strong> Use broad dynamic range to
                    convey power
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
