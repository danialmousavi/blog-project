"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { CategoryType } from "@/types/Category";
// import { CreateArticle } from "@/services/ArticlesSerivece";
import { toast } from "react-toastify";
import { CreateArticleSchema } from "@/services/schemas/ArticleSchema";
import { CreateArticle } from "@/services/ArticlesSerivece";
import { useRouter } from "next/navigation";

type CreateArticleFormProps = {
  categories: CategoryType[];
};

export default function CreateArticleForm({
  categories,
}: CreateArticleFormProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">
        ایجاد مقاله جدید
      </h1>

      <Formik
        initialValues={{
          title: "",
          content: "",
          categoryId: "",
          image: null as File | null,
        }}
        validationSchema={CreateArticleSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("content", values.content);
            formData.append("categoryId", values.categoryId);
            formData.append("author", user?.username ?? "admin");

            if (values.image) {
              formData.append("image", values.image);
            }

            const result = await CreateArticle(formData);
            if (result.success) {
              toast.success("مقاله با موفقیت ایجاد شد");
                router.push("/p-admin/articles");
            } else {
              toast.error(result.message || "خطا در ایجاد مقاله");
              router.push("/p-admin/articles");
            }

            resetForm();
          } catch (error) {
            toast.error("خطا در ایجاد مقاله");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                عنوان مقاله
              </label>
              <Field
                name="title"
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                محتوای مقاله
              </label>
              <Field
                as="textarea"
                name="content"
                rows={6}
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="content"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                دسته‌بندی
              </label>
              <Field
                as="select"
                name="categoryId"
                className="w-full rounded-xl border px-4 py-3"
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="categoryId"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                تصویر مقاله
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files?.[0])
                }
                className="w-full rounded-xl border px-4 py-3"
              />
              <ErrorMessage
                name="image"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-xl py-3 font-semibold text-white transition
                ${
                  isSubmitting
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {isSubmitting ? "در حال ارسال..." : "ایجاد مقاله"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
