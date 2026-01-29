import { GetCategories } from "@/services/CategoriesService";
import Link from "next/link";
import CategoryCard from "../modules/CategoryCard/CategoryCard";
import { FiLayers } from "react-icons/fi";
// import { CategoryType } from "@/types/Category";
export default async function Categories() {
  let categories:CategoryType[] = [];

  try {
    categories = await GetCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          دسته‌بندی‌ها
        </h2>
        <Link
          href="/categories"
          className="text-blue-600 hover:text-blue-700 text-sm md:text-base"
        >
          مشاهده همه →
        </Link>
      </div>

      {/* Empty State */}
      {!categories || categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiLayers size={26} />
          </div>
          <p className="text-gray-500 text-sm md:text-base">
            هنوز دسته‌بندی‌ای ایجاد نشده
          </p>
        </div>
      ) : (
        /* Grid */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 3).map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              text={category.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}
