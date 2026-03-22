"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";

export default function AlleluiaLyricsPage() {
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
                  Alleluia
                </h1>
                <p className="text-xl text-gray-600">
                  <Music className="inline mr-2" size={24} />
                  Soprano Solo
                </p>
                <p className="text-lg text-amber-700 font-semibold">
                  Composer: Traditional (arranged for concert performance)
                </p>
              </div>
            </Reveal>

            {/* Context */}
            <Reveal delay={0.1}>
              <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2">
                  About This Song
                </h3>
                <p className="text-amber-900">
                  "Alleluia" is a timeless expression of praise and joy found in
                  both sacred and secular music traditions. In this performance,
                  the soprano voice soars with pure jubilation, expressing the
                  highest form of spiritual celebration. The word itself means
                  "Praise God" and is a universal affirmation of faith.
                </p>
              </div>
            </Reveal>

            {/* Lyrics */}
            <Reveal delay={0.2}>
              <div className="bg-white border-2 border-purple-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Lyrics
                </h2>

                <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-purple-700">
                      Alleluia
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded italic">
                    <p className="text-center text-gray-800">
                      The word "Alleluia" (Hebrew: Halleluyah) is repeated
                      throughout this uplifting sacred piece, allowing the
                      soprano voice to shine with vocal beauty and spiritual
                      fervor.
                    </p>
                  </div>

                  <div className="space-y-2 font-semibold">
                    <p className="text-center">Alleluia, Alleluia</p>
                    <p className="text-center">Praise God, Praise God</p>
                    <p className="text-center">Alleluia</p>
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
                    • <strong>Tempo:</strong> Vivace (Lively and with spirit)
                  </li>
                  <li>
                    • <strong>Character:</strong> Joyful, celebratory, and
                    spiritually uplifting
                  </li>
                  <li>
                    • <strong>Vocal Demand:</strong> Requires bright, pure tone
                    and excellent breath control
                  </li>
                  <li>
                    • <strong>Key Focus:</strong> Allow the word "Alleluia" to
                    resonate fully with each repetition
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
