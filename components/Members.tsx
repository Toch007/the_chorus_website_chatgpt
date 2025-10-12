"use client";

import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";

export default function Members() {
  return (
    <section className="bg-white py-16 px-6 md:px-20" id="members">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Meet the Family
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            Every voice matters. Every hand makes a difference. Together, we make the music possible.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <Reveal direction="up" delay={0.3}>
            <div className="bg-gray-50 rounded-2xl shadow p-6">
              <Image
                src="/images/music-director.jpg"
                alt="Music Director"
                width={400}
                height={250}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-700">Music Director</h3>
              <p className="text-gray-700 mt-2">
                Leads the artistic direction, oversees rehearsals, and ensures the highest level
                of musical interpretation.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="bg-gray-50 rounded-2xl shadow p-6">
              <Image
                src="/images/gallery12.jpeg"
                alt="Instrumentalists"
                width={400}
                height={250}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-700">Experienced Instrumentalists</h3>
              <p className="text-gray-700 mt-2">
                Experienced instrumentalists who guide their groups and mentor new members.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.5}>
            <div className="bg-gray-50 rounded-2xl shadow p-6">
              <Image
                src="/images/chorus-members.jpeg"
                alt="Chorus Members"
                width={400}
                height={250}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-700">Chorus Members</h3>
              <p className="text-gray-700 mt-2">
                The heart of the ensemble—dedicated artists whose harmony, discipline, and spirit define our sound.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.6}>
          <div className="mt-10">
            <Link
              href="/join"
              className="inline-block bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Meet Our Ensemble
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
