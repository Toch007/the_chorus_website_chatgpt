"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";

export default function EzekielSawTheWheelLyricsPage() {
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
                  Ezekiel Saw de Wheel
                </h1>
                <p className="text-xl text-gray-600">
                  <Music className="inline mr-2" size={24} />
                  Full Chorus
                </p>
                <p className="text-lg text-amber-700 font-semibold">
                  African American Spiritual
                </p>
                <p className="text-lg text-amber-600">
                  Arranged by William L. Dawson
                </p>
              </div>
            </Reveal>

            {/* Context */}
            <Reveal delay={0.1}>
              <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2">
                  About This Spiritual
                </h3>
                <p className="text-amber-900 leading-relaxed">
                  "Ezekiel Saw the Wheel" is a powerful African American
                  spiritual based on the biblical vision of the prophet Ezekiel.
                  The wheels symbolize the mighty hand of God moving through
                  history and through the lives of believers. This spiritual
                  expresses faith in divine providence and the certainty of
                  God's presence. Its rhythmic vitality and spiritual power have
                  made it beloved across generations.
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
                  {/* Opening Chorus */}
                  <div className="space-y-3 pb-4 border-b-2 border-purple-300 bg-purple-50 p-4 rounded">
                    <p className="font-semibold text-purple-900">
                      Opening Chorus:
                    </p>
                    <p>Ezekul saw de wheel,</p>
                    <p>'Way up in de mid'l of de air;</p>
                    <p>De big wheel run by faith,</p>
                    <p>An' de lit'l wheel run by the grace of God,</p>
                    <p>A litlo wheel in a wheel,</p>
                    <p>'Way in do mid'l of de air,</p>
                  </div>

                  {/* Verse 1 */}
                  <div className="space-y-3 pb-4 border-b border-gray-300">
                    <p className="font-semibold text-purple-700">Verse 1:</p>
                    <div className="ml-4 space-y-2">
                      <p>Better mind my brother</p>
                      <p>How you walk en de cross,</p>
                      <p>Your foot may slip,</p>
                      <p>An' yer soul get lost.</p>
                    </div>
                  </div>

                  {/* Verse 2 */}
                  <div className="space-y-3 pb-4 border-b border-gray-300">
                    <p className="font-semibold text-purple-700">Verse 2:</p>
                    <div className="ml-4 space-y-2">
                      <p>Ole Sa'tan wears a club foot shoe,</p>
                      <p>If you don' mind he'll slip it on you.</p>
                    </div>
                  </div>

                  {/* Chorus */}
                  <div className="space-y-3 pb-4 border-b border-gray-300 p-3 bg-amber-50 rounded border-l-4 border-amber-400">
                    <p className="font-semibold">Chorus:</p>
                    <p>Ezekul saw de wheel,</p>
                    <p>Way up in de mid'l of de air.</p>
                    <p>De big wheel run by faith,</p>
                    <p>An' de lit'le wheel run by de grace of God,</p>
                    <p>A wheel in a wheel,</p>
                    <p>Way in de mid'l of de air.</p>
                  </div>

                  {/* Verse 3 */}
                  <div className="space-y-3 pb-4 border-b border-gray-300">
                    <p className="font-semibold text-purple-700">Verse 3:</p>
                    <div className="ml-4 space-y-2">
                      <p>Some go to church for to sing an' shout,</p>
                      <p>Hailelu, hallelu, halleluah!</p>
                      <p>Befo' six months dey's all tuned out</p>
                      <p>'Way in de mid'l of de air,</p>
                    </div>
                  </div>

                  {/* Final Chorus */}
                  <div className="space-y-3 p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <p className="font-semibold">Final Chorus:</p>
                    <p>Ezekul saw de wheel,</p>
                    <p>'Way in de mid'l of de air,</p>
                    <p>De big wheel run by faith,</p>
                    <p>An' de lit'le wheel run by de grace of God,</p>
                    <p>A wheel in a wheel,</p>
                    <p>Way in de mid'l of de air.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Symbolism */}
            <Reveal delay={0.3}>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-3">
                    Biblical Connection
                  </h4>
                  <p className="text-indigo-900 text-sm leading-relaxed">
                    Based on Ezekiel 1, where the prophet describes his vision
                    of God's throne supported by wheels within wheels. The
                    wheels represent God's eternal nature and sovereignty over
                    all creation.
                  </p>
                </div>
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-3">
                    Spiritual Meaning
                  </h4>
                  <p className="text-purple-900 text-sm leading-relaxed">
                    The "big wheel" represents God's sovereignty and power,
                    while the "little wheel" symbolizes human faith and God's
                    grace. Together, they represent the complete dependence on
                    God's will.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Notes */}
            <Reveal delay={0.4}>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">
                  Performance Tips
                </h3>
                <ul className="text-blue-900 space-y-2">
                  <li>
                    • <strong>Tempo:</strong> Moderato with rhythmic drive
                  </li>
                  <li>
                    • <strong>Character:</strong> Powerful, steadfast, and
                    spiritually profound
                  </li>
                  <li>
                    • <strong>Rhythm:</strong> Pay attention to the syncopation
                    and call-and-response patterns
                  </li>
                  <li>
                    • <strong>Dynamics:</strong> Build momentum and energy
                    throughout
                  </li>
                  <li>
                    • <strong>Interpretation:</strong> Sing with conviction and
                    deep spiritual conviction
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
