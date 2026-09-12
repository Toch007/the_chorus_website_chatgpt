"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TechJoinForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    techSkills: [] as string[],
    experience: "",
    availability: "",
    heavyLift: false,
    emergencyContact: "",
    declaration: false,
  });

  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const skills = [
    "Sound Engineering",
    "Lighting",
    "Stage Setup",
    "Instruments",
    "IT/Networking",
    "General Logistics",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? e.target instanceof HTMLInputElement
            ? e.target.checked
            : false
          : value,
    }));
  };

  const handleSkillChange = (skill: string) => {
    setFormData((prev) => {
      const updated = prev.techSkills.includes(skill)
        ? prev.techSkills.filter((s) => s !== skill)
        : [...prev.techSkills, skill];
      return { ...prev, techSkills: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.declaration) {
      alert("You must agree to the declaration.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "tech",
          data: formData,
          honeypot,
          formLoadedAt,
        }),
      });
      const result = await res.json();
      if (!result.success) {
        console.warn("Application submission failed:", result.error);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        techSkills: [],
        experience: "",
        availability: "",
        heavyLift: false,
        emergencyContact: "",
        declaration: false,
      });
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 mt-24 mb-20">
        <h1 className="text-2xl font-bold mb-6">Join as Tech/Logistics Team</h1>

        {success && (
          <div className="p-6 mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                ✅
              </div>
              <h3 className="font-bold text-lg">
                Tech Team Application Received!
              </h3>
            </div>
            <p className="text-emerald-700 mb-2">
              Thank you for your interest in supporting our technical
              operations! Your tech team application has been submitted.
            </p>
            <p className="text-emerald-600 text-sm">
              📧 <strong>Check your email:</strong> You should receive a
              confirmation email with details about our review process and next
              steps.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field: hidden from real users, bots often fill it */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] w-px h-px opacity-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <fieldset className="border p-3 rounded">
            <legend className="font-semibold">Technical Skills</legend>
            {skills.map((skill) => (
              <label key={skill} className="block">
                <input
                  type="checkbox"
                  checked={formData.techSkills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />{" "}
                {skill}
              </label>
            ))}
          </fieldset>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Experience Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Availability</option>
            <option>Weekdays</option>
            <option>Weekends</option>
            <option>Flexible</option>
          </select>

          <label className="block">
            <input
              type="checkbox"
              name="heavyLift"
              checked={formData.heavyLift}
              onChange={handleChange}
            />{" "}
            Comfortable lifting heavy equipment
          </label>

          <input
            name="emergencyContact"
            placeholder="Emergency Contact (Name + Phone)"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label className="block font-semibold">
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              required
            />{" "}
            I hereby declare that the above information is true.
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
