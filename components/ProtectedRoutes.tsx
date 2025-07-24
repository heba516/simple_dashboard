"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    console.log(user);

    if (user !== null) {
      router.push("/dashboard");
    } else if (user === null) {
      router.push("/login");
    }
  }, [user]);

  return <div>{children}</div>;
}
