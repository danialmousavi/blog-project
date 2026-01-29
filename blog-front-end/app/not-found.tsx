import Link from "next/link";
import { FiAlertCircle, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <FiAlertCircle size={40} />
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          صفحه پیدا نشد
        </h1>
        <p className="text-gray-500 mb-8">
          متأسفانه صفحه‌ای که دنبالش بودی وجود نداره یا حذف شده.
        </p>

        {/* Action */}
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3
            text-white font-medium transition hover:bg-blue-700
          "
        >
          <FiHome />
          بازگشت به خانه
        </Link>
      </div>
    </section>
  );
}
