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
import { motion } from "framer-motion";
import NewsletterSignup from "./NewsletterSignup";

const socialLinks = [
  {
    icon: FaFacebook,
    href: "https://facebook.com/thechorusabuja",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/thechorusabuja",
    label: "Instagram",
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@thechorusabuja",
    label: "YouTube",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com/thechorusabuja",
    label: "Twitter",
  },
];

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setShowScroll(window.scrollY > 300);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 px-6 md:px-20 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Logo & tagline */}
          <div>
            <div className="flex items-center justify-center md:justify-start mb-3 gap-2">
              <img
                src="/images/chorus.jpg"
                alt="The Chorus Abuja logo"
                className="h-10 w-auto"
              />
              <h3 className="text-2xl font-bold">The Chorus Abuja</h3>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Elevating hearts and minds through classical music.
            </p>
          </div>

          {/* Newsletter */}
          <NewsletterSignup showTitle={true} />

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-5 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="text-3xl hover:text-yellow-400 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-blue-700 pt-6 mt-10">
          <p className="text-xs text-gray-400 text-center">
            © 2025 The Chorus Abuja. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button with motion */}
      <AnimateScrollToTop show={showScroll} onClick={scrollToTop} />
    </>
  );
}

function AnimateScrollToTop({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Scroll to top"
      initial={{ opacity: 0, y: 50 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 bg-yellow-400 text-blue-900 p-3 rounded-full shadow-md hover:bg-yellow-300 transition duration-300 z-50"
    >
      <FaArrowUp className="text-lg" />
    </motion.button>
  );
}
