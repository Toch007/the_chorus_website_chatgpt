"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import {
  Music,
  Clock,
  Users,
  Download,
  Share2,
  Printer,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function HymnOfPraiseProgramPage() {
  const [showQR, setShowQR] = useState(false);

  const programItems = [
    {
      number: 1,
      title: "Opening Prayer",
      performer: "Clergy",
      duration: "5 mins",
      description: "",
    },
    {
      number: 2,
      title: "Welcome Address",
      performer: "Master of Ceremonies",
      duration: "5 mins",
      description: "",
    },
    {
      number: 3,
      title: "Solos",
      duration: "15 mins",
      items: [
        {
          voice: "Alto",
          title: "So Rapid Thy Course",
          composer: "Handel",
          lyricsPath:
            "/events/hymn-of-praise/program/lyrics/so-rapid-thy-course",
        },
        {
          voice: "Tenor",
          title: "Loud as the Awful Thunder",
          composer: "Handel",
          lyricsPath:
            "/events/hymn-of-praise/program/lyrics/loud-awful-thunder",
        },
      ],
    },
    {
      number: 4,
      title: "Echoes from Last Concert",
      duration: "10 mins",
      description:
        "A song from our previous concert - a cherished favorite revisited",
    },
    {
      number: 5,
      title: "Part 1",
      duration: "20 mins",
      items: [
        {
          voice: "Soprano Solo",
          title: "Alleluia",
          composer: "Traditional",
          lyricsPath: "/events/hymn-of-praise/program/lyrics/alleluia",
        },
        {
          voice: "Bass Solo",
          title: "Honour and Arms",
          composer: "Handel",
          lyricsPath:
            "/events/hymn-of-praise/program/lyrics/loud-awful-thunder",
        },
        {
          voice: "Full Chorus",
          title: "Ain'-a That Good News!",
          composer: "African American Spiritual (arr. William L. Dawson)",
          lyricsPath: "/events/hymn-of-praise/program/lyrics/goodnews",
        },
        {
          voice: "Full Chorus",
          title: "Ezekiel Saw de Wheel",
          composer: "African American Spiritual (arr. William L. Dawson)",
          lyricsPath:
            "/events/hymn-of-praise/program/lyrics/ezekiel-saw-the-wheel",
        },
      ],
    },
    {
      number: 6,
      title: "The Chorus - Sponsorship/Partnership",
      duration: "10 mins",
      description:
        "Recognition and gratitude to our supporters. New sponsorships and partnerships are welcome.",
    },
    {
      number: 7,
      title: "The Young Chorus",
      duration: "12 mins",
      description: "A special performance by our rising talents",
    },
    {
      number: 8,
      title: "Part 2 - Mendelssohn's Hymn of Praise",
      duration: "40-45 mins",
      composer: "Felix Mendelssohn",
      description:
        "★ MAIN PERFORMANCE ★ A magnificent Symphony-Cantata celebrating praise and joy",
      featured: true,
      lyricsPath: "/events/hymn-of-praise/program/lyrics/hymn-of-praise",
    },
    {
      number: 9,
      title: "Vote of Thanks",
      performer: "Leadership",
      duration: "5 mins",
    },
    {
      number: 10,
      title: "Closing Prayer",
      performer: "Clergy",
      duration: "5 mins",
    },
    {
      number: 11,
      title: "Hallelujah Chorus",
      duration: "7 mins",
      composer: "Handel (from Messiah)",
      featured: true,
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hymn of Praise - Concert Program",
          text: "View the program for today's concert - Hmm of Praise by The Chorus Abuja",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Header Section with Background Image */}
        <section className="relative h-96 md:h-[500px] bg-cover bg-center overflow-hidden">
          <Image
            src="/images/Hymn_of_praise.jpg"
            alt="Hymn of Praise Concert"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-end p-6 md:p-12">
            <div className="max-w-4xl w-full text-white">
              <Reveal>
                <h1 className="text-5xl md:text-6xl font-bold mb-2">
                  Hymn of Praise
                </h1>
                <p className="text-2xl font-semibold mb-1">Concert Program</p>
                <p className="text-lg opacity-90">
                  March 22, 2026 • First Baptist Church, Garki II
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-12 justify-center">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
              >
                <Download size={20} /> Print Program
              </button>
              <Link
                href="/events/hymn-of-praise/program/qr-code"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Printer size={20} /> Print QR Cards
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Share2 size={20} /> Share
              </button>
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Music size={20} /> {showQR ? "Hide" : "Show"} QR Code
              </button>
            </div>

            {/* QR Code */}
            {showQR && (
              <Reveal>
                <div className="mb-12 p-8 bg-white rounded-lg shadow-lg border-2 border-purple-200 text-center">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">
                    Scan to Share Program
                  </h3>
                  <QRCodeGenerator
                    url="https://thechorusabuja.com/events/hymn-of-praise/program"
                    size={250}
                  />
                  <p className="text-sm text-gray-600 mt-4">
                    Point your phone camera at this code to view or share the
                    program
                  </p>
                </div>
              </Reveal>
            )}

            {/* Program */}
            <div className="space-y-6">
              {programItems.map((item, index) => (
                <Reveal key={index}>
                  <div
                    className={`p-6 rounded-lg border-l-4 transition hover:shadow-lg ${
                      item.featured
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 border-l-amber-600"
                        : "bg-white border-l-blue-600"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                            {item.number}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                          {item.featured && (
                            <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
                              FEATURED
                            </span>
                          )}
                        </div>

                        {item.composer && (
                          <p className="text-sm text-purple-700 font-semibold mb-2">
                            {item.composer}
                          </p>
                        )}

                        {item.description && (
                          <p className="text-gray-700 mb-3 leading-relaxed font-semibold">
                            {item.description}
                          </p>
                        )}

                        {item.lyricsPath && (
                          <Link
                            href={item.lyricsPath}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition font-semibold text-sm"
                          >
                            <BookOpen size={16} /> View Lyrics
                          </Link>
                        )}

                        {item.performer && (
                          <p className="text-sm text-gray-600 mb-2">
                            <Users className="inline mr-1" size={14} />
                            <span className="font-semibold">
                              {item.performer}
                            </span>
                          </p>
                        )}

                        {/* Sub-items for composite pieces */}
                        {item.items && (
                          <div className="mt-4 ml-4 space-y-3 border-l-2 border-gray-300 pl-4">
                            {item.items.map((subItem, subIndex) => (
                              <div key={subIndex}>
                                <p className="text-sm font-bold text-blue-700">
                                  {subItem.voice}
                                </p>
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-700 font-semibold">
                                    {subItem.title}
                                  </p>
                                  {subItem.lyricsPath && (
                                    <Link
                                      href={subItem.lyricsPath}
                                      className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
                                    >
                                      <BookOpen size={12} /> Lyrics
                                    </Link>
                                  )}
                                </div>
                                {subItem.composer && (
                                  <p className="text-xs text-gray-600">
                                    {subItem.composer}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">
                        <Clock size={18} />
                        <span className="font-semibold">{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Footer Note */}
            <Reveal>
              <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">
                  Performance Notes
                </h4>
                <ul className="text-sm text-blue-900 space-y-1">
                  <li>
                    • <strong>Mendelssohn's Hymn of Praise</strong> - A
                    choral-symphony combining orchestral and vocal elements
                  </li>
                  <li>
                    • <strong>The Hallelujah Chorus</strong> - From Handel's
                    Messiah, one of the most celebrated pieces in classical
                    music
                  </li>
                  <li>
                    • Approximate total duration:{" "}
                    <strong>2 hours 45 minutes</strong>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Next Concert Invitation */}
            <Reveal delay={0.2}>
              <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-purple-600" size={28} />
                  <h3 className="text-2xl font-bold text-purple-900">
                    Don't Miss Our Next Concert!
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-purple-800 mb-3">
                      Mendelssohn's Paul
                    </h4>
                    <div className="space-y-2 text-purple-800 mb-4">
                      <p>
                        <strong>Date:</strong> September 13, 2026
                      </p>
                      <p>
                        <strong>Featured:</strong> Another masterpiece by Felix
                        Mendelssohn
                      </p>
                    </div>
                    <p className="text-sm text-purple-700">
                      This magnificent oratorio will transport you through
                      biblical narratives with soaring melodies and powerful
                      choral arrangements.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-800 mb-3">
                      Tickets Available
                    </h4>
                    <p className="text-sm text-purple-700 mb-4">
                      Secure your seats now through our various ticketing
                      channels:
                    </p>
                    <ul className="text-sm text-purple-800 space-y-2 list-disc list-inside">
                      <li>Online ticketing platform</li>
                      <li>Direct contact with The Chorus</li>
                      <li>Authorized partner organizations</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-purple-300 text-center">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
                  >
                    <Music size={20} /> Learn More
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Print Styles */}
        <style jsx>{`
          @media print {
            body {
              background: white;
            }
            button {
              display: none;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
