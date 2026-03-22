"use client";

import { Download, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProgramDownloadProps {
  compact?: boolean;
  className?: string;
}

export default function ProgramDownload({
  compact = false,
  className = "",
}: ProgramDownloadProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const programUrl = "/documents/Handel-Solomon Program.pdf";

  useEffect(() => {
    // Generate QR code using QR Server API
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${programUrl}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`;
      setQrCodeUrl(qrUrl);
    }
  }, []);

  const handleDownload = () => {
    window.open(programUrl, "_blank");
  };

  if (compact) {
    // Compact version for embedding in other pages
    return (
      <div
        className={`bg-gradient-to-br from-yellow-400/10 to-orange-400/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 ${className}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <QrCode className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Concert Program</h3>
              <p className="text-sm text-gray-300">Download or scan to view</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/program"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full transition-all text-sm flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </Link>

            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 px-4 py-2 rounded-full font-semibold transition-all text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full version with QR code display
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 ${className}`}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-2">
          <QrCode className="w-7 h-7" />
          Download Concert Program
        </h2>
        <p className="text-gray-300">
          Scan the QR code or click the button below
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* QR Code */}
        <div className="flex flex-col items-center">
          {qrCodeUrl ? (
            <div className="bg-white p-4 rounded-xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCodeUrl}
                alt="Program Download QR Code"
                width={200}
                height={200}
                className="w-full max-w-[200px]"
              />
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl shadow-xl w-[200px] h-[200px] flex items-center justify-center">
              <div className="animate-pulse text-gray-400 text-sm">
                Loading...
              </div>
            </div>
          )}
          <p className="text-gray-400 text-sm mt-3">Scan with phone camera</p>
        </div>

        {/* Download Info */}
        <div>
          <ul className="space-y-3 text-gray-200 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">📄</span>
              <span>Full concert program</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">🎵</span>
              <span>Performance notes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">👥</span>
              <span>Artist biographies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400">📖</span>
              <span>Historical context</span>
            </li>
          </ul>

          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 px-6 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Program
          </button>

          <Link
            href="/program"
            className="block text-center text-sm text-gray-400 hover:text-yellow-300 mt-3 transition-colors"
          >
            View full download page →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
