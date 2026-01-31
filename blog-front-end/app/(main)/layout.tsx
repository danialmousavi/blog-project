import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/Navbar/Navbar";
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
        <Footer />
      </AuthProvider>
    </>
  );
}
