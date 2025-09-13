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

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />

      <ParallaxBridge
        image="/images/chorus2.jpg"
        heading="The Chorus Abuja"
        subtext="Abuja's finest with years of excellent performances."
      />

      <About />

      <ParallaxBridge
        image="/images/solomon1.png"
        heading="The Best Ever Seen"
        subtext="Come watch the story ."
        height="h-[100vh]"
      />

      <Events />
      <Join />
      <Members />

      <ParallaxBridge
        image="/images/gallery4.jpeg"
        heading="Timeless Traditions"
        subtext="Where music meets meaning and history sings again."
      />

      <Testimonials />
      <Partners />
      <Footer />
    </>
  );
}
