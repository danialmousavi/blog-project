import Link from "next/link";
import { FiFolder, FiArrowLeft } from "react-icons/fi";

interface Props {
  id: string;
  title: string;
  text: string;
  variant?: "home" | "page";
}

export default function CategoryCard({
  id,
  title,
  text,
  variant = "home",
}: Props) {
  return (
    <Link href={`/categories/${id}`}>
      <div
        className={`
          group relative h-full rounded-2xl border border-gray-100 bg-white p-6
          transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
          ${
            variant === "page"
              ? "hover:border-blue-200"
              : "hover:border-blue-100"
          }
        `}
      >
        {/* Icon */}
        <div
          className="
            mb-6 flex h-12 w-12 items-center justify-center
            rounded-xl bg-blue-50 text-blue-600
            transition-colors group-hover:bg-blue-600 group-hover:text-white
          "
        >
          <FiFolder size={22} />
        </div>

        {/* Content */}
        <h3 className="mb-3 text-lg md:text-xl font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mb-6 text-sm md:text-base text-gray-500 leading-relaxed line-clamp-3">
          {text}
        </p>

        {/* Action */}
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
          مشاهده مقالات
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
