"use client";

import { FiLogOut } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

type AdminNavbarProps = {
  username?: string;
};

export default function AdminNavbar({ username = "Danial" }: AdminNavbarProps) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-blue-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">

            {/* ===== Logo / Brand ===== */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <HiSparkles size={22} />
              </div>

              <div className="leading-tight">
                <p className="font-extrabold text-gray-900 text-lg">
                  Danial Blog
                </p>
                <span className="text-xs text-blue-600 font-medium">
                  Admin Dashboard
                </span>
              </div>
            </div>

            {/* ===== User / Actions ===== */}
            <div className="flex items-center gap-4">
              {/* Welcome Badge */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                خوش آمدید {username}
              </div>

              {/* Logout */}
              <button
                className="group flex items-center gap-2 px-3 py-2 rounded-xl 
                           text-gray-600 hover:text-red-600 
                           hover:bg-red-50 transition"
              >
                <FiLogOut size={20} />
                <span className="hidden md:inline text-sm font-medium">
                  خروج
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
