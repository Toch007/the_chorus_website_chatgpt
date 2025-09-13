// scripts/seedBlogPosts.ts

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import "dotenv/config";

// Firebase config
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

const posts = [
  {
    title: "Behind the Music: Rehearsing for 'Solomon'",
    slug: "behind-the-music-solomon",
    excerpt: "Go behind the scenes of our upcoming production 'Solomon' and discover the dedication behind every note.",
    content: `## Rehearsing for Solomon

Months of preparation, vocal training, and musical research go into making each performance memorable.

From sectional rehearsals to full ensemble run-throughs, every member of The Chorus Abuja brings their heart to the process.

Join us as we take you into the journey behind the scenes.`,
    image: "https://source.unsplash.com/800x500/?choir,rehearsal",
  },
  {
    title: "The Power of Community in Choral Music",
    slug: "community-in-choral-music",
    excerpt: "Explore how our choir fosters friendship, discipline, and artistry.",
    content: `### More than just voices

Singing together builds more than harmonies. It creates a bond.

Members of The Chorus Abuja share their experiences of growth, friendship, and expression through song.`,
    image: "https://source.unsplash.com/800x500/?music,community",
  },
];

async function seedBlogPosts() {
  const postsRef = collection(db, "posts");

  for (const post of posts) {
    await addDoc(postsRef, {
      ...post,
      createdAt: serverTimestamp(),
    });
  }

  console.log("✅ Blog posts seeded successfully.");
}

seedBlogPosts().catch((error) => console.error("❌ Error seeding posts:", error));
