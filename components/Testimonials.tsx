"use client";

import Reveal from "@/components/Reveal";

const testimonials = [
  {
    name: "Adaobi N.",
    role: "Audience Member",
    quote: "The Chorus Abuja performance moved me to tears. I never knew classical music could be this powerful.",
  },
  {
    name: "Chinedu O.",
    role: "Tenor Section Member",
    quote: "Being part of this choir has transformed how I understand music. The community here is incredible.",
  },
  {
    name: "Rachel E.",
    role: "Concert Guest",
    quote: "It felt like I was watching a symphony in Vienna — but right here in Abuja. Absolutely stunning!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20" id="testimonials">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            What People Are Saying
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-gray-700 mb-10">
            Hear from our members and audience about their experience with The Chorus Abuja.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, index) => (
            <Reveal key={index} delay={0.3 + index * 0.1}>
              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-700 italic">“{t.quote}”</p>
                <p className="mt-4 font-semibold text-blue-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
