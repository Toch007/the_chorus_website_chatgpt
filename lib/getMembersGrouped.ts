// lib/getMembersGrouped.ts
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

type Member = {
  name: string;
  title: string;
  section: string;
  bio: string;
  image: string;
};

const sectionOrder = [
  "music director",
  "accompanists",
  "soprano",
  "alto",
  "tenor",
  "bass",
];

export async function getMembersGrouped(): Promise<Record<string, Member[]>> {
  const membersRef = collection(db, "members");
  const snapshot = await getDocs(membersRef);

  const grouped: Record<string, Member[]> = {};

  snapshot.forEach((doc) => {
    const data = doc.data() as Member;
    const section = data.section.toLowerCase();

    if (!grouped[section]) {
      grouped[section] = [];
    }

    grouped[section].push(data);
  });

  // Reorder the grouped object based on custom section order
  const sortedGrouped: Record<string, Member[]> = {};
  for (const section of sectionOrder) {
    if (grouped[section]) {
      sortedGrouped[section] = grouped[section];
    }
  }

  return sortedGrouped;
}
