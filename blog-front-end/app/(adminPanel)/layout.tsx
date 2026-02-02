import Navbar from "@/components/AdminPanel/AdminNavbar/AdminNavbar";
import Sidebar from "@/components/AdminPanel/Sidebar/Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // فقط ساختار سرور
  return (
    <div className="flex">
      {/* Sidebar و Navbar Client Component هستند و خودشان state دارند */}
      <Sidebar />
      <div className="flex-1 min-h-screen md:pr-64">
        <Navbar />
        <main className="pt-16 p-4">{children}</main>
      </div>
    </div>
  );
}
