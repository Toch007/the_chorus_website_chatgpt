"use client";

import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ParallaxBridge from "@/components/ParallaxBridge";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-800">
        <section className="bg-gradient-to-r from-blue-50 to-white pt-24 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-blue-800">About Us</h1>
            <p className="text-lg md:text-xl text-gray-700">
              <strong>The Chorus Abuja</strong> is a non-denominational ensemble of multi-talented musicians based in Abuja, Nigeria.
              Founded in January 2021, our group has grown into a vibrant collective of singers, instrumentalists, and classical music enthusiasts.
            </p>
          </div>
              </section>
              <ParallaxBridge
        image="/images/about-page.jpg"
        heading="Timeless Traditions"
        subtext="Where music meets meaning and history sings again."
      />

        <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <Image 
            src="/images/gallery3.jpg" 
            alt="The Chorus" 
            width={600} 
            height={400}
            className="rounded-lg shadow-xl w-full h-auto object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-800">A Journey of Passion</h2>
            <p className="text-gray-700">
              Our debut performance took place on November 28, 2021, with Joseph Haydn’s <em>The Creation</em> oratorio. Held at the St. Matthias House concert hall,
              it marked the beginning of our dedication to musical excellence and storytelling through sound.
            </p>
          </div>
        </section>

        <section className="bg-blue-50 py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Our Vision</h3>
              <p className="text-gray-700">To be the foremost professional classical choir of African origin.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Our Mission</h3>
              <p className="text-gray-700">
                We strive to perform classical oratorios, operas, and global masterpieces with professionalism,
                while also nurturing a new generation of highly skilled classical vocalists.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-700">
              <div>
                <h4 className="font-semibold text-blue-700 mb-1">Professionalism</h4>
                <p>
                  Every note matters. Our members uphold high standards of musical discipline and theoretical grounding.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-1">Musical Quality</h4>
                <p>
                  We aim for purity in tone, harmonic richness, and rhythmic excellence that elevate every performance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-1">Diversity</h4>
                <p>
                  Our repertoire spans continents and centuries—from African hymns to European symphonies.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-1">Excellence & Passion</h4>
                <p>
                  We are driven by an unrelenting passion to perform at our best and inspire through music.
                </p>
              </div>
            </div>
          </div>
              </section>
              <ParallaxBridge
        image="/images/section-leaders.jpg"
        heading="A Musical Family"
        subtext="You can also be a part of our story."
      />

        <section className="bg-blue-100 py-12 text-center px-4">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Join Our Ensemble</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Are you passionate about classical music? We’re always on the lookout for committed vocalists and instrumentalists.
            Fill out the form and our team will be in touch.
          </p>
          <a
            href="/join"
            rel="noopener noreferrer"
            className="inline-block bg-blue-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
