"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SupportForm from "@/components/SupportForm";
import Image from "next/image";
import { Handshake, Megaphone, Building2, Wrench } from "lucide-react";

const partnershipTypes = [
  {
    icon: <Megaphone className="w-8 h-8 text-blue-700" />,
    title: "Media & Publicity",
    description: "Amplify our voice through media, social platforms, and networks."
  },
  {
    icon: <Building2 className="w-8 h-8 text-blue-700" />,
    title: "Corporate Sponsorship",
    description: "Fund initiatives or provide financial backing for special projects."
  },
  {
    icon: <Wrench className="w-8 h-8 text-blue-700" />,
    title: "Technical & Logistics",
    description: "Provide equipment, transportation, or tech support for events."
  },
  {
    icon: <Handshake className="w-8 h-8 text-blue-700" />,
    title: "Community Outreach",
    description: "Collaborate with us for grassroots events and impact projects."
  }
];

const partnerLogos = [
  "/images/partners/logo1.png",
  "/images/partners/logo2.png",
  "/images/partners/logo3.png",
  "/images/partners/logo4.png"
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-16 text-center">
        <Reveal>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Partner With Us</h1>
        </Reveal>

        <Reveal>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We welcome partnerships for media, outreach, logistics, events, and more.
            Let’s create something beautiful together.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-2 gap-8 mt-10 text-left">
            {partnershipTypes.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                {item.icon}
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Interested in Partnering?</h2>
            <p className="text-gray-700 mb-6">
              Whether you're a brand, organization, or individual, your support can help us create powerful musical experiences and impact lives.
            </p>
            <SupportForm purpose="Partnership" />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Our Partners</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center">
              {partnerLogos.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt={`Partner ${idx + 1}`}
                  width={120}
                  height={60}
                  className="mx-auto grayscale hover:grayscale-0 transition duration-300"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}