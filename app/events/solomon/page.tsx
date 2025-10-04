// app/events/solomon/page.tsx
"use client";

import TicketStore, { Ticket } from "@/components/TicketStore";
import CountdownTimer from "@/components/CountdownTimer";
import VenueDetails from "@/components/VenueDetails";
import { motion } from "framer-motion";

const solomonTickets: Ticket[] = [
  { name: "Bronze", price: 10000, perks: [], color: "bg-amber-500" },
  { name: "Silver", price: 30000, perks: [], color: "bg-slate-400" },
  { name: "Gold", price: 50000, perks: [], color: "bg-yellow-400" },
  {
    name: "Diamond",
    price: 100000,
    perks: ["🎟 Admits 2 Persons"],
    color: "bg-blue-600",
  },
];

export default function SolomonEventPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Full-viewport background with 'parallax-like' fixed behavior */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover bg-fixed"
        style={{ backgroundImage: "url('/images/solomon-1.jpg')" }}
        aria-hidden
      />

      {/* dark overlay */}
      <div className="absolute inset-0 -z-5 bg-black/60" />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold mb-3"
        >
          Handel’s <span className="text-yellow-300">Solomon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="max-w-3xl text-lg md:text-xl mb-8 text-gray-100 leading-relaxed"
        >
          Experience the wisdom, majesty, and divine judgment of King Solomon in
          Handel's magnificent oratorio.
          <br />
          <br />
          <span className="text-yellow-200">
            A dramatized musical performance by{" "}
            <strong>The Chorus Abuja</strong>
          </span>{" "}
          featuring regal choruses, stunning arias, and the timeless tale of
          power, love, and divine wisdom.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mb-8"
        >
          <div className="text-yellow-300 text-sm font-semibold mb-4 uppercase tracking-wide">
            🔥 Limited Time - Event Starts In:
          </div>
          <CountdownTimer targetDate="2025-11-16T18:00:00" className="mb-4" />
          <div className="text-red-400 text-sm font-medium animate-pulse">
            ⚡ Only 50 tickets remaining!
          </div>
        </motion.div>

        {/* Concert Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-4xl bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6 text-center">
            🎭 About This Performance
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-100">
            <div>
              <h3 className="text-xl font-semibold text-yellow-200 mb-3">
                The Story
              </h3>
              <p className="leading-relaxed mb-4">
                Handel's <em>Solomon</em> tells the biblical tale of the wise
                King of Israel, famous for his judgment of the two mothers
                claiming the same child. This oratorio explores themes of
                wisdom, justice, and divine guidance through some of Handel's
                most magnificent music.
              </p>
              <p className="leading-relaxed text-gray-200">
                From the Queen of Sheba's visit to Solomon's temple dedication,
                experience the grandeur of ancient Israel brought to life
                through powerful choruses and moving arias.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-yellow-200 mb-3">
                What to Expect
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-xl">🎼</span>
                  <div>
                    <p className="font-medium">Majestic Choruses</p>
                    <p className="text-sm text-gray-300">
                      Including the famous "Arrival of the Queen of Sheba"
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-xl">🎭</span>
                  <div>
                    <p className="font-medium">Dramatic Storytelling</p>
                    <p className="text-sm text-gray-300">
                      Biblical narrative brought to life with stunning vocals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-xl">🏛️</span>
                  <div>
                    <p className="font-medium">Epic Scale</p>
                    <p className="text-sm text-gray-300">
                      Full choir and orchestral accompaniment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-xl">✨</span>
                  <div>
                    <p className="font-medium">Spiritual Journey</p>
                    <p className="text-sm text-gray-300">
                      An uplifting experience of faith and wisdom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 rounded-xl border border-yellow-400/20">
            <h4 className="text-lg font-semibold text-yellow-200 mb-2">
              🎪 Special Performance Notes
            </h4>
            <ul className="text-gray-200 space-y-1 text-sm">
              <li>
                • <strong>Duration:</strong> Approximately 2.5 hours with
                intermission
              </li>
              <li>
                • <strong>Language:</strong> Performed in English with dramatic
                staging elements
              </li>
              <li>
                • <strong>Attire:</strong> Smart casual to formal (this is a
                premium cultural event)
              </li>
              <li>
                • <strong>Age:</strong> Suitable for ages 12+ (younger children
                welcome with supervision)
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="w-full max-w-6xl"
        >
          {/* TicketStore is a reusable component; tickets are provided here only */}
          <div className="px-4 py-8 rounded-2xl">
            <TicketStore tickets={solomonTickets as Ticket[]} />
          </div>
        </motion.div>

        {/* Why Choose This Concert */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-full max-w-5xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200 mb-8 text-center">
            🌟 Why Experience Solomon with The Chorus Abuja?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold text-blue-200 mb-2">
                Award-Winning Excellence
              </h3>
              <p className="text-gray-300 text-sm">
                4+ years of delivering world-class choral performances across
                Abuja, with a reputation for musical precision and emotional
                depth.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🎭</div>
              <h3 className="text-lg font-semibold text-blue-200 mb-2">
                Authentic Storytelling
              </h3>
              <p className="text-gray-300 text-sm">
                We don't just perform music—we bring stories to life with
                dramatic staging, making classical masterpieces accessible and
                engaging.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-lg font-semibold text-blue-200 mb-2">
                Cultural Bridge
              </h3>
              <p className="text-gray-300 text-sm">
                Experience how African musical sensibilities enhance European
                classical traditions, creating something uniquely beautiful and
                universally moving.
              </p>
            </div>
          </div>

          <div className="bg-black/30 rounded-xl p-6 border border-yellow-400/30">
            <h4 className="text-xl font-semibold text-yellow-300 mb-4 text-center">
              💬 What Past Audiences Say
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <blockquote className="italic text-gray-200 border-l-2 border-yellow-400 pl-4">
                "Absolutely breathtaking! The way they brought Handel's music to
                life was incredible. You could feel every emotion in their
                voices."
                <cite className="block mt-2 text-yellow-300 font-medium">
                  — Sarah M., Elijah Concert Attendee
                </cite>
              </blockquote>
              <blockquote className="italic text-gray-200 border-l-2 border-yellow-400 pl-4">
                "I've never experienced anything like it. The combination of
                musical excellence and dramatic presentation was pure magic."
                <cite className="block mt-2 text-yellow-300 font-medium">
                  — Dr. James O., Israel in Egypt Performance
                </cite>
              </blockquote>
            </div>
          </div>
        </motion.div>

        {/* Venue Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.9 }}
          className="mt-12 w-full max-w-4xl"
        >
          <VenueDetails />
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 text-center max-w-3xl"
        >
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            🎯 Don't Miss This Extraordinary Experience
          </h3>
          <p className="text-gray-200 mb-6 leading-relaxed">
            Join hundreds of music lovers for an evening that celebrates the
            beauty of classical music, the richness of biblical storytelling,
            and the power of community through song.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-red-500/20 border border-red-400 rounded-full px-4 py-2 text-red-300 text-sm font-medium animate-pulse">
              ⚡ Limited Seats - Book Today!
            </div>
            <div className="text-gray-300 text-sm">
              Questions? Call{" "}
              <strong className="text-yellow-300">+234 815 847 9297</strong>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-gray-200 text-sm">
          📅 <strong>Date:</strong> November 16, 2025 &nbsp;•&nbsp; 📍{" "}
          <strong>Venue:</strong> Nigerian Society of Engineers Hall, 1012, Sani
          Abacha Way, CBD, Abuja
        </div>
      </div>
    </main>
  );
}
