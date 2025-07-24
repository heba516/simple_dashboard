import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Signup",
    default: "Signup",
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
