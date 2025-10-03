"use client";

import React from "react";
import { getMembersGrouped } from "@/lib/getMembersGrouped";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Member } from "@/types/Member";
import Link from "next/link";
import { Search, Users, Music, Award, Heart } from "lucide-react";

const displayNames: Record<string, string> = {
  "music director": "Music Director",
  accompanists: "Accompanists",
  soprano: "Sopranos",
  alto: "Altos",
  tenor: "Tenors",
  bass: "Basses",
};

const sectionDescriptions: Record<string, string> = {
  "music director":
    "The visionary leader behind The Chorus Abuja's musical direction.",
  accompanists:
    "Talented instrumentalists who bring depth and support to our performances.",
  soprano: "Our highest vocal range—bright, powerful, and ethereal voices.",
  alto: "Warm and rich middle-range voices that form the harmonic foundation.",
  tenor: "Strong upper male voices that carry melody and brilliance.",
  bass: "Deep, resonant voices anchoring the harmony with power.",
};

export default function MembersPage() {
  const [grouped, setGrouped] = React.useState<Record<string, Member[]>>({});
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    getMembersGrouped().then(setGrouped);
  }, []);

  const filteredGrouped = Object.fromEntries(
    Object.entries(grouped).map(([section, members]) => [
      section,
      members.filter((member) =>
        member.name.toLowerCase().includes(search.toLowerCase())
      ),
    ])
  );

  const totalMembers = Object.values(grouped).flat().length;

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Enhanced Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6">
                Meet Our Musical Family
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                The Chorus Abuja is a diverse collective of talented vocalists
                and musicians dedicated to excellence in sacred, classical, and
                contemporary music. Meet the individuals who bring passion,
                professionalism, and harmony to every performance.
              </p>
            </Reveal>

            {/* Team Statistics */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">
                    {totalMembers || "40+"}
                  </div>
                  <div className="text-sm text-gray-600">Total Members</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Music className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">6</div>
                  <div className="text-sm text-gray-600">Voice Sections</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">7+</div>
                  <div className="text-sm text-gray-600">Major Works</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-900">∞</div>
                  <div className="text-sm text-gray-600">Shared Passion</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="space-y-16 px-4 py-16 md:px-10 max-w-screen-xl mx-auto">
          {/* Enhanced Section Navigation */}
          <Reveal>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                Explore by Voice Section
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(displayNames).map(([key, label]) => (
                  <Link
                    key={key}
                    href={`#${key}`}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl p-4 text-center transition-all hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    <div className="font-semibold text-blue-800">{label}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {grouped[key]?.length || 0} members
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Enhanced Search */}
          <Reveal delay={0.2}>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>
          </Reveal>

          {Object.entries(filteredGrouped).map(([sectionKey, members]) => (
            <div key={sectionKey} className="space-y-8">
              {members.length > 0 && (
                <>
                  <Reveal>
                    <div className="text-center space-y-4">
                      <h2
                        id={sectionKey}
                        className="text-3xl font-bold text-blue-800"
                      >
                        {displayNames[sectionKey] ?? sectionKey}
                      </h2>
                      {sectionDescriptions[sectionKey] && (
                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                          {sectionDescriptions[sectionKey]}
                        </p>
                      )}
                      <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                    </div>
                  </Reveal>

                  {members.length === 1 ? (
                    <div className="flex justify-center">
                      <MemberCard member={members[0]} />
                    </div>
                  ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                      {members.map((member, index) => (
                        <Reveal key={member.name + index} delay={index * 0.1}>
                          <MemberCard member={member} />
                        </Reveal>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <Reveal>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Join Our Musical Family?
              </h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                We're always excited to welcome passionate singers and
                instrumentalists who share our vision of musical excellence and
                community impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/join"
                  className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Our Chorus
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group">
          <Card className="overflow-hidden shadow-lg hover:shadow-2xl rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50">
            <div className="relative">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={300}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Music className="w-4 h-4 text-white" />
              </div>
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg group-hover:text-blue-700 transition-colors">
                {member.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {member.title}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
        <DialogTitle className="sr-only">{member.name}</DialogTitle>
        <div className="flex flex-col md:flex-row bg-gradient-to-br from-white to-blue-50">
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <Image
              src={member.image}
              alt={member.name}
              width={600}
              height={600}
              className="w-full h-full object-cover rounded-l-2xl"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="flex items-center text-sm font-medium text-blue-800">
                <Music className="w-4 h-4 mr-1" />
                Member
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-blue-800">
                {member.name}
              </h3>
              <p className="text-lg text-blue-600 font-medium">
                {member.title}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"></div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {member.bio ||
                  `${member.name} is a dedicated member of The Chorus Abuja, contributing their talent and passion to our ensemble. They bring professionalism, musical excellence, and collaborative spirit to every performance.`}
              </p>

              <div className="flex items-center text-sm text-gray-500">
                <Award className="w-4 h-4 mr-2" />
                Section: {member.section || member.title}
              </div>
            </div>

            <div className="pt-4">
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <p className="text-sm text-blue-800 italic">
                  "Every voice in The Chorus matters - together we create
                  harmony that touches hearts and elevates spirits."
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
