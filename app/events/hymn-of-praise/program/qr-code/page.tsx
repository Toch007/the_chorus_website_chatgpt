"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QRCodePrintPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Navigation */}
            <Link
              href="/events/hymn-of-praise/program"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
            >
              <ArrowLeft size={20} />
              Back to Program
            </Link>

            {/* Print Instructions */}
            <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-2">
                Print Instructions
              </h2>
              <ul className="text-blue-800 space-y-1">
                <li>• Use landscape orientation for best results</li>
                <li>• Print at actual size (do not scale)</li>
                <li>• Click the print button or use Ctrl+P to print</li>
                <li>• Cut along the dashed lines if using multiple cards</li>
              </ul>
            </div>

            {/* QR Code Cards - 2 per page for printing */}
            <div className="space-y-0">
              {[1, 2].map((card) => (
                <div
                  key={card}
                  className="h-screen print:h-auto flex items-center justify-center page-break"
                  style={{ pageBreakAfter: card === 1 ? "always" : "avoid" }}
                >
                  <div className="w-full max-w-md p-8 bg-white border-4 border-dashed border-gray-400 rounded-lg text-center">
                    {/* Card Content */}
                    <div className="mb-6">
                      <h1 className="text-4xl font-bold text-amber-900 mb-2">
                        Hymn of Praise
                      </h1>
                      <p className="text-lg text-amber-700">Concert Program</p>
                      <p className="text-sm text-gray-600 mt-2">
                        March 22, 2026
                      </p>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <QRCodeGenerator
                          url="https://thechorusabuja.com/events/hymn-of-praise/program"
                          size={300}
                        />
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="text-center">
                      <p className="font-bold text-gray-900 mb-2">
                        Scan to View & Share Program
                      </p>
                      <p className="text-xs text-gray-600">
                        Point your phone camera at this code to access the
                        complete program, timing, and performer information.
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-300">
                      <p className="text-xs text-gray-500">
                        www.thechorusabuja.com
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Print Button */}
            <div className="mt-8 text-center print:hidden">
              <button
                onClick={handlePrint}
                className="px-8 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition"
              >
                Print QR Code Cards
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none;
          }
          .page-break {
            page-break-after: always;
            height: 100vh;
          }
        }
      `}</style>
    </>
  );
}
