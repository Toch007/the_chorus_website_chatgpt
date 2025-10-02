"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partners");
        const result = await response.json();

        if (result.success && result.partners) {
          setPartners(result.partners);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
        // Fallback to empty array if API fails
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);
  return (
    <section className="bg-white py-16 px-6 md:px-20" id="partners">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            In Harmony With Our Partners
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            We are grateful for those who walk with us in making music that
            matters.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center mb-12">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center mb-12">
              {partners.map((partner) => {
                const content = (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                );

                return partner.website ? (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={partner.id}
                    className="flex items-center justify-center"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <p className="text-gray-500">
                We're building partnerships to create meaningful impact. Stay
                tuned for exciting collaborations!
              </p>
            </div>
          )}
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
