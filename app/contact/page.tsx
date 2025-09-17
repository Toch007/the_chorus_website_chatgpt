import { Metadata } from "next";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | The Chorus Abuja",
  description:
    "Get in touch with The Chorus Abuja for bookings, collaborations, or general enquiries. We'd love to hear from you.",
  openGraph: {
    title: "Contact The Chorus Abuja",
    description:
      "Reach out to The Chorus Abuja for bookings, events, and enquiries. We look forward to connecting with you.",
    url: "https://thechorusabuja.com/contact",
    siteName: "The Chorus Abuja",
    images: [
      {
        url: "/images/choir.jpg",
        width: 1200,
        height: 630,
        alt: "The Chorus Abuja Choir",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact The Chorus Abuja",
    description:
      "Reach out to The Chorus Abuja for bookings, events, and enquiries. We look forward to connecting with you.",
    images: ["/images/choir.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Whether for bookings, collaborations, or joining our choir family — we’d
            love to hear from you.
          </p>
        </section>

        {/* Contact Info Cards */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Mail className="w-8 h-8 text-blue-700 mb-3" />
            <h3 className="text-xl font-semibold mb-1">Email Us</h3>
            <p className="text-gray-600">thechorusabuja@gmail.com</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Phone className="w-8 h-8 text-blue-700 mb-3" />
            <h3 className="text-xl font-semibold mb-1">Call / WhatsApp</h3>
            <p className="text-gray-600">+234 812 345 6789</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <MapPin className="w-8 h-8 text-blue-700 mb-3" />
            <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
            <p className="text-gray-600">Abuja, Nigeria</p>
          </div>
        </section>

        {/* Map Section */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.470299926135!2d7.49508!3d9.072264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bdf57b1b9ab%3A0xf5a4df2e7f8f4f6!2sAbuja%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1697632748932!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form and we’ll respond within 24 hours.
              </p>
              <img
                src="/images/gallery6.jpeg"
                alt="Choir singing"
                className="rounded-2xl shadow-lg hidden md:block"
              />
            </div>

            {/* Form */}
            <form className="bg-gray-50 p-8 rounded-2xl shadow space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
