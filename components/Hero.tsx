"use client";

import Reveal from "@/components/Reveal";
import LazyVideo from "@/components/LazyVideo";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        // Reduce parallax intensity on mobile for better performance
        const isMobile = window.innerWidth < 768;
        const parallaxStrength = isMobile ? 0.1 : 0.2;
        const offset = window.scrollY * parallaxStrength;

        if (videoRef.current) {
          videoRef.current.style.transform = `scale(1.1) translateY(${offset}px)`;
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden text-white flex flex-col justify-center items-center text-center px-4"
    >
      {/* Optimized Parallax Video - Reduced parallax on mobile for better performance */}
      <div
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full z-0 scale-110 transition-transform duration-100"
      >
        <LazyVideo
          src="/videos/chorus-video2.mp4"
          poster="/images/chorus.jpg"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl">
        <Reveal direction="up" delay={0.1}>
          {/* ✅ Adjust heading sizes for better mobile balance */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[1200px]">
            The Chorus Abuja
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          {/* ✅ Mobile-first scaling for subtext */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
            Voices united in harmony, excellence, and purpose. Join us in
            creating music that inspires and transforms lives.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
    </section>
  );
}
