import Navbar from "@/components/modules/Navbar/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
            <Navbar/>
        {children}
        </body>
    </html>
  );
}
