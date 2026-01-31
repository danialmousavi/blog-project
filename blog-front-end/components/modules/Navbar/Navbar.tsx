"use client";

import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

type Props = {
  isLoggedIn?: boolean;
};

export default function Navbar({ isLoggedIn = false }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname=usePathname();
  const closeMenu = () => setMenuOpen(false);
  const context=useContext(AuthContext);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg md:text-xl font-semibold text-blue-600"
          >
            وبلاگ من
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={`nav-link ${pathname==='/'?'active':''}`}>
              خانه
            </Link>
            <Link href="/about" className={`nav-link ${pathname==='/about'?'active':''}`}>
              درباره ما
            </Link>
            <Link href="/blogs" className={`nav-link ${pathname==='/blogs'?'active':''}`}>
              بلاگ‌ها
            </Link>
            <Link href="/contact" className={`nav-link ${pathname==='/contact'?'active':''}`}>
              تماس با ما
            </Link>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو"
                className="
    w-48 px-3 py-2 pr-9
    text-base md:text-lg
    border border-gray-300 rounded-md
    focus:outline-none focus:ring-2 focus:ring-blue-500
  "
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label="search"
              >
                <FiSearch />
              </button>
            </div>

            {!context.isAuthenticated? (
              <Link
                href="/auth/login"
                className="
    px-4 py-2
    text-base md:text-lg
    rounded-md
    bg-blue-600 text-white
    hover:bg-blue-700 transition
  "
              >
                ورود / ثبت‌نام
              </Link>
            ):(
              <span className="text-gray-700">خوش آمدید، {context.user?.username}</span>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(true)}
            aria-label="open menu"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={closeMenu}
        >
          <div
            className="
              absolute right-0 top-0 h-full w-72
              bg-white p-6
              shadow-xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button className="text-2xl text-gray-700 mb-8" onClick={closeMenu}>
              <FiX />
            </button>

            <div className="flex flex-col gap-5">
              <Link href="/" onClick={closeMenu} className={`mobile-link ${pathname==='/'?'active':''}`}>
                خانه
              </Link>
              <Link href="/about" onClick={closeMenu} className={`mobile-link ${pathname==='/about'?'active':''}`}>
                درباره ما
              </Link>
              <Link href="/blogs" onClick={closeMenu} className={`mobile-link ${pathname==='/blogs'?'active':''}`}>
                بلاگ‌ها
              </Link>
              <Link href="/contact" onClick={closeMenu} className={`mobile-link ${pathname==='/contact'?'active':''}`}>
                تماس با ما
              </Link>

              {/* Mobile search */}
              <div className="relative mt-6">
                <input
                  type="text"
                  placeholder="جستجو"
                  className="
                    w-full px-3 py-2 pr-10 text-sm
                    border border-gray-300 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FiSearch />
                </button>
              </div>

              {!context.isAuthenticated? (
                <Link
                  href="/auth/login"
                  onClick={closeMenu}

                  className="
                    block w-full text-center
                    px-4 py-2
                    text-sm
                    rounded-md
                    bg-blue-600 text-white
                    hover:bg-blue-700 transition
                  "
                >
                  ورود / ثبت‌نام

                </Link>
              ):(
                <span className="text-gray-700">خوش آمدید، {context.user?.username}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
