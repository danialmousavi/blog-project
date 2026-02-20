"use client";

import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { CategoryType } from "@/types/Category";
import { DeleteCategory } from "@/services/CategoriesService";
import { toast } from "react-toastify";
import EditCategoryModal from "./EditModalCategory";

type CategoryTableProps = {
  categories: CategoryType[];
};

export default function CategoryTable({ categories }: CategoryTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | null>(null);

  const handleDeleteCategory = async (catId: string) => {
    const result = await DeleteCategory(catId);
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
  };

  const openEditModal = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-blue-50">
            <tr className="text-sm text-blue-700">
              <th className="px-6 py-4 font-semibold">عنوان</th>
              <th className="px-6 py-4 font-semibold">توضیحات</th>
              <th className="px-6 py-4 font-semibold text-center">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="text-sm transition hover:bg-blue-50/50 border-b border-blue-50 last:border-b-0"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {category.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {category.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <ActionButtons
                      category={category}
                      onEdit={openEditModal}
                      onDelete={handleDeleteCategory}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="space-y-4 md:hidden">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
          >
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">عنوان:</span>
                <span className="font-medium">{category.title}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-gray-500">توضیحات:</span>
                <span className="text-gray-700 break-words">
                  {category.description}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <ActionButtons
                category={category}
                onEdit={openEditModal}
                onDelete={handleDeleteCategory}
              />
            </div>
          </div>
        ))}
      </div>

      <EditCategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

/* ============ Shared Buttons ============ */
function ActionButtons({ category, onEdit, onDelete }: any) {
  return (
    <>
      <button
        onClick={() => onEdit(category)}
        className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-100 transition"
      >
        <FiEdit size={18} />
      </button>

      <button
        onClick={() => onDelete(category.id)}
        className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
      >
        <FiTrash2 size={18} />
      </button>
    </>
  );
}