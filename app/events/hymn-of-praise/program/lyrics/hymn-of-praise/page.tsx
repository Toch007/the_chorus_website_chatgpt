"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";

export default function HymnOfPraiseLyricsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
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
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                  Hymn of Praise
                </h1>
                <p className="text-2xl text-gray-600 mb-2">
                  <Music className="inline mr-2" size={28} />
                  Symphony-Cantata
                </p>
                <p className="text-lg text-amber-700 font-semibold mb-4">
                  Composer: Felix Mendelssohn (1840)
                </p>
                <p className="text-lg text-gray-600">
                  Original German Title: <em>Lobgesang</em>
                </p>
              </div>
            </Reveal>

            {/* Overview */}
            <Reveal delay={0.1}>
              <div className="mb-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-2 text-lg">
                  About This Work
                </h3>
                <p className="text-amber-900 leading-relaxed mb-3">
                  Mendelssohn's <em>Hymn of Praise</em> (Lobgesang, Op. 52) is a
                  symphonic cantata blending biblical texts (primarily Psalms)
                  with German chorales, celebrating the victory of light over
                  darkness. This masterpiece combines the orchestral splendor of
                  a symphony with the emotional depth of sacred music, making it
                  one of the most beloved works in the choral repertoire.
                </p>
                <p className="text-amber-900">
                  <strong>Duration:</strong> Approximately 45 minutes |{" "}
                  <strong>Language:</strong> German with English translations
                </p>
              </div>
            </Reveal>

            {/* Main Sections */}
            <Reveal delay={0.2}>
              <div className="bg-white border-2 border-purple-200 rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  10 Movements & Lyrics
                </h2>

                <div className="space-y-8">
                  {/* Movement 1 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      I. All Men, All Things (Opening Chorus)
                    </h3>
                    <div className="p-4 bg-purple-50 rounded mb-3">
                      <p className="font-semibold text-purple-900 mb-2">
                        German:
                      </p>
                      <p className="italic text-gray-800 mb-3">
                        "Alles was Odem hat, lobe den Herrn! Halleluja!"
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800 mb-3">
                        "All men, all things, all that have life and breath,
                        sing to the Lord. Praise the Lord with lute and harp, in
                        joyful song extolling. And let all flesh magnify God's
                        bountiful glory."
                      </p>
                    </div>
                  </div>

                  {/* Movement 2 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      II. Praise Thou the Lord (Chorus)
                    </h3>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "Praise thou the Lord, O my soul. Praise the Lord, I
                        will sing praises unto my God while I have being. Great
                        and glorious is the Lord, and his mercy endureth all the
                        day."
                      </p>
                    </div>
                  </div>

                  {/* Movement 3 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      III. Sing Ye Praise (Tenor Recitative & Aria)
                    </h3>
                    <div className="p-4 bg-purple-50 rounded mb-3">
                      <p className="font-semibold text-purple-900 mb-2">
                        Opening:
                      </p>
                      <p className="italic text-gray-800">"Sing Ye Praise"</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "Sing ye praise, all ye redeemed of the Lord, redeemed
                        from the hand of the foe, from your distresses, from
                        deep affliction, who sat in the shadow of death and
                        darkness."
                      </p>
                    </div>
                  </div>

                  {/* Movement 4 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      IV. All Ye That Cried Unto the Lord (Chorus)
                    </h3>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "All ye that cried unto the Lord in distress and deep
                        affliction, God counteth all your sorrows in the time of
                        need, and to the faithful few, he giveth strength and
                        consolation."
                      </p>
                    </div>
                  </div>

                  {/* Movement 5 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      V. I Waited for the Lord (Duet & Chorus)
                    </h3>
                    <div className="p-4 bg-purple-50 rounded mb-3">
                      <p className="font-semibold text-purple-900 mb-2">
                        German:
                      </p>
                      <p className="italic text-gray-800">
                        "Ich harrete des Herrn"
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "I waited for the Lord, who inclined unto me and heard
                        my complaint. O blessed are they that hope and trust in
                        the Lord."
                      </p>
                    </div>
                  </div>

                  {/* Movement 6 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      VI. The Sorrows of Death (Chorus)
                    </h3>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "The sorrows of death compassed us, the pains of hell
                        gat hold upon us. We found trouble and sorrow. But we
                        called upon the name of the Lord, and the Lord delivered
                        us from our distress."
                      </p>
                    </div>
                  </div>

                  {/* Movement 7 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      VII. The Night is Departing (Tenor & Chorus)
                    </h3>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "The night is departing, the day is approaching.
                        Therefore let us cast off the works of darkness, and
                        gird on the armor of light. O praise his name, for his
                        mercy endureth forever."
                      </p>
                    </div>
                  </div>

                  {/* Movement 8 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      VIII. Let All Men Praise the Lord (Chorus)
                    </h3>
                    <div className="p-4 bg-green-50 rounded mb-3">
                      <p className="font-semibold text-green-900 mb-2">
                        German:
                      </p>
                      <p className="italic text-gray-800 mb-3">
                        "Nun danket alle Gott" (Now Thank We All Our God)
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded">
                      <p className="font-semibold text-green-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "Let all men praise the Lord with all their heart and
                        might, and let all flesh magnify God's bountiful glory.
                        Give thanks unto the Lord for his mercy endureth
                        forever. Halleluja!"
                      </p>
                    </div>
                  </div>

                  {/* Movement 9 */}
                  <div className="border-b-2 border-gray-200 pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      IX. My Song Shall Be Alway Thy Mercy (Solo & Chorus)
                    </h3>
                    <div className="p-4 bg-blue-50 rounded">
                      <p className="font-semibold text-blue-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "My song shall be alway thy mercy, O Lord. With my mouth
                        will I faithfully proclaim thy truth, and all the days
                        of my life will I sing of thy goodness and thy grace."
                      </p>
                    </div>
                  </div>

                  {/* Movement 10 */}
                  <div className="pb-6">
                    <h3 className="text-2xl font-bold text-purple-800 mb-4">
                      X. Ye Nations, Offer to the Lord (Final Chorus)
                    </h3>
                    <div className="p-4 bg-indigo-50 rounded mb-3">
                      <p className="font-semibold text-indigo-900 mb-2">
                        German:
                      </p>
                      <p className="italic text-gray-800 mb-3">
                        "Halleluja!" and "Praise the Lord"
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded">
                      <p className="font-semibold text-green-900 mb-2">
                        English Translation:
                      </p>
                      <p className="text-gray-800">
                        "Ye nations, offer to the Lord glory and strength. Offer
                        to the Lord the glory due unto his name. Bring an
                        offering, and come into his courts. Worship the Lord in
                        the beauty of holiness. Let the whole earth be filled
                        with his glory. Amen, Halleluja!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Key Lyrical Themes */}
            <Reveal delay={0.3}>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-3 text-lg">
                    Themes of Hope
                  </h4>
                  <p className="text-indigo-900">
                    Throughout the work, Mendelssohn emphasizes themes of faith,
                    perseverance, and ultimate salvation. The music builds from
                    quiet contemplation to overwhelming joy and celebration.
                  </p>
                </div>
                <div className="p-6 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-bold text-rose-900 mb-3 text-lg">
                    Universal Message
                  </h4>
                  <p className="text-rose-900">
                    The inclusion of Latin text ("Laudate, omnes gentes")
                    alongside German lyrics emphasizes the universal nature of
                    praise and worship that transcends language and culture.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Performance Notes */}
            <Reveal delay={0.4}>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 mb-8">
                <h3 className="font-bold text-blue-900 mb-3 text-lg">
                  About The Performance
                </h3>
                <ul className="text-blue-900 space-y-2">
                  <li>
                    • <strong>Orchestra:</strong> Full symphony orchestra
                    including woodwinds, brass, and timpani
                  </li>
                  <li>
                    • <strong>Choir:</strong> SATB (Soprano, Alto, Tenor, Bass)
                    chorus
                  </li>
                  <li>
                    • <strong>Soloists:</strong> Featured soprano, alto, tenor,
                    and bass soloists
                  </li>
                  <li>
                    • <strong>Total Duration:</strong> Approximately 40-45
                    minutes
                  </li>
                  <li>
                    • <strong>Original Language:</strong> German (with Latin
                    intonations)
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Historical Context */}
            <Reveal delay={0.5}>
              <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-3 text-lg">
                  Complete Work Structure
                </h3>
                <p className="text-amber-900 leading-relaxed mb-4">
                  Mendelssohn's monumental symphony-cantata unfolds through 10
                  distinct movements, each blending orchestral virtuosity with
                  choral and solo vocal writing. The work progresses from joyful
                  celebration of divine glory, through reflections on human
                  suffering and redemption, to ultimate triumph and
                  thanksgiving.
                </p>
                <div className="space-y-2">
                  <p className="text-amber-900 font-semibold">
                    The narrative arc:
                  </p>
                  <ul className="text-amber-900 space-y-1 ml-4 list-disc">
                    <li>Movements 1-2: Opening praise and exaltation</li>
                    <li>Movements 3-6: Journey through affliction and faith</li>
                    <li>
                      Movements 7-10: Transition from darkness to light and
                      final rejoicing
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
