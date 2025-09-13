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

const displayNames: Record<string, string> = {
  "music director": "Music Director",
  accompanists: "Accompanists",
  soprano: "Sopranos",
  alto: "Altos",
  tenor: "Tenors",
  bass: "Basses",
};

const sectionDescriptions: Record<string, string> = {
  "music director": "The visionary leader behind The Chorus Abuja's musical direction.",
  accompanists: "Talented instrumentalists who bring depth and support to our performances.",
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

  return (
    <>
      <Header />
      <div className="space-y-16 px-4 py-24 md:px-10 max-w-screen-xl mx-auto">
        <Reveal>
          <h1 className="text-4xl font-bold text-center">Meet Our Members</h1>
        </Reveal>
        <Reveal>
          <p className="text-center max-w-2xl mx-auto text-muted-foreground">
            The Chorus Abuja is a diverse collective of talented vocalists and musicians dedicated to excellence in sacred, classical, and contemporary music. Meet the individuals who bring passion, professionalism, and harmony to every performance.
          </p>
        </Reveal>

        {/* Section Nav */}
        <ul className="flex flex-wrap justify-center gap-4 pb-8 text-sm font-medium">
          {Object.entries(displayNames).map(([key, label]) => (
            <li key={key}>
              <a href={`#${key}`} className="text-primary hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {Object.entries(filteredGrouped).map(([sectionKey, members]) => (
          <div key={sectionKey} className="space-y-8">
            {members.length > 0 && (
              <>
                <Reveal>
                  <h2
                    id={sectionKey}
                    className="text-2xl font-semibold border-b pb-2 text-muted-foreground"
                  >
                    {displayNames[sectionKey] ?? sectionKey}
                  </h2>
                  {sectionDescriptions[sectionKey] && (
                    <p className="text-muted-foreground text-sm">
                      {sectionDescriptions[sectionKey]}
                    </p>
                  )}
                </Reveal>

                {members.length === 1 ? (
                  <div className="flex justify-center">
                    <MemberCard member={members[0]} />
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {members.map((member, index) => (
                      <Reveal key={member.name + index}>
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
          <div className="text-center pt-12">
            <h3 className="text-xl font-semibold">Interested in joining The Chorus?</h3>
            <p className="text-muted-foreground mb-4">
              We're always excited to welcome passionate singers and instrumentalists.
            </p>
            <a
              href="/join"
              className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
            >
              Join Us
            </a>
          </div>
        </Reveal>
      </div>
      <Footer />
    </>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden shadow-xl transition hover:shadow-2xl rounded-2xl cursor-pointer">
          <Image
            src={member.image}
            alt={member.name}
            width={400}
            height={300}
            className="h-48 w-full object-cover"
          />
          <CardHeader>
            <CardTitle>{member.name}</CardTitle>
            <CardDescription>{member.title}</CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">{member.name}</DialogTitle>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src={member.image}
              alt={member.name}
              width={600}
              height={600}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 space-y-2">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.title}</p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {member.bio}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
