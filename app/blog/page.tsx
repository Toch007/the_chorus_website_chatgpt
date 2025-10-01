// app/blog/page.tsx

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogListPublic from "@/components/blog/BlogListPublic";

// Firebase config (reuse same one as in your config file)
const firebaseConfig = {
  apiKey: "AIzaSyCfiM0xnrYTZkJXvWAscOM9dD34tKITBRs",
  authDomain: "the-chorus-project.firebaseapp.com",
  projectId: "the-chorus-project",
  storageBucket: "the-chorus-project.firebasestorage.app",
  messagingSenderId: "581997206429",
  appId: "1:581997206429:web:f52457364c73c7ddf72d74",
  measurementId: "G-4J4K2KHZ3Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
};

export default async function BlogPage() {
  const postsSnapshot = await getDocs(collection(db, "posts"));
  const posts = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[];

  return (
    <>
      <Header />

      <main className="px-6 py-24 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
          Blog
        </h1>

        <BlogListPublic posts={posts} />
      </main>
      <Footer />
    </>
  );
}
