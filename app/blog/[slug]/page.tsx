// app/blog/[slug]/page.tsx

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Calendar, ArrowLeft, Clock } from "lucide-react";

type BlogPost = {
  title: string;
  slug: string;
  content: string;
  image: string;
  excerpt?: string;
  author?: string;
  category?: string;
  readTime?: number;
  createdAt?: any;
  updatedAt?: any;
};

// Format date helper
function formatDate(timestamp: any): string {
  if (!timestamp) return "Unknown date";

  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    return "Unknown date";
  }
}

// Calculate read time
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Generate metadata for SEO
export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props;
  const slug = (await params).slug;

  try {
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return {
        title: "Post Not Found - The Chorus",
        description: "The requested blog post could not be found.",
      };
    }

    const post = snapshot.docs[0].data() as BlogPost;

    return {
      title: `${post.title} - The Chorus Blog`,
      description: post.excerpt || `Read ${post.title} on The Chorus blog.`,
      openGraph: {
        title: post.title,
        description: post.excerpt || `Read ${post.title} on The Chorus blog.`,
        images: post.image ? [{ url: post.image }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || `Read ${post.title} on The Chorus blog.`,
        images: post.image ? [post.image] : [],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post - The Chorus",
      description: "Read the latest from The Chorus blog.",
    };
  }
}

export default async function BlogDetailPage(props: any) {
  const { params } = props;
  const slug = (await params).slug;

  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const doc = snapshot.docs[0];
  const post = doc.data() as BlogPost;
  const readTime = post.readTime || calculateReadTime(post.content);
  const publishDate = formatDate(post.createdAt);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Back Navigation */}
        <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.createdAt?.toDate?.()?.toISOString()}>
                  {publishDate}
                </time>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg prose-blue max-w-none
                         prose-headings:text-gray-900 prose-headings:font-bold
                         prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                         prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-ul:my-6 prose-ol:my-6
                         prose-li:my-2 prose-li:text-gray-700
                         prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                         prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
                         prose-blockquote:my-8 prose-blockquote:rounded-r-lg
                         prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                         prose-pre:bg-gray-900 prose-pre:text-gray-100"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                {post.updatedAt && (
                  <p>Last updated: {formatDate(post.updatedAt)}</p>
                )}
              </div>

              {/* Share or additional actions could go here */}
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
