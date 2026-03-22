"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackForm from "@/components/FeedbackForm";
import { MessageSquare, Star, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function FeedbackPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                We Value Your Feedback
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Your thoughts and experiences help us improve and deliver even
                better performances. Share your feedback with us below.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Feedback Matters */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Why Your Feedback Matters
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every comment, suggestion, and rating helps us grow and serve
                you better
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Improve Quality
                </h3>
                <p className="text-gray-600">
                  Your insights help us enhance our performances and services
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Build Community
                </h3>
                <p className="text-gray-600">
                  Your voice strengthens our connection with our audience
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Drive Growth
                </h3>
                <p className="text-gray-600">
                  Constructive feedback fuels our continuous improvement
                </p>
              </motion.div>
            </div>

            {/* Feedback Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <FeedbackForm />
            </motion.div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="bg-blue-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Thank You for Your Support!
            </h3>
            <p className="text-blue-100 mb-6">
              Every piece of feedback is read and considered by our team. We're
              committed to making every performance memorable and impactful.
            </p>
            <p className="text-sm text-blue-200">
              Have questions or need to reach us directly?{" "}
              <a
                href="/contact"
                className="underline hover:text-white transition"
              >
                Contact us here
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
