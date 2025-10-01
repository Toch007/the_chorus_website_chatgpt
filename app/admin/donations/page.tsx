"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

// Dynamically import PaystackButton to avoid SSR issues
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function DonatePage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePaymentSuccess = async (reference: any) => {
    setLoading(true);
    try {
      // Call API to save donor + send email
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount,
          reference: reference.reference,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(
          "🎉 Thank you for your donation! A confirmation email has been sent."
        );
        setEmail("");
        setAmount(0);
      } else {
        alert("⚠️ Donation processed, but we couldn't save the record.");
      }
    } catch (err) {
      console.error("Donation post-error:", err);
      alert("⚠️ Donation processed, but there was a server error.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClose = () => {
    console.log("Donation window closed");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-20 space-y-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Support Through Giving
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Thank you for choosing to support The Chorus Abuja. Your donation
          empowers voices and builds communities.
        </p>

        {/* Donation form */}
        <div className="mt-8 p-6 border rounded-lg bg-gray-50 text-gray-800 shadow max-w-md mx-auto space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Donation Amount (₦)"
            className="w-full border px-4 py-2 rounded"
          />
          {mounted && email && amount > 0 && (
            <PaystackButton
              reference={`DON-${crypto.randomUUID()}`}
              email={email}
              amount={amount * 100} // Paystack expects kobo
              publicKey={publicKey}
              text={loading ? "Processing..." : "Donate with Paystack"}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:bg-gray-400 w-full"
            />
          )}
          {(!mounted || !email || amount <= 0) && (
            <button
              disabled
              className="bg-gray-400 text-white px-6 py-3 rounded w-full cursor-not-allowed"
            >
              {!email || amount <= 0
                ? "Please enter email and amount"
                : "Loading..."}
            </button>
          )}
        </div>

        {/* Bank transfer option */}
        <div className="mt-12 p-6 border rounded-lg bg-gray-50 text-gray-800 shadow">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Bank Transfer
          </h2>
          <p className="mb-2">
            You can also support us directly via bank transfer:
          </p>
          <div className="font-medium">
            <p>
              Account Name:{" "}
              <span className="font-bold">
                The Chorus Ensemble and Music Society
              </span>
            </p>
            <p>
              Account Number: <span className="font-bold">1229281261</span>
            </p>
            <p>
              Bank Name: <span className="font-bold">Zenith Bank</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
