"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header = ({ text }: { text: string }) => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-blue-500 font-semibold text-2xl">{text}</h1>
      <p>Hi, {user?.name}</p>
    </div>
  );
};

export default Header;
