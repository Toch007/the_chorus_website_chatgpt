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
        <Footer />

        {/* Performance Monitor - Only shows in development */}
        <PerformanceMonitor />
      </main>
    </>
  );
}
