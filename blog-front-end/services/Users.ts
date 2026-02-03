"use server"
import { registerType } from "@/types/Auth";
import { UserType } from "@/types/Users";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const GetUsers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("Token")?.value;
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    },
  );
  
  if (!response.ok) {
    return {
        success:false,
        message:`Failed to fetch users: ${response.statusText}`,
        data:[]
    }
}


  const data: UserType[] = await response.json();
  
  return {
    success: true,
    message: "Users fetched successfully",
    data: data,
  }
};
export const CreateUser = async (values: registerType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );

    // ❌ ارورهای سرور
    if (!response.ok) {
      return {
        success: false,
        message: "ایجاد کاربر ناموفق بود",
      };
    }

    // ✅ موفق
    revalidatePath("/p-admin/users");
    return {
      success: true,
      message: "شما با موفقیت کاربر را ایجاد کردید",
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