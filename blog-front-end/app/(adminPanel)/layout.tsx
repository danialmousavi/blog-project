import AdminNavbar from "@/components/AdminPanel/AdminNavbar/AdminNavbar";
import ToastProvider from "@/components/modules/providers/ToastProvider";

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <AdminNavbar/>
      {children}
      <ToastProvider />
    </>
  );
}
