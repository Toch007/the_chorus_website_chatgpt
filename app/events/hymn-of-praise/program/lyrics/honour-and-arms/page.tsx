"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";

export default function HonourAndArmsLyricsPage() {
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
                  Honour and Arms
                </h1>
                <p className="text-xl text-gray-600">
                  <Music className="inline mr-2" size={24} />
                  Bass Solo
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
                  A commanding bass aria from Handel's oratorio <em>Samson</em>.
                  Sung by Harapha, the giant of Gath, it drips with arrogance
                  and contempt — yet is tinged with a coward's reluctance. The
                  music perfectly captures the bluster and swagger of a bully
                  who disdains a weakened opponent, making it one of Handel's
                  most dramatically vivid bass solos.
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
                    <p>Honour and arms scorn such a foe,</p>
                    <p>Though I could end thee at a blow;</p>
                    <p>Poor victory,</p>
                    <p>To conquer thee,</p>
                    <p>Or glory in thy overthrow!</p>
                    <p>Vanquish a slave that is half slain:</p>
                    <p>So mean a triumph I disdain.</p>
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
                    • <strong>Tempo:</strong> Allegro (Bold and decisive)
                  </li>
                  <li>
                    • <strong>Source:</strong> <em>Samson</em>, HWV 57 (1743)
                  </li>
                  <li>
                    • <strong>Vocal Demand:</strong> Rich, resonant bass tone
                    with clear diction
                  </li>
                  <li>
                    • <strong>Character:</strong> Arrogant, sneering, and
                    dramatically imposing
                  </li>
                  <li>
                    • <strong>Dynamics:</strong> Strong projection throughout;
                    contempt conveyed in every phrase
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
