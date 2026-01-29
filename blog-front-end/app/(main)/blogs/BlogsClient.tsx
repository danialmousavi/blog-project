"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/modules/PostCard/PostCard";
import { FiSearch, FiFilter } from "react-icons/fi";
import { ArticleType } from "@/types/Article";

interface Props {
  posts:ArticleType[];
}

export default function BlogsClient({ posts }: Props) {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");

  const authors = useMemo(() => {
    return ["all", ...new Set(posts.map((p) => p.author))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      const matchAuthor =
        author === "all" || post.author === author;

      return matchSearch && matchAuthor;
    });
  }, [search, author, posts]);

  return (
    <>
      {/* Search & Filter */}
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در مقالات..."
            className="
              w-full rounded-xl border border-gray-200 bg-white py-3 pr-12 pl-4
              text-sm md:text-base outline-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            "
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <FiFilter className="text-gray-400" />
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="
              rounded-xl border border-gray-200 bg-white px-4 py-3
              text-sm md:text-base outline-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            "
          >
            {authors.map((a) => (
              <option key={a} value={a}>
                {a === "all" ? "همه نویسندگان" : a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Empty */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 py-24 text-center text-gray-500">
          مقاله‌ای پیدا نشد 😕
        </div>
      ) : (
        /* Grid */
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
