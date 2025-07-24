import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/StoreProvider";
import ProtectedRoute from "@/components/ProtectedRoutes";
export const metadata: Metadata = {
  title: "Home",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <ProtectedRoute>{children}</ProtectedRoute>
        </Providers>
      </body>
    </html>
  );
}
