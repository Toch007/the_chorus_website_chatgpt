import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type EventType = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  details: string;
  status: "upcoming" | "past";
  ticketed?: boolean;
};

// ✅ Load event from Firestore
async function getEvent(id: string): Promise<EventType | null> {
  try {
    const ref = doc(db, "events", id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<EventType, "id">),
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

// ✅ Safe-any patch applied
export default async function EventPage(props: any) {
  const { params } = props;
  const event = await getEvent(params.id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Event not found.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-white text-gray-800">
        <section className="relative h-[400px]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-5xl font-bold">{event.title}</h1>
            <p className="mt-2 text-lg">
              {event.date} · {event.location}
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            About this Event
          </h2>
          <p className="text-lg text-gray-700 whitespace-pre-line">
            {event.details}
          </p>

          {event.ticketed && (
            <div className="mt-10 text-center">
              <Link
                href="https://tix.africa/the-chorus-solomon"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-3 rounded-full font-bold text-lg transition"
              >
                🎟️ Get Tickets
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
