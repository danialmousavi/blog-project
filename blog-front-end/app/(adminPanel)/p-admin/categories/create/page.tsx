"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { CreateUser } from "@/services/Users";
import { toast } from "react-toastify";
import { CreateCategory } from "@/services/CategoriesService";
import { CategorySchema } from "@/services/schemas/categoryschema";

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl space-y-6">
        {/* ===== Page Title ===== */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700">
            ایجاد دسته بندی جدید
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            اطلاعات دسته بندی جدید را وارد کنید
          </p>
        </div>

        {/* ===== Card ===== */}
        <div className="rounded-2xl bg-white border border-blue-100 shadow-sm p-6">
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={CategorySchema}
            onSubmit={async (values) => {
              const result = await CreateCategory(values);
                console.log(result);
                
              if (result.success) {
                toast.success(result.message);
                router.replace("/p-admin/categories");
              } else {
                toast.error(result.message);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* title */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 text-center">
                   عنوان
                  </label>
                  <div className="relative">
                    <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      name="title"
                      type="text"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-10 py-2.5 text-sm text-center
                      focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-xs text-red-500 mt-1 text-center"
                  />
                </div>

                {/* description */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 text-center">
                    توضیحات
                  </label>
                  <div className="relative">
                    <FiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      name="description"
                      type="text"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-10 py-2.5 text-sm text-center
                      focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ErrorMessage
                    name="description"
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
                    {isSubmitting ? "در حال ایجاد..." : "ایجاد دسته بندی"}
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
