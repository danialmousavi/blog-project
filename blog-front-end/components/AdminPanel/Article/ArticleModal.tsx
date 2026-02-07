"use client";

import { FiX } from "react-icons/fi";
import { ArticleType } from "@/types/Article";

type ArticleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  article: ArticleType | null;
  categoryTitle?: string;
};

export default function ArticleModal({
  isOpen,
  onClose,
  article,
  categoryTitle,
}: ArticleModalProps) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-bold text-gray-800">
            {article.title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Meta */}
        <div className="mb-4 flex gap-6 text-sm text-gray-500">
          <span>نویسنده: {article.author}</span>
          <span>دسته‌بندی: {categoryTitle || "نامشخص"}</span>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto leading-8 text-gray-700">
          {article.content}
        </div>

        {/* Footer */}
        <div className="mt-6 text-left">
          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
