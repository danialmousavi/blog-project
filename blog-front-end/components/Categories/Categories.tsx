import { GetCategories } from "@/services/CategoriesService";
import Link from "next/link";
import React from "react";
import ValueCard from "../modules/ValueCard/ValueCard";
import CategoryCard from "../modules/CategoryCard/CategoryCard";

export default async function Categories() {
  const categories = await GetCategories();
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

      {/* Grid */}
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
    </section>
  );
}
