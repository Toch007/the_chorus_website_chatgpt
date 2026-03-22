"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, XCircle, Mail } from "lucide-react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Check if unsubscribe was successful from URL params
  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      setResult({
        success: true,
        message: "You have been successfully unsubscribed from our newsletter.",
      });
    } else if (success === "false") {
      setResult({
        success: false,
        message: "Failed to unsubscribe. Please try again or contact us.",
      });
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || "Successfully unsubscribed",
        });
        setEmail("");
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to unsubscribe",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <Mail className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Unsubscribe from Newsletter
              </h1>
              <p className="text-gray-600">
                We're sorry to see you go. You can unsubscribe from our
                newsletter below.
              </p>
            </div>

            {result && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  result.success
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {result.success ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      result.success ? "text-green-900" : "text-red-900"
                    }`}
                  >
                    {result.message}
                  </p>
                  {result.success && (
                    <p className="text-sm text-green-700 mt-2">
                      You will no longer receive newsletters from The Chorus
                      Abuja. You can always resubscribe on our website.
                    </p>
                  )}
                </div>
              </div>
            )}

            {!result?.success && (
              <form onSubmit={handleUnsubscribe} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your-email@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {isSubmitting ? "Unsubscribing..." : "Unsubscribe"}
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Changed your mind? We'd love to have you back!
              </p>
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Return to homepage
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
                  <p className="text-gray-600">Loading...</p>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
