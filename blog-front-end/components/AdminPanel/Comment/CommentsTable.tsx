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

export default function CommentsTable({comments,articles,}: CommentsTableProps) {
  const [selectedComment, setSelectedComment] =
    useState<Articlecomment | null>(null);

  const articleMap = useMemo(() => {
    return new Map(
      articles.map((article) => [article.id, article.title])
    );
  }, [articles]);
  const handleDeleteComment=async(id:string)=>{
    const result=await DeleteComment(id);
    if(result.message){
      toast.success(result.message)
    }else{
      toast.error(result.message)
    }
  }
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
              <th className="px-6 py-4 font-semibold text-center">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="text-sm transition hover:bg-blue-50/50"
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
                    className="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                  >
                    مشاهده کامنت
                  </button>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {formatDate(comment.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="rounded-lg p-2 text-red-600 transition hover:bg-red-100" onClick={()=>handleDeleteComment(comment.id)}>
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
