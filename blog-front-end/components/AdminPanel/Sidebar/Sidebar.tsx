"use client";

import AuthContext from "@/context/AuthContext";
import { AuthLogout } from "@/services/AuthService";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "داشبورد", href: "/p-admin" },
    { name: "کاربران", href: "/p-admin/users" },
    { name: "دسته بندی ها", href: "/p-admin/categories" },
    { name: "کامنت ها", href: "/p-admin/comments" },
    { name: "مقالات", href: "/p-admin/articles" },
  ];
  const context = useContext(AuthContext);

  const handleLogout = async () => {
    context.logout();
    await AuthLogout();
    toast.success("شما با موفقیت از حساب خود خارج شدید");
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-20 left-4 z-40 bg-blue-100 text-blue-700 p-2 rounded shadow"
      >
        ☰
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-white border-l border-blue-100 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full text-right">
          <div className="px-6 py-4 border-b border-blue-100">
            <h2 className="text-lg font-bold text-blue-700">داشبورد</h2>
          </div>
          <nav className="flex-1 px-3 mt-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-right w-full rounded-lg px-3 py-2 text-sm font-medium mt-3 transition
    ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              <li
                onClick={() => handleLogout()}
                className={`block text-right w-full text-gray-700 hover:bg-blue-50 rounded-lg px-3 py-2 text-sm font-medium mt-3 transition`}
              >
                خروج
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
