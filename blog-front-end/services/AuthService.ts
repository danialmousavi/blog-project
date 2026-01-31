"use server";

import { loginType, registerType } from "@/types/Auth";
import { cookies } from "next/headers";

export const AuthRegister = async (values: registerType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "no-store",
      },
    );

    // ❌ ارورهای سرور
    if (!response.ok) {
      return {
        success: false,
        message: "ثبت‌نام ناموفق بود",
      };
    }

    // ✅ موفق
    return {
      success: true,
      message: "شما با موفقیت ثبت‌نام شدید",
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
export const AuthLogin = async (values: loginType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "no-store",
      },
    );

    // ❌ ارورهای سرور
    if (!response.ok) {
      return {
        success: false,
        message: "ورود ناموفق بود",
        data: null,
      };
    }
    const data = await response.json();
    const cookieStore = await cookies();
    cookieStore.set("Token", data.token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24  //1 day
    });
    // ✅ موفق
    return {
      success: true,
      message: "شما با موفقیت وارد شدید",
      data: data,
    };
  } catch (error) {
    console.error("Login Error:", error);

    // ❌ ارور شبکه / سرور خاموش
    return {
      success: false,
      message: "خطا در ارتباط با سرور",
      data: null,
    };
  }
};
