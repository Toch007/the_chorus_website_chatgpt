"use client";

import { useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

interface NewsletterSignupProps {
  className?: string;
  showTitle?: boolean;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export default function NewsletterSignup({
  className = "",
  showTitle = false,
  onSuccess,
  onError,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    if (!emailRegex.test(email.trim().toLowerCase())) {
      const errorMsg = "Please enter a valid email address.";
      setMessage(errorMsg);
      setIsError(true);
      onError?.(errorMsg);
      return;
    }

    setLoading(true);
    try {
      const emailLower = email.trim().toLowerCase();

      // Check if email already exists
      const newsletterRef = collection(db, "newsletterSubscribers");
      const q = query(newsletterRef, where("email", "==", emailLower));
      const existing = await getDocs(q);

      if (!existing.empty) {
        const successMsg = "You're already subscribed!";
        setMessage(successMsg);
        setIsError(false);
        onSuccess?.(successMsg);
        return;
      }

      await addDoc(newsletterRef, {
        email: emailLower,
        subscribedAt: serverTimestamp(),
      });

      const successMsg = "✅ Successfully subscribed to our newsletter!";
      setMessage(successMsg);
      setIsError(false);
      setEmail("");
      onSuccess?.(successMsg);
    } catch (err) {
      console.error("Newsletter error:", err);
      const errorMsg = "Something went wrong. Please try again.";
      setMessage(errorMsg);
      setIsError(true);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      {showTitle && (
        <h4 className="text-lg font-semibold mb-3">📧 Stay Connected</h4>
      )}

      <form
        onSubmit={handleNewsletterSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full sm:w-auto flex-1 px-4 py-2 rounded-full text-gray-900 bg-white placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-full font-semibold border transition 
            ${
              loading
                ? "bg-white text-blue-900 opacity-50 cursor-not-allowed"
                : "bg-white text-blue-900 hover:bg-blue-800 hover:text-white border-blue-900"
            }`}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {/* Feedback messages */}
      {message && (
        <div
          className={`mt-3 px-4 py-2 rounded-md text-sm ${
            isError ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
