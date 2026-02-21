"use client";

import { FiX } from "react-icons/fi";

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  author?: string;
  content?: string;
};

export default function CommentModal({
  isOpen,
  onClose,
  author,
  content,
}: CommentModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="font-bold text-gray-800">متن کامنت</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            <p className="text-sm text-gray-500">
              نویسنده:{" "}
              <span className="font-medium text-gray-800">
                {author}
              </span>
            </p>

            <div className="rounded-xl bg-gray-50 p-4 text-gray-700 leading-relaxed break-words">
              {content}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-5 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </>
  );
}