import { GetArticles } from "@/services/ArticlesSerivece"
import PostCard from "../modules/PostCard/PostCard"
import Link from "next/link"



export default async function RecentPosts() {
    const posts= await GetArticles()
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

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map(post=>(
            <PostCard key={post.id} post={post}/>
        ))}
      </div>
    </section>
  )
}
