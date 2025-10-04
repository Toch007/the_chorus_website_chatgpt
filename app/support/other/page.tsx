"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SupportForm from "@/components/SupportForm";
import { 
  Heart, 
  Users, 
  Lightbulb, 
  Gift, 
  Clock, 
  BookOpen, 
  Camera, 
  Palette, 
  Headphones,
  Mic2,
  ShoppingBag,
  Coffee,
  MapPin,
  Phone,
  Share2
} from "lucide-react";

const supportTypes = [
  {
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    title: "Volunteer Your Time",
    description: "Contribute your skills and time to support our events, workshops, and community programs.",
    examples: ["Event assistance", "Workshop support", "Administrative help", "Social media management"],
    highlight: true
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Share Your Skills",
    description: "Offer your professional expertise in areas like marketing, design, photography, or music production.",
    examples: ["Graphic design", "Photography", "Marketing", "Music production"],
    highlight: false
  },
  {
    icon: <Gift className="w-8 h-8 text-green-500" />,
    title: "In-Kind Donations",
    description: "Donate instruments, equipment, venue space, or other resources that support our mission.",
    examples: ["Musical instruments", "Sound equipment", "Venue space", "Transportation"],
    highlight: true
  },
  {
    icon: <BookOpen className="w-8 h-8 text-purple-500" />,
    title: "Educational Support",
    description: "Contribute to our educational programs through curriculum development or teaching assistance.",
    examples: ["Curriculum design", "Teaching assistance", "Workshop facilitation", "Mentoring"],
    highlight: false
  },
  {
    icon: <Share2 className="w-8 h-8 text-red-500" />,
    title: "Spread the Word",
    description: "Help us reach more people by sharing our story on social media and within your networks.",
    examples: ["Social media sharing", "Word of mouth", "Networking", "Community outreach"],
    highlight: true
  },
  {
    icon: <Coffee className="w-8 h-8 text-orange-500" />,
    title: "Corporate Services",
    description: "Provide professional services like catering, printing, legal advice, or accounting support.",
    examples: ["Catering services", "Printing", "Legal advice", "Accounting"],
    highlight: false
  }
];

const impactAreas = [
  {
    title: "Youth Development",
    description: "Supporting the next generation of musical talent through education and mentorship",
    icon: <Users className="w-12 h-12 text-blue-500" />
  },
  {
    title: "Community Engagement",
    description: "Building stronger communities through music and cultural programs",
    icon: <Heart className="w-12 h-12 text-red-500" />
  },
  {
    title: "Cultural Preservation",
    description: "Preserving and promoting Nigerian musical heritage and traditions",
    icon: <Palette className="w-12 h-12 text-purple-500" />
  },
  {
    title: "Skill Development",
    description: "Providing professional development opportunities in music and performance",
    icon: <Mic2 className="w-12 h-12 text-green-500" />
  }
];

const volunteerOpportunities = [
  {
    role: "Event Coordinator",
    commitment: "5-10 hours per event",
    description: "Help organize and coordinate our concerts and special events",
    skills: ["Organization", "Communication", "Event planning"]
  },
  {
    role: "Social Media Volunteer",
    commitment: "2-3 hours per week",
    description: "Manage our social media presence and create engaging content",
    skills: ["Social media", "Content creation", "Design"]
  },
  {
    role: "Music Mentor",
    commitment: "4 hours per month",
    description: "Provide guidance and mentorship to young aspiring musicians",
    skills: ["Music experience", "Teaching", "Mentoring"]
  },
  {
    role: "Administrative Assistant",
    commitment: "Flexible hours",
    description: "Support our daily operations with various administrative tasks",
    skills: ["Organization", "Communication", "Computer skills"]
  }
];

const testimonials = [
  {
    quote: "Volunteering with The Chorus has been incredibly fulfilling. I've been able to use my photography skills to capture beautiful moments while supporting something I'm passionate about.",
    author: "Sarah Johnson",
    role: "Photography Volunteer",
    icon: <Camera className="w-6 h-6 text-blue-500" />
  },
  {
    quote: "The in-kind donation of our sound equipment for their concert series has been a great way for our company to support the arts community while building valuable partnerships.",
    author: "Michael Adebayo",
    role: "Equipment Donor",
    icon: <Headphones className="w-6 h-6 text-green-500" />
  }
];

export default function OtherSupportPage() {
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
                  Other Ways to Support
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Whether you're a volunteer, service provider, or just have something unique to offer, 
                we'd love to connect. Every form of support helps us create magical musical experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Every Effort Counts
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Community Driven
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Lightbulb className="w-4 h-4" />
                  Creative Solutions
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Impact Areas */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact Areas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how your unique contribution can make a difference in these key areas
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:scale-110 transition-transform duration-300">
                      {area.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Support Types */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ways You Can Help</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore different ways to contribute based on your interests, skills, and availability
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTypes.map((type, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 border ${
                  type.highlight 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg' 
                    : 'bg-white border-gray-200 shadow-md hover:shadow-lg'
                }`}>
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-white shadow-md mr-4">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Examples:</p>
                    {type.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Volunteer Opportunities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our team of dedicated volunteers and make a direct impact on our programs
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{opportunity.role}</h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full">
                      {opportunity.commitment}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Skills needed:</p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Supporter Stories</h2>
              <p className="text-gray-600">Hear from our amazing community of supporters</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      {testimonial.icon}
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Ways to Help Right Now</h2>
              <p className="text-gray-600">Simple actions you can take today to support our mission</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-1">
                <Share2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Our Story</h3>
                <p className="text-gray-600 text-sm mb-4">Follow us on social media and share our posts with your network</p>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Follow Us
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-1">
                <MapPin className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Attend Our Events</h3>
                <p className="text-gray-600 text-sm mb-4">Join us at our concerts and events to experience our music firsthand</p>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                  View Events
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-1">
                <Phone className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Spread the Word</h3>
                <p className="text-gray-600 text-sm mb-4">Tell your friends and family about The Chorus Abuja</p>
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                  Learn More
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact Form */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <Reveal>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <Heart className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Involved?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Tell us about your interests and how you'd like to support The Chorus Abuja. 
                  We'll get back to you with opportunities that match your skills and availability.
                </p>
              </div>
              
              <SupportForm purpose="Alternative Support" />
            </div>
          </Reveal>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
              <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Community of Supporters
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Every contribution, no matter how small, helps us continue to nurture musical talent 
                and create beautiful experiences for our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200">
                  Get Started Today
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                  Learn More About Us
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}