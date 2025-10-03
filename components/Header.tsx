"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false); // 👈 track hover
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (menuOpen && typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const heroHeight = document.getElementById("hero")?.offsetHeight ?? 0;
      setIsTransparent(window.scrollY < heroHeight - 80);

      const scrolled = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Show header while scrolling
      setVisible(true);

      // Hide after idle, unless hovered
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (typeof window !== "undefined" && window.scrollY > 80 && !hovered)
          setVisible(false);
      }, 1500);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [hovered]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Members", href: "/members" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" }, // ✅ added
    { name: "Contact Us", href: "/contact" },
    { name: "Join", href: "/join" },
    { name: "Support Us", href: "/support" },
  ];

  return (
    <motion.header
      onMouseEnter={() => setHovered(true)} // 👈 hover start
      onMouseLeave={() => setHovered(false)} // 👈 hover end
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 backdrop-blur-md ${
        isTransparent ? "bg-transparent shadow-none" : "bg-white/80 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-20 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/chorus-ico.png"
            alt="The Chorus Abuja Logo"
            width={40}
            height={40}
            className={`w-10 h-10 object-contain transition duration-300 group-hover:scale-110 ${
              isTransparent ? "invert brightness-200" : ""
            }`}
            priority
          />
          <span
            className={`text-xl sm:text-2xl font-bold transition duration-300 ${
              isTransparent ? "text-white" : "text-blue-800"
            }`}
          >
            The Chorus Abuja
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-6">
          <nav
            className={`flex space-x-6 font-medium transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-gray-700"
            }`}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group hover:text-blue-400 transition duration-300"
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Admin Access - Subtle */}
          <Link
            href="/admin"
            className={`ml-4 p-2 rounded-full transition-all duration-300 hover:scale-110 group ${
              isTransparent
                ? "text-white/70 hover:text-white hover:bg-white/10"
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            title="Admin Dashboard"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile Icon */}
        <button
          onClick={toggleMenu}
          className={`sm:hidden text-3xl transition ${
            isTransparent ? "text-white" : "text-blue-800"
          }`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-[60]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <div
        ref={menuRef}
        className={`sm:hidden fixed top-[72px] left-0 w-full bg-white z-50 shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="px-6 py-4 space-y-3 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="block hover:text-blue-800 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Admin Link for Mobile */}
          <div className="border-t pt-3 mt-3">
            <Link
              href="/admin"
              onClick={closeMenu}
              className="flex items-center text-gray-500 hover:text-blue-600 transition text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
