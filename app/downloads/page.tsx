"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonationForm from "@/components/DonationForm";
import Reveal from "@/components/Reveal";
import {
  Download,
  FileText,
  Music,
  Heart,
  Building,
  CreditCard,
  Smartphone,
  Shield,
  CheckCircle,
} from "lucide-react";

// You can update this list as you upload more PDFs to /public/documents/
const performedWorks = [
  {
    title: "Messiah - George Frideric Handel",
    description: "Complete choral masterwork performed December 2024",
    filename: "messiah-handel.pdf",
    year: "2024",
    category: "Oratorio",
  },
  {
    title: "12th Mass - Mozart",
    description: "Sacred choral work performed at our annual concert",
    filename: "12th-mass-mozart.pdf",
    year: "2024",
    category: "Mass",
  },
  // Add more works as you upload PDFs
];

export default function DownloadsPage() {
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);

  const handleDownload = (filename: string) => {
    // Track downloaded files
    if (!downloadedFiles.includes(filename)) {
      setDownloadedFiles([...downloadedFiles, filename]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section with Background Image */}
        <section className="relative mb-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/downloadable.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-purple-900/85 to-blue-900/90"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <Music className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                  Our Performed Works
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Download sheet music and scores from our past performances.
                  These materials are provided free of charge to support music
                  education and appreciation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    PDF Format
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Free Download
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-medium">
                    <Music className="w-4 h-4" />
                    Performance Ready
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Available Downloads
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access our library of performed choral works. All materials are
                free to download for educational and performance purposes.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performedWorks.map((work, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {work.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {work.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{work.year}</span>
                    <a
                      href={`/documents/${work.filename}`}
                      download
                      onClick={() => handleDownload(work.filename)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>

                  {downloadedFiles.includes(work.filename) && (
                    <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Downloaded</span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {performedWorks.length === 0 && (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                More materials coming soon!
              </p>
            </div>
          )}
        </section>

        {/* Support Section */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100">
              <div className="text-center mb-8">
                <Heart className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Love What We Do?
                </h2>
                <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
                  These materials are free for everyone, but your voluntary
                  donations help us continue creating beautiful music and
                  serving our community.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium shadow-md">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium shadow-md">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Direct Impact</span>
                  </div>
                </div>
              </div>

              <DonationForm />
            </div>
          </Reveal>
        </section>

        {/* Alternative Donation Methods */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Multiple Ways to Support
              </h2>
              <p className="text-gray-600">
                Choose the donation method that works best for you
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bank Transfer */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Bank Transfer
                  </h3>
                  <div className="space-y-3 text-left bg-gray-50 p-4 rounded-xl">
                    <div>
                      <span className="text-sm text-gray-500">
                        Account Name
                      </span>
                      <p className="font-semibold text-gray-900">
                        The Chorus Ensemble and Music Society
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Account Number
                      </span>
                      <p className="font-semibold text-gray-900">1229281261</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Bank</span>
                      <p className="font-semibold text-gray-900">Zenith Bank</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card Payment */}
            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Card Payment
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Secure payments via Paystack with debit/credit cards and
                    bank transfers.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted & Secure</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Mobile Payment */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Mobile Money
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Use your mobile money wallet for quick and convenient
                    donations.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
                    <Smartphone className="w-4 h-4" />
                    <span>Quick & Easy</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Usage Terms */}
        <section className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Terms of Use
              </h3>
              <div className="prose prose-blue max-w-none">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Materials are provided free for educational and
                      performance purposes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Please credit "The Chorus Abuja" when using these
                      materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Commercial use requires written permission from The Chorus
                      Abuja
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Do not redistribute or resell these materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
