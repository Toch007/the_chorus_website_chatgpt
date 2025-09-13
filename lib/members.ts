import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // updated path ✅

export interface Member {
  id: string;
  name: string;
  section: string;
  role: string;
  image: string;
  bio?: string;
}

export async function getMembersGrouped() {
  const snapshot = await getDocs(collection(db, "members"));
  const members: Member[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    members.push({
      id: doc.id,
      name: data.name,
      section: data.section,
      role: data.role,
      image: data.image,
      bio: data.bio,
    });
  });

  const grouped: Record<string, Member[]> = {
    MusicDirector: [],
    Accompanists: [],
    Soprano: [],
    Alto: [],
    Tenor: [],
    Bass: [],
  };

  for (const member of members) {
    const key = member.section.replace(" ", ""); // in case of "Music Director"
    if (grouped[key]) {
      grouped[key].push(member);
    }
  }

  return grouped;
}
