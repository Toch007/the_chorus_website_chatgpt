"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";

export default function GoodnewsLyricsPage() {
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
                  Ain'-a That Good News!
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
                  "Goodnews" is a joyous African American spiritual that
                  proclaims the message of hope and salvation. Rooted in the
                  African American church tradition, this piece carries the
                  spiritual and emotional depth of a people who found strength,
                  faith, and joy through music. Its celebratory nature makes it
                  a perfect expression of thanksgiving and hope.
                </p>
              </div>
            </Reveal>

            {/* Lyrics */}
            <Reveal delay={0.2}>
              <div className="bg-white border-2 border-purple-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Lyrics
                </h2>

                <div className="space-y-8 text-gray-800 leading-relaxed">
                  {/* Choral Prelude */}
                  <div className="space-y-3 pb-4 border-b-2 border-purple-300 bg-purple-50 p-4 rounded">
                    <p className="font-bold text-purple-900">Choral Prelude:</p>
                    <p className="text-purple-900">
                      William Dawson – Ain'-a that good news!
                    </p>
                  </div>

                  {/* Verse 1 */}
                  <div className="space-y-3 pb-4 border-b border-gray-300">
                    <p className="font-semibold text-purple-700">Verse 1:</p>
                    <div className="ml-4 space-y-2">
                      <p>I've got a crown up in the Kingdom,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                    <div className="ml-4 space-y-2 mt-4 p-3 bg-amber-50 rounded border-l-4 border-amber-400">
                      <p className="font-semibold">Refrain:</p>
                      <p>I'm going to lay down this world,</p>
                      <p>Going to shoulder up my cross;</p>
                      <p>Going to take it home to my Jesus,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                  </div>

                  {/* Verse 2 */}
                  <div className="space-y-3 pb-4 border-b border-gray-300">
                    <p className="font-semibold text-purple-700">Verse 2:</p>
                    <div className="ml-4 space-y-2">
                      <p>I've got a harp up in the Kingdom,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                    <div className="ml-4 space-y-2 mt-4 p-3 bg-amber-50 rounded border-l-4 border-amber-400">
                      <p className="font-semibold">Refrain:</p>
                      <p>I'm going to lay down this world,</p>
                      <p>Going to shoulder up my cross;</p>
                      <p>Going to take it home to my Jesus,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                  </div>

                  {/* Verse 3 */}
                  <div className="space-y-3 pb-4 border-b border-gray-300">
                    <p className="font-semibold text-purple-700">Verse 3:</p>
                    <div className="ml-4 space-y-2">
                      <p>I've got a robe up in the Kingdom,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                    <div className="ml-4 space-y-2 mt-4 p-3 bg-amber-50 rounded border-l-4 border-amber-400">
                      <p className="font-semibold">Refrain:</p>
                      <p>I'm going to lay down this world,</p>
                      <p>Going to shoulder up my cross;</p>
                      <p>Going to take it home to my Jesus,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                  </div>

                  {/* Verse 4 */}
                  <div className="space-y-3">
                    <p className="font-semibold text-purple-700">Verse 4:</p>
                    <div className="ml-4 space-y-2">
                      <p>I've got a Savior in the Kingdom,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                    <div className="ml-4 space-y-2 mt-4 p-3 bg-amber-50 rounded border-l-4 border-amber-400">
                      <p className="font-semibold">Refrain:</p>
                      <p>I'm going to lay down this world,</p>
                      <p>Going to shoulder up my cross;</p>
                      <p>Going to take it home to my Jesus,</p>
                      <p className="font-semibold">Ain't that good news.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Cultural Notes */}
            <Reveal delay={0.3}>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-900 mb-3">
                    Historical Significance
                  </h4>
                  <p className="text-green-900 text-sm">
                    African American spirituals emerged from the experiences of
                    enslaved people, blending African musical traditions with
                    Christian theology. They represent resilience, hope, and the
                    enduring human spirit.
                  </p>
                </div>
                <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-3">
                    Performance Style
                  </h4>
                  <p className="text-indigo-900 text-sm">
                    Spirituals are best performed with genuine feeling and
                    authentic joy. The call-and-response style and rhythmic
                    vitality are essential to capturing the true spirit of the
                    tradition.
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
                    • <strong>Tempo:</strong> Allegro (With rhythmic vitality)
                  </li>
                  <li>
                    • <strong>Character:</strong> Joyful, celebratory, and
                    uplifting
                  </li>
                  <li>
                    • <strong>Style:</strong> Call-and-response traditions
                    should be embraced
                  </li>
                  <li>
                    • <strong>Dynamics:</strong> Build energy and enthusiasm
                    throughout
                  </li>
                  <li>
                    • <strong>Authenticity:</strong> Sing from the heart with
                    genuine emotion
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
