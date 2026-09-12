"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Download, QrCode, Link as LinkIcon, RefreshCw } from "lucide-react";

const BASE_URL = "https://thechorusabuja.org";

const QUICK_PAGES = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Members", path: "/members" },
  { label: "Blog", path: "/blog" },
  { label: "Join", path: "/join" },
  { label: "Contact", path: "/contact" },
  { label: "Support / Donate", path: "/support" },
  { label: "Downloads", path: "/downloads" },
];

export default function QRGeneratorPage() {
  const [customPath, setCustomPath] = useState("/");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [fullUrl, setFullUrl] = useState("");
  const [size, setSize] = useState(300);
  const [generating, setGenerating] = useState(false);

  async function generate(path: string) {
    const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
    setFullUrl(url);
    setGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: size,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#ffffff" },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error("QR generation failed:", err);
    } finally {
      setGenerating(false);
    }
  }

  // Generate on mount with default
  useEffect(() => {
    generate(customPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleQuickPage(path: string) {
    setCustomPath(path);
    generate(path);
  }

  function handleDownload() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    const slug =
      fullUrl
        .replace(/https?:\/\/[^/]+/, "")
        .replace(/\//g, "-")
        .replace(/^-/, "") || "home";
    a.href = qrDataUrl;
    a.download = `qr-${slug}.png`;
    a.click();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <QrCode className="w-6 h-6 text-blue-700" />
          QR Code Generator
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Generate a QR code for any page on the website. Click a quick link or
          enter a custom path.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left — controls */}
        <div className="space-y-6">
          {/* Quick pages */}
          <div>
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Quick Pages
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_PAGES.map((p) => (
                <button
                  key={p.path}
                  onClick={() => handleQuickPage(p.path)}
                  className={`text-left text-sm px-3 py-2 rounded-lg border transition-all ${
                    customPath === p.path
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom path */}
          <div>
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Custom Path or Full URL
            </h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  placeholder="/events or https://..."
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => generate(customPath)}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Generate
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Use a path like{" "}
              <code className="bg-gray-100 px-1 rounded">/about</code> or paste
              a full URL
            </p>
          </div>

          {/* Size */}
          <div>
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Size: {size}×{size}px
            </h2>
            <input
              type="range"
              min={150}
              max={600}
              step={50}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-blue-700"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Small (150px)</span>
              <span>Large (600px)</span>
            </div>
          </div>
        </div>

        {/* Right — preview + download */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-center min-h-[320px] w-full">
            {generating ? (
              <div className="text-gray-400 text-sm animate-pulse">
                Generating…
              </div>
            ) : qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="max-w-full"
                style={{
                  width: Math.min(size, 280),
                  height: Math.min(size, 280),
                }}
              />
            ) : (
              <div className="text-gray-300 text-sm">No QR code yet</div>
            )}
          </div>

          {fullUrl && (
            <p className="text-xs text-gray-500 text-center break-all max-w-xs">
              <span className="font-medium text-gray-600">URL: </span>
              {fullUrl}
            </p>
          )}

          <button
            onClick={handleDownload}
            disabled={!qrDataUrl}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02]"
          >
            <Download className="w-5 h-5" />
            Download PNG
          </button>

          <p className="text-xs text-gray-400 text-center">
            QR codes are generated at high error-correction (Level H) — they
            remain scannable even if partially covered or printed small.
          </p>
        </div>
      </div>
    </div>
  );
}
