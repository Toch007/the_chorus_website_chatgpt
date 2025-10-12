"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendAutoReply, prepareAutoReplyData } from "@/lib/autoReplyService";

export default function JoinVolunteerPage() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    area: "",
    availability: "",
    experience: "",
    commitment: false,
    emergencyContact: "",
    declaration: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    if (
      !form.fullName ||
      !form.age ||
      !form.gender ||
      !form.phone ||
      !form.area ||
      !form.availability
    ) {
      return "Please fill all required fields.";
    }
    if (!/^[0-9]{10,15}$/.test(form.phone)) {
      return "Enter a valid phone number (10–15 digits).";
    }
    if (!form.commitment) return "You must confirm 3 months commitment.";
    if (!form.declaration) return "You must accept the declaration.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);

      // Save to Firebase first
      await addDoc(collection(db, "join_volunteer"), {
        ...form,
        age: parseInt(form.age),
        submittedAt: serverTimestamp(),
      });

      // Send auto-reply email
      const autoReplyData = prepareAutoReplyData("volunteer", form);
      const emailSent = await sendAutoReply(autoReplyData);

      if (!emailSent) {
        console.warn(
          "Auto-reply email failed to send, but form was submitted successfully"
        );
      }

      setSuccess(true);
      setForm({
        fullName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        area: "",
        availability: "",
        experience: "",
        commitment: false,
        emergencyContact: "",
        declaration: false,
      });
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-20 space-y-12">
        <Reveal>
          <section className="text-center">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              Volunteer With Us
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Offer your time and energy to support our events and outreach.
              Every helping hand makes a huge difference.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-8 space-y-6"
          >
            {error && <p className="text-red-600">{error}</p>}
            {success && (
              <div className="p-6 mb-6 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    ✅
                  </div>
                  <h3 className="font-bold text-lg">
                    Volunteer Application Received!
                  </h3>
                </div>
                <p className="text-green-700 mb-2">
                  Thank you for your heart to serve with The Chorus Abuja! Your
                  volunteer application has been submitted.
                </p>
                <p className="text-green-600 text-sm">
                  📧 <strong>Check your email:</strong> You should receive a
                  confirmation email with next steps and how we'll be in touch.
                </p>
              </div>
            )}

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name *"
              className="w-full border p-3 rounded"
            />
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age *"
              className="w-full border p-3 rounded"
              type="number"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Gender *</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              className="w-full border p-3 rounded"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email (optional)"
              className="w-full border p-3 rounded"
              type="email"
            />
            <select
              name="area"
              value={form.area}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Preferred Volunteer Area *</option>
              <option>Ushering</option>
              <option>Welfare</option>
              <option>Logistics</option>
              <option>Security</option>
              <option>General Support</option>
            </select>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Availability *</option>
              <option>Weekdays</option>
              <option>Weekends</option>
              <option>Flexible</option>
            </select>
            <textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Previous volunteer experience"
              className="w-full border p-3 rounded"
            />
            <input
              name="emergencyContact"
              value={form.emergencyContact}
              onChange={handleChange}
              placeholder="Emergency Contact (Name + Phone)"
              className="w-full border p-3 rounded"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="declaration"
                checked={form.declaration}
                onChange={handleChange}
              />{" "}
              I confirm the above information is correct.
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
