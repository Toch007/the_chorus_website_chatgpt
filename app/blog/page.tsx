// app/blog/page.tsx

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogListPublic from "@/components/blog/BlogListPublic";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  content?: string;
  author?: string;
  date?: string;
  createdAt?: any;
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
