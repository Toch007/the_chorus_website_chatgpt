"use client";

import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function MediaJoinForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    mediaSkills: [] as string[],
    portfolio: "",
    availability: "",
    ownEquipment: false,
    teamWork: false,
    declaration: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const skills = [
    "Photography",
    "Videography",
    "Editing",
    "Social Media",
    "Graphic Design",
    "Writing",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSkillChange = (skill: string) => {
    setFormData((prev) => {
      const updated = prev.mediaSkills.includes(skill)
        ? prev.mediaSkills.filter((s) => s !== skill)
        : [...prev.mediaSkills, skill];
      return { ...prev, mediaSkills: updated };
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
      await addDoc(collection(db, "join_media"), {
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
        mediaSkills: [],
        portfolio: "",
        availability: "",
        ownEquipment: false,
        teamWork: false,
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
          <h1 className="text-2xl font-bold mb-6">Join as Media Team</h1>

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
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <fieldset className="border p-3 rounded">
          <legend className="font-semibold">Media Skills</legend>
          {skills.map((skill) => (
            <label key={skill} className="block">
              <input
                type="checkbox"
                checked={formData.mediaSkills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
              />{" "}
              {skill}
            </label>
          ))}
        </fieldset>

        <input
          name="portfolio"
          placeholder="Portfolio Link (optional)"
          value={formData.portfolio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

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
            name="ownEquipment"
            checked={formData.ownEquipment}
            onChange={handleChange}
          />{" "}
          Do you own equipment?
        </label>

        <label className="block">
          <input
            type="checkbox"
            name="teamWork"
            checked={formData.teamWork}
            onChange={handleChange}
          />{" "}
          Willing to work as part of a team
        </label>

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
