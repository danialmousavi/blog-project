import { GetArticles } from "@/services/ArticlesSerivece";
import PostCard from "../modules/PostCard/PostCard";
import Link from "next/link";
import { FiFileText } from "react-icons/fi";
import { ArticleType } from "@/types/Article";

export default async function RecentPosts() {
  let posts:ArticleType[] = [];

  try {
    posts = await GetArticles();
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          مقالات اخیر
        </h2>

        <Link
          href="/blogs"
          className="text-blue-600 hover:text-blue-700 text-sm md:text-base"
        >
          مشاهده همه →
        </Link>
      </div>

      {/* Empty State */}
      {!posts || posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiFileText size={26} />
          </div>
          <p className="text-gray-500 text-sm md:text-base">
            هنوز مقاله‌ای منتشر نشده
          </p>
        </div>
      ) : (
        /* Grid */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
