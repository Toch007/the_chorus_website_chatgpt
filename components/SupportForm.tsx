"use client";

import { useState } from "react";

export default function SupportForm({ purpose }: { purpose: string }) {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <div className="text-green-700 font-semibold text-center mt-6">
      Thank you for your message! We'll be in touch shortly.
    </div>
  ) : (
    <form
      action="https://formspree.io/f/xldlnjnz" // Replace with your actual endpoint
      method="POST"
      onSubmit={() => setSubmitted(true)}
      className="bg-white shadow-md rounded p-6 max-w-xl mx-auto space-y-4"
    >
      <input
        type="hidden"
        name="_subject"
        value={`New ${purpose} Support Inquiry`}
      />
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
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
