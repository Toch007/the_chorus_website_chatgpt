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

// Infinite scroll component for partner logos
function InfiniteScroll({
  partners,
  direction = "left",
}: {
  partners: Partner[];
  direction?: "left" | "right";
}) {
  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden py-8">
      <div
        className={`flex gap-16 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{
          width: "fit-content",
        }}
      >
        {duplicatedPartners.map((partner, index) => {
          const content = (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition duration-300 max-w-full max-h-full"
              />
            </div>
          );

          return partner.website ? (
            <a
              key={`${partner.id}-${index}`}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              {content}
            </a>
          ) : (
            content
          );
        })}
      </div>
    </div>
  );
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partners", {
          // Prevent caching to always get fresh data
          cache: "no-store",
          next: { revalidate: 0 },
        });
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

    // Optional: Refetch every 30 seconds to get updates
    const interval = setInterval(fetchPartners, 30000);

    return () => clearInterval(interval);
  }, []);

  // Split partners into rows for alternating scroll directions
  const getPartnerRows = () => {
    if (partners.length === 0) return [];

    const itemsPerRow = Math.ceil(partners.length / 2);
    const row1 = partners.slice(0, itemsPerRow);
    const row2 = partners.slice(itemsPerRow);

    return [row1, row2].filter((row) => row.length > 0);
  };

  const partnerRows = getPartnerRows();

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
            <div className="space-y-4 mb-12">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-8 overflow-hidden">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse flex-shrink-0">
                      <div className="h-16 w-32 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <div className="space-y-0 mb-12">
              {partnerRows.map((row, rowIndex) => (
                <InfiniteScroll
                  key={rowIndex}
                  partners={row}
                  direction={rowIndex % 2 === 0 ? "left" : "right"}
                />
              ))}
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
