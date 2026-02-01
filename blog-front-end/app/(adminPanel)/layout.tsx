import ToastProvider from "@/components/modules/providers/ToastProvider";

export default function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}
