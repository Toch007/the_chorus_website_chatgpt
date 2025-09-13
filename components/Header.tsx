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
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight ?? 0;
      setIsTransparent(window.scrollY < heroHeight - 80);

      const scrolled = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Members", href: "/members" },
    { name: "Events", href: "/events" },
    { name: "Contact Us", href: "/contact" },
    { name: "Join", href: "/join" },
    { name: "Support Us", href: "/support" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <header
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
        <nav
          className={`hidden sm:flex space-x-6 font-medium transition-colors duration-300 ${
            isTransparent ? "text-white" : "text-gray-700"
          }`}
        >
          {navLinks.map((link, i) => (
            <Link key={link.name} href={link.href}>
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative group hover:text-blue-400 transition duration-300"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            </Link>
          ))}
        </nav>

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
          menuOpen ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
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
        </div>
      </div>
    </header>
  );
}
