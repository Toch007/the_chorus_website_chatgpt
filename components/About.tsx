"use client";

import Link from "next/link";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20" id="about">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal direction="up" delay={0.2}>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Who We Are
          </h2>
        </Reveal>
        <Reveal direction="left" delay={0.4}>
          <p className="text-lg text-gray-700 leading-relaxed">
            More than a choir — we are a community. A family of musicians,
            volunteers, and creatives bringing hope, beauty, and joy through
            music.
          </p>
        </Reveal>
        <Reveal direction="right" delay={0.6}>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            Through meticulous rehearsals and captivating performances, we aim
            to inspire...
          </p>
        </Reveal>

        <Reveal delay={0.8}>
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-block bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
