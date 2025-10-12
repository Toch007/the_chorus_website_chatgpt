"use client";

import { useState } from "react";

interface SupportFormProps {
  purpose: string;
  selectedTier?: string;
}

export default function SupportForm({
  purpose,
  selectedTier,
}: SupportFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      purpose,
      selectedTier,
    };

    const res = await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (res.ok) setSubmitted(true);
  }

  return submitted ? (
    <div className="text-green-700 font-semibold text-center mt-6">
      Thank you for your message! We'll be in touch shortly.
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto space-y-6"
    >
      <input type="hidden" name="purpose" value={purpose} />
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      <textarea
        name="message"
        placeholder={
          selectedTier
            ? `Tell us more about your interest in the ${selectedTier} package...`
            : `Tell us more about your interest in ${purpose.toLowerCase()}...`
        }
        required
        className="w-full px-4 py-4 border border-gray-300 rounded-lg h-32 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white px-6 py-4 rounded-lg hover:bg-blue-800 active:bg-blue-900 disabled:bg-gray-400 transition-colors font-semibold text-base min-h-[44px]"
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
