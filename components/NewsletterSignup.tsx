"use client";

import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "newsletterSubscribers"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (err) {
      toast.error("Failed to subscribe.");
      console.error("Newsletter error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleNewsletterSubmit}
      className="flex flex-col sm:flex-row gap-2 mt-4"
    >
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-full text-gray-800 w-full sm:w-auto"
        required
      />
      <button
        type="submit"
        className="bg-white text-blue-900 border border-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-800 hover:text-white transition"
        disabled={loading}
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
