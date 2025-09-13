"use client";

import Reveal from "@/components/Reveal";

export default function Join() {
  return (
    <section className="bg-blue-50 py-16 px-6 md:px-20" id="join">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Join The Chorus Abuja
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Are you passionate about classical music and eager to perform with a
            dedicated group of artists? Whether you sing soprano, alto, tenor,
            or bass—or play an instrument—we welcome your talent. Become a part
            of a musical journey that inspires, uplifts, and connects through
            harmony.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-md text-gray-600 mb-10">
            Rehearsals are held weekly in Abuja, with performances scheduled
            throughout the year. Fill out our membership form to get
            started—we’d love to hear from you!
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <a
            href="/join"
            className="inline-block bg-blue-800 text-white px-8 py-3 rounded-full font-medium shadow hover:bg-blue-700 transition"
          >
            Apply to Join
          </a>
        </Reveal>
      </div>
    </section>
  );
}
