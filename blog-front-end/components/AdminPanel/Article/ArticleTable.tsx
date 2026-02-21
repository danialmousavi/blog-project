"use client";

import { useMemo, useState } from "react";
import { formatDate } from "@/components/modules/FormData/FormDate";
import { ArticleType } from "@/types/Article";
import { CategoryType } from "@/types/Category";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import ArticleModal from "./ArticleModal";
import { DeleteArticle } from "@/services/ArticlesSerivece";
import { toast } from "react-toastify";
import Link from "next/link";

type ArticleTableProps = {
  articles: ArticleType[];
  categories: CategoryType[];
};

export default function ArticleTable({
  articles,
  categories,
}: ArticleTableProps) {
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null,
  );

  // ✅ Map برای دسته‌بندی‌ها
  const categoryMap = useMemo(() => {
    return new Map(categories.map((cat) => [cat.id, cat.title]));
  }, [categories]);

  //delete article
  const handleDeleteArticle = async (articleId: string) => {
    const result = await DeleteArticle(articleId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
    <>
  {/* ================= Desktop Table ================= */}
  <div className="hidden md:block overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
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
            className="text-sm transition hover:bg-blue-50/50 border-b last:border-none"
          >
            <td className="px-6 py-4 font-medium text-gray-800">
              {article.title}
            </td>

            <td className="px-6 py-4 text-gray-600">
              {article.author}
            </td>

            <td className="px-6 py-4 text-gray-600">
              {categoryMap.get(article.categoryId) || "نامشخص"}
            </td>

            <td className="px-6 py-4 text-gray-600">
              {formatDate(article.createdAt)}
            </td>

            <td className="px-6 py-4">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="rounded-lg p-2 text-blue-600 hover:bg-blue-100 transition"
                >
                  <FiEye size={18} />
                </button>

                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
                >
                  <FiTrash2 size={18} />
                </button>

                <Link
                  href={`/p-admin/articles/edit/${article.id}`}
                  className="rounded-lg p-2 text-green-600 hover:bg-green-100 transition"
                >
                  <FiEdit size={18} />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ================= Mobile Cards ================= */}
  <div className="space-y-4 md:hidden">
    {articles.map((article) => (
      <div
        key={article.id}
        className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
      >
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-gray-400 text-xs">عنوان</p>
            <p className="font-medium text-gray-800 break-words">
              {article.title}
            </p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-xs">نویسنده</p>
              <p>{article.author}</p>
            </div>

            <div className="text-left">
              <p className="text-gray-400 text-xs">تاریخ</p>
              <p>{formatDate(article.createdAt)}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-xs">دسته‌بندی</p>
            <p>
              {categoryMap.get(article.categoryId) || "نامشخص"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setSelectedArticle(article)}
            className="rounded-lg p-2 text-blue-600 hover:bg-blue-100 transition"
          >
            <FiEye size={18} />
          </button>

          <button
            onClick={() => handleDeleteArticle(article.id)}
            className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
          >
            <FiTrash2 size={18} />
          </button>

          <Link
            href={`/p-admin/articles/edit/${article.id}`}
            className="rounded-lg p-2 text-green-600 hover:bg-green-100 transition"
          >
            <FiEdit size={18} />
          </Link>
        </div>
      </div>
    ))}
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
    </>
  );
}
