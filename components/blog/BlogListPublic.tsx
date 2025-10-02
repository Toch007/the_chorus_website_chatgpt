// components/blog/BlogListPublic.tsx
import Link from "next/link";
import Image from "next/image";

export default function BlogListPublic({ posts }: { posts: any[] }) {
  // Filter posts that have the required fields
  const validPosts = posts.filter(
    (post) => post.title && post.slug && post.excerpt && post.image
  );

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Blog Posts Yet
        </h3>
        <p className="text-gray-500">
          Blog posts will appear here once they're published.
        </p>
      </div>
    );
  }

  if (validPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Blog Posts Need Updates
        </h3>
        <p className="text-gray-500">
          Found {posts.length} posts, but they're missing required fields
          (title, slug, excerpt, or image). Please update the posts in the admin
          panel.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {validPosts.map((post) => (
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
