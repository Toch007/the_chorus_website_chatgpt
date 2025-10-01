"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

// ✅ Import scanner dynamically
const QrScanner = dynamic(() => import("react-qr-barcode-scanner"), {
  ssr: false,
});

type ValidationResponse = {
  success: boolean;
  message: string;
  buyerName?: string;
  tier?: string;
  remainingUses?: number;
};

export default function ScannerPage() {
  const [status, setStatus] = useState<string>("Waiting for scan...");
  const [history, setHistory] = useState<ValidationResponse[]>([]);
  const lastScanRef = useRef<{ id?: string; ts?: number }>({});
  const isProcessingRef = useRef(false);

  const handleScan = async (result: any) => {
    if (!result) return;

    // Avoid processing multiple scans at once
    if (isProcessingRef.current) return;

    // Normalize raw string from various scanner result shapes
    let raw: string | undefined;
    if (typeof result === "string") raw = result;
    else if (result?.getText && typeof result.getText === "function") {
      try {
        raw = result.getText();
      } catch {
        raw = undefined;
      }
    } else if (typeof result.text === "string") raw = result.text;
    else if (typeof result.code === "string") raw = result.code;
    else if (typeof result.rawValue === "string") raw = result.rawValue;

    if (!raw) return;

    // Try parsing JSON payload (PDF embeds JSON). Fallback to raw string.
    let ticketId: string | null = null;
    try {
      const parsed = JSON.parse(raw);
      ticketId = parsed.ticketId || parsed.reference || null;
    } catch {
      ticketId = raw;
    }

    if (!ticketId) {
      setStatus("❌ Invalid QR Code");
      return;
    }

    // Debounce duplicate scans for 3s
    const now = Date.now();
    if (
      lastScanRef.current.id === ticketId &&
      now - (lastScanRef.current.ts || 0) < 3000
    ) {
      return;
    }

    isProcessingRef.current = true;
    setStatus("⏳ Validating...");

    try {
      const res = await fetch("/api/validateTicket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });

      const json: ValidationResponse = await res.json();
      setStatus(
        json.message ||
          (json.success ? "✅ Ticket valid" : "❌ Validation result")
      );

      if (json.success) {
        new Audio("/sounds/beep.mp3").play().catch(() => {});
      }

      // Keep last 5
      setHistory((prev) => [json, ...prev.slice(0, 4)]);

      // record last scan
      lastScanRef.current = { id: ticketId, ts: Date.now() };
    } catch (err) {
      console.error("Validation error:", err);
      setStatus("❌ Error talking to server");
    } finally {
      // small cooldown before allowing next scan
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">🎟️ Ticket Scanner</h1>

      {/* Scanner box */}
      <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-lg">
        <motion.div
          className="absolute inset-0 rounded-lg border-4"
          animate={{ borderColor: ["#16a34a", "#22c55e", "#16a34a"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <QrScanner
          onUpdate={(_, result) => handleScan(result)}
          width={"100%"}
          height={300}
        />

        {/* Laser line animation */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-red-500"
          initial={{ y: 0 }}
          animate={{ y: 280 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Scanning overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-green-300/20 to-transparent pointer-events-none"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Current status */}
      <div className="mt-6 w-full max-w-md text-center">
        <p
          className={`p-3 rounded-lg font-bold ${
            status.includes("✅")
              ? "bg-green-600 text-white"
              : status.includes("⚠️")
                ? "bg-yellow-500 text-black"
                : status.includes("❌") || status.includes("🚫")
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </p>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="font-semibold mb-2">Recent Scans</h2>
          <ul className="space-y-2">
            {history.map((h, i) => (
              <li key={i} className="bg-white shadow rounded-lg p-3 border">
                <span className="font-semibold">
                  {h.buyerName || "Unknown"} – {h.tier}
                </span>
                <p className="text-sm">{h.message}</p>
                {h.remainingUses !== undefined && (
                  <p className="text-xs text-blue-600">
                    Remaining uses: {h.remainingUses}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
