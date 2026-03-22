"use client";

import { motion } from "framer-motion";
import { Download, FileText, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProgramDownloadPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const programUrl = "/documents/Handel-Solomon Program.pdf";
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${programUrl}`
      : "";

  useEffect(() => {
    // Generate QR code using Google Charts API
    if (fullUrl) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullUrl)}`;
      setQrCodeUrl(qrUrl);
    }
  }, [fullUrl]);

  const handleDownload = () => {
    window.open(programUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-2 mb-6">
            <span className="text-yellow-300 font-semibold">
              📅 November 16, 2025
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Handel's <span className="text-yellow-300">Solomon</span>
          </h1>

          <p className="text-xl text-gray-200 mb-2">Concert Program</p>

          <p className="text-gray-300">The Chorus Abuja</p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: QR Code */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  Scan to Download
                </h2>
              </div>

              {qrCodeUrl ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white p-6 rounded-xl shadow-2xl inline-block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrCodeUrl}
                    alt="QR Code for Program Download"
                    width={300}
                    height={300}
                    className="w-full max-w-[300px]"
                  />
                  <p className="text-gray-600 text-sm mt-4">
                    Scan with your phone camera
                  </p>
                </motion.div>
              ) : (
                <div className="bg-white p-6 rounded-xl shadow-2xl w-[300px] h-[300px] flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">
                    Generating QR Code...
                  </div>
                </div>
              )}
            </div>

            {/* Right: Download Button & Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">
                    Program Details
                  </h3>
                </div>

                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">📄</span>
                    <span>Full concert program with performance notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">🎵</span>
                    <span>Detailed information about Handel's Solomon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">👥</span>
                    <span>Meet the performers and creative team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">📖</span>
                    <span>Synopsis and historical context</span>
                  </li>
                </ul>
              </div>

              {/* Download Button */}
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <Download className="w-6 h-6" />
                Download Program (PDF)
              </motion.button>

              <p className="text-gray-400 text-sm text-center mt-4">
                Click to download or scan the QR code
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
            <p className="text-gray-200 mb-4">
              <strong className="text-yellow-300">Tip:</strong> Save the program
              to your device for offline access during the performance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-1">📍 Venue</p>
                <p>NSE Hall, CBD Abuja</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">🕐 Time</p>
                <p>5:00 PM (Doors at 4:00 PM)</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">📧 Contact</p>
                <p>0813 109 3319</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-300 mb-4">
            Share this program with fellow concert-goers
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Handel's Solomon - Program",
                    text: "Download the program for tonight's performance of Handel's Solomon",
                    url: fullUrl,
                  });
                }
              }}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-2 rounded-full transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
              Share
            </button>

            <button
              onClick={() => {
                if (fullUrl) {
                  navigator.clipboard.writeText(fullUrl);
                  alert("Link copied to clipboard!");
                }
              }}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-2 rounded-full transition-all flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy Link
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
