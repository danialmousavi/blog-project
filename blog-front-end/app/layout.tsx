import "./globals.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PWAProvider } from "@/components/PWAProvider";
import ToastProvider from "@/components/modules/providers/ToastProvider";
export const metadata: Metadata = {
  title: "وبلاگ من",
  description: "وبلاگ من پلتفرم ایجاد مقالات",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "وبلاگ من",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <PWAProvider>{children}</PWAProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
