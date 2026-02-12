"use server";
import { ArticleType, UpdateArticleType } from "@/types/Article";
import { Articlecomment } from "@/types/Comment";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const GetArticles = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }
  const data: ArticleType[] = await response.json();
  return data;
};
export const GetArticleById = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`,
    {
      cache: "no-cache",
    },
  );
  console.log(response);

  if (!response.ok) {
    return false;
    // throw new Error(`Failed to fetch article with id ${id}: ${response.statusText}`);
  }
  const data: ArticleType = await response.json();
  return data;
};
export const GetArticleComments = async (articleId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}/comments`,
    {
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch comments for article ${articleId}: ${response.statusText}`,
    );
  }
  const data: Articlecomment[] = await response.json();
  return data;
};

export const DeleteArticle = async (id: string) => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("Token")?.value;
    if (!token) {
      return {
        success: false,
        message: "شما اجازه حذف مقاله را ندارید",
      };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      return {
        success: false,
        message: `خطا در حذف مقاله: ${response.statusText}`,
      };
    }
    revalidatePath("/p-admin/articles");
    return {
      success: true,
      message: "مقاله با موفقیت حذف شد",
    };
  } catch (error) {
    return {
      success: false,
      message: `خطا در حذف مقاله: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

export const CreateArticle = async (formData: FormData) => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("Token")?.value;
    if (!token) {
      return {
        success: false,
        message: "شما اجازه ایجاد مقاله را ندارید",
      };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles/with-image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    console.log(" create article response", response);

    if (!response.ok) {
      return {
        success: false,
        message: `خطا در ایجاد مقاله: ${response.statusText}`,
      };
    }
    revalidatePath("/p-admin/articles");
    return {
      success: true,
      message: "مقاله با موفقیت ایجاد شد",
    };
  } catch (error) {
    return {
      success: false,
      message: `خطا در ایجاد مقاله: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
export const EditArticle = async (
  articleId: string,
  values: UpdateArticleType,
) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("Token")?.value;
  if (!token) {
    return {
      success: false,
      message: "شما اجازه حذف مقاله را ندارید",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      },
    );
    console.log("response", response);

    // ❌ ارورهای سرور
    if (!response.ok) {
      return {
        success: false,
        message: "خطا در بروزرسانی مقاله!",
      };
    }

    // ✅ موفق
    revalidatePath("/p-admin/articles");
    return {
      success: true,
      message: "شما با موفقیت مقاله را بروزرسانی کردید",
    };
  } catch (error) {
    console.error("Register Error:", error);

    // ❌ ارور شبکه / سرور خاموش
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
    };
  }
};
export const EditArticleWithImage = async (
  articleId: string,
  formData: FormData,
) => {
 const cookiesStore = await cookies();
  const token = cookiesStore.get("Token")?.value;
  if (!token) {
    return {
      success: false,
      message: "شما اجازه حذف مقاله را ندارید",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}/with-image`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    console.log("response", response);

    // ❌ ارورهای سرور
    if (!response.ok) {
      return {
        success: false,
        message: "خطا در بروزرسانی مقاله!",
      };
    }

    // ✅ موفق
    revalidatePath("/p-admin/articles");
    return {
      success: true,
      message: "شما با موفقیت مقاله را بروزرسانی کردید",
    };
  } catch (error) {
    console.error("Register Error:", error);

    // ❌ ارور شبکه / سرور خاموش
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
    };
  }
};
