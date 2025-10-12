"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import {
  Users,
  HeartHandshake,
  Camera,
  Music,
  Quote,
  ChevronDown,
  Heart,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import ParallaxBridge from "@/components/ParallaxBridge";

const joinOptions = [
  {
    icon: <Music className="w-10 h-10 text-blue-700" />,
    title: "Choir Member",
    description:
      "Share your voice with our talented group of singers across all vocal ranges.",
    link: "/join/choir",
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-blue-700" />,
    title: "Volunteer",
    description:
      "Offer your time and energy to support our events and outreach.",
    link: "/join/volunteer",
  },
  {
    icon: <Camera className="w-10 h-10 text-blue-700" />,
    title: "Media & Creatives",
    description:
      "Help us capture and share our moments through photo, video, and design.",
    link: "/join/media",
  },
  {
    icon: <Users className="w-10 h-10 text-blue-700" />,
    title: "Tech & Logistics",
    description: "Assist with sound, staging, transport, and technical setup.",
    link: "/join/tech",
  },
];

const faqs = [
  {
    q: "Do I need experience to join the choir?",
    a: "Yes, some musical experience is required to join the choir. While you don't need to be a professional, basic musical knowledge and singing ability are essential. We also have tech and media team positions for those with different skills.",
  },
  {
    q: "What's the time commitment?",
    a: "Our main rehearsals are on Sundays, with additional rehearsal schedules shared with choir members as needed. We also have occasional performances on weekends. We understand life can be busy and work with your schedule.",
  },
  {
    q: "Are there any fees involved?",
    a: "There are no membership fees for joining the choir. We believe music should be accessible to everyone who has the required skills and dedication.",
  },
  {
    q: "Can I join if I'm not a Christian?",
    a: "While we're a gospel choir with Christian roots, we welcome anyone who appreciates our music and values. Our community is built on love, respect, and inclusion.",
  },
  {
    q: "What if I can't make it to every rehearsal?",
    a: "We understand that life happens. Consistent attendance is important for the choir's success, but just communicate with us if you have scheduling conflicts. We'll work together to keep you engaged and up to speed.",
  },
];

