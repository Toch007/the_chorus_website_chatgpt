"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// ✅ Import latest QrReader (v3+)
const QrReader = dynamic<any>(
  () => import("react-qr-reader").then((mod) => mod.QrReader),
  { ssr: false }
);

export default function ScannerPage() {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === process.env.NEXT_PUBLIC_SCANNER_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("❌ Incorrect password");
    }
  };

  const handleScan = async (data: string | null) => {
    if (data) {
      try {
        setResult(data);
        const ticket = JSON.parse(data);

        if (!ticket.ticketId) {
          setStatus("❌ Invalid QR Code");
          return;
        }

        const res = await fetch("/api/validateTicket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId: ticket.ticketId }),
        });

        const result = await res.json();
        setStatus(result.message);
      } catch (err) {
        console.error(err);
        setStatus("❌ Error validating ticket");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">🔐 Ticket Scanner Login</h1>
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🎟️ Ticket Scanner</h1>

      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4">
        <QrReader
          onScan={(data) => {
            handleScan(data);
          }}
          onError={(error) => {
            console.error(error);
          }}
          containerStyle={{ width: "100%" }}
          videoStyle={{ objectFit: "cover" }}
        />
      </div>

      {status && (
        <div
          className={`mt-4 text-lg font-semibold p-3 rounded-lg ${
            status.includes("✅")
              ? "bg-green-200 text-green-900"
              : status.includes("⚠️")
              ? "bg-yellow-200 text-yellow-900"
              : "bg-red-200 text-red-900"
          }`}
        >
          {status}
        </div>
      )}

      {result && (
        <p className="mt-3 text-sm text-gray-500 break-words">{result}</p>
      )}
    </main>
  );
}
