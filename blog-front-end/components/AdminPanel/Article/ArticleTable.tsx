"use client";

import { useMemo, useState } from "react";
import { formatDate } from "@/components/modules/FormData/FormDate";
import { ArticleType } from "@/types/Article";
import { CategoryType } from "@/types/Category";
import { FiEye, FiTrash2 } from "react-icons/fi";
import ArticleModal from "./ArticleModal"

type ArticleTableProps = {
  articles: ArticleType[];
  categories: CategoryType[];
};

export default function ArticleTable({
  articles,
  categories,
}: ArticleTableProps) {
  const [selectedArticle, setSelectedArticle] =
    useState<ArticleType | null>(null);

  // ✅ Map برای دسته‌بندی‌ها
  const categoryMap = useMemo(() => {
    return new Map(categories.map((cat) => [cat.id, cat.title]));
  }, [categories]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-blue-50">
            <tr className="text-sm text-blue-700">
              <th className="px-6 py-4 font-semibold">عنوان</th>
              <th className="px-6 py-4 font-semibold">نویسنده</th>
              <th className="px-6 py-4 font-semibold">دسته‌بندی</th>
              <th className="px-6 py-4 font-semibold">زمان انتشار</th>
              <th className="px-6 py-4 font-semibold text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="text-sm transition hover:bg-blue-50/50"
              >
                {/* Title */}
                <td className="px-6 py-4 font-medium text-gray-800">
                  {article.title}
                </td>

                {/* Author */}
                <td className="px-6 py-4 text-gray-600">
                  {article.author}
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-gray-600">
                  {categoryMap.get(article.categoryId) || "نامشخص"}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(article.createdAt)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                      title="مشاهده مقاله"
                    >
                      <FiEye size={18} />
                    </button>

                    <button
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                      title="حذف مقاله"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ArticleModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
        categoryTitle={
          selectedArticle
            ? categoryMap.get(selectedArticle.categoryId)
            : undefined
        }
      />
    </>
  );
}
