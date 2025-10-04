"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import ParallaxBridge from "@/components/ParallaxBridge";
import Reveal from "@/components/Reveal";
import {
  Heart,
  Users,
  Target,
  Gift,
  Building,
  Handshake,
  ArrowRight,
  DollarSign,
  Award,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react";

export default function SupportPage() {
  const impactStats = [
    {
      icon: Heart,
      value: "1500+",
      label: "Lives Touched",
      description: "Through our performances and outreach",
    },
    {
      icon: Target,
      value: "8",
      label: "Concerts Performed",
      description: "Memorable performances that inspire and uplift",
    },
    {
      icon: Award,
      value: "4+",
      label: "Years of Impact",
      description: "Serving the Abuja community with excellence",
    },
    {
      icon: Users,
      value: "53+",
      label: "Active Members",
      description: "Passionate musicians and volunteers",
    },
  ];

  const supportOptions = [
    {
      icon: Gift,
      title: "Make a Donation",
      description:
        "Support our mission with a one-time or recurring donation. Every amount counts towards our community impact.",
      link: "/support/donate",
      buttonText: "Donate Now",
      color: "from-green-500 to-emerald-600",
      highlight: "Most Popular",
    },
    {
      icon: Building,
      title: "Become a Sponsor",
      description:
        "Partner with us as a sponsor and gain visibility while supporting musical excellence and community development.",
      link: "/support/sponsors",
      buttonText: "Sponsor Us",
      color: "from-blue-500 to-indigo-600",
      highlight: "Corporate",
    },
    {
      icon: Handshake,
      title: "Partner With Us",
      description:
        "Collaborate with us for community outreach, media projects, and innovative musical initiatives.",
      link: "/support/partners",
      buttonText: "Let's Partner",
      color: "from-purple-500 to-violet-600",
      highlight: "Collaboration",
    },
  ];

  const impactAreas = [
    {
      icon: Users,
      title: "Community Outreach",
      description:
        "Free concerts and music education programs for underserved communities",
    },
    {
      icon: Award,
      title: "Youth Development",
      description:
        "Scholarships and mentorship programs for aspiring young musicians",
    },
    {
      icon: Heart,
      title: "Cultural Preservation",
      description:
        "Celebrating and preserving Nigerian musical heritage and traditions",
    },
    {
      icon: Zap,
      title: "Innovation in Music",
      description:
        "Contemporary arrangements and modern approaches to gospel music",
    },
  ];

  const testimonials = [
    {
      text: "The Chorus has been instrumental in supporting our community center. Their free concerts bring joy to families who can't afford entertainment.",
      author: "Mrs. Ada Okonkwo",
      role: "Community Leader",
      avatar: "A",
    },
    {
      text: "As a corporate sponsor, we've seen the incredible impact of our partnership. The visibility and community goodwill have been exceptional.",
      author: "Mr. James Udoka",
      role: "Corporate Partner",
      avatar: "J",
    },
  ];

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-20 space-y-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-3xl"></div>
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6">
                <Heart className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Support Our Mission
                </span>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-green-900 bg-clip-text text-transparent mb-6">
                Join Us in Making
                <br />
                <span className="text-5xl">a Difference</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
                Music inspires, heals, and brings people together. Your support
                helps us continue to perform, mentor, and impact lives through
                the transformative power of music and community.
              </p>

              {/* Impact Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {impactStats.map((stat, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-blue-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-800 mb-2">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-600">
                        {stat.description}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Support Options */}
        <section>
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-4">
                Ways to Support Our Mission
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose how you'd like to contribute to our community impact and
                help us continue spreading joy through music
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group bg-white border border-blue-100 shadow-lg rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {option.highlight && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {option.highlight}
                    </div>
                  )}

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-purple-800 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {option.description}
                    </p>
                    <Link
                      href={option.link}
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${option.color} text-white px-8 py-3 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold group`}
                    >
                      {option.buttonText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <ParallaxBridge
          image="/images/support.jpg"
          heading="Support Our Mission"
          subtext="Your contribution makes a difference."
        />

        {/* Impact Areas */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-blue-800 bg-clip-text text-transparent mb-4">
                Your Impact in Action
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See how your support directly contributes to positive change in
                our community and beyond
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <area.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-900 mb-3 group-hover:text-blue-800 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials from Partners */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-12">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-4">
                What Our Partners Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from those who have experienced the joy of supporting our
                mission
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <div className="bg-white/80 backdrop-blur-sm border border-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-purple-900">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <Reveal>
            <h2 className="text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
              Every contribution, no matter the size, helps us continue our
              mission of spreading joy, building community, and transforming
              lives through music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support/donate"
                className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                <Gift className="w-5 h-5" />
                Start Supporting Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group"
              >
                Learn More About Partnerships
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Other Support Options */}
        <section className="text-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12">
          <Reveal>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Looking to Support Differently?
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto mb-8">
              We welcome various forms of support! Whether you're a volunteer,
              service provider, or have unique ideas for collaboration, we'd
              love to hear from you.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Reveal delay={0.1}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-900 mb-2">
                    In-Kind Donations
                  </h3>
                  <p className="text-sm text-gray-600">
                    Equipment, instruments, or services
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Volunteer Time
                  </h3>
                  <p className="text-sm text-gray-600">
                    Help with events and operations
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Professional Services
                  </h3>
                  <p className="text-sm text-gray-600">
                    Legal, accounting, or marketing support
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="mt-8">
              <Link
                href="/support/other"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-semibold"
              >
                Explore Other Ways to Help
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Thank You Section */}
        <section className="text-center">
          <Reveal>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                Thank You for Supporting The Chorus Abuja 🎶
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Your involvement empowers voices, builds community, and
                celebrates the transformative power of music. Together, we're
                creating harmony that resonates far beyond our performances.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
