"use client";

import Reveal from "@/components/Reveal";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const offset = window.scrollY * 0.2; // Adjust parallax strength
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
      {/* Parallax Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-110 transition-transform duration-100"
        src="/videos/chorus-video2.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

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
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Voices united in harmony, excellence, and purpose. Join us in
            creating music that inspires and transforms lives.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
