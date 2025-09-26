"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus("failed");
        return;
      }

      try {
        const res = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();
        if (res.ok && data.status === "success") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md w-full text-center bg-white shadow-lg rounded-xl p-6">
        {status === "loading" && (
          <>
            <h1 className="text-xl font-bold mb-3">🔄 Verifying Payment...</h1>
            <p className="text-gray-600">Please wait while we confirm your transaction.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-3">✅ Payment Successful</h1>
            <p className="text-gray-700">
              Thank you for purchasing your ticket(s)! 🎟️  
              A confirmation email with your QR codes has been sent.
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-3">❌ Payment Failed</h1>
            <p className="text-gray-700">
              We couldn’t verify your payment.  
              Please try again or contact support if you were charged.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
