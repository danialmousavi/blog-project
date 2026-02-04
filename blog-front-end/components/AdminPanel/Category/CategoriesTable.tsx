"use client";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { CategoryType } from "@/types/Category";
import { DeleteCategory } from "@/services/CategoriesService";
import { toast } from "react-toastify";

type CategoryTableProps = {
  categories: CategoryType[];
};

export default function CategoryTable({ categories }: CategoryTableProps) {
    const handleDeleteCategory=async(catId:string)=>{
        const result=await DeleteCategory(catId);
        if(result.success){
            toast.success(result.message)
        }else{
            toast.error(result.message)
        }
    }
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
      <table className="w-full text-right">
        <thead className="bg-blue-50">
          <tr className="text-sm text-blue-700">
            <th className="px-6 py-4 font-semibold">عنوان</th>
            <th className="px-6 py-4 font-semibold">توضیحات</th>
            <th className="px-6 py-4 font-semibold text-center">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category, index) => {
            return (
              <tr
                key={category.id}
                className={`text-sm transition  hover:bg-blue-50/50`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {category.title}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {category.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    {/* Change Role */}
                    <button
                      className="rounded-lg p-2 transition
                      disabled:opacity-50 disabled:cursor-not-allowed
                      text-emerald-600 hover:bg-emerald-100"
                    >
                      <FiEdit size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      className="rounded-lg p-2 transition
                      disabled:opacity-50 disabled:cursor-not-allowed
                      text-red-600 hover:bg-red-100"
                      onClick={()=>handleDeleteCategory(category.id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
