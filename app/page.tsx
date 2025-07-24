"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function HomePage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user !== null) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [user]);

  return null;
}
