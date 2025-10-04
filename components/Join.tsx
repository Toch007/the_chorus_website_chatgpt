"use client";

import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function Join() {
  return (
    <section className="bg-blue-50 py-16 px-6 md:px-20" id="join">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal direction="down" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Find Your Place With Us
          </h2>
        </Reveal>

        <Reveal direction="left" delay={0.3}>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Whether you sing, volunteer, design, or manage tech — there's a role
            for you in The Chorus Abuja.
          </p>
        </Reveal>

        <Reveal direction="right" delay={0.5}>
          <p className="text-md text-gray-600 mb-10">
            Rehearsals are held weekly in Abuja, with performances scheduled
            throughout the year. Fill out our membership form to get
            started—we'd love to hear from you!
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.7}>
          <Link
            href="/join"
            className="inline-block bg-blue-800 text-white px-8 py-3 rounded-full font-medium shadow hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300"
          >
            ✍️ Join the Journey
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
