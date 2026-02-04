"use server";
import { ArticleType } from "@/types/Article";
import { CategoryType, CreateCategoryType } from "@/types/Category";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const GetCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  const data: CategoryType[] = await response.json();
  return data;
};
export const GetCategoryArticles = async (catId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${catId}/articles`,
    {
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    },
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch category articles: ${response.statusText}`,
    );
  }
  const data: ArticleType[] = await response.json();
  return data;
};
export const CreateCategory = async (values: CreateCategoryType) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("Token")?.value;
    if (!token) {
      return {
        success: false,
        message: "برای ایجاد دسته بندی جدید باید احراز شوید",
        data: null,
      };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      },
    );
    console.log(response);
    
    if (!response.ok) {
      return {
        success: false,
        message: `مشکلی پیش آمده ${response.statusText}`,
        data: null,
      };
    }
    const data = await response.json();
    revalidatePath("/p-admin/categories")
    return {
      success: true,
      message: `دسته بندی جدید با موفقیت اضافه شد`,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: `خطا لطفا بعدا امتحان کنید`,
      data: null,
    };
  }
};
export const DeleteCategory = async (catId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("Token")?.value;
    if (!token) {
        return {
            success: false,
            message: "کاربر احراز هویت نشده است"
        }
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${catId}`, {
            method: "DELETE",   
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if (!response.ok) {
            return {
                success: false,
                message: "خطا در حذف دسته بندی"
            }
        }
        revalidatePath("/p-admin/categories");
        return {
            success: true,
            message: "دسته بندی با موفقیت حذف شد"
        }
    } catch (error) {
        console.error("Delete User Error:", error);
        return {
            success: false,
            message: "خطا در ارتباط با سرور"
        }
    }
}