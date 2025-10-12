"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SupportForm from "@/components/SupportForm";
import {
  Handshake,
  Megaphone,
  Building2,
  Wrench,
  Users,
  Globe,
  Heart,
  Lightbulb,
  Calendar,
  Camera,
  Music,
  Radio,
} from "lucide-react";

const partnershipTypes = [
  {
    icon: <Building2 className="w-8 h-8 text-blue-500" />,
    title: "Venue Partnerships",
    description:
      "Partner with churches, halls, and cultural centers to provide performance spaces for our classical concerts.",
    benefits: [
      "Concert venue hosting",
      "Acoustic excellence",
      "Community accessibility",
      "Cultural programming",
    ],
    highlight: true,
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Community Outreach",
    description:
      "Collaborate to bring classical music to wider audiences through community events and educational programs.",
    benefits: [
      "Free community concerts",
      "Music appreciation programs",
      "Youth engagement",
      "Cultural education",
    ],
    highlight: false,
  },
  {
    icon: <Wrench className="w-8 h-8 text-purple-500" />,
    title: "Technical Support",
    description:
      "Provide sound equipment, lighting, or technical expertise to enhance our performance quality.",
    benefits: [
      "Audio equipment",
      "Lighting support",
      "Recording services",
      "Technical expertise",
    ],
    highlight: true,
  },
  {
    icon: <Megaphone className="w-8 h-8 text-red-500" />,
    title: "Media & Promotion",
    description:
      "Help promote our concerts and mission through media coverage and digital platforms.",
    benefits: [
      "Event promotion",
      "Media coverage",
      "Social media support",
      "Documentation",
    ],
    highlight: false,
  },
  {
    icon: <Music className="w-8 h-8 text-yellow-500" />,
    title: "Musical Collaboration",
    description:
      "Join us in performances or provide musical expertise and instruments for our classical repertoire.",
    benefits: [
      "Guest performances",
      "Instrument lending",
      "Musical direction",
      "Repertoire development",
    ],
    highlight: true,
  },
  {
    icon: <Heart className="w-8 h-8 text-indigo-500" />,
    title: "Corporate Support",
    description:
      "Partner with businesses for sponsorship, employee engagement, and corporate social responsibility initiatives.",
    benefits: [
      "Corporate sponsorship",
      "Employee programs",
      "CSR partnerships",
      "Brand association",
    ],
    highlight: false,
  },
];

const partnershipStats = [
  {
    number: "53+",
    label: "Active Members",
    description: "Talented musicians and volunteers",
  },
  {
    number: "4+",
    label: "Years of Excellence",
    description: "Building musical excellence in Abuja",
  },
  {
    number: "8",
    label: "Concerts Performed",
    description: "Successfully executed performances",
  },
  {
    number: "1500+",
    label: "Lives Touched",
    description: "Through our performances and outreach",
  },
];

const successStories = [
  {
    partner: "St. Matthews Anglican Church",
    type: "Venue Partnership",
    story:
      "Our partnership with St. Matthews Anglican Church Maitama provided the perfect venue for our September 2022 performance of the 12th Mass, showcasing the grandeur of liturgical choral music.",
    icon: <Building2 className="w-8 h-8 text-blue-500" />,
    impact: "Sacred Music Performance",
  },
  {
    partner: "Local Community Centers",
    type: "Outreach Partnership",
    story:
      "Through partnerships with community centers, we have been able to bring free concerts to families and communities, making classical music accessible to all.",
    icon: <Users className="w-8 h-8 text-green-500" />,
    impact: "Community Accessibility",
  },
  {
    partner: "Cultural Organizations",
    type: "Arts Partnership",
    story:
      "Collaborating with cultural organizations has enabled us to preserve and celebrate Nigerian musical heritage while performing classical masterpieces.",
    icon: <Music className="w-8 h-8 text-purple-500" />,
    impact: "Cultural Preservation",
  },
];

const currentPartners = [
  {
    name: "St. Matthews Anglican Church",
    category: "Venue Partner",
    type: "Venue",
  },
  {
    name: "Community Centers",
    category: "Outreach Partner",
    type: "Community",
  },
  {
    name: "Cultural Organizations",
    category: "Arts Partner",
    type: "Arts",
  },
  {
    name: "Local Churches",
    category: "Venue Partner",
    type: "Venue",
  },
  {
    name: "Music Enthusiasts",
    category: "Individual Supporters",
    type: "Community",
  },
  {
    name: "Educational Institutions",
    category: "Educational Partner",
    type: "Education",
  },
];

const partnerBenefits = [
  {
    title: "Mutual Brand Enhancement",
    description:
      "Both organizations benefit from increased visibility and brand association",
  },
  {
    title: "Shared Resources",
    description: "Access to each other's networks, expertise, and resources",
  },
  {
    title: "Community Impact",
    description:
      "Combined efforts create greater positive impact in the community",
  },
  {
    title: "Cost-Effective Growth",
    description: "Achieve more with shared costs and collaborative efforts",
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 scroll-smooth">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 text-center mb-20">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Partner With Us
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Join us in elevating classical music in Nigeria. We seek
                meaningful partnerships with organizations, venues, and
                individuals who share our vision of musical excellence and
                cultural enrichment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Handshake className="w-4 h-4" />
                  Mutual Growth
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Community Impact
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Globe className="w-4 h-4" />
                  Shared Vision
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Partnership Stats */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partnership Success
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Building on our foundation of musical excellence and community
                impact
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipStats.map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </h3>
                    <h4 className="text-lg font-semibold text-gray-700 mb-1">
                      {stat.label}
                    </h4>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Partnership Types */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partnership Opportunities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the various ways we can collaborate and create mutual
                value
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 border ${
                    type.highlight
                      ? "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg"
                      : "bg-white border-gray-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-white shadow-md mr-4">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Examples of successful collaborations that have enhanced our
                musical mission
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 mr-4">
                      {story.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {story.partner}
                      </h3>
                      <p className="text-sm text-gray-600">{story.type}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    {story.story}
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3">
                    <p className="text-sm font-semibold text-blue-700">
                      Impact: {story.impact}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Benefits that create value for both organizations
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Current Partners */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Valued Partners
              </h2>
              <p className="text-gray-600">
                Building meaningful relationships across various sectors
              </p>
            </div>
          </Reveal>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPartners.map((partner, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-200">
                      <Handshake className="w-10 h-10 text-blue-500" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-gray-500">{partner.category}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Form */}
        <section id="partnership-form" className="max-w-4xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <Handshake className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Interested in Partnering?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                  Whether you're a brand, organization, or individual, your
                  support can help us create powerful musical experiences and
                  impact lives. Let's explore how we can work together.
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  💡 Contact us below to discuss partnership opportunities and
                  learn more about our mission.
                </p>
              </div>

              <SupportForm purpose="Partnership" />
            </div>
          </Reveal>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
              <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Create Something Amazing Together
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our network of partners and be part of a community that's
                making a real difference through music and cultural initiatives.
              </p>
              <div className="flex justify-center">
                <a
                  href="#partnership-form"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
