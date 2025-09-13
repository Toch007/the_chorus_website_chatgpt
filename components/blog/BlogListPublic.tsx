// components/blog/BlogListPublic.tsx
import Link from "next/link";

export default function BlogListPublic({ posts }: { posts: any[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className="border rounded-lg shadow hover:shadow-md overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
