"use server";

import { CreateComment } from "@/types/Comment";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const UserCreateComment = async (values: CreateComment) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("Token")?.value;
  if (!token) {
    return {
      success: false,
      message: "کاربر احراز هویت نشده است",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      },
    );
    if (!response.ok) {
      return {
        success: false,
        message: "خطا در ارسال نظر",
      };
    }
    revalidatePath(`/blogs/${values.articleId}`);
    return {
      success: true,
      message: "نظر شما با موفقیت ارسال شد",
    };
  } catch (error) {
    console.error("Create Comment Error:", error);
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
    };
  }
};
export const GetAllComments = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("response",response);
    
    if (!response.ok) {
      return {
        success: false,
        message: "خطا در دریافت نظرات",
        data: null,
      };
    }
    const data = await response.json();
    return {
      success: true,
      message: "نظرات برای  شما با موفقیت ارسال شد",
      data,
    };
  } catch (error) {
    console.error("Create Comment Error:", error);
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
    };
  }
};
