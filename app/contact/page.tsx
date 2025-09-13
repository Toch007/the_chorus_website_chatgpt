

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useState } from "react";
import { Mail, Phone, Instagram, Facebook, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | The Chorus Abuja",
  description: "Get in touch with The Chorus Abuja — for event inquiries, bookings, general info, and collaborations.",
  openGraph: {
    title: "Contact Us | The Chorus Abuja",
    description: "Reach out to The Chorus Abuja for event bookings, ticketing questions, or collaborations.",
    url: "https://thechorusabuja.com/contact",  // your site domain
    images: ["/images/contact-banner.jpg"],       // pick a suitable image
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | The Chorus Abuja",
    description: "Reach out to The Chorus Abuja for event bookings, ticketing questions, or collaborations.",
    images: ["/images/contact-banner.jpg"],
  },
};

export default function ContactPage() {
  const [status, setStatus] = useState<null | "success" | "error" | "submitting">(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      e.currentTarget.reset();
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-20 space-y-16">
        <Reveal>
          <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">Contact Us</h1>
        </Reveal>

        <Reveal>
          <div className="bg-blue-50 rounded-xl shadow p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-700" />
                  <a href="mailto:info@thechorusabuja.org" className="text-blue-700 underline">
                    info@thechorusabuja.org
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-5 h-5 text-blue-700" />
                  <a href="tel:+2348123456789" className="text-blue-700 underline">
                    +234 812 345 6789
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-5 h-5 text-green-600" />
                  <a
                    href="https://wa.me/2348032157688"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    WhatsApp: +234 803 215 7688
                  </a>
                </p>
              </div>
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-gray-700">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <a
                    href="https://instagram.com/thechorusabuja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    @thechorusabuja
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <a
                    href="https://facebook.com/thechorusabuja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    facebook.com/thechorusabuja
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-700" />
                  St Matthews Anglican Church, Maitama, Plot 2047, Shehu Shagari Way, Maitama, Abuja
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="aspect-video w-full max-w-3xl mx-auto shadow-lg rounded overflow-hidden">
            <iframe
              src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.7139803286223!2d7.4791161745574835!3d9.089799088035228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a5ff347895b%3A0x82672082edbc3c7d!2s2047%20Shehu%20Shagari%20Wy%2C%20Wuse%2C%20Abuja%20904101%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1753698707689!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-center text-gray-600">
            <p><strong>Hours:</strong> Sundays – 1:00 PM to 3:00 PM | Rehearsals – Sundays 4:00 PM</p>
            <p><strong>Response time:</strong> We usually reply within 24 hours on weekdays.</p>
          </div>
        </Reveal>

        <Reveal>
          {status === "success" && (
            <p className="text-green-600 text-center">Your message has been sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center">Something went wrong. Please try again later.</p>
          )}

          <form
            action="https://formspree.io/f/mayvlnrb"
            method="POST"
            onSubmit={handleSubmit}
            target="_blank"
            className="space-y-6 bg-white p-8 shadow rounded max-w-2xl mx-auto"
          >
            <Reveal delay={0.1}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </Reveal>
          </form>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
