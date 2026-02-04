"use client";

import { useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { CategoryType } from "@/types/Category";
import { UpdateCategory } from "@/services/CategoriesService";

type EditCategoryModalProps = {
  isOpen: boolean;
  category: CategoryType | null;
  onClose: () => void;
};

export default function EditCategoryModal({
  isOpen,
  category,
  onClose,
}: EditCategoryModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // مقداردهی اولیه وقتی مودال باز میشه
  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setDescription(category.description);
    }
  }, [category]);

  // بررسی اینکه چیزی تغییر کرده یا نه
  const isDirty = useMemo(() => {
    if (!category) return false;
    return title !== category.title || description !== category.description;
  }, [title, description, category]);

  if (!isOpen || !category) return null;

  const handleSubmit = async () => {
    // console.log("EDIT CATEGORY:", {
    //   id: category.id,
    //   title,
    //   description,
    // });
    const values = {
      title,
      description,
    };
    console.log(values);

    const result = await UpdateCategory(category.id, values);
    console.log("update result", result);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-right">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-blue-700">ویرایش کتگوری</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FiX />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">عنوان</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">توضیحات</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isDirty}
            className="
              rounded-xl px-5 py-2 text-white transition
              bg-blue-600 hover:bg-blue-700
              disabled:bg-blue-300 disabled:cursor-not-allowed
            "
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
}
