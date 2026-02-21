"use client";

import { useMemo, useState } from "react";
import { formatDate } from "@/components/modules/FormData/FormDate";
import { Articlecomment } from "@/types/Comment";
import { FiTrash2 } from "react-icons/fi";
import CommentModal from "./CommentModal";
import { ArticleType } from "@/types/Article";
import { DeleteComment } from "@/services/Comments";
import { toast } from "react-toastify";

type CommentsTableProps = {
  comments: Articlecomment[];
  articles: ArticleType[];
};

export default function CommentsTable({
  comments,
  articles,
}: CommentsTableProps) {
  const [selectedComment, setSelectedComment] =
    useState<Articlecomment | null>(null);

  const articleMap = useMemo(() => {
    return new Map(
      articles.map((article) => [article.id, article.title])
    );
  }, [articles]);

  const handleDeleteComment = async (id: string) => {
    const result = await DeleteComment(id);
    result.message
      ? toast.success(result.message)
      : toast.error(result.message);
  };

  return (
    <>
      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-blue-50">
            <tr className="text-sm text-blue-700">
              <th className="px-6 py-4 font-semibold">مقاله</th>
              <th className="px-6 py-4 font-semibold">نویسنده</th>
              <th className="px-6 py-4 font-semibold">محتوا</th>
              <th className="px-6 py-4 font-semibold">تاریخ</th>
              <th className="px-6 py-4 font-semibold text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="text-sm transition hover:bg-blue-50/50 border-b border-blue-50 last:border-b-0"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {articleMap.get(comment.articleId) ?? "نامشخص"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {comment.author}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedComment(comment)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                  >
                    مشاهده کامنت
                  </button>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {formatDate(comment.createdAt)}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="space-y-4 md:hidden">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
          >
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">مقاله:</span>
                <span className="font-medium">
                  {articleMap.get(comment.articleId) ?? "نامشخص"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">نویسنده:</span>
                <span>{comment.author}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">تاریخ:</span>
                <span>{formatDate(comment.createdAt)}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setSelectedComment(comment)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
              >
                مشاهده
              </button>

              <button
                className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CommentModal
        isOpen={!!selectedComment}
        onClose={() => setSelectedComment(null)}
        author={selectedComment?.author}
        content={selectedComment?.content}
      />
    </>
  );
}