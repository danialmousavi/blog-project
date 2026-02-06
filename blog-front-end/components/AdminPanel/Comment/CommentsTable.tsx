"use client";

import { useState } from "react";
import { formatDate } from "@/components/modules/FormData/FormDate";
import { Articlecomment } from "@/types/Comment";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import CommentModal from "./CommentModal";

type CommentsTableProps = {
  comments: Articlecomment[];
};

export default function CommentsTable({ comments }: CommentsTableProps) {
  const [selectedComment, setSelectedComment] =
    useState<Articlecomment | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
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
                className="text-sm transition hover:bg-blue-50/50"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {comment.articleId}
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

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
   

                    <button className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition">
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
      <CommentModal
        isOpen={!!selectedComment}
        onClose={() => setSelectedComment(null)}
        author={selectedComment?.author}
        content={selectedComment?.content}
      />
    </>
  );
}
