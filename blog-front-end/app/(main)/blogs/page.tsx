import { GetArticles } from "@/services/ArticlesSerivece";
import { ArticleType } from "@/types/Article";
import BlogsClient from "../../../components/modules/BlogsClient/BlogsClient";

export default async function BlogsPage() {
  let posts:ArticleType[] = [];

  try {
    posts = await GetArticles();
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          همه مقالات
        </h1>
        <p className="mt-4 text-gray-500">
          جدیدترین و محبوب‌ترین مقالات وبلاگ
        </p>
      </div>

      <BlogsClient posts={posts} />
    </section>
  );
}
