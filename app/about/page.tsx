"use client";

import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ParallaxBridge from "@/components/ParallaxBridge";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { Calendar, Users, Music, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-800">
        {/* Hero Section with Background Image */}
        <section className="relative pt-24 px-4 pb-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/chorus-members.jpeg')",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-purple-900/70"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-5xl mx-auto text-center space-y-6">
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                About Us
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                <strong className="text-white">The Chorus Abuja</strong> is a
                non-denominational ensemble of multi-talented musicians based in
                Abuja, Nigeria. Founded in January 2021, our group has grown
                into a vibrant collective of singers, instrumentalists, and
                classical music enthusiasts.
              </p>
            </Reveal>

            {/* Statistics */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="bg-white/15 backdrop-blur-md border border-white/40 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:bg-white/25 hover:scale-105">
                  <Calendar className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">5+</div>
                  <div className="text-sm text-blue-200">Years Active</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md border border-white/40 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:bg-white/25 hover:scale-105">
                  <Music className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">10+</div>
                  <div className="text-sm text-blue-200">Concerts Performed</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md border border-white/40 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:bg-white/25 hover:scale-105">
                  <Users className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">40+</div>
                  <div className="text-sm text-blue-200">Active Members</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md border border-white/40 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:bg-white/25 hover:scale-105">
                  <Award className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-blue-200">Lives Touched</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <ParallaxBridge
          image="/images/about-page.jpg"
          heading="Timeless Traditions"
          subtext="Where music meets meaning and history sings again."
        />

        <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <Reveal direction="left">
            <div className="relative group">
              <Image
                src="/images/gallery3.jpg"
                alt="The Chorus"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-900 bg-opacity-20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-blue-800">
                A Journey of Passion
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our debut performance took place on{" "}
                  <strong className="text-blue-900">November 28, 2021</strong>,
                  with Joseph Haydn&apos;s <em>The Creation</em> oratorio. Held
                  at the St. Matthias House concert hall, it marked the
                  beginning of our dedication to musical excellence and
                  storytelling through sound.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-900 font-medium italic">
                    "From our very first note, we knew we were creating
                    something special - not just music, but a movement that
                    celebrates the rich heritage of classical traditions while
                    embracing our African identity."
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="bg-blue-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
                Our Foundation
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-10">
              <Reveal direction="left" delay={0.2}>
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To be the foremost professional classical choir of African
                    origin, bridging cultural heritage with classical excellence
                    and inspiring musical innovation across continents.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Music className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    We strive to perform classical oratorios, operas, and global
                    masterpieces with professionalism, while also nurturing a
                    new generation of highly skilled classical vocalists and
                    enriching our community through music.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
                Our Core Values
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Reveal delay={0.1}>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-800 mb-3 text-lg">
                    Professionalism
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Every note matters. Our members uphold high standards of
                    musical discipline and theoretical grounding.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-800 mb-3 text-lg">
                    Musical Quality
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    We aim for purity in tone, harmonic richness, and rhythmic
                    excellence that elevate every performance.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-800 mb-3 text-lg">
                    Diversity
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Our repertoire spans continents and centuries—from African
                    hymns to European symphonies.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-800 mb-3 text-lg">
                    Excellence & Passion
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    We are driven by an unrelenting passion to perform at our
                    best and inspire through music.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <ParallaxBridge
          image="/images/section-leaders.jpg"
          heading="A Musical Family"
          subtext="You can also be a part of our story."
        />

        <section className="bg-gradient-to-r from-blue-100 to-purple-50 py-16 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h3 className="text-3xl font-bold text-blue-800 mb-6">
                Join Our Musical Family
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
                Are you passionate about classical music? We&apos;re always on
                the lookout for committed vocalists and instrumentalists who
                share our vision of musical excellence and community impact.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/join"
                  className="inline-flex items-center bg-blue-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-full font-semibold hover:bg-blue-800 hover:text-white transition-all"
                >
                  Learn More
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