export default function JoinPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const statistics = [
    {
      icon: Users,
      value: "53+",
      label: "Active Members",
      description: "Talented individuals from all walks of life",
    },
    {
      icon: Calendar,
      value: "8",
      label: "Concerts Performed",
      description: "Memorable performances that inspire and uplift",
    },
    {
      icon: Award,
      value: "4+",
      label: "Years of Excellence",
      description: "Leading classical and traditional gospel music in Nigeria",
    },
    {
      icon: Heart,
      value: "1500+",
      label: "Lives Touched",
      description: "Through our music and community outreach",
    },
  ];

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-20 space-y-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-3xl"></div>
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Join Our Musical Family
                </span>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 bg-clip-text text-transparent mb-6">
                Become Part of Something
                <br />
                <span className="text-5xl">Extraordinary</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
                Join Nigeria's premier classical choir. Whether you're a
                vocalist, instrumentalist, or supporter, discover your place in
                our community of passionate musicians dedicated to classical
                excellence.
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {statistics.map((stat, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                <Link
                  href="/join/choir"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  <Music className="w-5 h-5" />
                  Choir Member
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/join/volunteer"
                  className="bg-white/90 backdrop-blur-sm text-blue-700 border-2 border-blue-200 px-6 py-4 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  <HeartHandshake className="w-5 h-5" />
                  Volunteer
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/join/media"
                  className="bg-white/90 backdrop-blur-sm text-purple-700 border-2 border-purple-200 px-6 py-4 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  <Camera className="w-5 h-5" />
                  Media Team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/join/tech"
                  className="bg-white/90 backdrop-blur-sm text-green-700 border-2 border-green-200 px-6 py-4 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  <Users className="w-5 h-5" />
                  Tech Team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Quick Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Each button above takes you to a dedicated application form.
                  Scroll down for detailed information about each role.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <ParallaxBridge
          image="/images/gallery1.jpg"
          heading="A Perfect Harmony"
          subtext="Music, Excellence, Community and Creativity."
        />

        {/* Why Join Us Section */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-4">
                Why Choose The Chorus?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the unique benefits and opportunities that await you as
                a member of our musical family
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Professional Training
                </h3>
                <p className="text-gray-600">
                  Learn from experienced vocal coaches and musicians who will
                  help you reach your full potential
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Supportive Community
                </h3>
                <p className="text-gray-600">
                  Join a family of believers who share your passion for music
                  and spiritual growth
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Performance Opportunities
                </h3>
                <p className="text-gray-600">
                  Showcase your talents in concerts, events, and outreach
                  programs across Nigeria
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Reveal delay={0.4}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h4 className="text-lg font-semibold text-blue-900">
                    Flexible Commitment
                  </h4>
                </div>
                <p className="text-gray-600">
                  We understand life can be busy. Our rehearsal schedules are
                  designed to accommodate different lifestyles and commitments.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h4 className="text-lg font-semibold text-blue-900">
                    Personal Growth
                  </h4>
                </div>
                <p className="text-gray-600">
                  Beyond music, you'll develop leadership skills, build
                  confidence, and form lasting friendships that extend beyond
                  rehearsals.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Join Options */}
        <Reveal>
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-4">
                4 Ways to Get Involved
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Choose how you'd like to contribute to our mission of spreading
                joy through music. Each option has a dedicated application form.
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
                <CheckCircle className="w-4 h-4" />
                All positions are open - Click any option below to apply
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {joinOptions.map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <Link
                    href={item.link}
                    className="group bg-white border-2 border-blue-100 shadow-lg rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 text-center block relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <div className="w-8 h-8 text-white flex items-center justify-center">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-purple-800 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Currently Accepting Applications
                        </div>
                        <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Testimonials */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-4">
                Stories from Our Family
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from members who have found their voice and purpose with
                The Chorus
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={0.2}>
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-4 italic">
                      "Joining The Chorus gave me a second family. I've grown
                      spiritually and musically in ways I never imagined
                      possible. The support and encouragement here is
                      incredible."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          J
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">Joy</div>
                        <div className="text-sm text-gray-600">
                          Alto • 3 years with us
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-white/80 backdrop-blur-sm border border-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-4 italic">
                      "I love the energy, the passion, and the sense of purpose
                      here. It's powerful how music can unite people and touch
                      hearts. This community has changed my life."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          S
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900">
                          Samuel Okafor
                        </div>
                        <div className="text-sm text-gray-600">
                          Volunteer • 2 years with us
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Additional testimonials */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Reveal delay={0.6}>
              <div className="bg-white/60 backdrop-blur-sm border border-purple-100 p-6 rounded-2xl hover:bg-white/80 transition-all duration-300">
                <Quote className="w-5 h-5 text-purple-600 mb-3" />
                <p className="text-gray-700 text-sm italic mb-3">
                  "The vocal training here is exceptional. I've discovered parts
                  of my voice I never knew existed."
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-purple-900"></span>
                  <span className="text-gray-600"> • Soprano</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.8}>
              <div className="bg-white/60 backdrop-blur-sm border border-blue-100 p-6 rounded-2xl hover:bg-white/80 transition-all duration-300">
                <Quote className="w-5 h-5 text-blue-600 mb-3" />
                <p className="text-gray-700 text-sm italic mb-3">
                  "Being part of the tech team has been incredibly fulfilling.
                  We're making a real impact behind the scenes."
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-blue-900">Uzor</span>
                  <span className="text-gray-600"> • Tech Team</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-12">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about joining our choir
                community
              </p>
            </div>
          </Reveal>

          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    className="w-full flex justify-between items-center px-8 py-6 text-left text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                  >
                    <span className="text-lg group-hover:text-blue-800 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center transform transition-all duration-300 ${openFAQ === idx ? "rotate-180 scale-110" : "group-hover:scale-110"}`}
                    >
                      <ChevronDown className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  {openFAQ === idx && (
                    <div className="px-8 py-6 text-gray-700 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-t border-blue-100">
                      <p className="leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Call to Action */}
          <Reveal delay={0.6}>
            <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Join Our Family?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Take the first step towards an incredible musical journey.
                Whether you're a seasoned performer or just starting out,
                there's a place for you here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/join/choir"
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group"
                >
                  Ask Questions
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
