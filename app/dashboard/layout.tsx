import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-2 py-4 lg:p-6 min-h-screen">{children}</main>
    </div>
  );
}
