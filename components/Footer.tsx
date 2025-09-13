"use client";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/config";

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com/thechorusabuja", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com/thechorusabuja", label: "Instagram" },
  { icon: FaYoutube, href: "https://www.youtube.com/@thechorusabuja", label: "YouTube" },
  { icon: FaTwitter, href: "https://twitter.com/thechorusabuja", label: "Twitter" },
];

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [successMessage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const email = emailInput.value.trim().toLowerCase();

    setSuccessMessage("");
    setErrorMessage("");

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newsletterRef = collection(db, "newsletterSubscribers");
      const q = query(newsletterRef, where("email", "==", email));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setSuccessMessage("You're already subscribed!");
        return;
      }

      await addDoc(newsletterRef, {
        email,
        subscribedAt: serverTimestamp(),
      });

      setSuccessMessage("✅ Successfully subscribed to our newsletter!");
      emailInput.value = "";
    } catch (error) {
      console.error("Subscription error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="bg-blue-900 text-white py-12 px-6 md:px-20 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
  <div className="flex items-center justify-center md:justify-start mb-3 gap-2">
    <img src="/images/chorus.jpg" alt="The Chorus Abuja logo" className="h-10 w-auto" />
    <h3 className="text-2xl font-bold">The Chorus Abuja</h3>
  </div>
  <p className="text-sm text-gray-200 leading-relaxed">
    Elevating hearts and minds through classical music. Join our journey of harmony.
  </p>
</div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Join Our Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-full text-gray-900 bg-white placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-full font-semibold border transition 
                  ${isSubmitting
                    ? "bg-white text-blue-900 opacity-50 cursor-not-allowed"
                    : "bg-white text-blue-900 hover:bg-blue-800 hover:text-white border-blue-900"
                  }`}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {successMessage && (
              <p className="mt-3 text-green-200 text-sm">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mt-3 text-red-300 text-sm">{errorMessage}</p>
            )}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="text-2xl hover:text-yellow-400 transition" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 bg-yellow-400 text-blue-900 p-3 rounded-full shadow-md hover:bg-yellow-300 transition duration-300 z-50"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </>
  );
}
