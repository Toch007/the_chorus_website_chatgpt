"use client";

import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target instanceof HTMLInputElement ? e.target.checked : false)
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
      await addDoc(collection(db, "join_tech"), {
        ...formData,
        createdAt: Timestamp.now(),
      });

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
    <div className="max-w-2xl mx-auto p-6 my-20">
      <h1 className="text-2xl font-bold mb-6">Join as Tech/Logistics Team</h1>

      {success && (
        <p className="text-green-600 mb-4">Form submitted successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
