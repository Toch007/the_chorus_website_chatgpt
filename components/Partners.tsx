"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const partners = [
  {
    name: "MTN Foundation",
    logo: "/images/partners/logo1.png",
    website: "https://foundation.mtnonline.com",
  },
  {
    name: "Goethe-Institut Nigeria",
    logo: "/images/partners/logo2.png",
    website: "https://www.goethe.de/ins/ng/en/index.html",
  },
  {
    name: "British Council",
    logo: "/images/partners/logo3.png",
    website: "https://www.britishcouncil.org.ng",
  },
  {
    name: "Goethe-Institut Nigeria",
    logo: "/images/partners/logo4.png",
    website: "https://www.goethe.de/ins/ng/en/index.html",
  },
];

export default function Partners() {
  return (
    <section className="bg-white py-16 px-6 md:px-20" id="partners">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Our Partners & Sponsors
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            We are proud to be supported by organizations that believe in the transformative power of music.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center mb-12">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <Link
            href="/support"
            className="inline-block bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Become a Partner or Sponsor
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
