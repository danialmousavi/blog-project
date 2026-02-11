"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import { CategoryType } from "@/types/Category";
import { toast } from "react-toastify";
import { CreateArticleSchema, EditArticleSchema } from "@/services/schemas/ArticleSchema";

type EditArticlePageProps = {
  categories: CategoryType[];
  articleId: string;
};

export default function EditArticlePage({
  categories,
  articleId,
}: EditArticlePageProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}`
      );
      const data = await res.json();
      setArticleData(data);
      setLoading(false);
    };

    fetchArticle();
  }, [articleId]);

  if (loading) return <p>در حال دریافت اطلاعات...</p>;
  if (!articleData) return <p>مقاله پیدا نشد</p>;

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">
        ویرایش مقاله
      </h1>

      <Formik
        enableReinitialize
        initialValues={{
          title: articleData.title,
          content: articleData.content,
          categoryId: articleData.categoryId,
          image: null as File | null,
        }}
        validationSchema={EditArticleSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // 🔵 اگر عکس جدید انتخاب شده
            if (values.image) {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("content", values.content);
              formData.append("categoryId", values.categoryId);
              formData.append("author", user?.username ?? "admin");
              formData.append("image", values.image);

                console.log(formData);
                
            } else {
              // 🔵 اگر فقط متن تغییر کرده
                console.log({
                    title: values.title,
                    content: values.content,
                    categoryId: values.categoryId,
                    author: user?.username ?? "admin",
                    image: articleData.image, // 👈 تصویر قبلی رو نگه میداریم
                  });
                
            }

            toast.success("مقاله با موفقیت ویرایش شد");
            router.push("/p-admin/articles");
          } catch (error) {
            toast.error("خطا در ویرایش مقاله");
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
                className="text-red-500 text-sm mt-1"
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
                className="text-red-500 text-sm mt-1"
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
            </div>

            {/* Image Preview */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                تصویر فعلی
              </label>

              {articleData.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${articleData.image}`}
                  className="mb-4 h-32 w-32 rounded-xl object-cover"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("image", e.currentTarget.files?.[0])
                }
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
            >
              {isSubmitting ? "در حال ویرایش..." : "ویرایش مقاله"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
