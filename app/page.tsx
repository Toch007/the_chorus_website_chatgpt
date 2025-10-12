// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Join from "@/components/Join";
import Members from "@/components/Members";
import Testimonials from "@/components/Testimonials";
import Footer from "../components/Footer";
import Partners from "@/components/Partners";
import ParallaxBridge from "@/components/ParallaxBridge";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import VideoGallery from "@/components/VideoGallery";
import CriticalResources from "@/components/CriticalResources";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasSeenPopup = sessionStorage.getItem("solomonPopupShown");
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem("solomonPopupShown", "true");
    }
  }, []);

  return (
    <>
      <Header />
      <Hero />

      {/* 🎟️ Popup Modal with Background Image */}
      <AnimatePresence>
        {isClient && showPopup && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative rounded-2xl shadow-2xl max-w-lg w-[90%] overflow-hidden"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/solomon-1.jpg)" }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70" />

              {/* Content */}
              <div className="relative z-10 p-8 text-center text-white">
                {/* Close button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 text-gray-300 hover:text-white"
                >
                  ✖
                </button>

                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Limited Seats Available!
                </h2>
                <p className="text-gray-200 mb-6">
                  Don't miss{" "}
                  <span className="font-semibold">Handel's Solomon</span> — a
                  dramatized musical performance on{" "}
                  <span className="font-semibold">16 November 2025</span>.
                  Secure your tickets now before they sell out!
                </p>

                <Link
                  href="/events/solomon"
                  className="inline-block bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-300 transition"
                >
                  🎟️ Get Your Tickets
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ParallaxBridge
        image="/images/chorus2.jpg"
        heading="Abuja's Premier Choir"
        subtext="With over 4 years of excellence and 8 captivating concerts performed, The Chorus Abuja has filled concert halls and hearts with unforgettable performances."
      />

      <CriticalResources
        images={[
          "/images/chorus.jpg",
          "/images/20220828_174319.jpg",
          "/images/20220911_170221.jpg",
        ]}
      />

      <About />

      <ParallaxBridge
        image="/images/solomon-1.jpg"
        heading="Experience Handel's Solomon"
        subtext="A dramatized musical performance like no other. A story of wisdom, love, and power — told in breathtaking harmony. 16 November, 2025."
        height="h-[100vh]"
        ticketUrl="events/solomon"
      />

      <Events />
      <VideoGallery />
      <ImageGallery />
      <Join />

      <ParallaxBridge
        image="/images/gallery8.jpeg"
        heading="Timeless Traditions, Fresh Expressions"
        subtext="Where African rhythms meet classical excellence — carrying history forward through music."
      />

      <Members />
      <Testimonials />
      <Partners />
      <Footer />

      {/* Performance Monitor - Only shows in development */}
      <PerformanceMonitor />
    </>
  );
}
