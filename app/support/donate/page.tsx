"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonationForm from "@/components/DonationForm";
import Reveal from "@/components/Reveal";
import {
  Heart,
  Shield,
  Award,
  TrendingUp,
  CreditCard,
  Building,
  QrCode,
  Smartphone,
} from "lucide-react";

const impactStats = [
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    number: "1500+",
    label: "Lives Touched",
    description: "Through our musical programs",
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-500" />,
    number: "8",
    label: "Concerts Performed",
    description: "Memorable performances that inspire",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    number: "4+",
    label: "Years Active",
    description: "Building musical excellence",
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    number: "100%",
    label: "Transparency",
    description: "Your donation goes directly to our mission",
  },
];

const donationImpacts = [
  {
    amount: "₦5,000",
    impact: "Helps support basic operational needs and materials",
    highlight: false,
  },
  {
    amount: "₦15,000",
    impact: "Contributes to music education and choir development",
    highlight: true,
  },
  {
    amount: "₦30,000",
    impact: "Supports concert production and community outreach",
    highlight: false,
  },
  {
    amount: "₦50,000",
    impact: "Makes a significant impact on our musical mission",
    highlight: true,
  },
];

const testimonials = [
  {
    quote:
      "The Chorus Abuja's dedication to classical music excellence and community outreach makes them worthy of support.",
    author: "Community Supporter",
    role: "Music Enthusiast",
  },
  {
    quote:
      "Supporting classical music education and cultural preservation is an investment in our community's artistic future.",
    author: "Arts Advocate",
    role: "Cultural Patron",
  },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 text-center mb-20">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Make a Difference
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Your generosity fuels our mission to nurture musical talent,
                build communities, and create transformative experiences through
                the power of music.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  100% Secure
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4" />
                  Tax Deductible
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Direct Impact
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Impact Statistics */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Impact So Far
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Together, we've achieved remarkable milestones in nurturing
                musical talent and building community.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
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

        {/* Donation Impact Examples */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                See Your Impact
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your donation helps support our classical music mission and
                enables us to continue our work in the community.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {donationImpacts.map((item, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    item.highlight
                      ? "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg"
                      : "bg-white border-gray-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`text-2xl font-bold ${item.highlight ? "text-blue-600" : "text-gray-900"}`}
                    >
                      {item.amount}
                    </span>
                    {item.highlight && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{item.impact}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Make Your Donation
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose your preferred method and amount. Every contribution
                  helps us continue our mission.
                </p>
              </div>

              <DonationForm />
            </div>
          </Reveal>
        </section>

        {/* Alternative Payment Methods */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Multiple Ways to Give
              </h2>
              <p className="text-gray-600">
                Choose the method that works best for you
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bank Transfer */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Bank Transfer
                  </h3>
                  <div className="space-y-3 text-left bg-gray-50 p-4 rounded-xl">
                    <div>
                      <span className="text-sm text-gray-500">
                        Account Name
                      </span>
                      <p className="font-semibold text-gray-900">
                        The Chorus Ensemble and Music Society
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Account Number
                      </span>
                      <p className="font-semibold text-gray-900">1229281261</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Bank</span>
                      <p className="font-semibold text-gray-900">Zenith Bank</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Online Payment */}
            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Online Payment
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Secure payments via Paystack with cards, bank transfers, and
                    mobile money.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted & Secure</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Mobile Payment */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Mobile Money
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Use your mobile money wallet for quick and convenient
                    donations.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
                    <Smartphone className="w-4 h-4" />
                    <span>Quick & Easy</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Donors Say
              </h2>
              <p className="text-gray-600">
                Hear from our community of supporters
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-700 italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Thank You Section */}
        <section className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Thank You for Your Support
              </h2>
              <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                Every donation, no matter the size, helps us continue building
                musical excellence in Abuja and touching lives through the power
                of music.
              </p>
              <p className="text-lg text-blue-200">
                Together, we make beautiful music possible. 🎵
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
