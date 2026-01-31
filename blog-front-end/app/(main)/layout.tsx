import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import ToastProvider from "@/components/modules/providers/ToastProvider";
import { AuthProvider } from "@/context/AuthContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {children}
        <ToastProvider/>
        <Footer />
      </AuthProvider>
    </>
  );
}
