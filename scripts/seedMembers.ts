import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCfiM0xnrYTZkJXvWAscOM9dD34tKITBRs",
  authDomain: "the-chorus-project.firebaseapp.com",
  projectId: "the-chorus-project",
  storageBucket: "the-chorus-project.firebasestorage.app",
  messagingSenderId: "581997206429",
  appId: "1:581997206429:web:f52457364c73c7ddf72d74",
  measurementId: "G-4J4K2KHZ3Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Music Director data
const members = [
  {
    name: "Pere Michael Ikputu",
    title: "Bass",
    section: "bass",
    image: "/images/Pere.jpeg",
    bio: "Loading..."
  },
  {
    name: "Budubueze Ozuru",
    title: "Bass",
    section: "bass",
    image: "/images/Budex.jpeg",
    bio: "Budubueze Ozuru (Budex) is a registered engineer and baritone singer. He joined the Trinity Voice Choir of Holy Trinity Anglican Church, Choba, at age 12, and rose to Assistant Choirmaster. A founding member of the Exquisite Choir of Port Harcourt, he has served in various choirs in the UK and Nigeria. He is married to Nengimonyu Susan Okara and blessed with two children."
  },
  {
    name: "Ifiemi John-Lewis",
    title: "Bass",
    section: "bass",
    image: "/images/Ifiemi.jpeg",
    bio: "Ifiemi John-Lewis, from Bayelsa State, is a baritone with a refined musical sense. He has sung with various choirs including Restoration Government Choir, St. Luke’s Denery Church choir, and others across Bayelsa and Rivers State. He also plays piano and violin. His hobbies are reading and researching."
  },
  {
    name: "Onyedika Okenwa \"Major\"",
    title: "Bass",
    section: "bass",
    image: "/images/onyedika.jpeg",
    bio: "Okenwa Onyedika (Major) from Anambra State is a bass profundo. He began as an alto but transitioned into bass. He has sung with St. Andrews Anglican Church choir, Chapel of Light, Abuja Choral Society, and Festival of Praise Choir. He enjoys traveling, singing, dancing, and reading."
  }
];



async function seedMembers() {
  const membersRef = collection(db, "members");

  for (const member of members) {
    await addDoc(membersRef, member);
    console.log(`✅ Added: ${member.name}`);
  }

  console.log("🎉 Music Director seeding complete.");
}

seedMembers().catch((err) => {
  console.error("❌ Failed to seed:", err);
});
