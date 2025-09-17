// app/blog/[slug]/page.tsx

import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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

type BlogPost = {
  title: string;
  slug: string;
  content: string;
  image: string;
  createdAt?: any;
};

// ✅ Safe-any patch
export default async function BlogDetailPage(props: any) {
  const { params } = props;
  const slug = params.slug;

  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const doc = snapshot.docs[0];
  const post = doc.data() as BlogPost;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{post.title}</h1>

        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-xl mb-6 w-full object-cover"
          />
        )}

        <article className="prose prose-blue max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </>
  );
}
