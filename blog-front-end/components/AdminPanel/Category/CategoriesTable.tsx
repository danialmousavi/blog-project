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
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
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
                className="text-sm transition hover:bg-blue-50/50"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {category.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {category.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(category)}
                      className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-100 transition"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-100 transition"
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

      <EditCategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
