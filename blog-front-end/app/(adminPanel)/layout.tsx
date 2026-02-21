import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Navbar from "@/components/AdminPanel/AdminNavbar/AdminNavbar";
import Sidebar from "@/components/AdminPanel/Sidebar/Sidebar";

import { AuthProvider } from "@/context/AuthContext";

export const dynamic = "force-dynamic"; // مهم 👈

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // مهم 👈
    },
  );

  if (!response.ok) {
    // ❌ اینجا کوکی رو حذف نمی‌کنیم
    redirect("/api/auth/logout");
  }

  const user = await response.json();

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex">
      <AuthProvider>
      <Sidebar />
      <div className="flex-1 min-h-screen md:pr-64">
        <Navbar />
        <main className="pt-16 p-4">
          {children}
        </main>
      </div>
      </AuthProvider>
    </div>
  );
}
