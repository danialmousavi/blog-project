import Link from "next/link";
import {
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Blog<span className="text-blue-600">App</span>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              یک وبلاگ مدرن برای مطالعه، یادگیری و اشتراک‌گذاری دانش
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              دسترسی سریع
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  خانه
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-blue-600">
                  مقالات
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-blue-600">
                  دسته‌بندی‌ها
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600">
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              پشتیبانی
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/contact" className="hover:text-blue-600">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              ما را دنبال کنید
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-gray-100 text-gray-600 transition hover:bg-blue-600 hover:text-white
                "
              >
                <FiGithub />
              </a>
              <a
                href="#"
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-gray-100 text-gray-600 transition hover:bg-blue-600 hover:text-white
                "
              >
                <FiTwitter />
              </a>
              <a
                href="#"
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-gray-100 text-gray-600 transition hover:bg-blue-600 hover:text-white
                "
              >
                <FiInstagram />
              </a>
              <a
                href="#"
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  bg-gray-100 text-gray-600 transition hover:bg-blue-600 hover:text-white
                "
              >
                <FiLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 md:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BlogApp. تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FiMail />
            info@blogapp.com
          </div>
        </div>
      </div>
    </footer>
  );
}
