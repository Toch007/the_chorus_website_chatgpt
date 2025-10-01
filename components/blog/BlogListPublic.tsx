// components/blog/BlogListPublic.tsx
import Link from "next/link";
import Image from "next/image";

export default function BlogListPublic({ posts }: { posts: any[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug || post.id} href={`/blog/${post.slug}`}>
          <div className="border rounded-lg shadow hover:shadow-md overflow-hidden transition-shadow duration-200 bg-white">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-blue-800 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
