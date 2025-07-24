import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Login",
    default: "Login",
  },
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
