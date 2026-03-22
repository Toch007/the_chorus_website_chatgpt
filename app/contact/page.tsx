"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Thank you for your message! We'll get back to you within 24 hours."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Background Image */}
        <section className="relative text-white pt-24 pb-20 px-6 text-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/groupp.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-purple-900/85 to-blue-900/90"></div>
          </div>

          {/* Content */}
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-blue-100">
              Whether for bookings, collaborations, or joining our choir family
              — we'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us. Choose what works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Primary Email */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition group">
              <Mail className="w-8 h-8 text-blue-700 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
              <a
                href="mailto:info@thechorusabuja.org"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                info@thechorusabuja.org
              </a>
              <p className="text-sm text-gray-500 mt-1">
                Response within 24 hours
              </p>
            </div>

            {/* Phone/WhatsApp */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition group">
              <Phone className="w-8 h-8 text-blue-700 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Call / WhatsApp</h3>
              <div className="space-y-1">
                <a
                  href="tel:+2348032157688"
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  08032157688
                </a>
                <a
                  href="tel:+2347036479579"
                  className="block text-blue-600 hover:text-blue-800 font-medium"
                >
                  07036479579
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9AM-6PM WAT</p>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition group">
              <MapPin className="w-8 h-8 text-blue-700 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <p className="text-gray-700 font-medium">
                St Matthews Anglican Church
              </p>
              <p className="text-gray-600 text-sm">
                Plot 2047, Shehu Shagari Way
              </p>
              <p className="text-gray-600 text-sm">Maitama, Abuja</p>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition group">
              <div className="flex gap-2 mb-3">
                <Instagram className="w-6 h-6 text-blue-700" />
                <Facebook className="w-6 h-6 text-blue-700" />
                <Twitter className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">Social Media Links</p>
                <p className="text-xs text-gray-500">
                  Find all our social handles in the page footer below
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      Monday - Friday
                    </span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Saturday</span>
                    <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Sunday</span>
                    <span className="text-gray-600">
                      Closed (Rehearsal Days)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Response Times
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Email: Within 24 hours
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">
                      WhatsApp: Within 2-4 hours
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Social Media: Same day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3297687996406!2d7.4832837!3d9.082032999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0b%3A0x4a1f8e5b54c1e2d0!2sPlot%202047%2C%20Shehu%20Shagari%20Way%2C%20Maitama%2C%20Abuja!5e0!3m2!1sen!2sng!4v1697632748932!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions. Can't find what you're looking
              for? Contact us directly!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                How can I join The Chorus Abuja?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visit our{" "}
                <span className="font-medium text-blue-600">Join Us</span> page
                to apply for choir, media team, tech team, or volunteer
                positions. We welcome members of all experience levels!
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Do you take bookings for events?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We currently do not take bookings for private events. We focus
                on our regular performances and concerts. Follow our social
                media or check our events page for upcoming public performances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                When do you rehearse?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our main rehearsals are on Sundays. Specific times and
                additional rehearsal schedules are shared with choir members via
                our internal communication channels.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                How can I support The Chorus?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You can support us through{" "}
                <span className="font-medium text-blue-600">donations</span>,
                becoming a{" "}
                <span className="font-medium text-blue-600">
                  sponsor or partner
                </span>
                , or attending our events. Visit our Support page for more
                details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                Do I need musical experience to join?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, some musical experience is required to join the choir.
                While you don't need to be a professional, basic musical
                knowledge and singing ability are essential. We also have tech
                and media team positions for those with different skills.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                How quickly will you respond?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We aim to respond to all inquiries within 24 hours during
                business days. WhatsApp messages typically receive faster
                responses during business hours.
              </p>
            </div>
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
            <div className="bg-gray-50 p-8 rounded-2xl shadow">
              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg border focus:ring-1 focus:ring-blue-500 transition ${
                      errors.name
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg border focus:ring-1 focus:ring-blue-500 transition ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg border focus:ring-1 focus:ring-blue-500 transition ${
                      errors.subject
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full p-3 rounded-lg border focus:ring-1 focus:ring-blue-500 transition resize-none ${
                      errors.message
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
