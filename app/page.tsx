// app/page.tsx
"use client";

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
import ImageGallery from "@/components/ImageGallery";
import AnniversaryBanner from "@/components/AnniversaryBanner";

export default function HomePage() {
  return (
    <>
      <Header />
      <AnniversaryBanner />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <ParallaxBridge
          image="/images/chorus2.jpg"
          heading="Abuja's Premier Choir"
          subtext="Celebrating 5 years of excellence with 10+ captivating concerts performed, The Chorus Abuja has filled concert halls and hearts with unforgettable performances."
        />

        <CriticalResources
          images={[
            "/images/chorus.jpg",
            "/images/20220828_174319.jpg",
            "/images/20220911_170221.jpg",
          ]}
        />

        <About />

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

        {/* Support / Donate Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="text-3xl">🎶</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Support the Music
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl mx-auto">
              The Chorus Abuja is sustained by the generosity of music lovers
              like you. Your donation — no matter the size — helps us rehearse,
              perform, and keep classical music alive in Abuja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/support/donate"
                className="inline-block bg-amber-400 hover:bg-amber-300 text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-amber-400/40 hover:scale-105 transition-all duration-300"
              >
                ❤️ Make a Donation
              </a>
              <a
                href="/events/paul"
                className="inline-block border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                🎟 Get Concert Tickets
              </a>
            </div>
          </div>
        </section>

        <Footer />

        {/* Performance Monitor - Only shows in development */}
        <PerformanceMonitor />
      </main>
    </>
  );
}
