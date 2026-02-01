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
export const AuthUserProfile=async()=>{
    try {
        const cookieStore=await cookies();
        const token=cookieStore.get("Token")?.value;
        if(!token){
            return null;
        }
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,{
            method:"GET", 
            headers:{
                "Authorization":`Bearer ${token}`
            },
            cache:"no-store"
        });
        if(!response.ok){
          cookieStore.delete("Token");
            return null;
        }
        const data=await response.json();
        
        return data;
    } catch (error) {
        console.error("Auth User Profile Error:",error);
        return null;
    }
}
export const AuthLogout=async()=>{
    const cookieStore=await cookies();
    cookieStore.delete("Token");
}