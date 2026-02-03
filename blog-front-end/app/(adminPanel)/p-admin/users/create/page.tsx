"use client";

import { RegisterSchema } from "@/services/schemas/authSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { CreateUser } from "@/services/Users";
import { toast } from "react-toastify";

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl space-y-6">
        {/* ===== Page Title ===== */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700">
            ایجاد کاربر جدید
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            اطلاعات کاربر جدید را وارد کنید
          </p>
        </div>

        {/* ===== Card ===== */}
        <div className="rounded-2xl bg-white border border-blue-100 shadow-sm p-6">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              role: "user",
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              const result = await CreateUser(values);
                console.log(result);
                
              if (result.success) {
                toast.success(result.message);
                router.replace("/p-admin/users");
              } else {
                toast.error(result.message);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 text-center">
                    نام کاربری
                  </label>
                  <div className="relative">
                    <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      name="username"
                      type="text"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-10 py-2.5 text-sm text-center
                      focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-xs text-red-500 mt-1 text-center"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 text-center">
                    ایمیل
                  </label>
                  <div className="relative">
                    <FiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      name="email"
                      type="email"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-10 py-2.5 text-sm text-center
                      focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-xs text-red-500 mt-1 text-center"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 text-center">
                    رمز عبور
                  </label>
                  <div className="relative">
                    <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      name="password"
                      type="password"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-10 py-2.5 text-sm text-center
                      focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-xs text-red-500 mt-1 text-center"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    انصراف
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-sm rounded-lg font-medium text-white
                    bg-blue-600 hover:bg-blue-700 transition
                    disabled:opacity-60"
                  >
                    {isSubmitting ? "در حال ایجاد..." : "ایجاد کاربر"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
