"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Home,
  ShoppingCart,
  Package,
  MenuIcon,
  LogOutIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui";
import { logout } from "@/lib/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { clearUser } from "@/store/userSlice";

const menuItems = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/dashboard" },
  {
    name: "Sales",
    icon: <ShoppingCart className="w-5 h-5" />,
    href: "/dashboard/sales",
  },
  {
    name: "Products",
    icon: <Package className="w-5 h-5" />,
    href: "/dashboard/products",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const router = useRouter();

  useEffect(() => {
    const current = pathname === "/dashboard" ? "Home" : pathname.split("/")[2];
    setActive(current.charAt(0).toUpperCase() + current.slice(1));
  }, [pathname]);

  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    router.push("/login");
    dispatch(clearUser());
    logout();
  };

  return (
    <>
      <div className="lg:hidden px-2 py-5">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-700 cursor-pointer"
        >
          <MenuIcon />
        </button>
      </div>

      <aside
        className={cn(
          "bg-white border-r border-gray-200 h-screen flex flex-col px-4 py-8 w-64 transition-transform duration-300 transform z-40",
          open ? "translate-x-0" : "-translate-x-full",
          "fixed top-0 left-0",
          "lg:sticky lg:top-0 lg:translate-x-0"
        )}
      >
        <X
          className="lg:hidden cursor-pointer ml-auto text-gray-700"
          onClick={() => setOpen(!open)}
        />
        <h2 className="text-xl font-bold text-blue-500 mb-6 text-center my-5">
          Dashboard
        </h2>
        <div className="space-y-4 flex-1">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => setOpen(!open)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700",
                active === item.name
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700"
              )}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        <Button
          onClick={onLogout}
          size={"lg"}
          className="flex items-center justify-start gap-3 p-3 shadow-none rounded-lg bg-transparent hover:bg-gray-100 text-gray-700"
        >
          <LogOutIcon />
          <span className="text-sm font-medium">Logout</span>
        </Button>
      </aside>
    </>
  );
}
