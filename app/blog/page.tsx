// app/blog/page.tsx

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Firebase config (reuse same one as in your config file)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-700 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
            </main>
            <Footer />
            </>
  );
}
