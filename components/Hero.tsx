"use client";

import Reveal from "@/components/Reveal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/images/chorus2.jpg", alt: "The Chorus Abuja in concert" },
  {
    src: "/images/Solomon_chorus1.JPG",
    alt: "The Chorus Abuja — Solomon Concert",
  },
  {
    src: "/images/solomon-concert1.jpeg",
    alt: "Live performance — The Chorus Abuja",
  },
  { src: "/images/gallery8.jpeg", alt: "Concert performance" },
  { src: "/images/groupp.jpg", alt: "The Chorus Abuja ensemble" },
  { src: "/images/chorus.jpg", alt: "The Chorus Abuja" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000); // resume after 8s
  };

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden text-white flex flex-col justify-end items-center text-center px-4 pb-28"
    >
      {/* Slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Ken Burns zoom */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.18 }}
            transition={{ duration: 6, ease: "easeInOut" }}
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Layered gradient overlays — images show through the centre, text stays readable */}
      {/* Base tint — very light, just takes the edge off bright images */}
      <div className="absolute inset-0 bg-black/25 z-10" />
      {/* Bottom gradient — anchors heading & CTAs */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 35%, transparent 65%)",
        }}
      />
      {/* Top gradient — softens sky/ceiling area */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-4xl">
        <Reveal direction="up" delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[1200px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            The Chorus Abuja
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          {/* ✅ Mobile-first scaling for subtext */}
          <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            Voices united in harmony, excellence, and purpose. Join us in
            creating music that inspires and transforms lives.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/50 rounded-full px-4 py-2 text-amber-300 text-sm font-medium mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
            Next Concert · Sep 13, 2026 — Tickets on Sale Now
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/events/paul/tickets"
              className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:scale-105 transition-all duration-300 text-center"
            >
              🎟 Get Tickets
            </a>
            <a
              href="#about"
              className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors duration-300 shadow-lg text-center"
            >
              Our Story
            </a>
            <a
              href="#join"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-800 active:bg-white active:text-blue-800 transition-colors duration-300 text-center"
            >
              Join Us
            </a>
          </div>
        </Reveal>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 text-white backdrop-blur-sm transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 text-white backdrop-blur-sm transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-400 ${
              i === current
                ? "bg-white w-6"
                : "bg-white/40 w-2 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
