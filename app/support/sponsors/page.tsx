"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SupportForm from "@/components/SupportForm";
import {
  Trophy,
  Users,
  Megaphone,
  TrendingUp,
  CheckCircle,
  Star,
  Crown,
  Award,
  Building,
  Handshake,
  Eye,
  Target,
} from "lucide-react";

const sponsorshipBenefits = [
  {
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    title: "Brand Visibility",
    description:
      "Showcase your brand to diverse audiences at concerts, festivals, and across our digital platforms.",
    highlight: true,
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Community Impact",
    description:
      "Support local talent and youth development while enhancing your corporate social responsibility (CSR) profile.",
    highlight: false,
  },
  {
    icon: <Star className="w-8 h-8 text-purple-500" />,
    title: "Exclusive Access",
    description:
      "Receive VIP invitations, backstage access, and networking opportunities with influential leaders.",
    highlight: true,
  },
  {
    icon: <Target className="w-8 h-8 text-red-500" />,
    title: "Targeted Audience",
    description:
      "Connect with music lovers, cultural enthusiasts, and community leaders who align with your brand values.",
    highlight: false,
  },
  {
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    title: "Award Recognition",
    description:
      "Receive public recognition for your support of arts and culture at our events and ceremonies.",
    highlight: true,
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-indigo-500" />,
    title: "Marketing ROI",
    description:
      "Maximize your marketing budget with cost-effective sponsorship packages that deliver results.",
    highlight: false,
  },
];

const sponsorshipTiers = [
  {
    name: "Bronze Sponsor",
    description: "Perfect for small businesses looking to support local arts",
    color: "from-amber-600 to-amber-700",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: <Award className="w-8 h-8" />,
    benefits: [
      "Logo on event programs and website",
      "2 complimentary concert tickets",
      "Social media mentions",
      "Certificate of appreciation",
      "Newsletter feature",
    ],
    popular: false,
  },
  {
    name: "Silver Sponsor",
    description:
      "Ideal for medium enterprises seeking greater brand visibility",
    color: "from-gray-400 to-gray-600",
    textColor: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    icon: <Star className="w-8 h-8" />,
    benefits: [
      "Logo on banners, programs, and website",
      "4 complimentary tickets",
      "Social media features and mentions",
      "VIP seating arrangement",
      "Quarterly impact reports",
      "Networking event invitations",
    ],
    popular: true,
  },
  {
    name: "Gold Sponsor",
    description: "Premium partnership for major corporations and institutions",
    color: "from-yellow-400 to-yellow-600",
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: <Crown className="w-8 h-8" />,
    benefits: [
      "Premium logo placement on all platforms",
      "6 tickets with VIP treatment",
      "Dedicated social media campaigns",
      "Stage mentions and recognition",
      "Backstage access and meet & greets",
      "Custom partnership activations",
      "Exclusive sponsor-only events",
    ],
    popular: false,
  },
];

const sponsorshipStats = [
  {
    number: "1500+",
    label: "Lives Touched",
    description: "Through our performances and outreach",
  },
  {
    number: "85%",
    label: "Brand Recall Rate",
    description: "Among event attendees",
  },
  {
    number: "8",
    label: "Concerts Performed",
    description: "Memorable performances that inspire",
  },
  {
    number: "4+",
    label: "Years of Excellence",
    description: "Building musical excellence in Abuja",
  },
];

const currentSponsors = [
  // Currently building our sponsorship network
  // Interested in becoming our first official sponsor?
  // Contact us to explore partnership opportunities
];

export default function SponsorsPage() {
  const [selectedTier, setSelectedTier] = useState<string>("");

  const handleTierSelect = (tierName: string) => {
    setSelectedTier(tierName);
    // Scroll to contact form
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

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
                  Become a Sponsor
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Join us in nurturing musical excellence while gaining visibility
                for your brand. Sponsoring The Chorus Abuja is a meaningful
                investment in culture, talent, and community impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Trophy className="w-4 h-4" />
                  Premium Visibility
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Community Impact
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Handshake className="w-4 h-4" />
                  Strategic Partnership
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Sponsorship Stats */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our sponsorship delivers measurable results and meaningful brand
                exposure
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipStats.map((stat, index) => (
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

        {/* Sponsorship Benefits */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sponsorship Benefits
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the comprehensive advantages of partnering with The
                Chorus Abuja
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorshipBenefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 border ${
                    benefit.highlight
                      ? "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg"
                      : "bg-white border-gray-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-white shadow-md mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partnership Packages
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the sponsorship level that best fits your brand's goals.
                Contact us to learn about package values and customize your
                partnership.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                    tier.popular
                      ? "bg-gradient-to-b from-blue-50 to-purple-50 border-2 border-blue-200 shadow-2xl"
                      : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${tier.color}`}
                    >
                      <div className="text-white">{tier.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {tier.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleTierSelect(tier.name)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                        : `${tier.bgColor} ${tier.textColor} border ${tier.borderColor} hover:bg-opacity-80`
                    }`}
                  >
                    Enquire About Package
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sponsorship Opportunities */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Our Sponsorship Network
              </h2>
              <p className="text-gray-600">
                Be among the first to partner with us and support classical
                music excellence in Nigeria
              </p>
            </div>
          </Reveal>

          <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center">
                <Handshake className="w-16 h-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Become Our Pioneer Sponsor
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                We are actively seeking our first official sponsors to join us
                in our mission to elevate classical music in Nigeria. Your
                partnership will be recognized as foundational to our growth and
                success.
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Explore Partnership Opportunities
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="max-w-4xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <Trophy className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Partner With Us?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                  Let's create a customized sponsorship package that aligns with
                  your brand goals and maximizes your impact.
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  💡 Interested in package pricing? Contact us below for
                  detailed information and custom quotes.
                </p>
                {selectedTier && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Selected Package:</strong> {selectedTier}
                    </p>
                  </div>
                )}
              </div>

              <SupportForm purpose="Sponsorship" selectedTier={selectedTier} />
            </div>
          </Reveal>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
              <Handshake className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our community of sponsors and be part of nurturing the next
                generation of musical talent in Abuja.
              </p>
              <div className="flex justify-center">
                <a
                  href="#contact-form"
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
