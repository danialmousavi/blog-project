"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiRefreshCw, FiAlertTriangle } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <FiAlertTriangle size={38} />
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          یه مشکلی پیش اومد
        </h1>
        <p className="text-gray-500 mb-8">
          متأسفانه هنگام پردازش درخواست شما خطایی رخ داد. دوباره تلاش کن.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="
              inline-flex items-center justify-center gap-2 rounded-xl
              bg-blue-600 px-6 py-3 text-white font-medium
              transition hover:bg-blue-700
            "
          >
            <FiRefreshCw />
            تلاش مجدد
          </button>

          <Link
            href="/"
            className="
              inline-flex items-center justify-center gap-2 rounded-xl
              border border-gray-200 px-6 py-3 font-medium text-gray-700
              transition hover:bg-gray-50
            "
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </section>
  );
}
