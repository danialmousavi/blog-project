"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-16 flex items-center justify-between bg-white border-b border-blue-100 px-4 sm:px-6 lg:px-8 shadow-sm">
      <Link href="/" className="text-xl font-bold text-blue-700">
        برند شما
      </Link>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          >
            ادمین
          </button>

          {isAdminOpen && (
            <div className="absolute left-0 mt-2 w-40 rounded-md border border-blue-100 bg-white shadow-lg text-right">
              <button className="block w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">
                پروفایل
              </button>
              <button className="block w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">
                خروج
              </button>
            </div>
          )}
        </div>
{/* 
        <button
          onClick={() => {}}
          className="md:hidden text-blue-700 rounded-lg p-2 absolute left-4 top-4"
        >
          ☰
        </button> */}
      </div>
    </nav>
  );
}
