import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("Token")?.value;

  // ❌ توکن نیست
  if (!token) {
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    res.cookies.delete("Token");
    return res;
  }

  // بررسی اعتبار توکن
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // ❌ توکن نامعتبر
  if (!response.ok) {
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    res.cookies.delete("Token");
    return res;
  }

  const user = await response.json();

  // ❌ ادمین نیست
  if (user.role !== "admin") {
    const res = NextResponse.redirect(new URL("/", req.url));
    return res;
  }

  // ✅ همه چی اوکیه
  return NextResponse.next();
}

export const config = {
  matcher: ["/p-admin/:path*"],
};
