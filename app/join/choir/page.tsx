"use client";

import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JoinChoirPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    voicePart: "",
    readsMusic: "",
    choirExperience: "",
    instrument: "",
    preferredDays: [] as string[],
    heardAboutUs: "",
    availableForRehearsals: false,
    willingToPerform: false,
    photoConsent: false,
    declaration: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ validation logic
  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    else {
      const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 15) newErrors.dob = "You must be at least 15 years old";
    }
    if (!formData.gender) newErrors.gender = "Please select your gender";

    if (!/^\+?\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number (10–15 digits)";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.voicePart) newErrors.voicePart = "Select your voice part";
    if (!formData.availableForRehearsals)
      newErrors.availableForRehearsals = "You must be available for rehearsals";
    if (!formData.willingToPerform)
      newErrors.willingToPerform = "You must confirm you can perform at events";
    if (!formData.photoConsent)
      newErrors.photoConsent = "You must consent to photos/videos";
    if (!formData.declaration)
      newErrors.declaration = "You must agree to the declaration";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDaysChange = (day: string) => {
    setFormData((prev) => {
      const updated = prev.preferredDays.includes(day)
        ? prev.preferredDays.filter((d) => d !== day)
        : [...prev.preferredDays, day];
      return { ...prev, preferredDays: updated };
    });
  };

  // ✅ submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "join_choir"), {
        ...formData,
        submittedAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({
        fullName: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        voicePart: "",
        readsMusic: "",
        choirExperience: "",
        instrument: "",
        preferredDays: [],
        heardAboutUs: "",
        availableForRehearsals: false,
        willingToPerform: false,
        photoConsent: false,
        declaration: false,
      });
    } catch (err) {
      console.error("Error saving form:", err);
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
      <Header />
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Join the Choir</h1>
      <p className="mb-6 text-gray-700">
        Fill out the form below to join The Chorus Abuja Choir. Please answer as
        truthfully and completely as possible.
      </p>

      {success && (
        <div className="p-4 mb-6 bg-green-100 text-green-800 rounded-lg">
          ✅ Your application has been submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.dob && <p className="text-red-500">{errors.dob}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select --</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email (optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Voice Part */}
        <div>
          <label className="block mb-1 font-medium">Voice Part *</label>
          <select
            name="voicePart"
            value={formData.voicePart}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select --</option>
            <option>Soprano</option>
            <option>Alto</option>
            <option>Tenor</option>
            <option>Bass</option>
            <option>Not Sure</option>
          </select>
          {errors.voicePart && <p className="text-red-500">{errors.voicePart}</p>}
        </div>

        {/* Reads Music */}
        <div>
          <label className="block mb-1 font-medium">Can you read music?</label>
          <select
            name="readsMusic"
            value={formData.readsMusic}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select --</option>
            <option>Yes</option>
            <option>No</option>
            <option>A little</option>
          </select>
        </div>

        {/* Choir Experience */}
        <div>
          <label className="block mb-1 font-medium">Choir Experience</label>
          <textarea
            name="choirExperience"
            value={formData.choirExperience}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Instrument */}
        <div>
          <label className="block mb-1 font-medium">
            Do you play any instruments? (optional)
          </label>
          <input
            type="text"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        
        {/* Available for Rehearsals */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availableForRehearsals"
              checked={formData.availableForRehearsals}
              onChange={handleChange}
            />
            <span>I am available to attend regular rehearsals *</span>
          </label>
          {errors.availableForRehearsals && (
            <p className="text-red-500">{errors.availableForRehearsals}</p>
          )}
        </div>

        {/* Willing to Perform */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="willingToPerform"
              checked={formData.willingToPerform}
              onChange={handleChange}
            />
            <span>I am willing to perform at concerts and events *</span>
          </label>
          {errors.willingToPerform && (
            <p className="text-red-500">{errors.willingToPerform}</p>
          )}
        </div>

        {/* Heard About Us */}
        <div>
          <label className="block mb-1 font-medium">
            How did you hear about us?
          </label>
          <input
            type="text"
            name="heardAboutUs"
            value={formData.heardAboutUs}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Photo Consent */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="photoConsent"
              checked={formData.photoConsent}
              onChange={handleChange}
            />
            <span>
              I consent to photos and videos being taken during rehearsals and
              performances *
            </span>
          </label>
          {errors.photoConsent && (
            <p className="text-red-500">{errors.photoConsent}</p>
          )}
        </div>

        {/* Declaration */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
            />
            <span>
              I declare that the information I have provided is true and
              accurate *
            </span>
          </label>
          {errors.declaration && (
            <p className="text-red-500">{errors.declaration}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
            </div>
            <Footer />
          </> 
  );
}
