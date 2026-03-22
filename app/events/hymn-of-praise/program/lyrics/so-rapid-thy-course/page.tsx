"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";

export default function SoRapidThyCourseLyricsPage() {
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
                  So Rapid Thy Course
                </h1>
                <p className="text-xl text-gray-600">
                  <Music className="inline mr-2" size={24} />
                  Alto Solo
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
                  This beautiful soprano/alto aria showcases the agility and
                  expressiveness of the voice, featuring rapid passages that
                  demonstrate the technical skill of the performer. It's one of
                  Handel's most beloved concert pieces.
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
                    <p>So rapid thy course, so rapid thy course</p>
                    <p>Through air dost thou fly,</p>
                    <p>Like arrow let loose from a bow well-employ'd,</p>
                    <p>So rapid thy course through the air dost thou fly!</p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      With ease we pursue thee through storm and through strife,
                    </p>
                    <p>With speed we assail thee,</p>
                    <p>
                      Hope says that success and that victory shall fail thee,
                    </p>
                    <p>And rest shall succeed to the turmoil of life.</p>
                  </div>

                  <div className="space-y-2">
                    <p>So rapid thy course, so rapid thy course</p>
                    <p>Through air dost thou fly,</p>
                    <p>Like arrow let loose from a bow well-employ'd,</p>
                    <p>So rapid thy course through the air dost thou fly!</p>
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
                    • <strong>Tempo:</strong> Allegro (Quick and lively)
                  </li>
                  <li>
                    • <strong>Key:</strong> Originally in G major
                  </li>
                  <li>
                    • <strong>Tech Challenge:</strong> Watch for rapid
                    coloratura passages
                  </li>
                  <li>
                    • <strong>Emotional Arc:</strong> Hopeful and energetic
                    throughout
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
