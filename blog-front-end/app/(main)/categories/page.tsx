import { GetCategories } from "@/services/CategoriesService";
import CategoryCard from "@/components/modules/CategoryCard/CategoryCard";

export default async function CategoriesPage() {
  const categories = await GetCategories();

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          دسته‌بندی مقالات
        </h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          موضوعات مختلفی که می‌تونی مقالات مورد علاقت رو توشون پیدا کنی
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            text={category.description}
            variant="page"
          />
        ))}
      </div>
    </section>
  );
}
