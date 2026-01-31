"use client";

import { AuthRegister } from "@/services/AuthService";
import { RegisterSchema } from "@/services/schemas/authSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur shadow-2xl p-8 border border-gray-100">
        {/* ===== Title ===== */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          ساخت حساب کاربری 🚀
        </h1>
        <p className="text-center text-gray-500 mb-8">
          چند ثانیه تا شروع تجربه شما
        </p>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            role: "user",
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values) => {
            const result = await AuthRegister(values);

            if (result.success) {
              toast.success(result.message);
              router.replace("/auth/login");
            } else {
              toast.error(result.message);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* ===== Username ===== */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  نام کاربری
                </label>
                <div className="relative">
                  <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Field
                    name="username"
                    type="text"
                    placeholder="مثلاً danial_dev"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-12
                      py-3
                      focus:bg-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      transition
                    "
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* ===== Email ===== */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ایمیل
                </label>
                <div className="relative">
                  <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-12
                      py-3
                      focus:bg-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      transition
                    "
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* ===== Password ===== */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  رمز عبور
                </label>
                <div className="relative">
                  <FiLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-12
                      py-3
                      focus:bg-white
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      transition
                    "
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* ===== Submit ===== */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  py-3
                  rounded-xl
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-700
                  hover:to-blue-800
                  transition
                  shadow-lg
                  hover:shadow-xl
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
  