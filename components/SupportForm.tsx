"use client";

import { useState } from "react";

export default function SupportForm({ purpose }: { purpose: string }) {
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
      className="bg-white shadow-md rounded p-6 max-w-xl mx-auto space-y-4"
    >
      <input type="hidden" name="purpose" value={purpose} />
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        name="message"
        placeholder={`Tell us more about your interest in ${purpose.toLowerCase()}...`}
        required
        className="w-full px-4 py-2 border rounded h-32"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
