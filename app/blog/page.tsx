// app/blog/page.tsx

import { adminFirestore } from "@/lib/firebase-admin";
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

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  
  try {
    const postsSnapshot = await adminFirestore.collection("posts").get();
    posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    // Return empty array on error to allow build to continue
  }

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Hero Section with Background Image */}
        <section className="relative pt-24 pb-16 px-6 overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/Composer-cover-articleLarge.webp')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-purple-900/85 to-blue-900/90"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Stories, insights, and updates from The Chorus Abuja
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <BlogListPublic posts={posts} />
        </section>
      </main>
      <Footer />
    </>
  );
}
