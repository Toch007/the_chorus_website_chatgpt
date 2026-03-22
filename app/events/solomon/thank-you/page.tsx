"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Music, Users, Calendar, Share2, Mail } from "lucide-react";
import { useState } from "react";

export default function SolomonThankYouPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setSubscribed(true);
  };

  const handleShare = (platform: string) => {
    const text =
      "I just experienced Handel's Solomon with The Chorus Abuja - what an incredible performance! 🎭✨";
    const url = "https://thechorusabuja.com/events/solomon";

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center text-white">
        {/* Main Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-6">
                <Heart className="w-16 h-16 text-white fill-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 bg-clip-text text-transparent"
          >
            Thank You for Being Part of History! 🎭
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            Your presence at{" "}
            <span className="text-yellow-300 font-semibold">
              Handel's Solomon
            </span>{" "}
            made this evening truly magical. Together, we celebrated the beauty
            of classical music and the power of community through song.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-12"
          >
            <p className="text-lg text-yellow-200 italic">
              "Music gives a soul to the universe, wings to the mind, flight to
              the imagination, and life to everything."
            </p>
            <p className="text-gray-300 mt-2">— Plato</p>
          </motion.div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-12"
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
            <Music className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-2">2.5 Hours</h3>
            <p className="text-gray-300">Of breathtaking performance</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
            <Users className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
            <p className="text-gray-300">Audience members united</p>
          </div>

          <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-pink-400/30 rounded-xl p-6">
            <Heart className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white mb-2">Countless</h3>
            <p className="text-gray-300">Unforgettable memories</p>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="max-w-2xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8"
        >
          <Share2 className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Share Your Experience! 🌟
          </h2>
          <p className="text-gray-300 mb-6">
            Help us spread the joy of classical music. Share your experience
            with friends and family!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleShare("twitter")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </button>

            <button
              onClick={() => handleShare("facebook")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>

            <button
              onClick={() => handleShare("whatsapp")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </button>
          </div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="max-w-2xl w-full bg-gradient-to-br from-yellow-400/10 to-orange-400/10 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 mb-8"
        >
          <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Connected for Our Next Performance! 📅
          </h2>
          <p className="text-gray-300 mb-6">
            Be the first to know about upcoming concerts, exclusive events, and
            special announcements.
          </p>

          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-green-500/20 border border-green-400 rounded-full px-6 py-3 text-green-300">
              ✅ Thank you for subscribing! We'll keep you updated.
            </div>
          )}
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="max-w-4xl w-full mb-12"
        >
          <h2 className="text-3xl font-bold text-yellow-300 mb-8">
            What's Next? 🎭
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Music className="w-6 h-6 text-yellow-400" />
                Christmas Concert 2025
              </h3>
              <p className="text-gray-300 mb-4">
                Join us this December for our annual Christmas celebration with
                festive choral favorites and holiday classics.
              </p>
              <Link
                href="/events"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-2 rounded-full font-semibold transition-all"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                Join The Chorus
              </h3>
              <p className="text-gray-300 mb-4">
                Become part of Abuja's premier classical choir! We're always
                looking for passionate singers to join our family.
              </p>
              <Link
                href="/join"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-2 rounded-full font-semibold transition-all"
              >
                Join Us
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="max-w-2xl w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8 mb-8"
        >
          <Heart className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Support The Arts 💝
          </h2>
          <p className="text-gray-300 mb-6">
            Your support helps us continue bringing world-class classical music
            to Abuja. Every contribution makes a difference!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/donate"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
            >
              Make a Donation
            </Link>
            <Link
              href="/support/sponsors"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
            >
              Become a Sponsor
            </Link>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 1 }}
          className="text-center max-w-3xl"
        >
          <p className="text-xl text-gray-200 mb-6">
            From all of us at{" "}
            <span className="text-yellow-300 font-semibold">
              The Chorus Abuja
            </span>
            , thank you for making Solomon a night to remember. We look forward
            to sharing more musical magic with you soon!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-gray-400">
            <Link href="/" className="hover:text-yellow-300 transition-colors">
              Return Home
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/events"
              className="hover:text-yellow-300 transition-colors"
            >
              View All Events
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/contact"
              className="hover:text-yellow-300 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 text-gray-400 text-sm">
            <p>Questions? Reach out to us:</p>
            <p className="mt-2">
              <a
                href="mailto:contact@thechorusabuja.com"
                className="text-yellow-300 hover:underline"
              >
                contact@thechorusabuja.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
